
npm i Установить зависимости
npm start Запустить сборку, сервер и слежение за файлами
npm start ЗАДАЧА Запустить задачу с названием ЗАДАЧА список задач в gulpfile.js
npm run build Сборка проекта без карт кода (сжатый вид, как результат работы)
npm run lint:scss Проверка стилей проекта https://stylelint.io/
npm run lint:scss Проверка js https://eslint.org/

## Назначение папок
  build/            # Папка сборки
  src/              # Исходные файлы
  pages/            # - html страницы проекта
  _include/         # - фрагменты html для вставки на страницы
  style/            # - стили scss
  style/partials/   # - фрагменты scss
  style/vendor/     # - стили подключенных библиотек
  fonts/            # - шрифты проекта
  media/            # - медиа файлы проекта
  images/           # - изображения
  images/img_to_bg/ # - svg для вставки inline в стили (не будут скопированы в build)
  js/               # - js-файлы
  js/partials/      # - модули js
  js/vendor/        # - подключенный библиотеки js
  index.html        # - главная страница проекта
