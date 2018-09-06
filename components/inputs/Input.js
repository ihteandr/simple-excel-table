class Input extends Component {
    constructor() {
        super({
            el: document.createElement('input'),
            events: {
                'click': 'stopEvent',
                'keyup': 'hideWhenEnter'
            }
        });
    }
    stopEvent(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    hideWhenEnter(e) {
        if (e.which === 13) {
            this.emit('blur');
        }
    };
    remove() {
        this.el.remove();
    }
    getValue() {
        let value = this.el.value.trim();
        if(!Formula.isFormula(value) && isNaN(value)) {
            value = '';
        }
        return value;
    }
    setValue(value) {
        this.el.value = value;
    }
    focus() {
        this.el.focus();
    }
}