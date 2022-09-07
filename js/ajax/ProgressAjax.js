import Component from "../Component.js";

export default class ProgressAjax extends Component {
    setElements() {
        // const {min, max, value} = progress.dataset;
        // progress.style.width = `${(parseInt(max, 10)-parseInt(min, 10)) * 5}px`;
        // progressBar.style.width = `${parseInt(value, 10) / (parseInt(max, 10)-parseInt(min, 10))* 100}%`;

        const {min, max, value} = this.$data;
        console.log(this.$data)
        // this.$element.style.width = `${(parseInt(max, 10)-parseInt(min, 10)) * 5}px`;
        this.$element.style.width = `100%`;
        this.$element.querySelector('.progress-bar').style.width = `${Number(value) / (Number(max)-Number(min))* 100}%`;
    }

    setTemplate() {
        const {value} = this.$data;
        return `<span class="progress-value">${parseFloat(value).toFixed(1)}</span>`
    }

    render() {
        this.$element.querySelector('.progress-bar').innerHTML = this.setTemplate();
        const [progressWidth, barWidth, valueWidth] = [this.$element, this.$element.querySelector('.progress-bar'), this.$element.querySelector('.progress-value')].map((el) => Math.round(el.getBoundingClientRect().width));
        if(barWidth + valueWidth >= progressWidth) {
            this.$element.querySelector('.progress-value').style.left = 'auto';
            this.$element.querySelector('.progress-value').style.right = 0;

        }
    }
}


