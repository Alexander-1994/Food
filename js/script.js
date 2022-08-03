'use strict';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import calc from './modules/calc';
import slider from './modules/slider';
//                                                                          -> импорты всегда вверху 
import {plusModal} from './modules/modal';                                  /* отдельно импортируем ф. plusModal, чтобы использовать её в modalTimerId */

document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => plusModal('.modal', modalTimerId), 50000);
    //                                                                      -> через 50 секунд нахождения пользователя на сайте появится мод. окно

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-09-25');
    cards();
    forms('form', modalTimerId);
    calc();
    slider({                                                                /* аргументы передадим слайдеру(модулю) в кач-ве объекта с настройками. Внутри модуля ф. slider передадим их в кач-ве параметров, дестректурируя объект настроек */
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        currentCounter: '#current',
        totalCounter: '#total',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide',
        container: '.offer__slider'
    });
});