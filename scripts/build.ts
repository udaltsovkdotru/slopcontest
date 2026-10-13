// Собирает dist/ для GitHub Pages только средствами Bun:
// Bun.build бандлит site/index.html (CSS, JS, картинки с хэшами), Bun.Glob/Bun.write копируют слопы и промпты.
import { join } from "node:path";
import registry from "../slops/models.json";

const MIN_BUN = ">=1.4.0";
if (!Bun.semver.satisfies(Bun.version, MIN_BUN)) {
  console.error(`Нужен Bun ${MIN_BUN}, а запущен ${Bun.version}`);
  process.exit(1);
}

const root = join(import.meta.dir, "..");
const dist = join(root, "dist");
const read = (p: string) => Bun.file(join(root, p)).text();
const exists = (p: string) => Bun.file(join(root, p)).size > 0;
const esc = Bun.escapeHTML;
const repo = process.env.GITHUB_REPOSITORY ?? "udaltsovkdotru/slopcontest";

type Variant = { id: string; label: string; skills?: string[] };
type Model = (typeof registry.models)[number] & { variants?: string[]; note?: string };
const models = registry.models as Model[];
const VARIANTS = registry.variants as Variant[];
const variantsOf = (m: Model) => VARIANTS.filter((v) => !m.variants || m.variants.includes(v.id));

// --- Скиллы: какие файлы из prompts/skills входят в каждый.
const SKILLS: Record<string, { name: string; files: string[]; how: string }> = {
  "frontend-design": {
    name: "frontend-design",
    files: ["frontend-design/SKILL.md"],
    how: "план в два прохода — токены цвета, шрифтов и раскладки плюс принципы, проверка плана на шаблонность, и только потом код",
  },
  impeccable: {
    name: "impeccable",
    files: ["impeccable/SKILL.md", "impeccable/reference/craft-floor.md", "impeccable/reference/mode-persuade.md", "impeccable/reference/adapt.md"],
    how: "режим Persuade, нижняя планка качества и запреты из craft-floor, адаптивность из adapt",
  },
  taste: {
    name: "taste-skill v2 (design-taste-frontend)",
    files: ["taste-skill/SKILL.md", "taste-skill/references/tells.md", "taste-skill/references/copy.md", "taste-skill/references/type.md", "taste-skill/references/colour.md", "taste-skill/references/layout.md", "taste-skill/references/motion.md"],
    how: "инвентарь предмета, идея одним предложением, «одна живая штука», правила дома и законы ремесла",
  },
  "motion-design": {
    name: "motion-design",
    files: ["motion-design/SKILL.md", "motion-design/reference/timing-easing-tables.md", "motion-design/reference/quality-checklist.md", "motion-design/patterns/entrance-exit.md", "motion-design/patterns/ambient-continuous.md"],
    how: "тайминги, кривые и хореография движения, один главный момент, уважение к prefers-reduced-motion",
  },
};
const skillsDir = join(root, "prompts/skills");
const known = Object.values(SKILLS).flatMap((s) => s.files);
const unused = [...new Bun.Glob("**/*.md").scanSync(skillsDir)].filter((f) => !known.includes(f));
if (unused.length) throw new Error(`В prompts/skills лежат файлы вне скиллов: ${unused.join(", ")}`);

// --- Промпты: ядро (prompts/core.md) + блок скиллов варианта + приложение под семейство моделей.
// Ядро одно на всех, поэтому сравнение честное: отличаются только скиллы и короткие заметки о том, как модели читать задание.
const core = await read("prompts/core.md");
const FAMILIES = [...new Bun.Glob("*.md").scanSync(join(root, "prompts/appendix"))].map((f) => f.replace(/\.md$/, "")).sort();
const appendix = Object.fromEntries(await Promise.all(FAMILIES.map(async (f) => [f, (await read(`prompts/appendix/${f}.md`)).trim()])));
const fileOf = (v: Variant) => `slop-${v.id}.md`;
function skillsBlock(v: Variant) {
  const list = v.skills!.map((id) => SKILLS[id]);
  const many = list.length > 1;
  const names = list.map((s) => s.name).join(", ");
  return [
    `<attached_skills file="${fileOf(v)}">`,
    `К этому сообщению приложен файл \`${fileOf(v)}\`: ${many ? `дизайн-скиллы ${names}` : `дизайн-скилл ${names}`}. Прочитай его целиком до того, как писать код, и следуй ${many ? "им" : "ему"}: ${list.map((s) => s.how).join("; ")}.`,
    `- Скрипты, браузер, скриншоты и файловая система недоступны. Шаги, которые требуют что-то запустить (скрипты, инспекторы, команды), не выполняй — бери из них принципы и сам принимай решения, которые выдал бы инструмент.`,
    `- Если ${many ? "скиллы просят" : "скилл просит"} спросить клиента или показать план — не спрашивай и не показывай. План продумай про себя, итог кратко запиши в стартовый HTML-комментарий.`,
    `- <deliverable> и <requirements> важнее правил ${many ? "скиллов" : "скилла"}. Внешние картинки запрещены: если нужны фотографии, рисуй их сам в inline SVG/CSS по мотивам мира олимпиады.`,
    `</attached_skills>`,
  ].join("\n");
}
const promptOf = (v: Variant, family: string) =>
  core
    .replace("{{SKILLS}}", v.skills ? `\n${skillsBlock(v)}\n` : "")
    .replace("{{APPENDIX}}", `\n${appendix[family]}\n`)
    .trim() + "\n";

