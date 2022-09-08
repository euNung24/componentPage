import Component from "./Component.js";

export default class Time extends Component {
    setElements() {
        let template = document.createElement('template');
        let fragment = new DocumentFragment();

        const { step } = this.$element.dataset;
        [this.currentHour, this.currentMin] = [new Date().getHours(), new Date().getMinutes()];
        const {closeHour, closeMinute} = this.getCloseTime(new Date().getHours(), new Date().getMinutes());
        template.innerHTML = `
        <p class="selected-time"><span class="selected-hour">${closeHour}</span> : <span class="selected-minute">${closeMinute}</span></p>
        <button class="toggle-button">시간</button>
        <div class="time-wrapper">
            <div class="day-night"><span>오전</span><span>오후</span></div>
            <div class="time-box"></div>
<!--            <div class="hour-box">-->
<!--                <div class="hour">-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="minute-box">-->
<!--                <div class="minute">-->
<!--                </div>-->
<!--            </div>-->
        </div>
        `
        fragment.appendChild(template.content);
        this.$element.appendChild(fragment);

        const timeWrapper = this.$element.querySelector('.time-box');

        for (let i = 1; i <= 12; i++) {
            for (let j = 0; j < 60; j += parseInt(step, 10)) {
                const timeDiv = document.createElement('div');
                timeDiv.classList.add('time-group');
                (Number(closeHour) === i && Number(closeMinute) === j) && timeDiv.classList.add('time-mark')
                timeDiv.innerHTML = `<span class="time-hour">${this.setTwoDigits(i)}</span><span>:</span><span class="time-minute">${this.setTwoDigits(j)}</span>`;
                timeWrapper.appendChild(timeDiv);
            }
        }
    }

    setEvents() {
        let lastScroll = 0;
        const timeWrapper = this.$element.querySelector('.time-wrapper');
        const hourBox = timeWrapper?.querySelector('.hour');
        const minuteBox = timeWrapper?.querySelector('.minute');

        this.$element.querySelector('.toggle-button')?.addEventListener('click', () => {
            this.$element.querySelectorAll('.selected')?.forEach(el => el.classList.remove('selected'));
            timeWrapper?.classList.toggle('show');
            const timeBoxEl = timeWrapper.querySelector('.time-box');
            const [firstEl, markEl] = [timeBoxEl.firstChild, timeBoxEl.querySelector('.time-mark')]
            const [firstY, markY] = [firstEl.getBoundingClientRect().y, markEl.getBoundingClientRect().y];
            // 가장 상단 위치
            timeWrapper.querySelector('.time-box').scrollTop = markY - firstY;
            // 중간 위치
            // timeWrapper.querySelector('.time-box').scrollTop = markY - firstY - timeBoxEl.getBoundingClientRect().height / 2;
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

        timeWrapper.querySelector('.time-box').addEventListener('scroll', (e) => {
            if(e.target.scrollTop > lastScroll) {
                if(e.target.scrollTop > e.target.scrollHeight / 2) {
                    const firstEl = e.target.firstChild;
                    e.target.removeChild(firstEl);
                    e.target.appendChild(firstEl);
                }
            } else {
                if(e.target.scrollTop < e.target.scrollHeight / 2) {
                    const lastEl = e.target.lastChild;
                    e.target.removeChild(lastEl);
                    e.target.insertBefore(lastEl, e.target.firstChild);
                }
            }
            lastScroll = e.target.scrollTop;
        })
    }

    setTwoDigits(num) {
        return num < 10  ? '0'+num : num;
    }

    setInTwelve(num) {
        return num > 12 ? this.setTwoDigits(num - 12) : this.setTwoDigits(num);
    }

    /**
     * 현재 시간과 설정한 분에 가까운 시, 분 반환
     * @param currentHour
     * @param currentMinute
     * @returns {{closeHour, closeMinute}|string}
     */
    getCloseTime(currentHour, currentMinute) {
        const { step } = this.$element.dataset;
        const minArr = [...new Array(Math.floor(60 / step))].map((v, i) => i === 0 && currentMinute > 30 ? 60 : i * step);
        if(minArr.findIndex(v => v === currentMinute) >= 0) {
            return ({ closeHour: this.setTwoDigits(currentHour), closeMinute: this.setTwoDigits(currentMinute)})
            return this.setTwoDigits(currentMinute);
        }
        const getMin = Math.min(...minArr.map(v => Math.abs(currentMinute - v)));
        let closeMin = minArr.find((v) => Math.abs(currentMinute - v) === getMin);

        if(closeMin < currentMinute) {
            closeMin += Number(step);
        }
        if(closeMin >= 60) {
            closeMin -= 60;
            currentHour++;
        }
        return ({ closeHour: this.setTwoDigits(currentHour), closeMinute: this.setTwoDigits(closeMin) });
    }
}