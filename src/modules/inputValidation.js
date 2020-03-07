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

module.exports = inputValidation;