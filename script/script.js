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

        const startSlide = (time = 2000) => {
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

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };

    slider();
    // смена фото при наведении мышки
    const changePhoto = () => {

        const commandPhotos = document.querySelectorAll('.command__photo');

        const shifter = (event) => {

            let src = event.target.src;

            if (event.type === 'mouseover') {
                event.target.src = event.target.dataset.img;
            }

            if (event.type === 'mouseout') {
                let src2 = src.replace(/a\.jpg/, '.jpg');
                event.target.src = src2;

            }
        };

        commandPhotos.forEach((elem) => {
            elem.addEventListener('mouseover', shifter);
            elem.addEventListener('mouseout', shifter);
        });

    };

    changePhoto();

    // проверка инпутов на ввод цифр     
    const checkNumberIntoCalcBlock = () => {
        const calcBlock = document.querySelector('.calc-block');

        const blockNumber = (event) => {
            let target = event.target;
            if (target.matches('.calc-square') || target.matches('.calc-count') || target.matches('.calc-day')) {
                target.value = target.value.replace(/[^0-9.]/g, '');
            }
        };

        calcBlock.addEventListener('input', blockNumber);
    };

    checkNumberIntoCalcBlock();

    // Калькулятор 
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');


        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;


            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if (target === calcType || target === calcSquare ||
                target === calcDay || target === calcCount) {
                countSum();
            }
        });
    };

    calc(100);

    // send-ajax-form 
    const sendForm = () => {

        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с Вами свяжемся!',
            form = document.querySelectorAll('form');



        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 1.5rem; color: #fff';



        form.forEach((element) => {


            element.addEventListener('submit', (event) => {
                event.preventDefault();
                element.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                const formData = new FormData(element);
                let body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });

                const clearText = () => {
                    statusMessage.textContent = '';
                }

                const outputData = () => {
                    statusMessage.textContent = successMessage;
                    setTimeout(clearText, 10000);
                };

                const errorData = (error) => {
                    statusMessage.textContent = errorMessage;
                    console.log('error: ', error);
                    setTimeout(clearText, 10000);
                };

                postData(body)
                    .then(outputData)
                    .catch(errorData);

            });
        });


        const postData = (body) => {

            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();

                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }

                    if (request.status === 200) {
                        resolve();
                        form.forEach((elem) => {
                            elem.querySelectorAll('input').forEach((index) => {
                                index.value = '';
                            });
                        });
                    } else {
                        reject(request.status);
                    }
                });

                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json');

                console.log('body: ', body);
                request.send(JSON.stringify(body));
            });
        };

    };

    sendForm();


    const inputValidation = () => {
        const body = document.querySelector('body'),
        inputEmail = document.getElementsByName('user_email');

        body.addEventListener('input', (event) => {
            let target = event.target;
            if (target.matches('input[name="user_phone"]')) {
                target.value = target.value.replace(/[^\+{1}\d\(\)\-]/g, '');
            }
            if (target.matches('input[name="user_name"]') || target.matches('input[name="user_message"]')) {
                target.value = target.value.replace(/[^а-яА-Я,.!?"';:]/, '');
            }

            inputEmail.forEach((item) => {
                item.setAttribute('required', '');
            
             });
        });


    };

    inputValidation();
});
