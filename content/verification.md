# Проверка редакции 6 — 22 октября 2026

- Прежний локальный сервер продолжает отвечать HTTP 200; остановка и публикация не выполнялись.
- node --check app.js проходит. В браузере нет предупреждений и ошибок JavaScript.
- Полный сохранённый авторский текст сверён с редакцией 5 с нормализацией пробелов и документированной корректурой «другой.Именно» → «другой. Именно». original.txt побайтно совпадает с исходником.
- Проверены уникальные id, якоря, все локальные ресурсы, отсутствие двойных пробелов в видимом тексте и 200 точек.
- Курсор проверен через браузер: transform фонового слоя меняется с matrix(...,0,0) на matrix(...,50.966,-36.088). Текст не смещается. Шум — opacity 0,035.
- Проверены обложка и запрос на 1280×720 и 320×568. Обложка не прокручивается; запрос полностью помещается в поле, отправка доступна и не происходит автоматически. Плашка — «Новый чат».
- На 320 px высота кнопки обложки 41 px, отправки 41 px, статистических кнопок 36 px с расширенной областью касания. Галерейные стрелки 40 px.
- Проверены ширины 320, 390, 768, 900, 1024, 1280, 1440 px: ширина документа равна окну. Поля статистики совпадают с полями статьи на каждой проверенной ширине. Оба внешних радиуса 0 px, фон тёмно-серый.
- Все шесть значений сохранены: 71%, 65%, 64,5%; 52%, 64%, 41%. Переключение проверено; для 64,5% заполнение последней точки составляет 50%.
- Новые WebP загружаются без ошибок. Увеличение листа Леонардо и закрытие Escape проверены. Права и первоисточники записаны в image-credits.json и библиографии изображений.
- Неразрывные пробелы проверены в исходной разметке и динамически создаваемых строках; они одинаковы в основном и декоративном слое печати. Заголовки больше не разбиваются автоматическими переносами внутри слова.
- Reduced motion предусмотрен в CSS и JS; системная настройка в этом проходе не переключалась.
- Commit, push, публикация, AI API и аналитика отсутствуют. Сервер оставлен работающим для просмотра.

## Редакция 7

Первые два экрана изменены по макетам автора. Проверены подъём обложки, автоматический набор и отправка, загрузочные точки, размеры 1280×720, 390×844 и 320×568. Основная статья и её текст не изменены. Синтаксис JS проверен. Локальный сервер перезапущен отдельно от команды и оставлен для просмотра.

## Редакция 8

Фоны построены направленными серо-синими градиентами с более узкими переходами, без blur-фильтра. Автоотправка удалена из кода. После завершения набора браузер подтвердил состояние prompt, доступную кнопку и отсутствие самостоятельной отправки. По нажатию состояние меняется на sending: движется только весь непрозрачный экран, transform формы остаётся none. По завершении prompt скрыт, в статье одна плашка. Консоль без ошибок; текст статьи побайтно по DOM-тексту совпадает с предыдущей версией.


## Revision 11, 23 October 2026

All 27 paragraphs and five question labels independently match the supplied text after whitespace normalization. Seven chapter titles and their order updated. Both image placeholders replaced with preserved galleries. Navigation, unique IDs and 200 statistical points verified. Browser checked at 1280 and 390 px with no horizontal overflow or console errors. Manual send opens the new introduction. Original wording, including the incomplete sentence in chapter 5, preserved. No deployment or push; local server remains running.


## Revision 12: four chapters and comparison posters

All 27 author paragraphs remain in their original order with no text edits. Four chapter boundaries match the request. The five question cards are inside chapter 3. Bibliography, cover and prompt markup exactly match revision 11. Both charts now use nested rectangular planes on a common 0-100% width scale, with all three values visible. Values and source scope are unchanged. Visible rows are individual keyboard/mouse/touch buttons, avoiding overlap in their hit areas. All six values checked in the browser. Four chapters and five question cards verified, mobile width 390 px has no horizontal overflow. No JavaScript warnings or errors. Cover-to-prompt-to-article flow checked and retained. No publishing or push.


## Revision 13 checks

All 27 author paragraphs and all five source entries preserved. Cover and prompt markup unchanged. Speed chart removed; remaining chart moved down exactly one paragraph and verified at 64%, 41%, 52%. New poet manuscripts inspected and converted without cropping; modal image loading and Escape checked. Five question accordions are a separate sibling chapter; mouse and Space opening verified. At the chapter transition the old title ends at y=39 while the question chapter starts at y=104, so no overlap. Full-width question section and matching body-column x positions verified. Source collapse tested. Widths 1440, 390 and 320 have no horizontal overflow. No console errors or warnings. Local server remains running.
