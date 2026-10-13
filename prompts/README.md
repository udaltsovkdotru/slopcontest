# Промпты

Два варианта на каждую модель. Бриф (всё, что есть на prodcontest.com) в них одинаковый — билд падает, если он разъедется.

| Файл | Что это |
| --- | --- |
| [`raw.md`](raw.md) | Промпт без скиллов |
| [`skills.md`](skills.md) | Тот же промпт + блок «Дизайн-скиллы» |
| [`skills/`](skills) | Файлы скиллов, которые идут в бандл `slop-skills.md` |

Готовые к вставке версии (без служебных `<!-- BRIEF -->`-меток) собираются в `dist/prompts/`, и на сайте есть кнопки «Копировать» / «Скачать»:

- `prompts/raw.txt` — промпт без скиллов
- `prompts/skills.txt` — промпт со скиллами
- `prompts/slop-skills.md` — вложение для варианта со скиллами (~150 КБ)

## Что входит в slop-skills.md

| Скилл | Источник | Файлы |
| --- | --- | --- |
| frontend-design | [anthropics/skills](https://github.com/anthropics/skills) | `SKILL.md` |
| impeccable | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | `SKILL.md`, `craft-floor`, `mode-persuade`, `adapt` |
| taste-skill | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | `SKILL.md`, `tells`, `copy`, `type`, `colour`, `layout`, `motion` |
| motion-design | [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill) | `SKILL.md`, `timing-easing-tables`, `quality-checklist`, `entrance-exit`, `ambient-continuous` |

Брались только тексты: скрипты (`draw.mjs`, `inspect.mjs`, `impeccable context`) в чате не запустить, промпт прямо говорит модели пропускать такие шаги. Порядок файлов в бандле — `SKILL_FILES` в `scripts/build.ts`.

## Как прогонять в чате

1. Новый чат на каждую попытку. Без Gems, без сохранённых инструкций и истории.
2. Выбрать модель. Поиск не выключать — модели разрешено сходить на prodcontest.com.
3. Без скиллов: вставить `raw.txt` и отправить.
4. Со скиллами: приложить `slop-skills.md`, вставить `skills.txt` и отправить.
5. Если код оборвался — написать `продолжай` и склеить куски. Больше ничего не дописывать и не исправлять.
6. Сохранить HTML как `slops/<модель>/<вариант>/index.html` (варианты: `raw`, `skills`), id моделей — в `slops/models.json`.

| Модель | Папка |
| --- | --- |
| Gemini Flash Lite 3.5 | `slops/gemini-3.5-flash-lite/` |
| Gemini Flash 3.8 | `slops/gemini-3.8-flash/` |
| Gemini Pro 3.1 | `slops/gemini-3.1-pro/` |
| Gemini Argon 4 | `slops/gemini-argon-4/` |
| Claude Haiku 5.5 | `slops/claude-haiku-5.5/` |
| Claude Sonnet 5.5 | `slops/claude-sonnet-5.5/` |
| Claude Opus 5.5 | `slops/claude-opus-5.5/` |
| MiMo V2.6 Pro | `slops/mimo-v2.6-pro/` |

После того как положил HTML — `bun run shots`, чтобы снять превью для витрины.

Рядом кладём `notes.md`: дата, сколько раз писали «продолжай», ходила ли модель в поиск.
