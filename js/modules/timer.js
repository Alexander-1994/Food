// ТАЙМЕР:
function timer(id, deadline) {
    function getTimeRemaining(endtime) {
        const r = Date.parse(endtime) - Date.parse(new Date());
        let days, hours, minutes, seconds;

        if (r <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(r / 1000 / 60 / 60 / 24);
            hours = Math.floor(r / 1000 / 60 / 60 % 24);
            minutes = Math.floor(r / 1000 / 60 % 60);
            seconds = Math.floor(r / 1000 % 60);
        }
        
        return {
            'total': r,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //                                                                      -> функция  getTimeRemaining возвращает объект с разницей м/у реальным временем и отправной точкой(в ms), так же вычисленные дни/часы/минуты/секунды 
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    //                                                                      -> функция getZero приплюсовывает нолик спереди к числам в днях/часах/минутах/секундах, если они меньше 10
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML =  getZero(t.days);
            hours.innerHTML =  getZero(t.hours);
            minutes.innerHTML =  getZero(t.minutes);
            seconds.innerHTML =  getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
        //                                                                  -> функция updateClock ежесекундно обновляет таймер на странице, благодаря setInterval, который прописан выше. Благодаря этому и виден обратный отсчёт на странице
    }
    //                                                                      -> функция setClock устанавливает таймер на странице
    setClock(id, deadline);
}

export default timer;