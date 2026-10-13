Ты — арт-директор и фронтенд-разработчик в одном лице. Сделай свою версию лендинга олимпиады PROD (оригинал — https://prodcontest.com). Это не копия оригинала: придумай собственный визуальный образ, который мог бы выиграть конкурс на редизайн, но сохрани все факты и весь смысл. Аудитория — школьники 8–11 классов и их родители: страница должна зажечь подростка и за минуту объяснить родителю, что это, когда и что даёт.

<!-- BRIEF:START -->
## Формат ответа

- Ответ — ровно один блок кода ```html с полным файлом от `<!doctype html>` до `</html>`. Никаких пояснений до или после блока.
- Всё в одном файле: CSS в `<style>`, JS в `<script>`. Без сборки, без фреймворков, без внешних JS-библиотек. Ориентир по размеру — 80–250 КБ (четыре версии текста); не раздувай файл base64-картинками. Тексты версий удобно хранить в одном JS-объекте или в четырёх `<template>`, а разметку собирать из них.
- Из внешних ресурсов разрешены только шрифты Google Fonts (обязательно с кириллицей). Внешние картинки, видео и иконки не подключай — рисуй их сам: inline SVG, CSS. Фавиконка — inline SVG через data URI.
- Первой строкой внутри `<head>` оставь HTML-комментарий до 10 строк: концепция (одно предложение — какая идея из мира олимпиады стала визуальным приёмом), палитра (hex), шрифты, главная анимация, интерактивная фишка.
- Если ответ обрывается по длине, на сообщение «продолжай» продолжи код ровно с места обрыва, без повторов.
- Ничего не спрашивай, все решения принимай сам.

## Требования

- Сайт двуязычный и для двух регионов — см. раздел «Четыре версии в одном файле». Версия по умолчанию — «Россия и СНГ» на русском. Типографика по-русски: кавычки «ёлочки», длинное тире «—», неразрывный пробел после коротких предлогов и в «120&nbsp;минут», «8&nbsp;000».
- Адаптивность: от 360 px (телефон) до 1920 px (десктоп). Телефонная версия — отдельная продуманная композиция, а не сжатый десктоп: нет горизонтального скролла, есть меню (кнопка с `aria-expanded`), всё нажимается пальцем (цели от 44 px), длинная таблица бонусов читается без зума.
- Доступность: семантическая разметка (`header`, `nav`, `main`, `section` с заголовками, `footer`), один `h1`, видимый фокус с клавиатуры, alt/aria где нужно, контраст текста не ниже WCAG AA, `prefers-reduced-motion` уважается, контент виден даже без JS.
- Навигация ведёт на якоря реальных секций: `#about`, `#bonuses`, `#stages`, `#materials`, `#results`, `#stories`, `#hackathons`, `#faq`, `#contacts`.
- Интерактив, который реально помогает: переключатель треков (бэкенд / фронтенд / мобильная / MLOps) с описанием и материалами выбранного трека; FAQ на `<details>`; таймлайн этапов, где видно, какой месяц сейчас. Плюс одна фишка, которую запомнят (например, ожившая Лотти) — она не мешает читать и работает на телефоне.
- Движение: один главный момент на первом экране и сдержанные появления секций; только `transform` и `opacity`, без тяжёлых эффектов на скролле.
- Главная кнопка «Подписаться на уведомления» видна на первом экране и повторяется в конце страницы.
- Все ссылки рабочие и ведут туда, куда указано ниже, внешние — с `target="_blank" rel="noopener"`. Никакого lorem ipsum и выдуманных фактов: даты, бонусы, цифры, имена, цитаты и отзывы — только из этого брифа.
- Мета-теги: `title`, `description`, Open Graph, `theme-color`.
- Можно пользоваться поиском, чтобы уточнить что-то на prodcontest.com. Если найденное противоречит брифу — верь брифу.

## Четыре версии в одном файле — это обязательно

У оригинала четыре версии: «Россия и СНГ» и «Для других стран», каждая на русском и на английском. Ты делаешь все четыре в этом же HTML-файле.

- Два переключателя в шапке: регион («Россия и СНГ» / «Для других стран»; по-английски «Russia & CIS» / «For other countries») и язык (Ru / En). Они меняют контент прямо на странице, без перезагрузки. Никаких ссылок на prodcontest.com/worldwide, /eng и /eng/worldwide — все четыре версии живут в твоём файле.
- Каждая из четырёх комбинаций полная: все секции, таблица бонусов, этапы, FAQ, ссылки — с текстами именно этой версии из брифа ниже. Не переводи сам то, что дано в брифе, и не смешивай версии: в версии «Для других стран» Т-Банк в историях не называется, гранты другие, есть даты, виза и программа русского языка.
- При переключении меняются `<html lang>`, `<title>` и `description`; выбор сохраняется в `localStorage` и в адресе (`#ru`, `#en`, `#world-ru`, `#world-en`), чтобы ссылкой можно было поделиться.
- Без JS видна версия по умолчанию («Россия и СНГ», русский).
- Переключение аккуратное: без мигания и прыжков страницы, фокус не теряется.

## Перед отправкой проверь себя

- Все четыре версии переключаются и каждая полная; ни один переключатель не уводит на другой сайт.

- Все секции из раздела «Контент» на месте, все ссылки из брифа присутствуют.
- На 360 px ничего не вылезает за экран, на 1920 px нет пустых полей на полэкрана.
- Без JS страница читается целиком; с `prefers-reduced-motion` ничего не прыгает.
- Файл закрыт `</html>`, в консоли не будет ошибок.

## Бренд оригинала (ориентир, не догма)

- Цвета оригинала: тёмно-зелёный #00402E и #003324, жёлтый акцент #FFDD2D, серо-зелёный #B2C6C0, почти чёрный #141414, белый #FFFFFF. Шрифт оригинала — Inter.
- Символ олимпиады — аксолотль по имени Лотти, живёт в «Москвариуме».
- Организаторы: группа компаний «Т-Технологии» (Т-Банк) и Центральный университет.

## Контент

### Шапка и первый экран
- Название: Олимпиада PROD — Международная олимпиада по промышленной разработке.
- Подзаголовок: «Состязание с практикой по программированию для школьников из любой точки мира». Слоган: «Попробуй себя в роли разработчика».
- Участие бесплатное. Переключатели версии сайта «Россия и СНГ» / «Для других стран» и языка Ru / En — работают внутри страницы (см. «Четыре версии в одном файле»).
- Главная кнопка: «Подписаться на уведомления» → https://form.centraluniversity.ru/prod_pre_reg/
- Навигация: Об олимпиаде, Бонусы победителям, Сроки и этапы, Материалы для подготовки, Результаты, Как это было раньше, Хакатоны.

### Об олимпиаде
- Какой формат: три этапа по трекам — фронтенд, бэкенд, мобильная разработка и MLOps-инжиниринг. Нужно решить кейсы по выбранному направлению и создать проект вместе с командой.
- Что такое промышленная разработка: создание программ и технологий для миллионов пользователей. Такие продукты делают большие команды специалистов, чтобы всё работало быстро, безопасно и без ошибок.
- Кому будет интересно: школьникам 8–11 классов, которые хотят решать прикладные задачи. Увлекаешься кодингом и созданием приложений — это плюс.
- Почему стоит участвовать: создание ИТ-систем, автоматизация процессов и разработка приложений; настоящие задачи и сложные вызовы — такие же, как у специалистов крупных технологических компаний.
- Какой уровень подготовки нужен: для старта хватит школьной программы по информатике. Даже новичков на всех этапах поддерживают менторы — эксперты из Т-Банка, Центрального университета и НИУ ВШЭ.
- Возможности, которые открывает PROD: попробуешь себя в роли разработчика и с командой создашь приложение или сервис; посмотришь изнутри, как работают специалисты бигтеха, и познакомишься с экспертами индустрии; окажешься в комьюнити единомышленников и продолжишь общение после олимпиады.

### Бонусы победителям
Кратко: брендированный мерч; упрощённый отбор на стажировку в Т-Банке; дополнительные баллы к ЕГЭ при поступлении на программы факультета компьютерных наук НИУ ВШЭ; фаст-трек и грант на обучение в Центральном университете до 100%; скидки на совместный бакалавриат НИУ ВШЭ и Центрального университета.

Полная таблица (класс — статус — учебное заведение — бонус):
- 10–11 — победители заключительного этапа — Центральный университет — фаст-трек для поступления, грант 90% на весь период обучения.
- 10–11 — призёры заключительного этапа — Центральный университет — фаст-трек для поступления, грант от 60% на весь период обучения.
- 10–11 — участники заключительного этапа — Центральный университет — фаст-трек для поступления, грант от 40% на весь период обучения.
- 9–11 — победители, призёры и участники заключительного этапа — НИУ ВШЭ и Центральный университет — возможность получить скидку до 90% на совместный бакалавриат «Дизайн и разработка информационных продуктов».
- 10–11 — победители и призёры заключительного этапа — НИУ ВШЭ — дополнительные баллы к ЕГЭ при поступлении на профильные программы.
- Все классы — победители и призёры заключительного этапа — упрощённый отбор на стажировку в Т-Банке.
- Все классы — победители и призёры заключительного этапа — возможность в следующем году пропустить отборочные этапы олимпиады.
- 8 класс — победители и призёры заключительного этапа — Школа № 57 в Москве — возможность без отбора поступить в Т-Класс (класс с углублённым изучением программирования).
- Все классы — участники заключительного этапа — брендированный мерч олимпиады PROD.

Сноски: упрощённый отбор — это пропуск этапа экзаменов при отборе на стажировку по направлению, в котором участник стал победителем или призёром; гарантия трудоустройства не предоставляется. Баллы, гранты и скидки — в соответствии с правилами приёма и положениями НИУ ВШЭ и Центрального университета.

### Сроки и этапы
Все этапы онлайн, кроме заключительного командного тура — он очный, в Москве (площадка в Московской области).
1. Ноябрь — Регистрация. Оставь заявку через форму.
2. Декабрь — Первый отборочный этап. Тест на знание основ математики и программирования, 120 минут.
3. Январь — Второй отборочный этап. Выбери один или несколько треков и реши кейсы. Для подготовки — примеры заданий прошлого года и записи вебинаров в телеграм-канале.
4. Февраль — Заключительный этап, индивидуальный тур. Разработай небольшой проект по заданию олимпиады; в помощь — вебинары разработчиков Т-Банка, экспертов НИУ ВШЭ и Центрального университета.
5. Март — Заключительный этап, командный тур. Защита проектов: ИТ-решение вместе с командой и менторами, семинары, воркшопы. Дорога до Москвы — за свой счёт, питание и проживание — от организаторов.

Треки:
- Бэкенд — невидимая, но важная часть приложений: хранение данных, обработка запросов, расчёты.
- Фронтенд — красивые и удобные интерфейсы, всё, с чем взаимодействует пользователь.
- Мобильная разработка — приложения для телефонов: игры, сервисы и программы.
- MLOps-инжиниринг — обучение ИИ: алгоритмы и модели, которые ищут закономерности в данных и решают задачи бизнеса.

Кто может участвовать во втором этапе: победители и призёры первого этапа; победители прошедших хакатонов PROD; участники турнира «Решись!», набравшие 60 из 100 баллов за задачу по разработке; победители и призёры второго этапа прошлого года.

### Материалы для подготовки
- Примеры заданий с прошедших соревнований → https://prodcontest.com/materials/
- Демоверсия первого этапа → https://interview.tbank.ru/special/prod-demo, разбор решений демоверсии → https://cdn.tbank.ru/static/documents/a11903b7-df09-4e35-98c0-44e1ebb4a440.pdf
- Курсы и учебники по направлениям:
  - Бэкенд: Введение в базы данных, Программирование на Python, «PostgreSQL. Основы языка SQL» (Е. П. Моргунов, https://postgrespro.ru/education/books/sqlprimer), Программирование на Golang, Pro Git (https://git-scm.com/book/ru/v2).
  - Фронтенд: Современный учебник JavaScript (https://learn.javascript.ru/), Основы JavaScript (https://ru.hexlet.io/courses/js-basics), Основы современной вёрстки (https://ru.hexlet.io/courses/layout-designer-basics), Введение в Git (https://ru.hexlet.io/courses/intro_to_git), Pro Git.
  - Мобильная разработка: «Swift. Основы разработки приложений под iOS» (В. Усов), iOS App Development with Swift (https://www.coursera.org/specializations/app-development), Kotlin, Разработка Android-приложений на Kotlin, «Чистый код» (Р. Мартин), Android для начинающих (https://education.tbank.ru/school/basic/android/), iOS для начинающих (https://education.tbank.ru/school/basic/ios/).
  - MLOps-инжиниринг: Введение в машинное обучение, Открытый курс машинного обучения (https://github.com/Yorko/mlcourse.ai), DVC (Data Version Control), MLflow.
- Мастер-классы по подготовке ко второму отборочному этапу 2025 (https://vkvideo.ru/playlist/-223720604_2) и 2024 (https://vkvideo.ru/playlist/-223720604_1).

### Результаты
Результаты и проходные баллы отборочных этапов → https://prodcontest.com/results

### Как это было раньше — истории участников
За два года в олимпиаде поучаствовали более 8 000 школьников из 25 стран.
- Вячеслав Дорошенко, 18 лет, Ростов-на-Дону. Призёр PROD 2025: поступил в Центральный университет по гранту и прошёл упрощённый отбор на стажировку в Т-Банк. В команде FineDog стажёр-фронтендер: пишет фичи, создаёт интерфейсы, изучает RxJS и DI в Angular. Помогают навыки с олимпиады: гит, проектирование архитектуры, макеты, компоненты.
- Антон Пискорский, 19 лет, Москва. Призёр PROD 2024: грант в Центральном университете и стажировка в Т-Банке, после которой получил оффер. Теперь младший бэкенд-разработчик — создаёт LMS для Центрального университета и core-сервисы. Главное правило — не копить невыполненные задания и пробелы в материале.
- Михаил Потанин, 17 лет, Москва. В 17 лет стал стажёром-разработчиком в Т-Инвестициях, учится в Лицее НИУ ВШЭ. Сейчас android-разработчик в команде платформы Т-Инвестиций: оптимизация и рефакторинг кода.
- Станислав Гаврилин, 18 лет, Оренбург. Призёр PROD 2024, в 2025 вернулся на финал ментором. После года на программе «Дизайн и разработка информационных продуктов» прошёл упрощённый отбор в Т-Банк — стажёр-фронтендер в команде платформы запусков, делает фронтенд MVP.

### Хакатоны
Хакатоны PROD — возможность попробовать формат олимпиады в своём городе и создать прототип настоящего ИТ-продукта. Длятся три дня: проект с командой, образовательные интенсивы, общение с экспертами. Победителям — автопроход на второй отборочный этап. → https://prodcontest.com/hackathon/

### Частые вопросы
- Можно ли подать апелляцию? Да, на всех этапах, кроме командного тура заключительного этапа. Апелляция проходит в формате опроса, где участник обосновывает, почему его решение оценили неверно.
- Как проходит командный тур? Очный выезд в Московскую область: финалисты собираются в команды по 3–5 человек, несколько дней работают над кейсом и защищают проект.
- Кто может принять участие? Зарегистрироваться и пройти первый этап могут все желающие, независимо от возраста, места учёбы и страны. Со второго этапа — только школьники.
- Будет ли отбор для участия в первом этапе? Нет.
- Как определяются победители и призёры? По наибольшей сумме баллов за индивидуальный и командный туры заключительного этапа. Победителей — не более 8% участников заключительного этапа, победителей и призёров вместе — не более 25%.
- На каком языке проходит олимпиада? На русском и английском, язык выбирается при регистрации.
- Нужна ли виза? Зависит от страны (https://en.wikipedia.org/wiki/Visa_policy_of_Russia). Полную визовую поддержку не оказываем; при сложностях пишите на info@prodcontest.com.
- Оплатят ли перелёт? Нет. Организаторы оплачивают питание и проживание на весь командный тур; дорогу и дополнительные дни участник оплачивает сам.

### Организаторы и партнёры
- Группа компаний «Т-Технологии» — технологическая компания, развивает экосистему финансовых и лайфстайл-услуг; финтех-продуктами пользуются более 51 млн человек (Т-Банк, Т-Образование, Т-Бизнес, Т-Инвестиции и другие).
- Центральный университет — российский вуз нового типа со STEM-подходом, создан в партнёрстве с 60+ крупными компаниями; студенты учатся на настоящих бизнес-задачах.
- Партнёры: НИУ ВШЭ и его Факультет компьютерных наук (основан в 2014 году); «Антиплагиат» — его продукт CodeChecker проверяет уникальность кода на втором этапе; «Москвариум» — центр океанографии и морской биологии, более 12 000 водных обитателей, дом аксолотля Лотти.

### Комьюнити и контакты
- Телеграм: https://t.me/t_prod — полезные материалы, истории участников, ответы на вопросы, приглашения на мероприятия.
- Международный телеграм-канал (для участников из других стран): https://t.me/prod_olympiad
- ВКонтакте: https://vk.com/prod_olympiad
- Бот поддержки: https://t.me/t_prod_bot
- Почта: info@prodcontest.com, телефон: +7 (495) 628-03-45.
- Положение о Международной олимпиаде по промышленной разработке PROD → https://cdn.tbank.ru/static/documents/92a5f058-806a-4035-86ef-e35d88c08fc0.pdf
- Подвал: © 2026, Олимпиада PROD.

### Версия «Для других стран» (русский) — чем отличается от версии выше
Всё, что не перечислено, — как в версии «Россия и СНГ».
- Название на первом экране: «Международная олимпиада PROD для школьников». Подзаголовок тот же.
- В навигации добавляется «Виза» → https://prodcontest.com/viza. Под первым экраном — ссылка «Инструкция по подаче апелляции» → https://prodcontest.com/appeal/
- «Кому будет интересно» — «Школьникам 8–11 классов…» как выше.
- Сроки с точными датами: регистрация — 30 октября — 2 декабря; первый отборочный этап — 5–8 декабря; второй отборочный этап — 15–25 января; заключительный этап, индивидуальный тур — 12–24 февраля; заключительный этап, командный тур — 13–18 марта. Вебинары индивидуального тура — «от специалистов из бигтеха, экспертов НИУ ВШЭ и Центрального университета».
- Бонусы (кратко): брендированный мерч; специальные условия прохождения стажировки в одной из ведущих финтех-компаний России; фаст-трек и грант до 100% в Центральном университете; скидки на совместный бакалавриат НИУ ВШЭ и ЦУ; бесплатная подготовительная программа по русскому языку для иностранных студентов. Баллов ЕГЭ и Школы № 57 в этой версии нет.
- Таблица бонусов:
  - 10–11 — победители заключительного этапа — Центральный университет — фаст-трек для поступления, грант 100% на весь период обучения.
  - 10–11 — призёры заключительного этапа — Центральный университет — фаст-трек для поступления, грант от 75% на весь период обучения.
  - 10–11 — участники заключительного этапа — Центральный университет — фаст-трек для поступления, грант от 40% на весь период обучения.
  - 9–11 — победители и призёры заключительного этапа — НИУ ВШЭ и Центральный университет — возможность получить скидку до 90% на совместный бакалавриат «Дизайн и разработка информационных продуктов».
  - Все классы — победители и призёры заключительного этапа — специальные условия прохождения стажировки в одной из ведущих финтех-компаний России.
  - Все классы — победители и призёры заключительного этапа — НИУ ВШЭ — подготовительная программа по русскому языку для иностранных студентов; можно пройти с 18 лет.
  - Все классы — победители и призёры заключительного этапа — возможность в следующем году пропустить отборочные этапы олимпиады.
  - Все классы — участники заключительного этапа — брендированный мерч олимпиады PROD.
- Истории участников без названия банка: Вячеслав прошёл упрощённый отбор «на стажировку в финтех-компанию»; Антон — «на стажировку в одну из крупнейших финтех-компаний»; Михаил «стал стажёром-разработчиком уже в 17 лет, учится в лицее Вышки и работает в бигтехе», у него был «фаст-трек на стажировку в ведущую финтех-компанию», теперь он «android-разработчик в команде инвестиционной платформы»; Станислав «попал на стажировку в бигтех-компанию». Остальное в историях — как выше.
- FAQ, дополнительно:
  - Могу ли я поехать на командный тур с сопровождающим? Да. От одной страны может быть один сопровождающий для детей из этой страны. Организаторы оплатят ему питание и проживание на весь командный тур в Москве.
  - Что входит в бесплатную программу по русскому языку от НИУ ВШЭ? Победители и призёры могут бесплатно пройти годовую подготовительную программу по русскому языку: два семестра, очно в Москве. Подробнее → https://preparatory.hse.ru/en/ruscommercial
  - Нужна ли виза? Зависит от страны — смотри страницу о визе https://prodcontest.com/viza
- Организаторы: «Т-Технологии» — «технологическая компания, которая развивает экосистему финансовых и лайфстайл-услуг для частных лиц и бизнеса» (без цифры про 51 млн). Партнёры: НИУ ВШЭ, ФКН, «Антиплагиат» — «одна из ведущих российских систем проверки текстов на заимствования: около миллиона пользователей в месяц и более 300 тысяч проверок в день; технология CodeChecker проверяет уникальность кода на втором этапе». «Москвариума» в этой версии нет.
- Комьюнити: только международный телеграм-канал https://t.me/prod_olympiad (без ВКонтакте), почта info@prodcontest.com, телефон +7 (495) 628-03-45.
- Положение об олимпиаде → https://cdn.tbank.ru/static/documents/statute-about-olympiad-prod.pdf

### English version — «For other countries» (полный текст)
Use this text as is for the English «For other countries» version.
- Title: International PROD Olympiad for School Students. Subtitle: A hands-on programming competition for school students from anywhere in the world. Slogan: Step Into the Role of a Developer. Version switch: «Choose the website version: Russia & CIS / For other countries».
- Navigation: About the Olympiad, Rewards for Winners, Timeline & Rounds, Preparation Materials, Results, Previous Olympiads, Visa (→ https://prodcontest.com/eng/viza), Hackathons. Link «Instructions for submitting an appeal» → https://prodcontest.com/appeal/eng
- Primary button: Subscribe → https://form.centraluniversity.ru/prod_pre_reg/
- About the Olympiad. Participation is free of charge.
  - The Format: The competition runs in three rounds across the following fields: frontend, backend, mobile development, and MLOps engineering. You’ll solve cases in your chosen area and create a project together with your team.
  - What Is software engineering: It’s about creating software and technologies used by millions of people. Such products are built by large teams of professionals who make sure everything runs fast, securely, and without errors.
  - Who Can Join: High school students who want to tackle practical problems. If you’re passionate about coding and building apps, that’s a strong advantage.
  - Why Take Part: The Olympiad immerses you in building IT systems, automating processes, and developing apps. You’ll take on real challenges and tasks — the very same ones faced by specialists at leading tech companies.
  - Required Level of Training: The school informatics curriculum is enough to start. If you enjoy coding in your free time, that’s even better. Even if you’re just starting out, don’t hesitate to join: in every round you’ll be supported by mentors — experts from T-Bank, Central University, and HSE University.
  - Opportunities with PROD: Try out the role of a developer and build an app or service together with your team. Get a behind-the-scenes look at how big tech professionals work and meet industry experts. Join a community of like-minded peers and continue networking beyond the Olympiad.
- Rewards for Winners: Exclusive branded merch; Special internship opportunities at one of Russia’s leading fintech companies (prize winners may skip the exam round when applying for an internship in the same field in which they achieved their victory; employment is not guaranteed); Fast-track admission and up to a 100% scholarship at Central University (in accordance with Central University’s official policy on awarding undergraduate study grants); Discounts for the joint bachelor’s degree program of HSE University and Central University (in accordance with HSE University’s official policy on tuition discounts for students admitted in 2026 to the Information Product Design and Development bachelor’s program); Free Russian language foundation course for international students (available for people over the age of 18 who have graduated from high school).
- Rewards table (Grade — Status — Institution — Reward):
  - 10–11 — Final round winners — Central University — Fast-track admission, 100% scholarship for the full study period.
  - 10–11 — Final round finalists — Central University — Fast-track admission, 75%+ scholarship for the full study period.
  - 10–11 — Final round participants — Central University — Fast-track admission, 40%+ scholarship for the full study period.
  - 9–11 — Final round winners and finalists — HSE University & Central University — Discount of up to 90% for the joint bachelor’s “Design and Development of Information Products” program.
  - All grades — Final round winners and finalists — Special internship opportunities at one of Russia’s leading fintech companies.
  - All grades — Final round winners and finalists — HSE University — Russian language foundation course for international students; available for applicants aged 18 and older who have graduated from high school.
  - All grades — Final round winners and finalists — Opportunity to skip the qualifying rounds at next year’s Olympiad.
  - All grades — Final round participants — Exclusive branded merch from the PROD Olympiad.
- Selection Process. All rounds are held online, except for the final team stage — this one takes place in person in Moscow.
  - October 30 – December 2 — Registration. Submit your application by filling out the form.
  - December 5–8 — First Preliminary Round. Take a test on the basics of mathematics and programming. You’ll have 120 minutes.
  - January 15–25 — Second Preliminary Round. Choose one or several fields — frontend, backend, mobile development, or MLOps engineering — and solve real-world cases. To prepare, you can review last year’s sample tasks and watch webinar recordings in the Telegram channel.
  - February 12–24 — Final Round, Individual Stage. Develop a small project based on the Olympiad task. To support you, there will be webinars from big tech professionals, HSE University experts, and Central University faculty.
  - March 13–18 — Final Round, Team Stage. Take part in a project presentation stage: create an IT solution together with your team and a mentor — an experienced developer. The program includes seminars, workshops, and project work. The event will take place in the Moscow region. You’ll need to travel to Moscow, but accommodation and meals are on us.
  - Tracks: Backend — work on the invisible but essential parts of apps: storing data, processing requests, and running calculations. Frontend — build user-friendly, visually appealing interfaces — the part of websites and apps people actually see and use. Mobile Development — create apps for smartphones — from games and services to utilities. MLOps engineering — train artificial intelligence: design algorithms and models that find patterns in data and solve business problems.
  - Who can enter the second round: winners and runner-ups of the first round; winners of PROD hackathons; winners and runner-ups of the second round from the previous year.
- Preparation Materials. Sample Tasks → https://prodcontest.com/eng/materials («We’ve collected useful materials from previous competitions…»). Practice: demo version of the first round → https://interview.tbank.ru/special/prod-demo-en?lang=en; solutions to the demo → https://cdn.tbank.ru/static/documents/7477a030-3b89-48b5-b7e6-df7afdaaf1f9.pdf. Courses:
  - Backend Development: Python For Beginners (https://www.python.org/about/gettingstarted/), Python and SQLite (https://docs.python.org/3/library/sqlite3.html), Pro Git, Docker Get started (https://docs.docker.com/get-started/), Python FastAPI Tutorial (https://fastapi.tiangolo.com/tutorial/).
  - Frontend Development: The Modern JavaScript Tutorial (https://javascript.info/), JavaScript fundamentals, Modern Web Design Fundamentals, An Intro to Git.
  - Mobile Development: Head First Swift (Jon Manning, Paris Buttfield-Addison), iOS App Development with Swift Specialization, Kotlin, Meta Android UI Development Specialization, Clean Code (Robert C. Martin).
  - MLOps Engineering: Machine Learning Course, Kaggle Learn (https://www.kaggle.com/learn), Made With ML (https://madewithml.com/), DVC (https://dvc.org/doc/start), MLflow (https://mlflow.org/docs/latest/index.html), Triton Inference Server (https://developer.nvidia.com/triton-inference-server).
- Results: We publish results and passing scores of the qualifying rounds → https://prodcontest.com/eng/results
- Stories: For Inspiration — Stories of PROD Participants. Over the past two years, more than 8,000 school students from 25 countries have joined the Olympiad.
  - Vyacheslav Doroshenko, 18, Rostov-on-Don — a PROD 2025 prize-winner. After the Olympiad, he enrolled at Central University with a scholarship and passed the simplified selection process for an internship at a fintech company. As part of the FineDog team, he now works as a frontend intern, building new features, designing interfaces, and exploring RxJs and Angular DI. The skills he honed during the Olympiad help him: Git, system architecture, prototyping, and component development.
  - Anton Piskorskiy, 19, Moscow — a PROD prize-winner. In 2024 he enrolled at Central University with a scholarship and secured a simplified internship selection at one of the leading fintech companies. He interned in the learning platform development department and later joined the staff; now a junior backend developer creating LMS solutions for Central University and core services. His key rule — never let unfinished tasks or gaps pile up.
  - Mikhail Potanin, 17, Moscow — became a developer intern at just 17. He studies at HSE Lyceum and works at a big tech company. After winning the Olympiad he had a fast-track to an internship at a leading fintech company. Today he is an Android developer on the investments platform team, focused on code optimization and refactoring.
  - Stanislav Gavrilin, 18, Orenburg — became a PROD prize-winner in 2024 and a year later returned to the finals as a mentor. After a year in the "Design and Development of Information Products" program, he passed the simplified selection and landed an internship at a big tech company; now a frontend intern on the launch platform team, developing the frontend for an MVP release.
- Hackathons: Experience the PROD Format at Hackathons in Your City. PROD Hackathons are your chance to test-drive the Olympiad format and build a prototype of a real IT product — an app or a service. Hackathons last for three days: deliver a project with your team, gain new skills at learning intensives, and network with industry experts. Winners get direct entry into the second preliminary round. Learn more → https://prodcontest.com/eng/hackathon/
- FAQ: Who can participate? (Anyone can register for the first preliminary round, regardless of age, educational institution, or country of residence; no participation fee; only school students may continue into the second round.) Is there any selection for the first round? (No, everyone is welcome.) How are winners and finalists determined? (Highest scores in the individual and team tours of the final round; winners capped at 8% of finalists, winners and finalists together at 25%; results are based on the cumulative scores across all rounds.) What language is the Olympiad held in? (Russian and English, chosen at registration.) Which expenses are covered? (Accommodation and meals for the entire team stage in Moscow; travel and extra days are paid by participants.) Can I bring a chaperone? (Yes, one chaperone per country; accommodation and meals covered.) What does the free Russian language course at HSE University include? (One-year foundation course, two semesters, in person in Moscow, free for winners and runner-ups → https://preparatory.hse.ru/en/ruscommercial.) How does the team stage work? (In-person in the Moscow Region; teams of 3–5 work on a case over several days and present their project.) Do I need a visa? (Depends on your country — see the visa page.) Will you help me obtain a visa? (No full visa support; if you face difficulties, write to info@prodcontest.com.) Will my flight be covered? (No.) Can I file an appeal? (Yes, in all rounds except the team tour of the final round; it is a survey where participants justify why their solution was graded unfairly.)
- Organizers: T-Technologies Group — a tech company building an ecosystem of financial and lifestyle services for individuals and businesses. Central University — a new-generation Russian university that applies the STEM approach; established in partnership with 60+ leading companies; students gain strong fundamentals and apply them to real business challenges. Partners: HSE University; HSE Faculty of Computer Science (founded in 2014); Antiplagiat — one of Russia’s leading plagiarism detection systems, around a million users monthly and over 300,000 checks daily; at PROD its CodeChecker verifies code originality in the second round.
- PROD Community: Telegram → https://t.me/prod_olympiad; Support Bot → https://t.me/prod_iseo_bot; info@prodcontest.com; +7 (495) 628 03 45. Regulations of the PROD Olympiad → https://cdn.tbank.ru/static/documents/regulations-of-the-prod-international-software-engineering-olympiad.pdf

### English version — «Russia & CIS»: differences from «For other countries» (English)
Everything not listed is the same as the English «For other countries» text above.
- Who Can Join: Students in grades 8–11 who want to tackle practical problems. If you’re passionate about coding and building apps, that’s a strong advantage.
- No «Visa» item in the navigation and no appeal-instructions link under the hero.
- Rewards: Exclusive branded merch; Additional Unified State Exam points when applying to the HSE Faculty of Computer Science (in accordance with HSE University’s official admission policies for undergraduate applicants); Fast-track admission and up to a 100% scholarship at Central University; Discounts for the joint bachelor’s program of HSE University and Central University; Simplified selection process for an internship at T-Bank (it means skipping the exam stage; employment is not guaranteed). Use the Russian «Россия и СНГ» table, translated faithfully, for the rewards table.
- Individual stage webinars are «from T-Bank developers, HSE University experts, and Central University faculty». Courses cover four areas: frontend, backend, mobile development, and MLOps engineering.
- Stories name T-Bank: Vyacheslav — internship at T-Bank; Anton — simplified internship selection at T-Bank; Mikhail — became a developer intern at T-Investments at just 17, studies at HSE Lyceum and works at T-Bank headquarters, had a fast-track to an internship at T-Bank, now an Android developer on the T-Investments platform team; Stanislav — landed an internship at T-Bank.
- Extra block: How the Team Stage Unfolded in 2025.
- Organizers: «The T-Technologies team creates fintech products used by over 51 million people — including T-Bank, T-Education, T-Business, T-Investments, and more». Partners also include Antiplagiat (CodeChecker verifies the originality of source code in the second stage) and Moskvarium — the Moskvarium Center for Oceanography and Marine Biology, home to more than 12,000 aquatic animals, among them an axolotl named Lottie, the mascot of the PROD Olympiad.
<!-- BRIEF:END -->
