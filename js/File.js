import Component from "./Component.js";

export default class File extends Component {
    setElements() {
        // this.dataTransfer = new DataTransfer();
        this.uplodatedFiles = [];
        this.input = this.$element.querySelector('.form-file-input');
        const template = document.createElement('template');
        const fragment = new DocumentFragment();
        template.innerHTML = `
            <button type="button" class="file-btn">파일등록</button>
            <ul class="uploaded-list"></ul>
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
        this.input?.addEventListener('change', (e) => {
            let files = e.target.files;
            for(let i = 0; i < files.length; i++) {
                this.uploadedFile(files[i]);
            }

        })

        this.$element.addEventListener('click', ({target}) => {
            if(target.classList.contains('file-btn')) {
                this.input?.click();
            }
            if(target.classList.contains('deleteFileBtn')) {
                this.$element.querySelector('.uploaded-list').removeChild(target.parentElement);
                // target.parentElement.remove();
                // this.dataTransfer?.items.remove(Array.from(this.dataTransfer.files).findIndex((file, idx) => (file.lastModified == parseInt(target.dataset.idx, 10))));
                // this.input.files = this.dataTransfer.files;
                // this.render();
            }
        })
    }

    async uploadedFile(file) {
        let formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://e83cb729-a641-499b-a9b2-0442a7837ad2.mock.pstmn.io/fileupload', {
                method: 'POST',
                body: formData
            });

            const data = await response.text();

            this.uplodatedFiles.push(data);

            const fragment = new DocumentFragment();
            const template = document.createElement('template');
            template.innerHTML = `<li><a href="#">${file.name}</a><button type="button"  class="deleteFileBtn" data-idx=${file.lastModified}>삭제</button></li>`;

            fragment.appendChild(template.content);
            this.$element.querySelector(".uploaded-list").insertBefore(fragment, this.$element.querySelector(".uploaded-list").firstChild);
        } catch (e){
            alert("error: " + e.message);
        }
    }
}