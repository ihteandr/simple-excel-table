class Formula {
    constructor(options) {
        this.expression = options.expression
            .replace(/(\s|\t)+/g, '')
            .replace(/\\/g, '\/')
            .toLowerCase();
        this.origins = options.origins;
        this.cellGetter = options.cellGetter;
    }
    putOrigin(origin) {
        this.origins.push(origin);
    }
    calculate() {
        let parts = this.expression.substr(1).split(/(\-|\+|\*|\/)/g);
        let realExpression = '';
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!['-', '+', '\/', '*'].includes(part)) {
                if (isNaN(part)) {
                    let cell = this.cellGetter(part);
                    if (!cell) {
                        realExpression = 'NAME!';
                        break;
                    }
                    if (cell.active) {
                        realExpression = 'WAIT!';
                        break;
                    }
                    if (this.origins.includes(part)){
                        realExpression = 'CYCLE!';
                        break;
                    }
                    const cellFormula = cell.getFormula();
                    if (cellFormula) {
                        const tempFormula = new Formula({
                            expression: cellFormula, 
                            origins: this.origins.concat(part),
                            cellGetter: this.cellGetter
                        }); 
                        const tempFormulaValue = tempFormula.calculate();
                        if (tempFormulaValue === 'CYCLE!') {
                            realExpression = 'CYCLE!';
                            break;
                        }
                        realExpression += tempFormulaValue;
                        continue;
                    }
                    realExpression += cell.getValue() || '0';
                    continue;
                }
            }
            realExpression += part;
        }
        return this.getValue(realExpression);
    }
    getValue(expression) {
        switch(expression) {
            case 'WAIT!':
                return '---';
            case 'NAME!':
            case 'CYCLE!':
                return expression;
            default:
                try {
                    const value = eval(expression);
                    return this.prepareValue(value);
                } catch(e) {
                    return 'NAN!';
                }
        }
    }
    prepareValue(value) {
        let preparedValue = parseFloat(value);
        if (isNaN(preparedValue)) {
            return 'NAN!';
        }
        preparedValue = preparedValue.toFixed(8);
        let lastSymbol = preparedValue.charAt(preparedValue.length - 1);
        while((lastSymbol === '0' && preparedValue.includes('.')) || lastSymbol === '.') {
            preparedValue = preparedValue.substring(0, preparedValue.length - 1);
            lastSymbol = preparedValue.charAt(preparedValue.length - 1);
        }
        return preparedValue;
    }
}