async function bundleOf(v: Variant) {
  const list = v.skills!.map((id) => SKILLS[id]);
  let out =
    `# ${fileOf(v)}\n\n` +
    `Дизайн-${list.length > 1 ? "скиллы" : "скилл"} для генерации лендинга в чате: ${list.map((s) => s.name).join(", ")}. ` +
    "Источники: anthropics/skills (frontend-design, Apache-2.0), pbakaus/impeccable (Apache-2.0), Leonxlnx/taste-skill (MIT), LottieFiles/motion-design-skill (MIT).\n" +
    "Ссылки на скрипты и файлы внутри скиллов относятся к их исходным репозиториям; в чате они недоступны.\n";
  for (const f of list.flatMap((s) => s.files)) out += `\n\n<!-- ===== FILE: ${f} ===== -->\n\n` + (await Bun.file(join(skillsDir, f)).text()).trim() + "\n";
  return out;
}

// --- Витрина: плитки только для готовых слопов, остальное — в очереди.
const dir = (m: Model, v: Variant) => `slops/${m.id}/${v.id}`;
const kb = (p: string) => Math.max(1, Math.round(Bun.file(join(root, p)).size / 1024));
const isReady = (m: Model, v: Variant) => exists(`${dir(m, v)}/index.html`);
let ready = 0;
let total = 0;
const tiles: string[] = [];
const queue: string[] = [];
for (const m of models) {
  const style = `--field:${m.color};--field-ink:${m.ink}`;
  const pills: string[] = [];
  for (const v of variantsOf(m)) {
    total++;
    const d = dir(m, v);
    if (!isReady(m, v)) {
      pills.push(`<li>${esc(v.label)}</li>`);
      continue;
    }
    ready++;
    const picture = exists(`${d}/preview.webp`)
      ? `<img src="${d}/preview.webp" width="640" height="1600" loading="lazy" alt="Превью: ${esc(m.name)}, ${esc(v.label)}">`
      : `<span class="tile-wait">превью скоро</span>`;
    tiles.push(`<li class="tile" style="${style}"><a href="${d}/" class="tile-link"><span class="tile-window">${picture}</span>
            <span class="tile-body">
              <span class="tile-name">${esc(m.name)}</span>
              <span class="tile-meta"><span>${esc(m.vendor)}</span><span>вкус «${esc(m.flavor)}»</span></span>
              <span class="tile-foot"><span class="tile-variant">${esc(v.label)}</span><span class="tile-size">${kb(`${d}/index.html`)} КБ</span></span>
            </span></a></li>`);
  }
  if (pills.length) queue.push(`<li class="queue-row" style="${style}"><span class="queue-name">${esc(m.name)}</span><ul class="queue-pills">${pills.join("")}</ul></li>`);
}
const queueHtml = queue.length
  ? `<div class="queue"><h3>Ещё варится</h3><ul class="queue-list">${queue.join("")}</ul></div>`
  : "";

// --- Сравнение: «без скиллов» против любого готового варианта той же модели.
const pairs = models
  .filter((m) => variantsOf(m).some((v) => v.id === "raw") && exists(`${dir(m, VARIANTS[0])}/preview.webp`))
  .map((m) => ({
    id: m.id, name: m.name, color: m.color, ink: m.ink, raw: `${dir(m, VARIANTS[0])}/`,
    variants: variantsOf(m).filter((v) => v.skills && exists(`${dir(m, v)}/preview.webp`)).map((v) => ({ id: v.id, label: v.label, href: `${dir(m, v)}/` })),
  }))
  .filter((p) => p.variants.length);
