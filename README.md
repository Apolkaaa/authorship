# Авторство изнутри — Брусова Полина

Локальная интерактивная статья. Редакция 11, 23 октября 2026.

## Просмотр

Открыть http://127.0.0.1:4173/. Скачивание и сборка не требуются. Отдельно запущенный сервер обслуживает исходную папку проекта. После перезагрузки компьютера его можно запустить из папки проекта:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Сайт не опубликован. Commit и push не выполнялись. Сервер нужен для просмотра пользователем; при завершении работы его не останавливать.

## Текущий дизайн

Обложка и второй экран повторяют новые авторские макеты: название в одну строку, рукопись поверх, подписи по сторонам, линия между метаданными и прямоугольная кнопка. Холодный серо-синий градиент слегка реагирует на курсор. После нажатия обложка поднимается вверх за 900 мс. На втором экране запрос печатается автоматически, затем ожидает нажатия стрелки отправки. Автоотправки нет. Второй экран уходит вверх единой непрозрачной поверхностью; форма и плашки не сжимаются и не накладываются. Верхние три точки пульсируют последовательно. Плюс и микрофон — графические детали макета, без доступа к файлам или записи звука. При reduced motion подъём мгновенный, точки статичны.

Две локальные гарнитуры, только Regular; синтетические начертания отключены. В статье кнопки и рамки имеют радиус 24 px; на новой обложке кнопка прямоугольная, стрелка отправки круглая; изображения и полноэкранные статистические развороты остаются прямоугольными. Ссылки внутри персиковых вставок приглушённо-оранжевые. Заголовки, подзаголовок и вопросы начинаются с прописной буквы.

Семь глав сохранены. На десктопе основной текст и обе композиционные паузы используют 12 колонок и промежуток 24 px. В основном потоке заголовок занимает первые четыре колонки, текст — следующие восемь. Между главами 2/3 и 5/6 добавлены две паузы с разной композицией и новой точечной визуализацией данных.

Прежние контурные иллюстрации, редактор, цепочка делегирования, поле заметки, история участия и кольцевые диаграммы удалены по запросу автора.

## Две статистические паузы

1. Где ИИ помогает экономить время: 71% — поиск литературы, 65% — анализ данных, 64,5% — подготовка текста на иностранном языке. Тёмно-серый разворот во всю ширину окна: крупное значение слева, сетка из 100 точек и переключатели справа.
2. Как оценивают полезность ИИ: 52% — все области, 64% — медицинские науки, 41% — гуманитарные. Тёмно-серый разворот во всю ширину окна: облако из 100 точек слева, значение, полное предложение и выбор области справа. Внутреннего стеклянного фрейма нет.

Источник: Е. Попов, Е. Стрельцова, ИСИЭЗ НИУ ВШЭ, «Эффекты применения генеративного ИИ в российской науке», 2 июля 2026. Общая выборка онлайн-опроса — 1209 учёных, май 2026. Показаны самооценки пользователей генеративного ИИ; размер подгрупп не указан в источнике. Одна точка означает один процентный пункт, не отдельного человека. Половина точки сохраняет точность 64,5%. Определения и данные находятся в content/statistics.json.

## Вопросы и чтение

В финале пять заданных автором вопросов с комментариями. На широком экране видны три тёмные карточки с крупными номерами; остальные доступны горизонтальной прокруткой, стрелками и клавиатурой. На телефоне карточки читаются по одной. Чек-листа и оценки читателя нет.

Печать текста при прокрутке остаётся последовательной: одновременно проявляется не больше одного абзаца. Завершённые фрагменты не стираются. В оглавлении есть «Показать весь текст»; reduced motion отключает движение и сразу делает текст чёрным. Статья доступна без JavaScript.

AI API, внешней аналитики, отправки данных и хранения записей нет.

## Файлы

- index.html — статья, две статистические композиции, карточки, библиография.
- style.css — дизайн-система, типографика, 12 колонок, градиенты, glassmorphism, адаптивность.
- app.js — сцены, данные, галереи, карточки и печать текста.
- content/original.txt — неизменённый оригинал.
- content/productivity-addition.md — добавленный материал о продуктивности и эссе Пащенко.
- content/questions.json — пять вопросов и комментарии.
- content/statistics.json — значения, определения, авторы, выборка и первоисточник.
- content/image-credits.json — происхождение восьми растровых изображений.
- content/proofreading.md — список корректур и правила неразрывных пробелов.
- content/design-system.md и verification.md — принципы и проверка.

По ранее согласованной авторской редактуре абзац о Барте исключён со страницы; остальные 17 исходных абзацев сохранены с технической корректурой, перечисленной в content/proofreading.md. Оригинал не изменён.


## Revision 11: new author text, 23 October 2026

The previous content descriptions above document earlier revisions. The current article contains the complete new author text: 27 paragraphs, seven reordered chapters, introduction, five questions and author note. The navigation and reading entry point match the new structure. All paragraphs and question labels match the attachment, with nonbreaking spaces only. Image placement notes become galleries. Existing question comments and statistical illustrations remain supplementary content.

Current source: content/revision-2026-10-23.md and content/original.txt. Previous source: content/original-2026-10-20.txt. No editorial rewriting or publication.


## Revision 12

Current structure: four chapters (authorship; thinking; personal contribution including the five questions; author note). All 27 author paragraphs preserved in order. Source bibliography and both opening screens unchanged. Two interactive charts redesigned as overlapping rectangular comparisons using the existing six survey figures. The page opens at the cover; manual prompt submission leads into chapter 1.


## Revision 13, 26 October 2026

Chapter numbers now sit to the left of titles on a common baseline. The time-saving chart is removed. The remaining utility chart follows the next author paragraph and uses separate horizontal bars without a white frame. Question chapter 04 is full width, square edged, and contains five native details accordions aligned with the body column. Author note is chapter 05. The source list is collapsed; the publication note names Polina Brusova and describes the project and prompt design.

The draft carousel now contains three poet manuscripts from the requested Otruki blog: Assa Novikova, Oleg Pashchenko and Gleb Simonov. Every image has a direct source link and factual rights metadata; the site does not state a reuse license. The cover manuscript stays unchanged. No publication or push.


Revision 17: uniform 24px UI corners; unnumbered chapters; link-only image credits; removed full-text menu control. Statistics use the peach editorial frame, an orange selected bar, neutral inactive bars and equal vertical padding, with labels at the lower left. Displayed copy was proofread; the original source is preserved.
