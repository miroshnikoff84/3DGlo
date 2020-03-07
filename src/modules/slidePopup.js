'use strict';

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

module.exports = slidePopUp;
