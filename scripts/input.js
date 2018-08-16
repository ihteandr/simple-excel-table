class Input extends EventEmitter {
    constructor() {
        super();
        this.el = document.createElement('input');
        this.el.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        this.el.onkeyup = (e) => {
            if (e.which === 13) {
                this.appendTo(null);
            }
        };
    }
    isFomula(value) {
        return value.charAt(0) === '=';
    }
    getCellID(cell) {
        const row = cell.getAttribute('data-row');
        const column = cell.getAttribute('data-column');
        return `${column}${row}`;
    }
    appendTo(cell) {
        let prevCell = null;
        let formula = null;
        let value = this.el.value.trim();

        if (this.isFomula(value)) {
            formula = new Formula(value, []);
        } else if(isNaN(value)) {
            this.el.value = '';
            value = '';
        }

        if (this.el.parentNode) {
            prevCell = this.el.parentNode;
            const cellID = this.getCellID(prevCell);

            if(formula) {
                prevCell.setAttribute('data-formula', value);
                formula.origins.push(cellID);
            } else {
                prevCell.setAttribute('data-formula', '');    
            }
            this.el.parentNode.style.borderColor = 'black';
            prevCell.innerText = value.trim();
            
            this.emit('blur', {
                value: value,
                cell: prevCell,
                cellID: cellID,
                formula: formula,
            });
        }

        if (cell) {
            let cellFormula = cell.getAttribute('data-formula');
            this.el.value = cellFormula || cell.innerText;
            cell.innerHTML = '';
            cell.appendChild(this.el);
            this.el.focus();
            if (this.el.parentNode) {
                this.el.parentNode.style.borderColor = 'green';
            }
        } else {
            this.el.remove();
        }
    }
}