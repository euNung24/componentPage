export default class Component {
    $data;
    $element;

    constructor(element, data = []) {
        this.$element = element;
        this.$data = data;
        this.setElements();
        this.render();
        this.setEvents();
    }

    setElements() {};

    setTemplate() { return '' };

    render() {}

    setEvents() {};

}