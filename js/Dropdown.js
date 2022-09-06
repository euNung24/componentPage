import Component from "./Component.js";

export default class Dropdown extends Component {
    setEvents() {
        this.$element.querySelector('.dropdown-toggle')?.addEventListener('mouseover', ({target}) => {
            this.$element.querySelector('.dropdown-menu').style.opacity = '1';
            this.$element.querySelector('.dropdown-menu').style.visibility = 'visible';
        })

        this.$element.addEventListener('mouseleave', () => {
            this.$element.querySelector('.dropdown-menu').style.opacity = '0';
            setTimeout(() => this.$element.querySelector('.dropdown-menu').style.visibility = 'hidden', 500);
        })
    }
}

