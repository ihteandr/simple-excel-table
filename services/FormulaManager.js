const FormulaManager = (function () {
    class FormulaManagerService {
        constructor() {
            this.formulasInformation = new Map();
        }
        addFormulaInformation(data) {
            this.formulasInformation.delete(data.cell.getID());
            if (data.formula) {
                this.formulasInformation.set(data.cell.getID(), data);
            }
            this.calculateFormulas();
        }
        calculateFormulas() {
            this.formulasInformation.forEach((value) => {
                const formulaInfo = value;
                if (formulaInfo) {
                    let value = formulaInfo.formula.calculate(this);
                    let cell = formulaInfo.cell;
                    if (!cell.active) {
                        cell.setValue(value);
                    }
                }
            });
        }
    }
    return new FormulaManagerService();
})()