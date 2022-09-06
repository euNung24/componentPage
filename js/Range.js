import Component from "./Component.js";

export default class Range extends Component {
    setElements() {
        console.log(this.$element.dataset)
        const {min, max, minValue, maxValue, step} = this.$element.dataset;

        this.$element.innerHTML = `
            <input type="range" class="input-left" name="max" min=${min} max=${max} value=${minValue} step=${step}>
            <input type="range" class="input-right" name="max" min=${min} max=${max} value=${maxValue} step=${step}>

            <div class="slider">
                <div class="track"></div>
                <div class="range"></div>
                <div class="thumb left"><span class="thumb-min"></span></div>
                <div class="thumb right"><span class="thumb-max"></span></div>
            </div>`;

        if(min &&  max && step && minValue) {
            for (let i = parseInt(min, 10)+parseInt(step, 10); i < parseInt(max, 10); i += parseInt(step, 10)) {
                const span = document.createElement('span');
                span.classList.add('step');
                span.style.left = `${i}%`
                this.$element.querySelector('.slider')?.appendChild(span)
            }
        }

        const slider = this.$element.querySelector('.slider');
        const range = slider?.querySelector('.range');
        const thumbLeft = slider.querySelector('.slider .thumb.left');
        const thumbRight = slider.querySelector('.thumb.right');
        slider.querySelector('.thumb-min').textContent = this.$element.querySelector(".input-left").value;
        slider.querySelector('.thumb-max').textContent = this.$element.querySelector(".input-right").value;
        thumbLeft.style.left = `${minValue}%`;
        range.style.left = `${minValue}%`;
        range.style.right = `${max - maxValue}%`;
        thumbRight.style.left = `${maxValue - 2}%`;
        // range.style.right = `${parseInt(minValue, 10) -3}%`;
        // thumbRight.style.right = `${parseInt(minValue, 10)  -3}%`;
        // range.style.right = `${parseInt(max, 10) - parseInt(maxValue, 10)}%`;
        // thumbRight.style.right = `${parseInt(max, 10) - parseInt(maxValue, 10)}%`;
    }

    setEvents() {
        const slider = this.$element.querySelector('.slider');
        const range = slider?.querySelector('.range');
        const thumbLeft = slider.querySelector('.slider .thumb.left');
        const thumbRight = slider.querySelector('.thumb.right');
        const inputLeft = this.$element.querySelector('.input-left');
        const inputRight = this.$element.querySelector('.input-right');

        inputLeft?.addEventListener('input', () => {
            const [min, max] = [parseInt(inputLeft.min), parseInt(inputLeft.max)];
            inputLeft.value = Math.min(parseInt(inputLeft.value), parseInt(inputRight.value) - parseInt(inputLeft.step)).toString();

            const inputValue = parseInt(inputLeft.value, 10)
            const percent = ((inputValue - min) / (max-min)) * 100;
            thumbLeft.style.left = `${percent}%`;
            range.style.left = `${percent}%`;
            slider.querySelector('.thumb-min').textContent = this.$element.querySelector(".input-left").value;

        })

        inputRight?.addEventListener('input', () => {
            const [min, max] = [parseInt(inputRight.min), parseInt(inputRight.max)];
            inputRight.value = Math.max(parseInt(inputRight.value), parseInt(inputLeft.value) + parseInt(inputRight.step)).toString();

            const inputValue = parseInt(inputRight.value, 10)
            const percent = ((inputValue - min) / (max-min)) * 100;
            thumbRight.style.left = `${percent - 2}%`;
            range.style.right = `${100 - percent}%`;
            slider.querySelector('.thumb-max').textContent = this.$element.querySelector(".input-right").value;
        })
    }
}

