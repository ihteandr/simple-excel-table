class RowNumberCell extends Component {
    constructor(index) {
        super({
            el: document.createElement('span')
        });
        this.el.classList.add('number-cell');
        this.value = index === 0 ? '' : index.toString();
    }
    render() {
        this.el.innerText = this.value;
    }
}