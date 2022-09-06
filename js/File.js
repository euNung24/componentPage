import Component from "./Component.js";

export default class File extends Component {
    setElements() {
        this.dataTransfer = new DataTransfer();
        this.input = this.$element.querySelector('.form-file-input');
        console.log(this.input)
        const template = document.createElement('template');
        const fragment = new DocumentFragment();
        template.innerHTML = `
            <button type="button" class="file-btn">파일등록</button>
            <ul></ul>
        `
        fragment.appendChild(template.content);
        this.$element.appendChild(fragment);

    }

    setTemplate() {
        return Array.from(this.input.files).reverse().map((file, idx) => `
            <li>${file.name}<button type="button"  class="deleteFileBtn" data-idx=${file.lastModified}>삭제</button></li>
        `).join('');
    }

    render() {
        this.$element.querySelector('ul').innerHTML = this.setTemplate();
        console.log(this.input);
    }

    setEvents() {
        this.input?.addEventListener('change', () => {
            console.log(this.input.files[0]);
            Array.from(this.input.files).forEach(file => this.dataTransfer?.items.add(file));
            console.log(this.dataTransfer?.files, this.input?.files);
            this.input.files = this.dataTransfer.files;
            console.log(this.dataTransfer?.files, this.input?.files);
            this.render();
        })

        this.$element.addEventListener('click', ({target}) => {
            if(target.classList.contains('file-btn')) {
                this.input?.click();
                console.log('hi', this.input);
            }
            if(target.classList.contains('deleteFileBtn')) {
                this.dataTransfer?.items.remove(Array.from(this.dataTransfer.files).findIndex((file, idx) => (file.lastModified == parseInt(target.dataset.idx, 10))));
                this.input.files = this.dataTransfer.files;
                this.render();
            }
        })
    }
}