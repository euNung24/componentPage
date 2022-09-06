import Component from "../Component.js";

export default class DropdownAjax extends Component {
    setTemplate() {
        const { title, titleUrl, items } = this.$data;
        return `
            <a href="${titleUrl}" class="dropdown-toggle">${title}</a>
            <ul class="dropdown-menu">
                ${items.map(item => `
                    <li class="dropdown-item">
                        <a href="${item.itemUrl}">${item.value}</a>
                    </li>
                `).join('')}
            </ul>
        `
    }

    render() {
        this.$element.innerHTML = this.setTemplate();
    }

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

