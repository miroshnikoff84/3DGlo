'use strict';

const countTimer = require('./modules/countTimer');
const toggleMenu = require('./modules/toggleMenu');
const slidePopUp = require('./modules/slidePopUp');
const tabs = require('./modules/tabs');
const slider = require('./modules/slider');
const shiftPhoto = require('./modules/changePhoto');
const checkNumberIntoCalcBlock = require('./modules/checkNumberIntoCalcBlock');
const calc = require('./modules/calc');
const sendForm = require('./modules/sendForm');
const inputValidation = require('./modules/inputValidation');

countTimer('12 march 2020');
toggleMenu();
slidePopUp();
tabs();
slider();
shiftPhoto();
checkNumberIntoCalcBlock();
calc(100);
sendForm();
inputValidation();