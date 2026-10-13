// Превью слопов для витрины: Bun.WebView (Chrome) снимает два первых экрана, Bun.Image жмёт в webp.
// bun run shots                      — все слопы без превью
// bun run shots --force              — переснять все
// bun run shots gemini-3.1-pro/raw   — только указанные
// bun run shots --original           — заодно снять prodcontest.com в site/original.webp
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

const VIEW = { width: 1280, height: 1600 }; // окно 4:5, как плитка витрины
const STRIP = 3200; // снимаем два экрана: карточка при наведении «прокручивает» превью
const OUT = { width: 640, height: 1600 };
const chrome = process.env.BUN_CHROME_PATH ?? "/opt/pw-browsers/chromium";

const server = Bun.serve({
  port: 0,
  async fetch(req) {
    const path = decodeURIComponent(new URL(req.url).pathname);
    const file = Bun.file(join(root, path.endsWith("/") ? path + "index.html" : path));
    return (await file.exists()) ? new Response(file) : new Response("Not found", { status: 404 });
  },
});

async function shoot(url: string, out: string) {
  const view = new Bun.WebView({
    ...VIEW,
    backend: { type: "chrome", path: chrome, argv: ["--no-sandbox", "--hide-scrollbars"] },
  } as any);
  try {
    await view.navigate(url);
    await view.evaluate("document.fonts && document.fonts.ready");
    // Прокручиваем второй экран, чтобы сработали появления по скроллу, и возвращаемся наверх.
    await view.evaluate(`(async () => {
      for (const y of [800, ${VIEW.height}, ${STRIP - VIEW.height}]) { scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 400)); }
      scrollTo({ top: 0, behavior: "instant" });
    })()`);
    await Bun.sleep(2500); // входные анимации первого экрана
    const shot: any = await view.cdp("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: VIEW.width, height: STRIP, scale: 1 },
    });
    const png = Buffer.from(shot.data, "base64");
    const webp = await new Bun.Image(png).resize(OUT.width, OUT.height).webp({ quality: 78 }).bytes();
    await Bun.write(out, webp);
    console.log(`✓ ${out.replace(root + "/", "")} (${(webp.length / 1024).toFixed(0)} КБ)`);
  } finally {
    view.close();
  }
}

const targets = [...new Bun.Glob("slops/*/*/index.html").scanSync(root)]
  .map((f) => f.replace(/\/index\.html$/, ""))
  .filter((dir) => !only.length || only.includes(dir.replace(/^slops\//, "")))
  .filter((dir) => force || only.length || !Bun.file(join(root, dir, "preview.webp")).size);

for (const dir of targets) await shoot(`${server.url}${dir}/`, join(root, dir, "preview.webp"));
if (args.includes("--original")) await shoot("https://prodcontest.com/", join(root, "site/original.webp"));

if (!targets.length && !args.includes("--original")) console.log("Нечего снимать — все превью на месте (--force, чтобы переснять)");
server.stop(true);
