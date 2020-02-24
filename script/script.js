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
        
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        
        btnMenu.addEventListener('click', handlerMenu);
        
        closeBtn.addEventListener('click', handlerMenu);
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].addEventListener('click', handlerMenu);
        }

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    // popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');
            popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
            popup.style.display = 'block';
            });
        });
        popUpClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    };

    togglePopUp();

});