import Component from "../Component.js";

export default class RadioAjax extends Component{
    setTemplate() {
        return this.$data.map(data => `
            <input class="form-radio-input" type="radio" id=${data.id} value=${data.id}>
            <label class="form-radio-label" for="${data.id}">${data.value}</label>
        `).join('');
    }

    render() {
        this.$element.innerHTML = this.setTemplate();
    }
}