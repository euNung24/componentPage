import Component from "./Component.js";

export default class Calendar extends Component {
    setElements() {
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth() + 1;

        const template = document.createElement('template');
        const fragment = new DocumentFragment();
        template.innerHTML = `
            <div class="clickedDate">
                <span>
                    <span class="selected-year">${new Date().getFullYear()}</span>
                    -
                    <span class="selected-month">${this.setTwoDigits(new Date().getMonth() + 1)}</span>
                    -
                    <span class="selected-day">${this.setTwoDigits(new Date().getDate())}</span>
                </span>
                <button class="calendar-btn">기간</button>
            </div>                
            <div class="calendar">
            </div>
        `
        fragment.appendChild(template.content);
        this.$element.appendChild(fragment);
    }

    setTemplate() {
        let firstDay = new Date(this.year, this.month-1, 1, 0, 0, 0).getDay();
        let lastDate = new Date(this.year, this.month, 0, 0, 0, 0).getDate();
        let weekSeq = Math.floor((lastDate + firstDay - 1) / 7 + 1);
        return `
        <div class="yearMonth">
              <div class="year">${this.year}</div>
              <div class="month">${this.month}</div>
              <div class="calendar-button-group">
                <button class="prev">Prev</button>
                <button class="next">Next</button>
              </div>
            </div>
            <div class="weekday">
              <div>일</div>
              <div>월</div>
              <div>화</div>
              <div>수</div>
              <div>목</div>
              <div>금</div>
              <div>토</div>
            </div>
            ${[...Array(weekSeq)].map((_, i) =>
            `<div class="week${i}">
                    ${[...Array(7)].map((_, j) => {
                const date = i * 7 + j - firstDay + 1;
                if(date < 1 || date > lastDate) return `<div></div>`
                return `<div class="day">${date}</div>`}).join('')
            }
                </div>`
        ).join('')}`
    }

    render() {
        fetch(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${this.year}&solMonth=${this.setTwoDigits(this.month)}&_type=json&ServiceKey=T9vZVWD4DUCcBZITtVWmnhlD5hkaLI%2BVQcpHsxNuUdqSYscKbqO6KWnV0PQAgFIvV89g%2BjEirNcPf60sC7C2CA%3D%3D`)
            .then(response => response.json())
            .then(data => {
                console.log(typeof data.response.body.items.item, Array.isArray(data.response.body.items.item))
                    if(data.response.body.totalCount == 1) {
                        this.holiArr = data.response.body.items.item.isHoliday === 'Y' ? [data.response.body.items.item.locdate.toString().substring(6, 8)] : [];
                    } else if(data.response.body.totalCount > 1) {
                        this.holiArr = Array.from(data.response.body.items.item).map(data => data.isHoliday === 'Y' && data.locdate.toString().substring(6, 8)) || [];
                    } else {
                        this.holiArr = [];
                    }
                    this.$element.querySelector('.calendar').innerHTML = this.setTemplate();
                    console.log(this.holiArr)
                    this.holiArr.map(day => this.$element.querySelectorAll('.day')[+day - 1].style.color = "red")
                }
            );
    }

    setEvents() {
        this.$element?.addEventListener('click', ({target}) => {
            if(target.classList.contains('prev')) {
                --this.month;
                if(this.month === 0) {
                    this.month = 12;
                    --this.year;
                }
                this.render();
            }

            if(target.classList.contains('next')) {
                ++this.month;
                if(this.month === 13) {
                    this.month = 1
                    ++this.year
                }
                this.render();
            }

            if(target.classList.contains('calendar-btn')) {
                this.$element.querySelector('.calendar')?.classList.toggle('show');
            }

            if(target.classList.contains('day')) {
                const year = this.$element.querySelector('.year').textContent;
                const month = this.$element.querySelector('.month').textContent;
                const day = target.textContent;
                this.$element.querySelector('.selected-year').textContent = year;
                this.$element.querySelector('.selected-month').textContent = this.setTwoDigits(month);
                this.$element.querySelector('.selected-day').textContent = this.setTwoDigits(day);
                this.$element.querySelector('.form-calendar-input').value = `${year}-${this.setTwoDigits(month)}-${this.setTwoDigits(day)}`;
            }

        })
    }

    setTwoDigits(value) {
        return value < 10 ? `0${value}` : value
    }
}

