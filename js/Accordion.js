import Component from "./Component.js";

export default class Accordion extends Component {
    setEvents() {
        this.$element.addEventListener('click', ({target}) => {
            if(target.classList.contains('accordion-toggle')) {
                const el = target.closest('.accordion-item');
                if(!this.$element.classList.contains('showAlways')) {
                    el?.querySelector('.accordion-body.show') !== this.$element.querySelector('.accordion-body.show')
                    && this.$element.querySelector('.accordion-body.show')?.classList.remove('show');
                }
                el?.querySelector('.accordion-body')?.classList.toggle('show')
            }
        })
    }
}

