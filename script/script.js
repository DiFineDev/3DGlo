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
            menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        menu.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('close-btn') || target.tagName === 'A') {
                handlerMenu();
            }
        });

    };

    // popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
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
        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
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


    // Табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tabs = document.querySelectorAll('.service-header-tab'),
            tabContents = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContents.length; i++) {
                if (index === i) {
                    tabs[i].classList.add('active');
                    tabContents[i].classList.remove('d-none');
                } else {
                    tabs[i].classList.remove('active');
                    tabContents[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tabs.forEach((item, index) => {
                    if (item === target) {
                        toggleTabContent(index);
                    }
                });
            }
        });
    };

    // Слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            portfolioDots = document.querySelector('.portfolio-dots');

        let currentSlide = 0,
            interval;

        const addDots = () => {
            for (let i = 0; i < slide.length; i++) {
                portfolioDots.insertAdjacentHTML('afterBegin', '<li class="dot"></li>');
            }
            const dot = document.querySelectorAll('.dot');
            dot[0].classList.add('dot-active');
            return dot;
        };

        const dot = addDots();

        const prevSLide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSLide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSLide(slide, currentSlide, 'portfolio-item-active');
            prevSLide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSLide(slide, currentSlide, 'portfolio-item-active');
            nextSLide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSLide(slide, currentSlide, 'portfolio-item-active');
            prevSLide(dot, currentSlide, 'dot-active');

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
            } else if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSLide(slide, currentSlide, 'portfolio-item-active');
            nextSLide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);

    };

    slider();
    tabs();
    toggleMenu();
    togglePopUp();
    smoothScroll();
});


