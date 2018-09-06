class HeaderCell extends Component{
    constructor(index) {
        super({
            el: document.createElement('span')
        })
        this.value = HeaderCell.getValueByIndex(index)
        this.el.classList.add('header-cell');
    }
    static getValueByIndex(i) {
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
    render() {
        this.el.innerText = this.value;
    }
}