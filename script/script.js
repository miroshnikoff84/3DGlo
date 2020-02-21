window.addEventListener('DOMContentLoaded', () => {

    'use strict';

  const countTimer = (deadline) => {
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
      updateClock = () => {
        const timer = getTimeRemaning();

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;
      };

    setInterval(updateClock, 1000);
  };

  countTimer(`21 february 2020`);

});