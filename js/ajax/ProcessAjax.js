import Component from "../Component.js";

export default class ProcessAjax extends Component {
    setTemplate() {
        return this.$data.map(data => `
            <span class="process-item ${data.active ? "active" : ""}">${data.text}</span>
        `).join('');
    }

    render() {
        this.$element.innerHTML = this.setTemplate();
    }
    setEvents() {
        this.$element.addEventListener('click', ({target}) => {
            // console.log(target);
            this.$element.querySelector('.active')?.classList.remove('active');
            target.classList.add('active');
        })
    }
}

