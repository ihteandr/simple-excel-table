class Row extends Component {
    constructor(size, index) {
        super({
            el: document.createElement('div')
        });
        this.index = index;
        this.size = size;
        this.el.classList.add('table_row');
        this.cellsMap = new Map();
        this.emitActive = this.emitActive.bind(this);
    }
    emitActive(cell) {
        this.emit('cell:active', cell);
    }
    getCell(columnName) {
        return this.cellsMap.get(columnName);
    }
    render() {
        for (let j = 0; j < this.size; j++) {
            const cell = new RowCell(j, this.index + 1);
            this.cellsMap.set(cell.columnName, cell);
            cell.on('active', this.emitActive)
            this.el.appendChild(cell.render().el);
        }
    }
}