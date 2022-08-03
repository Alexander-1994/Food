import {getResource} from '../services/services';
// КЛАССЫ ДЛЯ КАРТОЧЕК:
function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);           /* получаем родителя со страницы */
            this.classes = classes;
            this.transfer = 27;                                             /* курс доллара */
            this.changeToUAH();                                             
        }

        changeToUAH() {                                                     /* данный метод переводит доллары в гривны */
            this.price = this.price * this.transfer;
        }

        rander() {                                                          /* данный метод динамически создаёт карточки */
            const elem = document.createElement('div');
            
            if (this.classes.length === 0) {                                /* если в рест-оператор не указали классы, для карточки (пустой массив), то будет по-умолч. присвоен класс */
                this.elementClass = 'menu__item';
                elem.classList.add(this.elementClass);
            } else {                                                        /* рест-оператор - массив с классами. Каждый из этих переданных классов назначаем карточке */
                this.classes.forEach(className => {
                    elem.classList.add(className);
                });
            }
            
            elem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(elem);
        }
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, alt, title, descr, price}) => {
                new MenuCard(img, alt, title, descr, price, '.menu .container').rander();
            });
        });
}

export default cards;