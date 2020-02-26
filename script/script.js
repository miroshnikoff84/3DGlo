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
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        },
            updateClock = () => {
                const timer = getTimeRemaning();
                timerHours.textContent = timer.hours;
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.seconds;

                if (timer.timeRemaining > 0) {
                    setTimeout(updateClock, 1000);
                } else {
                    console.log('Done');
                }
            };

        updateClock();
        
    };

    countTimer(`12 marth 2020`);

    // Меню 

    const toggleMenu = () => {
        const menu = document.querySelector('menu'),
            body = document.querySelector('body');
        

        body.addEventListener('click', (event) => {
            let target = event.target;
            if (target.closest('.menu')) {
                menu.classList.toggle('active-menu');
            } else if (target.classList.contains('close-btn')) {
                menu.classList.toggle('active-menu');
            } else if (target.matches('ul>li')) {
                event.preventDefault();
            } else if (!target.matches('menu')) {
                menu.classList.remove('active-menu');
            }
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
                    stepLeft += 30;
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

    // Табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        tabContent[1].classList.add('d-none'); // убираем последние два таба 
        tabContent[2].classList.add('d-none');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    //слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            dots = document.querySelector('.portfolio-dots');
            

        //  Задаем номер первого слайда
        let currentSlide = 0,
            interval;
        
        let dotElem;

        const addDots = () => {
            for (let i = 0; i < slide.length; i++) {
                dotElem = document.createElement('li');
                dotElem.classList.add('dot');
                dots.append(dotElem);
            }
            dots.childNodes[1].classList.add('dot-active');
            
        };

        addDots();

        const dot = document.querySelectorAll('.dot');
            
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

      
        
        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };

        const startSlide = (time =2000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) =>{
            if(event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                    stopSlide();
                }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                    startSlide();
                }
        });

        startSlide(1500);
    };

    slider();


});