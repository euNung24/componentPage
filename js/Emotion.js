import Component from "./Component.js";

export default class Emotion extends Component {
    setTemplate() {
        return `   
            <div class="clicked-emotion">+</div> 
            <div class="emotion-group">
                <div class="emotion-good"></div>
                <div class="emotion-sad"></div>
                <div class="emotion-like"></div>
                <div class="emotion-bad"></div>
                <div class="emotion-thumbsUp"></div>
                <div class="emotion-thumbsDown"></div>
            </div>
        `
    }

    render() {
        this.$element.innerHTML = this.setTemplate();
    }

    setEvents() {
        const regex = /emotion-good|emotion-sad|emotion-like|emotion-bad|emotion-thumbsUp|emotion-thumbsDown/g;

        this.$element.querySelector('.emotion-group').addEventListener('click', ({target}) => {
            const clickedEl = this.$element.querySelector('.clicked-emotion');
            clickedEl.className = clickedEl.className.replace(regex, '');
            clickedEl.classList.add(target.classList);
            clickedEl.innerHTML = `<span class="remove-emotion">x</span>`;
            const { width } = clickedEl.getBoundingClientRect();
            this.$element.querySelector('.remove-emotion').style.left = Number(width) + 10 + 'px';
            clickedEl.style.verticalAlign = "middle";
            this.$element.querySelector('.emotion-group').style.display = "none";
        })

        this.$element.addEventListener('click', ({target}) => {
            if(target.classList.contains('clicked-emotion')) {
                this.$element.querySelector('.emotion-group').style.display = "block";
            }


            if(target.classList.contains('remove-emotion')) {
                const clickedEl = this.$element.querySelector('.clicked-emotion');
                clickedEl.className = clickedEl.className.replace(regex, '');
                clickedEl.textContent = "+";
            }


        })
    }
}

