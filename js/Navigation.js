import Component from "./Component.js";

export default class Navigation extends Component {
    setElements() {
        const hamburger = document.createElement("div");
        hamburger.classList.add("nav-hamburger-box");
        this.$element.insertBefore(hamburger, this.$element.firstChild);
    }

    setTemplate() {
        return `<div class="nav-hamburger"></div>`;
    }

    render() {
        this.$element.querySelector('.nav-hamburger-box').innerHTML = this.setTemplate();
    }

    setEvents() {
        this.$element.querySelector('.nav-hamburger-box').addEventListener("click", ({target}) => {
            this.$element.querySelector('.nav').classList.toggle('show');
        })
    }
}
