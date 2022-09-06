import Component from "./Component.js";
import { closeAllSelect } from "./utils.js";

export default class Select extends Component{
    setElements() {
        this.select = this.$element.querySelector('select');
        this.options = Array.from(this.select.querySelectorAll('option'));
        let template = document.createElement('template');
        let fragment = new DocumentFragment();
        template.innerHTML = `
            <div class="select-group">
                <div class="select-selected">
                    ${this.select?.options[this.select.selectedIndex].textContent}
                </div>
                <div class="select-items select-hide">
                    ${this.options.map(el => `<div>${el.text}</div>`).join('')}
                </div>
            </div>
            `
        fragment.appendChild(template.content);
        this.$element.appendChild(fragment)
    }

    setEvents() {
        const selectedDiv = this.$element.querySelector('.select-selected');
        const selectDiv = this.$element.querySelector('.select-items');

        document.addEventListener('click', (e) => closeAllSelect(e.target));

        selectedDiv?.addEventListener('click', function () {
            selectDiv?.classList.toggle('select-hide');
            selectedDiv?.classList.toggle('select-arrow-active');
        })

        selectDiv?.addEventListener('click', (e) => {
            this.$element.querySelector('.same-as-selected')?.removeAttribute('class');
            const target = e.target;
            for (let i = 0; i < this.options.length; i++) {
                if(this.select?.options[i].innerHTML === target?.textContent) {
                    this.select.selectedIndex = i;
                    selectedDiv.textContent = target.textContent;
                    target.classList.add('same-as-selected');
                    selectDiv?.classList.toggle('select-hide');
                    selectedDiv?.classList.toggle('select-arrow-active');
                    break;
                }
            }
        })
    }
}