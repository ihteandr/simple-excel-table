class RowCell extends Component {
    constructor(column, row) {
        super({
            el: document.createElement('div'),
            events: {
                'click': 'emitActive'
            } 
        })
        this.row = row;
        this.formula = null;
        this.value = '';
        this.active = false;
        this.columnName = HeaderCell.getValueByIndex(column).toLowerCase();
        this.el.classList.add('cell');
    }
    getID() {
        return `${this.columnName}${this.row}`;
    }
    putInput(child) {
        this.el.innerHTML = '';
        this.el.appendChild(child);
    }
    deactivate(value) {
        this.highlight('black');
        this.active = false;
        this.setValue(value);
    }
    setValue(value) {
        this.value = value;
        this.el.innerText = value;
    }
    getValue() {
        return this.value;
    }
    activate() {
        this.highlight('green');
        this.active = true;
    }
    highlight(color) {
        this.el.style.borderColor = color;
    }
    getFormula() {
        return this.formula;
    }
    setFormula(formula) {
        this.formula = formula;
    } 
    emitActive() {
        this.emit('active', this);
    }
    render() {
        this.el.innerText = this.value;
    }
}