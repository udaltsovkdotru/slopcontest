// Всё, что работает без JS, работает и без него: ссылки «Скачать», обе картинки сравнения рядом.

// Копирование промпта в буфер.
const status = document.querySelector(".kit-status");
for (const btn of document.querySelectorAll("[data-copy]")) {
  btn.addEventListener("click", async () => {
    const label = btn.textContent;
    try {
      const res = await fetch(btn.dataset.copy);
      if (!res.ok) throw new Error(String(res.status));
      await navigator.clipboard.writeText(await res.text());
      btn.textContent = "Скопировано";
      status.textContent = "Промпт в буфере. Вставляй в новый чат.";
    } catch {
      status.textContent = "Скопировать не вышло, скачай файл рядом.";
    }
    setTimeout(() => (btn.textContent = label), 1800);
  });
}

// Сравнение «без скиллов / со скиллами»: граница двигается ползунком, пальцем или мышью по картинке.
const compare = document.querySelector("[data-compare]");
if (compare) {
  const pairs = JSON.parse(document.getElementById("pairs").textContent);
  const frame = compare.querySelector(".compare-frame");
  const range = compare.querySelector("input[type=range]");
  const raw = compare.querySelector(".compare-raw");
  const skills = compare.querySelector(".compare-skills");
  const set = (v) => frame.style.setProperty("--pos", `${v}%`);
  range.addEventListener("input", () => set(range.value));

  let dragging = false;
  const fromPointer = (e) => {
    const r = frame.getBoundingClientRect();
    range.value = Math.round(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
    set(range.value);
  };
  frame.addEventListener("pointerdown", (e) => { dragging = true; frame.setPointerCapture(e.pointerId); fromPointer(e); });
  frame.addEventListener("pointermove", (e) => dragging && fromPointer(e));
  frame.addEventListener("pointerup", () => (dragging = false));
  frame.style.touchAction = "pan-y";

  for (const chip of compare.querySelectorAll("[data-pair]")) {
    chip.addEventListener("click", () => {
      const p = pairs.find((x) => x.id === chip.dataset.pair);
      raw.src = `${p.raw}preview.webp`;
      raw.alt = `Без скиллов: ${p.name}`;
      skills.src = `${p.skills}preview.webp`;
      skills.alt = `Со скиллами: ${p.name}`;
      for (const c of compare.querySelectorAll("[data-pair]")) c.setAttribute("aria-pressed", String(c === chip));
    });
  }
}

// Часы на плитке подвала.
const clock = document.querySelector("[data-clock]");
if (clock) {
  const fmt = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", hour: "2-digit", minute: "2-digit" });
  const tick = () => (clock.textContent = `сейчас ${fmt.format(new Date())}`);
  tick();
  setInterval(tick, 15000);
}

// Проявление глав: части секции приходят по очереди, один раз.
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const groups = [
    ...document.querySelectorAll(".chapter-head, .recipe h2, .tile, .stages li, .kit li, .rows li"),
  ];
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  for (const el of groups) {
    const siblings = [...el.parentElement.children];
    el.style.setProperty("--i", String(siblings.indexOf(el) % 4));
    el.classList.add("will-reveal");
    io.observe(el);
  }
  const frame = document.querySelector(".compare-frame");
  if (frame) {
    frame.classList.add("will-open");
    io.observe(frame);
  }
}

// Тема: системная по умолчанию, кнопка переключает и запоминает выбор.
const themeBtn = document.querySelector("[data-theme-toggle]");
if (themeBtn) {
  const root = document.documentElement;
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const label = () => themeBtn.setAttribute("aria-label", isDark() ? "Включить светлую тему" : "Включить тёмную тему");
  label();
  themeBtn.addEventListener("click", () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
    document.querySelector('meta[name="theme-color"]').content = isDark() ? "#04130E" : "#00402E";
    label();
  });
}
