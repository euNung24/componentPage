import Component from "./Component.js";

export default class Star extends Component {
    setElements() {
        const { min , max, value } = this.$element.dataset;
        let starValue = Number(value);
        const starGroupEl = document.createElement('div');
        starGroupEl.classList.add('star-group');
        for (let i = parseInt(min, 10); i < parseInt(max, 10); i++) {
            const template = document.createElement('template');
            // const fragment = new DocumentFragment();

            template.innerHTML = `
                ${starValue >= 1 ? `<div class="star-item star-fill" data-point="${i+1}"></div>` : ''}
                ${starValue >= 0.5 && starValue < 1 ? `<div class="star-item star-half" data-point="${i+1}"></div>` : ''}
                ${starValue < 0.5? `<div class="star-item star-empty" data-point="${i+1}"></div>` : ''}
            `
            starGroupEl.appendChild(template.content);
            starValue -= 1;
        }
        this.$element.appendChild(starGroupEl);

        if(this.$element.classList.contains('eval')) {
            const button = document.createElement('button');
            button.classList.add("reset-btn");
            button.textContent = "취소";
            this.$element.appendChild(button);
        }
        this.lockedStar = false;
    }

    setEvents() {
        this.$element.addEventListener('mousemove', (e) => {
            if(!this.$element.classList.contains('eval') || this.lockedStar) {
                return;
            }

            const { offsetX, target } = e;
            const index = parseInt(target.dataset.point, 10) - 1;
            const { width } = target.getClientRects()[0];
            const isOverHalf = offsetX > width / 2;

            this.renderStar({clientIndex: index,  isOverHalf});
        })

        this.$element.addEventListener('click', (e) => {
            const { target } = e;
            if(target.classList.contains("reset-btn")) {
                this.$element.querySelector('.checked')?.classList.remove("checked");
                this.lockedStar = false;
            }

            if(target.classList.contains("star-item")) {
                if(target.classList.contains("checked")) {
                    this.$element.querySelector('.checked')?.classList.remove("checked");
                    this.lockedStar = false;
                } else {
                    this.$element.querySelector('.checked')?.classList.remove("checked");
                    target.classList.add('checked');
                    const { offsetX } = e;
                    const index = parseInt(target.dataset.point, 10) - 1;
                    const { width } = target.getClientRects()[0];
                    const isOverHalf = offsetX > width / 2;

                    this.renderStar({clientIndex: index,  isOverHalf});
                    this.lockedStar = true;

                }

            }
        })
    }

    renderStar(payload={}) {
        const { clientIndex = -1, isOverHalf = false } = payload;
        const regex = /star-fill|star-half|star-empty/g;

        [...this.$element.querySelectorAll('.star-item')].forEach((el, idx) => {
            el.className = idx < clientIndex ? el.className.replace(regex, 'star-fill') : el.className.replace(regex, 'star-empty')

            if (clientIndex === idx) {
                el.className = isOverHalf ? el.className.replace(regex, 'star-fill') : el.className.replace(regex, 'star-half')
            }
        })
    }


}
