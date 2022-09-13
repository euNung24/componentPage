import Component from "./Component.js";

export default class Table extends Component {
    setElements() {

        // this.$element.querySelectorAll("[colspan]").forEach(el => {
        //     el.style.flex = el.getAttribute("colspan");
        // })
        // this.$element.querySelectorAll("[rowspan]").forEach(el => {
        //     const {height} = el.getBoundingClientRect();
        //     el.style.transform = `translateY(${ (height * Number(el.getAttribute("rowspan") / 2) -(height / 2)) }px)`;
        // })
        // const originalTemplate = this.$element.innerHTML;
        // let changedTemplate = originalTemplate.replace(/<(table)([^>]*)>/gm, '<div class="divTable">')
        // changedTemplate = changedTemplate.replace(/<(thead)([^>]*)>/gm, '<div class="divTableHead">');
        // changedTemplate = changedTemplate.replace(/<(tbody)([^>]*)>/gm, '<div class="divTableBody">');
        // changedTemplate = changedTemplate.replace(/<(tr)([^>]*)>/gm, '<div class="divTableTr">');
        // changedTemplate = changedTemplate.replace(/<(tr)([^>]*)>/gm, '<div class="divTableTr">');
        // changedTemplate = changedTemplate.replace(/<(th colspan)([^>]*)/gm, '<div class="divTableTh" data-col=');
        // changedTemplate = changedTemplate.replace(/<(td colspan)([^>]*)/gm, '<div class="divTableTd fill"');
        // changedTemplate = changedTemplate.replace(/<(th)([^>]*)/gm, '<div class="divTableTh"');
        // changedTemplate = changedTemplate.replace(/<(td)([^>]*)/gm, '<div class="divTableTd"');
        // changedTemplate = changedTemplate.replace(/<(\/table|\/thead|\/tbody|\/tr|\/th|\/td)([^>]*)>/gm, '</div>')
        // console.log(changedTemplate)
        // // return changedTemplate
        // this.$element.innerHTML = changedTemplate;

        // this.$element.querySelectorAll('tr').forEach(els => {
        //     let colspanNum = 1;
        //     els.style.gridColumnStart = colspanNum;
        //     // this.$element.querySelector('thead').gridColumnStart = colspanNum;
        //     [...els.children].forEach(el => {
        //         if (el.getAttribute('colspan')) {
        //             el.style.gridColumnStart = colspanNum;
        //             colspanNum += Number(el.getAttribute('colspan'));
        //             el.style.gridColumnEnd = colspanNum;
        //             this.$element.querySelector('thead').gridColumnEnd = colspanNum;
        //         } else {
        //             el.style.gridColumnStart = colspanNum;
        //             colspanNum++;
        //             el.style.gridColumnEnd = colspanNum;
        //         }
        //
        //         if (el.getAttribute('rowspan')) {
        //             let rowspanNum = 1;
        //             el.style.gridRowStart = rowspanNum;
        //             rowspanNum += Number(el.getAttribute('rowspan'));
        //             el.style.gridRowEnd = rowspanNum;
        //         }
        //     })
        // })

        const newTable = document.createElement('div');
        newTable.classList.add('divTable');
        newTable.innerHTML = [...this.$element.querySelectorAll('tr')].map(el => this.changeTemplate(el)).join('');
        const childCountArr = [...this.$element.querySelectorAll('tr')].map(el => el.childElementCount);
        const maxCount = Math.max(...childCountArr);
        this.$element.parentElement.insertBefore(newTable, this.$element);

        let rowStart = 1;
        let colStart = 1;
        [...newTable.children].map(el => {
            // el.style.gridRowStart = rowStart;
            if(el.dataset.row) {
                el.style.gridRow = `span ${el.dataset.row}`;
                // el.style.gridRowEnd = rowStart + Number(el.dataset.row);
                // el.style.msGridRows = rowStart
            } else {
                // el.style.gridRowEnd = rowStart;
            }

            // el.style.gridColumnStart = colStart;
            if(el.dataset.col) {
                el.style.gridColumn = `span ${el.dataset.col}`;
                // el.style.gridColumnEnd = colStart + Number(el.dataset.col);
                // colStart += Number(el.dataset.col);
            } else {
                // el.style.gridColumnEnd = colStart;
                // colStart++;
            }
            if(colStart > 4) {
                // colStart = 1;
                // rowStart++;
            }
        })
    }

    changeTemplate(el) {
        // let changedTemplate = originalTemplate.replace(/<(table)([^>]*)>/gm, '<div class="divTable">')
        // changedTemplate = changedTemplate.replace(/<(thead)([^>]*)>/gm, '<div class="divTableHead">');
        // changedTemplate = changedTemplate.replace(/<(tbody)([^>]*)>/gm, '<div class="divTableBody">');
        // changedTemplate = changedTemplate.replace(/<(tr)([^>]*)>/gm, '<div class="divTableTr">');
        // changedTemplate = changedTemplate.replace(/<(tr)([^>]*)>/gm, '<div class="divTableTr">');
        el.querySelectorAll('th').forEach(th => th.classList.add('divTableTh'));
        el.querySelectorAll('td').forEach(td => td.classList.add('divTableTd'));
        const originalTemplate = el.innerHTML;
        let changedTemplate = originalTemplate.replace(/<(th)/gm, '<div');
        console.log(changedTemplate);
        changedTemplate = changedTemplate.replace(/<(td)/gm, '<div');
        console.log(changedTemplate);
        changedTemplate = changedTemplate.replace(/(colspan)/gm, 'data-col');
        changedTemplate = changedTemplate.replace(/(rowspan)/gm, 'data-row');
        changedTemplate = changedTemplate.replace(/<(\/table|\/thead|\/tbody|\/tr|\/th|\/td)([^>]*)>/gm, '</div>')
        el.querySelectorAll('.mobile-hide').forEach(mbEl => mbEl.style.gridArea = "none");
        return changedTemplate
    }

}