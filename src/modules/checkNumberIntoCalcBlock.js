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

module.exports = checkNumberIntoCalcBlock;
