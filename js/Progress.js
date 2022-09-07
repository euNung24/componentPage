import Component from "./Component.js";

export default class Progress extends Component {
    setElements() {
        const {min, max, value} = this.$element.dataset;
        // this.$element.style.width = `${(parseInt(max, 10)-parseInt(min, 10)) * 5}px`;
        this.$element.style.width = `100%`;
        this.$element.querySelector('.progress-bar').style.width = `${Number(value) / (Number(max)-Number(min))* 100}%`;
    }

    setTemplate() {
        const {value} = this.$element.dataset;
        return `<span class="progress-value">${parseFloat(value).toFixed(1)}</span>`
    }

    render() {
        this.$element.querySelector('.progress-bar').innerHTML = this.setTemplate();
        const [progressWidth, barWidth, valueWidth] = [this.$element, this.$element.querySelector('.progress-bar'), this.$element.querySelector('.progress-value')].map((el) => Math.round(el.getBoundingClientRect().width));
        console.log(this.$element, barWidth + valueWidth, progressWidth)
        if(barWidth + valueWidth >= progressWidth * 0.9) {
            this.$element.querySelector('.progress-value').style.left = 'auto';
            this.$element.querySelector('.progress-value').style.right = 0;

        }
    }

    setEvents() {
        window.addEventListener('resize', this.render.bind(this))
    }
}
