'use strict';

const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');
    let total = 0;

    const countSum = () => {
        let dayValue = 1,
            countValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (+calcDay.value === 0 || squareValue === 0 || typeValue === 0 || +calcCount.value === 0) {
            return;
        }

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay && calcDay.value < 10) {
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

module.exports = calc;
