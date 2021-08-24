window.addEventListener('DOMContentLoaded', function(){
    'use strict'


    // Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaning(){
            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaning = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaning % 60),
            minutes = Math.floor((timeRemaning / 60) % 60),
            hours = Math.floor((timeRemaning / 3600));
            return {timeRemaning, hours, minutes, seconds};
        }

        function updateClock(){
           let timer = getTimeRemaning();

           timerHours.textContent = checkNumeral(timer.hours);
           timerMinutes.textContent = checkNumeral(timer.minutes);
           timerSeconds.textContent = checkNumeral(timer.seconds);
            
        }  

        function endClock(){
            clearInterval(idInterval);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }

        function checkNumeral(time){
            if (time < 10) {
                return `0${time}`;
            } else {
                return time;
            }
        }
        
        let timer = getTimeRemaning();
        if (timer.timeRemaning > 0) {   
            updateClock();
        } else {
            endClock();
        }

    }
    
    const idInterval = setInterval(countTimer, 1000, '01 september 2021');

})

