function plusModal(modalSelector, timer) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    
    if (timer) {
        clearInterval(timer);
    }
}
//                                                                          -> функция для отображения мод. окна
function minusModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}
//                                                                          -> функция для скрытия мод. окна

// МОДАЛЬНОЕ ОКНО:
function modal(triggerSelector, modalSelector, timer) {
    const btnСonnection = document.querySelectorAll(triggerSelector),
          modalWindow = document.querySelector(modalSelector); 

    btnСonnection.forEach(item => {
        item.addEventListener('click', () => plusModal(modalSelector, timer));
    });
    //                                                                      -> при клике на кнопки отобразится мод. окно
    modalWindow.addEventListener('click', (e) => {
        const target = e.target;

        if (target === modalWindow || target.getAttribute('data-close') == '') {
            minusModal(modalSelector);
        }
    });
    //                                                                      -> при клике на задний фон или крестик скроется мод. окно
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            minusModal(modalSelector);
        }
    });
    //                                                                      -> при нажатии ESC на клавиатуре мод. окно скроется
   
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            plusModal(modalSelector, timer);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    //                                                                      -> функция, отображающая мод. окно после долистывания пользователем сайта до конца (срабатывает 1 раз)
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {plusModal, minusModal};