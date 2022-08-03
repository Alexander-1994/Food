// КАЛЬКУЛЯТОР КАЛОРИЙ:
function calc() {
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {                                             /* если "пол" есть в ЛС - значение sex берется из ЛС */
        sex = localStorage.getItem('sex');
    } else {                                                                       /* в противном случае - значение sex по-умолч. 'female' и оно добавится в ЛС */
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {                                           /* если "физ. активность" есть в ЛС - значение ratio берется из ЛС */
        ratio = localStorage.getItem('ratio');
    } else {                                                                       /* в противном случае - значение ratio по-умолч. 1.375 и оно добавится в ЛС */
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);                                       
    }

    function calcTotal() {                                                         /* функция, производящая подсчёты */
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '?';
            return;
        }
        if (sex === 'female') {                                                    /* для женщин: */
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {                                                                   /* для мужчин: */
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function initLocalSettings(selector, classActive) {                            /* функция, которая при открытии страницы проверяет локальное хранилище и устанавливает классы активности на те плашки, которые там сохранены (прошлый выбор пользователя) */
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(classActive);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(classActive);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(classActive);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInformation(selector, classActive) {                          /* функция, собирающая статичные данные (с плашек). Применима как для "пол", так и для "физическая активность" */
        const elements = document.querySelectorAll(selector);                       /* получаем всевдомассив с плашками */

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {                          /* если клик на плашку физ.активности -> берем из её дата-атрибута значение (там коэффициент) */
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');                              /* если клик на плашку пола -> берем значение из её id */
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {                                          /* удаляем класс активности у каждого элемента */
                    elem.classList.remove(classActive);
                });

                e.target.classList.add(classActive);                                /* добавляем класс активности элементу, на который кликнули */

                calcTotal();                                                        /* запуск функции подсчёта */
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');                                         /* для плашек "пол" */
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');                        /* для плашек "физ. активность" */

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {                                         /* если введено что-то кроме чисел, то инпут будет подсвечиваться красной обводкой */
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
}

export default calc;