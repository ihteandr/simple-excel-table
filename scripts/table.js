class Table {
    constructor(columnSize, rowSize) {
        this.cSize = columnSize;
        this.rSize = rowSize;
        this.el = document.createElement('div');
        this.el.classList.add('table');
        this.input = new Input();
        this.input.on('blur', this.blurHandler());
        this.formulasInformation = [];
    }
    blurHandler() {
        return (data) => {
            this.formulasInformation = this.formulasInformation.filter((formulaInfo) => (
                formulaInfo.cellID !== data.cellID
            ));
            if (data.formula) {
                this.formulasInformation.push(data);
            }
            this.calculateFormulas();
        };
    }
    calculateFormulas() {
        this.formulasInformation.forEach((formulaInfo) => {
            let value = formulaInfo.formula.calculate(this);
            let cell = formulaInfo.cell;
            if (!cell.querySelector('input')) {
                cell.innerText = value;
            }
        });
    }
    activateCell(cell) {
        cell.addEventListener('click', () => {
            this.input.appendTo(cell);
        });
    }
    getCell(id) {
        const row = id.replace(/[a-z]+/g, '');
        const column = id.replace(/[0-9]+/g, '');
        return this.el.querySelector(`[data-column$='${column}'][data-row$='${row}']`)
    }
    getColumn(i) {
        let index = i;
        let id = '';
        if (index < 26) {
            id = String.fromCharCode(65 + index % 26);
        } else {
            let count = -1;
            while(index >= 26) {
                count++;
                index -= 26;
            }
            id = String.fromCharCode(65 + count % 26) + String.fromCharCode(65 + index % 26);
        }
        return id;
    }
    renderHeader() {
        const header = document.createElement('div');
        header.classList.add('table_header');
        for (let i = 0; i < this.cSize; i++) {
            const headerEl = document.createElement('span');
            headerEl.classList.add('header-cell');
            headerEl.innerText = this.getColumn(i);
            header.appendChild(headerEl);
        }
        return header;
    }
    renderRowsNumbers() {
        const rowsNumbersContainer = document.createElement('div');
        rowsNumbersContainer.classList.add('table_rows-numbers');
        for (let i = 0; i < this.rSize + 1; i++) {
            const rowNumberEl = document.createElement('span');
            rowNumberEl.classList.add('number-cell');
            rowNumberEl.innerText = i || '';
            rowsNumbersContainer.appendChild(rowNumberEl);
        }
        return rowsNumbersContainer;
    }
    renderRows() {
        const rowsContainer = document.createElement('div');
        rowsContainer.classList.add('table_rows');
        for (let i = 0; i < this.rSize; i++) {
            const row = document.createElement('div');
            row.classList.add('table_row');
            for (let j = 0; j < this.cSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-row', i + 1);
                cell.setAttribute('data-column', this.getColumn(j).toLowerCase());
                this.activateCell(cell);
                row.appendChild(cell);
            }
            rowsContainer.appendChild(row);
        }
        return rowsContainer;
    }
    render() {
        this.el.innerHTML = '';
        const numbersDiv = document.createElement('div');
        numbersDiv.classList.add('table_num-list')
        numbersDiv.appendChild(this.renderRowsNumbers());
        const mainDiv = document.createElement('div')
        mainDiv.classList.add('table_main');
        mainDiv.appendChild(this.renderHeader());
        mainDiv.appendChild(this.renderRows());
        this.el.appendChild(numbersDiv);
        this.el.appendChild(mainDiv);
        return this;
    }
}