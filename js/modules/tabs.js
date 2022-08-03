// ТАБЫ:
function tabs(tabSelector, tabcontentSelector, parentSelector, classActive) {
    const tabs = document.querySelectorAll(tabSelector),                                 
          tabsContent = document.querySelectorAll(tabcontentSelector),
          tabsParent = document.querySelector(parentSelector);
    //                                                                    -> получаем нужные элементы со страницы
    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove(classActive);
        });
    }
    //                                                                    -> hideTabsContent() будет скрывать все табы
    function showTabsContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(classActive);
    }
    //                                                                    -> showTabsContent() будет показывать табы (i = 0 - ЕСЛИ ФУНКЦИЯ ВЫЗЫВАЕТСЯ БЕЗ АРГУМЕНТА, ТО ПО УМОЛЧАНИЮ ОН БУДЕТ НОЛЬ. ПРИ ЗАГРУЗКЕ СТР. ОТОБРАЗИТСЯ ПЕРВЫЙ ТАБ)
    hideTabsContent();
    showTabsContent();
    //                                                                    -> вызываем эти функции
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabsContent();
                showTabsContent(i);
            }
        });
    });
    //                                                                    -> если объект события эемента, на который пришло событие КЛИК равен элементу, перебираемому в данный момент методом forEach - то выполнятся функции скрытия табов и отображения таба с индексом данного элемента, в качестве аргумента! 
}

export default tabs;