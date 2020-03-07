'use strict';

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

            request.send(JSON.stringify(body));
        });
    };

};

module.exports = sendForm;
