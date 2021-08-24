window.addEventListener('DOMContentLoaded', () => {

    const idInterval = setInterval(countTimer, 1000, '01 september 2021');

    // Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaning() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaning = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaning % 60),
                minutes = Math.floor((timeRemaning / 60) % 60),
                hours = Math.floor((timeRemaning / 3600));
            return { timeRemaning, hours, minutes, seconds };
        }

        function updateClock() {
            const timer = getTimeRemaning();

            timerHours.textContent = checkNumeral(timer.hours);
            timerMinutes.textContent = checkNumeral(timer.minutes);
            timerSeconds.textContent = checkNumeral(timer.seconds);

        }

        function endClock() {
            clearInterval(idInterval);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }

        function checkNumeral(time) {
            if (time < 10) {
                return `0${time}`;
            } else {
                return time;
            }
        }

        const timer = getTimeRemaning();
        if (timer.timeRemaning > 0) {
            updateClock();
        } else {
            endClock();
        }

    }


    // Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
                menu.style.transform = `translate(0)`;
            } else {
                menu.style.transform = `translate(-100%)`;
            }
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
    };

    // popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = popup.querySelector('.popup-content');
        let count = -10;
        let animateInterval;
        const animatePopup = function() {
            animateInterval = requestAnimationFrame(animatePopup);
            count++;
            popupContent.style.top = count + '%';
            if (count > 10) {
                count = -10;
                cancelAnimationFrame(animateInterval);
            }
        };

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                const windowWidth = document.documentElement.clientWidth;
                popup.style.display = 'block';
                if (windowWidth > 768) {
                    animateInterval = requestAnimationFrame(animatePopup);
                }
            });
        });
        popupClose.addEventListener('click', () => { popup.style.display = 'none'; });
    };

    const smoothScroll = () => {
        const anchors = document.querySelectorAll('a[href*="#"]');

        for (const anchor of anchors) {
            anchor.addEventListener('click', event => {
                event.preventDefault();
                const blockID = anchor.getAttribute('href');
                document.querySelector('' + blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    };


    toggleMenu();
    togglePopUp();
    smoothScroll();
});


