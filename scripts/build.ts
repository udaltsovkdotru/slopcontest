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

type Variant = (typeof registry.variants)[number];
type Model = (typeof registry.models)[number] & { variants?: string[]; note?: string };
const models = registry.models as Model[];
const variantsOf = (m: Model) => registry.variants.filter((v) => !m.variants || m.variants.includes(v.id));

// --- Промпты: бриф обязан быть одинаковым во всех вариантах, иначе сравнение нечестное.
const BRIEF = /<!-- BRIEF:START -->([\s\S]*?)<!-- BRIEF:END -->/;
const prompts = await Promise.all(registry.variants.map((v) => read(v.prompt)));
const briefs = prompts.map((p, i) => {
  const m = p.match(BRIEF);
  if (!m) throw new Error(`${registry.variants[i].prompt}: нет блока BRIEF`);
  return m[1];
});
if (new Set(briefs).size !== 1) throw new Error("Бриф в промптах различается — синхронизируй prompts/*.md");
const clean = (p: string) => p.replace(/<!-- BRIEF:(START|END) -->\n?/g, "").trim() + "\n";

// --- Бандл скиллов: один файл, который прикладывается к чату.
const SKILL_FILES = [
  "frontend-design/SKILL.md",
  "impeccable/SKILL.md",
  "impeccable/reference/craft-floor.md",
  "impeccable/reference/mode-persuade.md",
  "impeccable/reference/adapt.md",
  "taste-skill/SKILL.md",
  "taste-skill/references/tells.md",
  "taste-skill/references/copy.md",
  "taste-skill/references/type.md",
  "taste-skill/references/colour.md",
  "taste-skill/references/layout.md",
  "taste-skill/references/motion.md",
  "motion-design/SKILL.md",
  "motion-design/reference/timing-easing-tables.md",
  "motion-design/reference/quality-checklist.md",
  "motion-design/patterns/entrance-exit.md",
  "motion-design/patterns/ambient-continuous.md",
];
const skillsDir = join(root, "prompts/skills");
const unused = [...new Bun.Glob("**/*.md").scanSync(skillsDir)].filter((f) => !SKILL_FILES.includes(f));
if (unused.length) throw new Error(`В prompts/skills лежат файлы вне бандла: ${unused.join(", ")}`);

let bundle =
  "# slop-skills.md\n\n" +
  "Дизайн-скиллы для генерации лендинга в чате. Источники: anthropics/skills (frontend-design, Apache-2.0), " +
  "pbakaus/impeccable (Apache-2.0), Leonxlnx/taste-skill (MIT), LottieFiles/motion-design-skill (MIT).\n" +
  "Ссылки на скрипты и файлы внутри скиллов относятся к их исходным репозиториям; в чате они недоступны.\n";
for (const f of SKILL_FILES) bundle += `\n\n<!-- ===== FILE: ${f} ===== -->\n\n` + (await Bun.file(join(skillsDir, f)).text()).trim() + "\n";

// --- Витрина: по плитке на каждую пару «модель × вариант».
const dir = (m: Model, v: Variant) => `slops/${m.id}/${v.id}`;
const kb = (p: string) => Math.max(1, Math.round(Bun.file(join(root, p)).size / 1024));
let ready = 0;
let total = 0;
const tiles = models.flatMap((m) =>
  variantsOf(m).map((v) => {
    total++;
    const d = dir(m, v);
    const has = exists(`${d}/index.html`);
    if (has) ready++;
    const picture = has && exists(`${d}/preview.webp`)
      ? `<img src="${d}/preview.webp" width="640" height="1600" loading="lazy" alt="Превью: ${esc(m.name)}, ${esc(v.label.toLowerCase())}">`
      : `<span class="tile-wait">ещё варится</span>`;
    const body = `
            <span class="tile-body">
              <span class="tile-name">${esc(m.name)}</span>
              <span class="tile-meta"><span>${esc(m.vendor)}</span><span>вкус «${esc(m.flavor)}»</span></span>
              <span class="tile-foot"><span class="tile-variant">${esc(v.label)}</span><span class="tile-size">${has ? `${kb(`${d}/index.html`)} КБ` : "в очереди"}</span></span>
            </span>`;
    const style = `--field:${m.color};--field-ink:${m.ink}`;
    const inner = `<span class="tile-window">${picture}</span>${body}`;
    return has
      ? `<li class="tile" style="${style}"><a href="${d}/" class="tile-link">${inner}</a></li>`
      : `<li class="tile is-cooking" style="${style}"><span class="tile-link">${inner}</span></li>`;
  }),
);

// --- Сравнение: модели, у которых готовы оба варианта и снято превью.
const pairs = models
  .filter((m) => variantsOf(m).length === registry.variants.length)
  .filter((m) => registry.variants.every((v) => exists(`${dir(m, v)}/preview.webp`)))
  .map((m) => ({ id: m.id, name: m.name, color: m.color, ink: m.ink, raw: `${dir(m, registry.variants[0])}/`, skills: `${dir(m, registry.variants[1])}/` }));
const compare = pairs.length
  ? `<div class="compare" data-compare>
        <div class="compare-pick" role="group" aria-label="Модель">
          ${pairs.map((p, i) => `<button type="button" class="chip" data-pair="${p.id}" aria-pressed="${i === 0}" style="--field:${p.color};--field-ink:${p.ink}">${esc(p.name)}</button>`).join("\n          ")}
        </div>
        <figure class="compare-frame">
          <img class="compare-raw" src="${pairs[0].raw}preview.webp" width="640" height="800" alt="Без скиллов: ${esc(pairs[0].name)}">
          <img class="compare-skills" src="${pairs[0].skills}preview.webp" width="640" height="800" alt="Со скиллами: ${esc(pairs[0].name)}">
          <figcaption><span>Без скиллов</span><span>Со скиллами</span></figcaption>
        </figure>
        <label class="compare-range"><span class="sr-only">Граница между вариантами</span><input type="range" min="0" max="100" value="50"></label>
        <script type="application/json" id="pairs">${JSON.stringify(pairs)}</script>
      </div>`
  : `<p class="compare-empty">Как только у какой-нибудь модели сварятся оба варианта, здесь можно будет двигать границу между ними.</p>`;

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
    .replace("{{COMPARE}}", compare)
    .replaceAll("{{READY}}", String(ready))
    .replaceAll("{{TOTAL}}", String(total))
    .replaceAll("{{MODELS}}", String(models.length))
    .replaceAll("{{VENDORS}}", esc(vendors.join(", ")))
    .replaceAll("{{REPO}}", `https://github.com/${repo}`),
);

for (const f of new Bun.Glob("slops/*/*/*").scanSync(root)) await Bun.write(join(dist, f), Bun.file(join(root, f)));
for (const [i, v] of registry.variants.entries()) await Bun.write(join(dist, "prompts", `${v.id}.txt`), clean(prompts[i]));
await Bun.write(join(dist, "prompts", "slop-skills.md"), bundle);

console.log(`Bun ${Bun.version} · слопов: ${ready}/${total} · пар для сравнения: ${pairs.length} · бандл скиллов: ${(bundle.length / 1024).toFixed(0)} КБ → dist/`);
