import {plusModal, minusModal} from './modal';
import {postData} from '../services/services';
// ОТПРАВКА ДАННЫХ НА СЕРВЕР ИЗ ФОРМ С ПОМОЩЬЮ AJAX:
function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector),
          message = {
              loading: 'img/spinner/spinner.svg',
              success: 'Спасибо! Скоро мы с Вами свяжемся',
              failure: 'Что-то пошло не так...'
          };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');                                    /* динамически создаём и настраиваем спиннер загрузки */
            statusMessage.style.cssText = 'display: block; margin: 0 auto;';
            statusMessage.src = message.loading;
            form.insertAdjacentElement('afterend', statusMessage);                                  /* помещаем спиннер ПОСЛЕ формы */

            const formData = new FormData(form),                                                    /* экземпляр объекта formData для формирования данных из форм */
                  json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {                                                                        /* catch - "не успешно" */
                showThanksModal(message.failure);
            }).finally(() => {                                                                      /* finally - "в любом случае" */
                form.reset();
            });                                                
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        plusModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>      
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {                                                                          /* через 4 секунды удаляем динамически созданный блок и делаем видемым прежнее модальное окно. Сразу закрываем его */
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            minusModal('.modal');
        }, 4000);
    }
    //                                                                                             -> функция, отображающая окно с сообщением (благодарность либо ошибка) после отправки данных пользователем на 4 секунды.
}

export default forms;