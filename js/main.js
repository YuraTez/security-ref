// Получаем все элементы табов и кнопки
const body = document.querySelector("body");
const tabs = document.querySelectorAll('.tab');
const progressBarElements = document.querySelectorAll('.progress-bar__el');
const nextButtons = document.querySelectorAll('.next-tab .btn');
const backButton = document.querySelector('.back-tab'); // Кнопка "Назад"
const progressBar = document.querySelector('.progress-bar-content');
const progressNum = document.querySelector('.progress-bar__num span'); // Элемент для отображения прогресса


// Переменная для отслеживания текущего таба
let currentTab = 0;

// Функция для обновления прогресс-бара и отображения текущего таба
function updateProgress() {
    // Удаляем класс active у всех табов
    tabs.forEach(tab => tab.classList.remove('active'));

    // Добавляем класс active к текущему табу
    tabs[currentTab].classList.add('active');

    if(tabs[currentTab].classList.contains("tab--purple")){
        changeThemeColor('#7b40c3');
        body.classList.add('purple-body')
    }else{
        changeThemeColor('#fff');
        body.classList.remove('purple-body')
    }

    if (currentTab < 10) {
        // Обновляем прогресс-бар
        progressBarElements.forEach((el, index) => {
            if (index < currentTab + 1) {
                el.classList.add('done');
            } else {
                el.classList.remove('done');
            }
        });

        // Обновляем отображение количества пройденных табов
        progressNum.textContent = currentTab + 1; // +1, так как индексация начинается с 0

        // Управляем видимостью кнопки "Назад"
        if (currentTab === 0) {
            backButton.classList.add('d-none'); // Скрываем кнопку на первом табе
        } else {
            backButton.classList.remove('d-none'); // Показываем кнопку на остальных табах
        }
    }else{
        $(".progress-bar").hide()
    }
}

// Обработчик события для кнопок "next"
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Проверяем, не достигли ли мы последнего таба
        if (currentTab < tabs.length - 1) {
            currentTab++;
            updateProgress();
            progressBar.classList.remove('start');
        }
    });
});

// Обработчик события для кнопки "Назад"
backButton.addEventListener('click', () => {
    // Проверяем, не находимся ли мы на первом табе
    if (currentTab > 0) {
        currentTab--;
        updateProgress();
    }

    if(!currentTab){
        progressBar.classList.add('start');
    }
});

// Инициализация
updateProgress();

// Функция для изменения цвета темы
function changeThemeColor(color) {
    // Находим мета-тег с именем theme-color
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    // Если мета-тег найден, обновляем его content
    if (themeColorMeta) {
        themeColorMeta.setAttribute('content', color);
    }
}
