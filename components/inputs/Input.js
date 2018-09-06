class Input extends Component {
    constructor(cellGetter) {
        super({
            el: document.createElement('input'),
            events: {
                'click': 'stopEvent',
                'keyup': 'hideWhenEnter'
            }
        });
        this.cellGetter = cellGetter;
        this.currentCell = null;
    }
    stopEvent(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    hideWhenEnter(e) {
        if (e.which === 13) {
            this.remove();
        }
    };
    isFormula(value) {
        return value.charAt(0) === '=';
    }
    deactivateCurrentCell(value) {
        let formula;
        if(this.isFormula(value)) {
            formula = new Formula({
                expression: value,
                origins: [],
                cellGetter: this.cellGetter,
            });
            this.currentCell.setFormula(value);
            formula.putOrigin(this.currentCell.getID());
        } else {
            this.currentCell.setFormula(null);  
        }
        this.currentCell.deactivate(value.trim());
        
        this.emit('blur', {
            value: value,
            cell: this.currentCell,
            formula: formula,
        });
    }
    activateCell(cell) {
        let cellFormula = cell.getFormula();
        this.el.value = cellFormula === null ? cell.getValue() : cellFormula;
        cell.putInput(this.el);
        this.el.focus();
        cell.activate();
        this.currentCell = cell;
    }
    getValue() {
        let value = this.el.value.trim();
        if(!this.isFormula(value) && isNaN(value)) {
            value = '';
        }
        return value;
    }
    remove() {
        if (this.currentCell) {
            this.deactivateCurrentCell(this.getValue());
        }
        this.el.remove();
    }
    appendTo(cell) {
        let value = this.getValue();
        this.el.value = value;
        if (this.currentCell) {
            this.deactivateCurrentCell(value);
        }
        this.activateCell(cell);
    }
}