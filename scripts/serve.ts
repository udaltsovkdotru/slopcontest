// Локальный просмотр dist/ так же, как на GitHub Pages (папка → index.html).
import { join } from "node:path";

const dist = join(import.meta.dir, "..", "dist");
const port = Number(process.env.PORT ?? 3000);

Bun.serve({
  port,
  async fetch(req) {
    let path = decodeURIComponent(new URL(req.url).pathname);
    if (path.includes("..")) return new Response("Bad request", { status: 400 });
    if (path.endsWith("/")) path += "index.html";
    let file = Bun.file(join(dist, path));
    if (!(await file.exists())) file = Bun.file(join(dist, path, "index.html"));
    return (await file.exists()) ? new Response(file) : new Response("Not found", { status: 404 });
  },
});
console.log(`http://localhost:${port}`);
