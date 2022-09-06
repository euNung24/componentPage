import Component from "./Component.js";

export default class Table extends Component {
    setElements() {
        this.$element.querySelectorAll("[colspan]").forEach(el => {
            el.style.flex = el.getAttribute("colspan");
        })
        this.$element.querySelectorAll("[rowspan]").forEach(el => {
            const {height} = el.getBoundingClientRect();
            el.style.transform = `translateY(${ (height * Number(el.getAttribute("rowspan") / 2) -(height / 2)) }px)`;
        })
    }
}