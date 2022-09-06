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
        this.$element.querySelector('.clicked-emotion').addEventListener('click', () => {
            this.$element.querySelector('.emotion-group').style.display = "block";
        })

        this.$element.querySelector('.emotion-group').addEventListener('click', ({target}) => {
            const regex = /emotion-good|emotion-sad|emotion-like|emotion-bad|emotion-thumbsUp|emotion-thumbsDown/g;
            const clickedEl = this.$element.querySelector('.clicked-emotion');
            clickedEl.className = clickedEl.className.replace(regex, '')
            clickedEl.classList.add(target.classList);
            clickedEl.textContent = '';
            clickedEl.style.verticalAlign = "middle";
            this.$element.querySelector('.emotion-group').style.display = "none";
        })
    }
}

