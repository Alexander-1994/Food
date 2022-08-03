/* СЛАЙДЕР (вариант №1): 
    let sliderIndex = 1;
    const prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          slides = document.querySelectorAll('.offer__slide');

    showSlider(sliderIndex);

   if (slides.length < 10) {                                                   
       total.textContent = `0${slides.length}`;
   } else {
       total.textContent = slides.length;
   }

    function showSlider(n) {
        if (n > slides.length) {                                               
            sliderIndex = 1;
        }
        if (n < 1) {                                                           
            sliderIndex = slides.length;
        }

        slides.forEach(item => {                                               
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        slides[sliderIndex - 1].classList.add('show', 'fade');                
        slides[sliderIndex - 1].classList.remove('hide');

        if (slides.length < 10) {                                              
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }
    }

    function plusSlides(n) {
        showSlider(sliderIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });
    next.addEventListener('click', () => {
        plusSlides(1);
    }); */

// СЛАЙДЕР (вариант №2) с нав. точками:
function slider({prevArrow, nextArrow, currentCounter, totalCounter, container, wrapper, field, slide, }) {
    let sliderIndex = 1,
        offset = 0;

    const prev = document.querySelector(prevArrow),                             /* <- */
          next = document.querySelector(nextArrow),                             /* -> */
          current = document.querySelector(currentCounter),                     /* текущий слайд */
          total = document.querySelector(totalCounter),                         /* всего слайдов */
          slidesWrapper = document.querySelector(wrapper),                      /* обёртка слайдов */
          slidesField = document.querySelector(field),                          /* поле со слайдами */
          slides = document.querySelectorAll(slide),                            /* слайды */
          width = window.getComputedStyle(slidesWrapper).width,                 /* получаем ширину обёртки слайдов */
          slider = document.querySelector(container);                           /* слайдер целиком */

    if (slides.length < 10) {                                                  
        total.textContent = `0${slides.length}`;
        current.textContent = `0${sliderIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = sliderIndex;
    }

    slidesField.style.cssText = `
        width: calc(100% * ${slides.length}); 
        display: flex; 
        transition: 0.8s all;
    `;

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';                                         /* чтобы "точки" абсолютно спозиционировать */

    const indicators = document.createElement('ol'),                            /* созд. динамически обёртку точкам */
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');                               /* созддаем точек ровно столько, сколько и слайдов */
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);                               /* чтобы каждую из точек привязать к опред. слайду, мы присваеваем дата-атрибут. У каждой последующей точки значение атрибута будет на единицу больше */
        if (i == 0) {
            dot.style.opacity = 1;                                              /* у "активной" точки прозрачности не будет */
        }
        indicators.append(dot);                                                 /* помещаем созданные точки в обёртку */
        dots.push(dot);                                                         /* и пушим их в массив dots для удобной работы вдальнейшем */
    }

    function performSliderOffset() {                                            /* функция которая "двигает" слайды вправо и влево */
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function deleteNotDigits(str) {                                             /* функция берет строку и удаляет в ней все нечисла (замена на пустую строку) */
       return +str.replace(/\D/g, '');
    }

    function settingCurrent(cntr) {                                             /* функция привязывает счетчик отображения слайда к значению slideIndex в текущий момент */
        if (slides.length < 10) {
            cntr.textContent = `0${sliderIndex}`;
        } else {
            cntr.textContent = sliderIndex;
        }
    }

    function setDotsTransparency() {                                            /* функция, задающая прозрачность всем точкам, кроме "активной" */
        dots.forEach(item => item.style.opacity = 0.5);                         
        dots[sliderIndex - 1].style.opacity = 1;                                
    }

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        performSliderOffset();

        if (sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }

        settingCurrent(current);
        setDotsTransparency();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        performSliderOffset();

        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }

        settingCurrent(current);
        setDotsTransparency();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');               /* при клике на точку мы получаем ЗНАЧЕНИЕ дата-атрибута этой точки и кладем его в переменную */

            sliderIndex = slideTo;                                                /* присваеваем это ЗНАЧЕНИЕ переменной slideIndex */
            offset = deleteNotDigits(width) * (slideTo - 1);                      /* смещение слайдов будет равно произведению ширины слайдера на значение атрибута кликнутой точки минус один */
            performSliderOffset();
            settingCurrent(current);
            setDotsTransparency();
        });
    });
}

export default slider;