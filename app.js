const App = (() => {
    class SimpleExcelTable extends Component {
        constructor() {
            super({
                el: document.createElement('div')
            });
            this.el.classList.add('table');
            this.rows = [];
            this.cSize = 100;
            this.rSize = 1000;
            this.input = new Input(this.cellGetter.bind(this));
            this.input.on('blur', (data) => {
                FormulaManager.addFormulaInformation(data);
            });
            this.activateCell = this.activateCell.bind(this);
        }
        activateCell(cell) {
            this.input.appendTo(cell);
        }
        cellGetter(id) {
            if (!/^[a-z]+[0-9]+$/.test(id)) {
                return null;
            }
            const column = id.replace(/[0-9]+/g, '');
            const row = parseInt(id.replace(/[a-z]+/g, ''));
            return this.rows[row - 1].getCell(column);
        }
        renderRowsNumbers() {
            const rowsNumbersContainer = document.createElement('div');
            rowsNumbersContainer.classList.add('table_rows-numbers');
            for (let i = 0; i < this.rSize + 1; i++) {
                const rowNumberCell = new RowNumberCell(i);
                rowsNumbersContainer.appendChild(rowNumberCell.render().el);
            }
            return rowsNumbersContainer;
        }
        renderHeader() {
            const header = document.createElement('div');
            header.classList.add('table_header');
            for (let i = 0; i < this.cSize; i++) {
                const headerCell = new HeaderCell(i);
                header.appendChild(headerCell.render().el);
            }
            return header;
        }
        renderRows() {
            const rowsContainer = document.createElement('div');
            rowsContainer.classList.add('table_rows');
            for (let i = 0; i < this.rSize; i++) {
                const row = new Row(this.cSize, i);
                this.rows.push(row);
                row.on('cell:active', this.activateCell)
                rowsContainer.appendChild(row.render().el);
            }
            return rowsContainer;
        }
        render() {
            const numbersDiv = document.createElement('div');
            numbersDiv.classList.add('table_num-list')
            numbersDiv.appendChild(this.renderRowsNumbers());
            const mainDiv = document.createElement('div')
            mainDiv.classList.add('table_main');
            mainDiv.appendChild(this.renderHeader());
            mainDiv.appendChild(this.renderRows());
            this.el.appendChild(numbersDiv);
            this.el.appendChild(mainDiv);
            this.input.render();
        }
    }
    return new SimpleExcelTable();
})();