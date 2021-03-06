function attachEventsListeners() {
    let mainElement = document.getElementsByTagName('main')[0];
    mainElement.addEventListener('click', onClick);

    function onClick(e) {
        let current = e.target;
        if (current.type == 'button') {
            convertingTime(current)
        }
    }

    function convertingTime(current) {
        let days = document.getElementById('days');
        let hours = document.getElementById('hours');
        let minutes = document.getElementById('minutes');
        let seconds = document.getElementById('seconds');

        if (days.value) {
            let d = Number(days.value);
            hours.value = d*24;
            minutes.value = d*1440;
            seconds.value = d*86400;
        } else if (hours.value) {
            let h = Number(hours.value);
            days.value = h/24;
            minutes.value = h*60;
            seconds.value = h*60*60;
        } else if (minutes.value) {
            let m = Number(minutes.value);
            days.value = m/24/60;
            hours.value = m/60;
            seconds.value = m*60;
        } else if (seconds.value) {
           let s = Number(seconds.value);
               days.value = s/24/60/60;
               hours.value=s/60/60;
               minutes.value = s/60;      
        }


    }
}