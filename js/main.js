// Получаем все элементы табов и кнопки
const body = document.querySelector("body");
const tabs = document.querySelectorAll('.tab');
const progressBarElements = document.querySelectorAll('.progress-bar__el');
const nextButtons = document.querySelectorAll('.next-tab .btn');
const backButton = document.querySelector('.back-tab'); // Кнопка "Назад"
const progressBar = document.querySelector('.progress-bar-content');
const progressNum = document.querySelector('.progress-bar__num span'); // Элемент для отображения прогресса
const overlay = document.querySelector('.overlay');

// Переменная для отслеживания текущего таба
let currentTab = 0;

// Функция для обновления прогресс-бара и отображения текущего таба
function updateProgress() {

    if(currentTab - 1 > 0 && tabs[currentTab - 1].getAttribute("data-tab") === "email"){

        if(!validEmail($(".input-email"))){
            currentTab--
            return
        }
    }

    setTimeout(function (){
        tabs.forEach(tab => tab.classList.remove('show'));
        tabs.forEach(tab => tab.classList.remove('active'));

        // Добавляем класс active к текущему табу
        tabs[currentTab].classList.add('active');


    },300)

    setTimeout(function () {
        tabs[currentTab].classList.add('show');

        if (tabs[currentTab].classList.contains("tab--purple")) {
            changeThemeColor('#7b40c3');
            body.classList.add('purple-body')
        } else {
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
        } else {
            $(".progress-bar").hide()
        }
    }, 500)

}

// Обработчик события для кнопок "next"
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Проверяем, не достигли ли мы последнего таба
        if (currentTab < tabs.length - 1) {
            currentTab++;
            updateProgress();
            backButton.classList.remove('d-none');
            progressBar.classList.remove('start');
        } else {
            updateProgress();
            currentTab++;
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

    if (!currentTab) {
        backButton.classList.add('d-none');
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

$(".btn").on("click" , function (){
    let btnList = $(this).parent().find(".btn");
    $.each(btnList, function(index, el) {
        $(el).removeClass('active');
    });
    $(this).addClass("active")
})

//time
const timer = () => {
    const timeBlock = document.querySelectorAll('.time-sale__content');

    timeBlock.forEach((el) => {
        let time = el.textContent;
        let [minutes, seconds] = time.split(':').map(Number);

        function updateTime() {
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            }

            const formattedTime =
                String(minutes).padStart(2, '0') + ':' +
                String(seconds).padStart(2, '0');


            el.innerHTML = formattedTime;

            if (minutes === 0 && seconds === 0) {
                clearInterval(timer);
            }
        }

        const timer = setInterval(updateTime, 1000);
    })
}

function startAnimationScan() {
    setTimeout(function () {

        changeThemeColor('#ff453a');
        body.classList.remove('blue-body')
        body.classList.add('red-body')
    }, 3500)

    setTimeout(function () {
        $(".tab").removeClass("show active");
        $(".tab-result").addClass("show active");
        currentTab++;
    }, 5000)
}

function validEmail (input){
    let emailInput = input.val();
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярное выражение для валидации email

    if (!emailPattern.test(emailInput)) {
        return false
    } else {
       return true
    }
}

$("#openScan").on("click", () => {

    if(validEmail($(".input-email"))){

        $(".logo").addClass("hide");
        setTimeout(function (){
            body.classList.add('blue-body')
        },300)
        changeThemeColor('#4040c3');
        startAnimationScan()

        var params = {
            container: document.getElementById('lottie'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        };

        var anim;
        anim = lottie.loadAnimation(params);
    }else{
        $('#error').addClass("show");
        setTimeout(()=>{
            $('#error').removeClass("show");
        },1000)
    }
})

$("#openInfoPage").on("click", function () {

    changeThemeColor('#fff');

    body.classList.remove('red-body');

    timer()

    $('.info-slider').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        prevArrow: false,
        nextArrow: false
    });
})
