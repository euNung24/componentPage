import Component from "../Component.js";

export default class CheckboxAjax extends Component{
    setTemplate() {
        return this.$data.map(data => `
            <input class="form-check-input" type="checkbox" id=${data.id} value=${data.id}>
            <label class="form-check-label" for="${data.id}">${data.value}</label>
        `).join('');
    }

    render() {
        this.$element.innerHTML = this.setTemplate();
    }
}