const first = pairs[0];
const compare = first
  ? `<div class="compare" data-compare>
        <div class="compare-pick" role="group" aria-label="Модель">
          ${pairs.map((p, i) => `<button type="button" class="chip" data-pair="${p.id}" aria-pressed="${i === 0}" style="--field:${p.color};--field-ink:${p.ink}">${esc(p.name)}</button>`).join("\n          ")}
        </div>
        <div class="compare-pick compare-variants" role="group" aria-label="Вариант справа" data-variants>
          ${first.variants.map((v, i) => `<button type="button" class="chip chip-s" data-variant="${v.id}" aria-pressed="${i === first.variants.length - 1}">${esc(v.label)}</button>`).join("\n          ")}
        </div>
        <figure class="compare-frame">
          <img class="compare-raw" src="${first.raw}preview.webp" width="640" height="1600" alt="Без скиллов: ${esc(first.name)}">
          <img class="compare-skills" src="${first.variants.at(-1)!.href}preview.webp" width="640" height="1600" alt="${esc(first.variants.at(-1)!.label)}: ${esc(first.name)}">
          <figcaption><span>Без скиллов</span><span data-right-label>${esc(first.variants.at(-1)!.label)}</span></figcaption>
        </figure>
        <label class="compare-range"><span class="sr-only">Граница между вариантами</span><input type="range" min="0" max="100" value="50"></label>
        <script type="application/json" id="pairs">${JSON.stringify(pairs)}</script>
      </div>`
  : `<p class="compare-empty">Как только у какой-нибудь модели сварятся два варианта, здесь можно будет двигать границу между ними.</p>`;

// --- Рецепт: семейство моделей × вариант → промпт и вложение.
const FAMILY_LABEL: Record<string, string> = { gemini: "Gemini", claude: "Claude", mimo: "MiMo", other: "Другие модели" };
const kit = `<div class="kit-families" role="group" aria-label="Для какой модели промпт">
          ${FAMILIES.map((f, i) => `<button type="button" class="chip chip-s" data-family="${f}" aria-pressed="${i === 0}">${esc(FAMILY_LABEL[f] ?? f)}</button>`).join("\n          ")}
        </div>
        <ul class="kit">
        ${VARIANTS.map((v) => `<li>
          <span class="kit-name">${esc(v.skills ? v.label : "Без скиллов")}</span>
          <span class="kit-actions">
            <button type="button" class="btn btn-s" data-copy="prompts/${FAMILIES[0]}/${v.id}.txt" data-variant="${v.id}">Копировать промпт</button>
            ${v.skills ? `<a class="btn btn-s btn-ghost" href="prompts/${fileOf(v)}" download="${fileOf(v)}">Вложение ${fileOf(v)}</a>` : ""}
          </span>
        </li>`).join("\n        ")}
        </ul>`;

const vendors = [...new Set(models.map((m) => m.vendor))];

// --- Сборка.
await Bun.$`rm -rf ${dist}`;
const built = await Bun.build({ entrypoints: [join(root, "site/index.html")], outdir: dist, minify: true });
if (!built.success) {
  for (const log of built.logs) console.error(log);
  process.exit(1);
}
const page = Bun.file(join(dist, "index.html"));
await Bun.write(
  page,
  (await page.text())
    .replace("{{TILES}}", tiles.join("\n        "))
    .replace("{{QUEUE}}", queueHtml)
    .replace("{{COMPARE}}", compare)
    .replace("{{KIT}}", kit)
    .replaceAll("{{READY}}", String(ready))
    .replaceAll("{{TOTAL}}", String(total))
    .replaceAll("{{MODELS}}", String(models.length))
    .replaceAll("{{VARIANTS}}", String(VARIANTS.length))
    .replaceAll("{{VENDORS}}", esc(vendors.join(", ")))
    .replaceAll("{{REPO}}", `https://github.com/${repo}`),
);

for (const f of new Bun.Glob("slops/*/*/*").scanSync(root)) await Bun.write(join(dist, f), Bun.file(join(root, f)));
for (const v of VARIANTS) {
  for (const f of FAMILIES) await Bun.write(join(dist, "prompts", f, `${v.id}.txt`), promptOf(v, f));
  if (v.skills) await Bun.write(join(dist, "prompts", fileOf(v)), await bundleOf(v));
}

console.log(`Bun ${Bun.version} · слопов: ${ready}/${total} · моделей для сравнения: ${pairs.length} · промптов: ${VARIANTS.length * FAMILIES.length} (${FAMILIES.join(", ")}) → dist/`);
