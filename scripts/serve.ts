// Локальный просмотр dist/ так же, как на GitHub Pages (папка → index.html).
// Пересобирает сайт при изменениях в site/, slops/, prompts/.
import { watch } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const dist = join(root, "dist");
const port = Number(process.env.PORT ?? 3000);

let timer: Timer | undefined;
const rebuild = () => {
  clearTimeout(timer);
  timer = setTimeout(() => Bun.spawn(["bun", join(root, "scripts/build.ts")], { stdout: "inherit", stderr: "inherit" }), 150);
};
for (const dir of ["site", "slops", "prompts"]) watch(join(root, dir), { recursive: true }, rebuild);

const server = Bun.serve({
  port,
  async fetch(req) {
    const path = decodeURIComponent(new URL(req.url).pathname);
    if (path.includes("..")) return new Response("Bad request", { status: 400 });
    if (!path.endsWith("/") && !path.split("/").pop()!.includes(".")) return Response.redirect(path + "/", 301);
    const file = Bun.file(join(dist, path.endsWith("/") ? path + "index.html" : path));
    return (await file.exists()) ? new Response(file) : new Response("Not found", { status: 404 });
  },
});
console.log(`${server.url} · пересборка при изменениях`);
