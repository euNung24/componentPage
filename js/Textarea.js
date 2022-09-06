import Component from "./Component.js";
export default class Textarea extends Component{
    constructor(element) {
        super(element);
    }

    setEvents() {
        const textarea = this.$element.querySelector('.textarea-smart');
        textarea?.addEventListener('keyup', () => {
            // @ts-ignore
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`
        })

    }
}

document.querySelectorAll('.form-textarea').forEach(el => new Textarea(el))