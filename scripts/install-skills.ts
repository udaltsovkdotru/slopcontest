// Ставит дизайн-скиллы локально в .claude/skills (папка в .gitignore) через Bun Shell.
// Версии зафиксированы коммитами; в репо лежат только файлы, которые идут в промпты (prompts/skills).
import { $ } from "bun";
import { join } from "node:path";
import { tmpdir } from "node:os";

const root = join(import.meta.dir, "..");
const dest = join(root, ".claude/skills");
const tmp = join(tmpdir(), `slop-skills-${Date.now()}`);

const sources = [
  { repo: "anthropics/skills", commit: "dbd4588f9e1033efb41dad4bef2f7947c8993d44", from: "skills/frontend-design", to: "frontend-design" },
  { repo: "pbakaus/impeccable", commit: "2f98774f86bc05563876643db37e6c37c322850f", from: ".claude/skills/impeccable", to: "impeccable", license: "LICENSE" },
  { repo: "Leonxlnx/taste-skill", commit: "c924fad1a79c7d70a04bcc8c415b593e9928ad8a", from: "skills/taste-skill", to: "taste-skill", license: "LICENSE" },
  { repo: "LottieFiles/motion-design-skill", commit: "f9a8a041b85185ee4881b3471d3415e939aac772", from: "skills/motion-design", to: "motion-design", license: "LICENSE" },
];

try {
  await $`mkdir -p ${dest}`;
  for (const s of sources) {
    const dir = join(tmp, s.repo);
    await $`git init -q ${dir}`;
    await $`git -C ${dir} fetch -q --depth 1 https://github.com/${s.repo}.git ${s.commit}`;
    await $`git -C ${dir} checkout -q FETCH_HEAD`;
    await $`rm -rf ${join(dest, s.to)}`;
    await $`cp -R ${join(dir, s.from)} ${join(dest, s.to)}`;
    if (s.license) await $`cp ${join(dir, s.license)} ${join(dest, s.to, "LICENSE")}`;
    console.log(`✓ ${s.to} ← ${s.repo}@${s.commit.slice(0, 7)}`);
  }
} finally {
  await $`rm -rf ${tmp}`;
}
