# slopcontest

ПРОООДОВЦЫ, посмотрим, какая ЛЛМка слопит лучше всех. Слоп на любой вкус и цвет!

Нейросети разных компаний (Google Gemini, Anthropic Claude, Xiaomi MiMo и дальше больше) переделывают лендинг олимпиады PROD ([prodcontest.com](https://prodcontest.com)) — каждая дважды: голым промптом и с дизайн-скиллами. Результат публикуется как есть.

## Структура

```
site/              главная (шаблон: {{MENU}} и счётчики подставляет билд)
slops/models.json  модели и варианты
slops/<model>/<variant>/index.html   слоп модели
prompts/           промпты и файлы скиллов для вложения → prompts/README.md
scripts/build.ts   сборка в dist/ (Bun.build, Bun.Glob, Bun.$)
scripts/shots.ts   превью слопов (Bun.WebView + Bun.Image → webp)
```

## Команды

Нужен Bun 1.4.0+ (версия для CI — в `.bun-version`).

```sh
bun run build           # dist/
bun run dev             # сборка + http://localhost:3000, пересборка при изменениях
bun run shots           # превью новых слопов (нужен Chromium: BUN_CHROME_PATH)
bun run skills:install  # дизайн-скиллы локально в .claude/skills (не коммитятся)
```

## Деплой

`.github/workflows/deploy.yml`: пуш в `master` → сборка Bun → GitHub Pages. На PR только проверяется сборка.
Один раз включить в репозитории: Settings → Pages → Source: **GitHub Actions**.
