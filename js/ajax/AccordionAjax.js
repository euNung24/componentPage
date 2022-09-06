import Component from "..//Component.js";

export default class AccordionAjax extends Component {
    setTemplate() {
        console.log(this.$data)
        return this.$data.map(list => `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-toggle">${list.title}</button>
                </h2>
                <ul class="accordion-body">
                    ${list.items.map(item => `
                        <li class="accordion-body-item">${item.link ? `<a href=${item.link}>${item.text}</a>` : item.text}</li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
    }

    render() {
        this.$element.innerHTML = this.setTemplate();
    }

    setEvents() {
        this.$element.addEventListener('click', ({target}) => {
            if(target.classList.contains('accordion-toggle')) {
                const el = target.closest('.accordion-item');

                if(!this.$element.classList.contains('showAlways')) {
                    el?.querySelector('.accordion-body.show') !== this.$element.querySelector('.accordion-body.show')
                    && this.$element.querySelector('.accordion-body.show')?.classList.remove('show');
                }
                el?.querySelector('.accordion-body')?.classList.toggle('show');
            }
        })
    }
}

