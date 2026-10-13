// Копирование промпта в буфер. Без JS остаются ссылки «Скачать».
const status = document.querySelector(".kit-status");

for (const btn of document.querySelectorAll("[data-copy]")) {
  btn.addEventListener("click", async () => {
    const label = btn.textContent;
    try {
      const res = await fetch(btn.dataset.copy);
      if (!res.ok) throw new Error(res.status);
      await navigator.clipboard.writeText(await res.text());
      btn.textContent = "Скопировано";
      status.textContent = "Промпт в буфере. Вставляй в новый чат.";
    } catch {
      status.textContent = "Скопировать не вышло — скачай файл рядом.";
    }
    setTimeout(() => (btn.textContent = label), 1800);
  });
}

// Шарики в заголовке падают один раз; секции проявляются при первом показе.
const reveal = document.querySelectorAll(".flavor, .recipe-text p, .kit li, .menu-head");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  reveal.forEach((el, i) => {
    el.style.setProperty("--i", i % 4);
    el.classList.add("will-reveal");
    io.observe(el);
  });
}
