// Собирает dist/ для GitHub Pages: главная, слопы моделей, промпты и бандл скиллов.
import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";

const MIN_BUN = ">=1.4.0";
if (!Bun.semver.satisfies(Bun.version, MIN_BUN)) {
  console.error(`Нужен Bun ${MIN_BUN}, а запущен ${Bun.version}`);
  process.exit(1);
}

const root = join(import.meta.dir, "..");
const dist = join(root, "dist");
const read = (p: string) => Bun.file(join(root, p)).text();

type Variant = { id: string; label: string; prompt: string };
type Model = { id: string; name: string; vendor: string; flavor: string; color: string; ink: string };
const registry: { variants: Variant[]; models: Model[] } = JSON.parse(await read("slops/models.json"));

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

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
const onDisk = (await readdir(skillsDir, { recursive: true })).filter((f) => f.endsWith(".md")).map((f) => f.replaceAll("\\", "/"));
const unused = onDisk.filter((f) => !SKILL_FILES.includes(f));
if (unused.length) throw new Error(`В prompts/skills лежат файлы вне бандла: ${unused.join(", ")}`);

let bundle =
  "# slop-skills.md\n\n" +
  "Дизайн-скиллы для генерации лендинга в чате. Источники: anthropics/skills (frontend-design, Apache-2.0), " +
  "pbakaus/impeccable (Apache-2.0), Leonxlnx/taste-skill (MIT), LottieFiles/motion-design-skill (MIT).\n" +
  "Ссылки на скрипты и файлы внутри скиллов относятся к их исходным репозиториям; в чате они недоступны.\n";
for (const f of SKILL_FILES) bundle += `\n\n<!-- ===== FILE: ${f} ===== -->\n\n` + (await Bun.file(join(skillsDir, f)).text()).trim() + "\n";

// --- Меню слопа на главной.
const slopPath = (m: Model, v: Variant) => `slops/${m.id}/${v.id}/index.html`;
let ready = 0;
const menu = registry.models
  .map((m) => {
    const links = registry.variants
      .map((v) => {
        if (existsSync(join(root, slopPath(m, v)))) {
          ready++;
          return `<a class="pick" href="slops/${m.id}/${v.id}/">${esc(v.label)}</a>`;
        }
        return `<span class="pick is-cooking" aria-disabled="true">${esc(v.label)}<small>ещё варится</small></span>`;
      })
      .join("\n          ");
    return `
      <li class="flavor" style="--field:${m.color};--field-ink:${m.ink}">
        <div class="flavor-name">
          <h3>${esc(m.name)}</h3>
          <p>Вкус «${esc(m.flavor)}»</p>
        </div>
        <div class="flavor-picks">
          ${links}
        </div>
      </li>`;
  })
  .join("");
const total = registry.models.length * registry.variants.length;

// --- Сборка.
await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "prompts"), { recursive: true });

await cp(join(root, "site"), dist, { recursive: true });
const html = (await read("site/index.html"))
  .replace("{{MENU}}", menu)
  .replace("{{READY}}", String(ready))
  .replace("{{TOTAL}}", String(total))
  .replace("{{MODELS}}", String(registry.models.length));
await writeFile(join(dist, "index.html"), html);

if (existsSync(join(root, "slops"))) {
  await cp(join(root, "slops"), join(dist, "slops"), {
    recursive: true,
    filter: (src) => relative(join(root, "slops"), src) !== "models.json",
  });
}
for (const [i, v] of registry.variants.entries()) await writeFile(join(dist, "prompts", `${v.id}.txt`), clean(prompts[i]));
await writeFile(join(dist, "prompts", "slop-skills.md"), bundle);

console.log(`Bun ${Bun.version} · готово слопов: ${ready}/${total} · бандл скиллов: ${(bundle.length / 1024).toFixed(0)} КБ → dist/`);
