# Промпты

Промпт собирается из трёх частей:

| Часть | Файл | Что это |
| --- | --- | --- |
| Ядро | [`core.md`](core.md) | Мета-промпт в XML-блоках: роль, цель, формат ответа, требования, четыре версии сайта, бренд, весь контент, процесс, самопроверка, повтор задачи в конце. Одно на всех — поэтому сравнение честное. |
| Скиллы | `<attached_skills>` (генерируется) | Для вариантов со скиллами: какой файл приложен и как применять его в чате. |
| Приложение модели | [`appendix/`](appendix) | Короткие заметки под семейство: Gemini, Claude, MiMo, Qwen, другие. Только про то, как читать задание и отвечать, без дизайн-советов. |

Варианты (по 6 на модель): без скиллов, frontend-design, motion-design, impeccable, taste-skill v2, все скиллы.

Готовые тексты собираются в `dist/prompts/<семейство>/<вариант>.txt`, вложения — `dist/prompts/slop-<вариант>.md`. На сайте в «Рецепте» есть кнопки «Копировать промпт» с выбором семейства.

## Откуда приложения

- Gemini: [Google, prompting strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies) — прямые инструкции, единая разметка, инструкции после длинного контекста, явный запрос полноты (по умолчанию модель краткая), текущий год в поисковых запросах.
- Claude: [Anthropic, prompting for frontend aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics) и [Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills) — XML-теги, явность, «не сдерживайся», дизайн-знания вынесены в скиллы, а не в системный промпт.
- Qwen: официального гайда по Qwen3-Max не нашлось; по карточкам открытых Qwen3 — режим размышлений по умолчанию и риск бесконечных повторов, поэтому просим не дублировать блоки.
- MiMo: официального гайда по промптингу не нашлось — общие правила для длинного контекста и агентных моделей.

## Что входит во вложения

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
3. Взять промпт своего семейства: `dist/prompts/<семейство>/<вариант>.txt`.
4. Для варианта со скиллом приложить его файл `slop-<вариант>.md` и отправить.
5. Если код оборвался — написать `продолжай` и склеить куски. Больше ничего не дописывать и не исправлять.
6. Сохранить HTML как `slops/<модель>/<вариант>/index.html` (варианты: `raw`, `frontend-design`, `motion-design`, `impeccable`, `taste`, `skills`), id моделей — в `slops/models.json`.

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
| Qwen 3.8 Max | `slops/qwen-3.8-max/` |
| Qwen 3.8 Omni Flash | `slops/qwen-3.8-omni-flash/` |

После того как положил HTML — `bun run shots`, чтобы снять превью для витрины.

Рядом кладём `notes.md`: дата, сколько раз писали «продолжай», ходила ли модель в поиск.
