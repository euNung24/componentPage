import Component from "./Component.js";

export default class Time extends Component {
    setElements() {
        let template = document.createElement('template');
        let fragment = new DocumentFragment();

        template.innerHTML = `
        <p class="selected-time"><span class="selected-hour">${this.setTwoDigits(new Date().getHours())}</span> : <span class="selected-minute">${this.setTwoDigits(new Date().getMinutes())}</span></p>
        <button class="toggle-button">시간</button>
        <div class="time-wrapper">
            <div class="hour-box">
                <div class="hour">
                </div>
            </div>
            <div class="minute-box">
                <div class="minute">
                </div>
            </div>
        </div>
        `
        fragment.appendChild(template.content);
        this.$element.appendChild(fragment);

        const timeWrapper = this.$element.querySelector('.time-wrapper');

        const { start, end, min, hour } = this.$element.dataset;
        console.log(start, this.$element)
        const [startHour, startMin] = start.split(':').map(el => parseInt(el, 10));
        let [endHour, endMin] = end.split(':').map(el => parseInt(el, 10));

        const hourDiv = document.createElement('div');
        for (let i = startHour; i <= endHour; i += parseInt(hour, 10)) {
            const template = document.createElement('template');
            template.innerHTML = `<div>${this.setTwoDigits(i)}</div>`
            hourDiv.appendChild(template.content);
        }
        timeWrapper.querySelector('.hour').innerHTML = hourDiv.innerHTML;

        const minDiv = document.createElement('div');

        for (let i = 0; i < 60; i += parseInt(min, 10)) {
            const template = document.createElement('template');
            template.innerHTML = `<div>${this.setTwoDigits(i)}</div>`
            minDiv.appendChild(template.content);
        }
        timeWrapper.querySelector('.minute').innerHTML = minDiv.innerHTML;

    }

    setEvents() {
        const timeWrapper = this.$element.querySelector('.time-wrapper');
        const hourBox = timeWrapper?.querySelector('.hour');
        const minuteBox = timeWrapper?.querySelector('.minute');

        this.$element.querySelector('.toggle-button')?.addEventListener('click', () => {
            this.$element.querySelectorAll('.selected')?.forEach(el => el.classList.remove('selected'));
            timeWrapper?.classList.toggle('show');

        })

        hourBox?.addEventListener('click', ({target}) => {
            hourBox.querySelector('.selected')?.classList.remove('selected');
            if (target !== hourBox) {
                target.classList.add('selected');
                this.$element.querySelector('.selected-hour').textContent = target.textContent;
                this.$element.querySelector('.form-time-input').value = `${this.setTwoDigits(target.textContent)}:${this.$element.querySelector('.selected-minute').textContent}`
            }
        })

        minuteBox?.addEventListener('click', ({target}) => {
            minuteBox.querySelector('.selected')?.classList.remove('selected');
            if (target !== minuteBox) {
                target.classList.add('selected');
                this.$element.querySelector('.selected-minute').textContent = target.textContent;
                this.$element.querySelector('.form-time-input').value = `${this.$element.querySelector('.selected-hour').textContent}:${target.textContent}`
            }
        })
    }

    setTwoDigits(num) {
        return num < 10  ? '0'+num : num;
    }
}