window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    const countTimer = (deadline) => {
        // получаем элементы 
        const timerHours = document.getElementById('timer-hours'),
            timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds');
        // если число однозначное, то подставляем ноль
        const getTimeRemaning = () => {
                const goodTime = (time) => {
                        if (time > 0 && time < 10) {
                            return `0${time}`;
                        } else if (time <= 0) {
                            return `00`;
                        }
                        return time;
                    },
                    dateStop = new Date(deadline).getTime(),
                    dateNow = new Date().getTime(),
                    timeRemaining = (dateStop - dateNow) / 1000,
                    seconds = goodTime(Math.floor(timeRemaining % 60)),
                    minutes = goodTime(Math.floor((timeRemaining / 60) % 60)),
                    hours = goodTime(Math.floor(timeRemaining / 60 / 60));

                return {
                    hours,
                    minutes,
                    seconds
                };
            },
            //  устанавлваем интервал и условие его удаления 
            intervalId = setInterval(() => {
                const timer = getTimeRemaning();

                timerHours.textContent = timer.hours;
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.seconds;

                if (timer.seconds < 1 && timer.minutes < 1 && timer.hours < 1) {
                    console.log('Done');
                    clearInterval(intervalId);
                }
            }, 1000);
    };

    countTimer(`24 february 2020`);

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');
        let stepLeft = 0;

        const handlerMenu = () => {
            let animId;
            // Анимация
            let animate = () => {
                animId = requestAnimationFrame(animate);
                if (stepLeft < document.documentElement.clientWidth) {
                    stepLeft += 60;
                    menu.style.left = stepLeft + 'px';
                } else {
                    cancelAnimationFrame(animId);
                }
            };

            // По клику запускает анимацию
            let clickMenu = () => {
                if (!menu.style.left) {
                    animId = requestAnimationFrame(animate);
                } else {
                    stepLeft = 0;
                    menu.removeAttribute('style');
                    cancelAnimationFrame(animId);
                }
            };
            // Показывает меню при 768px
            let showMobileMenu = () => {
                if (!menu.style.transform || menu.style.transform === 'translateX(-100%)') {
                    menu.style.transform = 'translateX(0)';
                } else {
                    menu.style.transform = 'translateX(-100%)';

                }
            };
            // Проверка расширения экрана
            let checkWidth = () => {
                if (document.documentElement.clientWidth > 768) {
                    clickMenu();
                } else {
                    // cancelAnimationFrame(animId);
                    showMobileMenu();
                }
            };


            checkWidth();

        };


        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => {
            elem.addEventListener('click', handlerMenu);
        });

    };

    toggleMenu();

    // Выезжающий PopUp
    const slidePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        let stepLeft = 0;

        const handlerPopUp = () => {
            let animId;
            let halfScreen = (document.documentElement.clientWidth * 0.5) - 191;
            // Анимация
            let animate = () => {
                animId = requestAnimationFrame(animate);
                if (stepLeft < (halfScreen)) {
                    stepLeft += 40;
                    popup.style.display = 'block';
                    popupContent.style.left = stepLeft + 'px';
                } else {
                    cancelAnimationFrame(animId);
                }
            };

            // По клику запускает анимацию
            let clickPopUp = () => {
                if (!popup.style.display) {
                    animId = requestAnimationFrame(animate);
                } else {
                    stepLeft = 0;
                    popup.removeAttribute('style');
                    popupContent.removeAttribute('style');
                    cancelAnimationFrame(animId);
                }
            };
            // Показывает меню при 768px
            let showMobilePopUp = () => {
                if (!popup.style.display || popup.style.display === 'none') {
                    popup.style.display = 'block';
                } else {
                    popup.style.display = 'none';

                }
            };
            // Проверка расширения экрана
            let checkWidth = () => {
                if (document.documentElement.clientWidth > 768) {
                    clickPopUp();
                } else {
                    // cancelAnimationFrame(animId);
                    showMobilePopUp();
                }
            };


            checkWidth();

        };

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', handlerPopUp);
        });

        popupClose.addEventListener('click', handlerPopUp);

    };
    slidePopUp();
});