class Component extends EventEmitter{
    constructor(options = {}) {
        super();
        this.el = options.el === undefined ? document.createDocumentFragment() : options.el;
        this.events = options.events === undefined ? {} : options.events;
        const _render = this.render;
        this.prepareEventsListeners();
        this.render = () => {
            this.dettachEvents();
            this.el.innerHTML = '';
            _render.call(this);
            this.attachEvents();
            return this;
        };
    }
    prepareEventsListeners() {
        Object.keys(this.events).forEach((key) => {
            this[this.events[key]] = this[this.events[key]].bind(this);
        });
    }
    attachEvents(){
        Object.keys(this.events).forEach((key) => {
            let keyParts = key.split(' ');
            let event = keyParts[0];
            let selector = keyParts.length > 1 ? keyParts.slice(1).join(' ') : undefined;
            let elements = selector !== undefined ? this.el.querySelectorAll(selector) : [this.el];
            for(let i = 0; i < elements.length; i++){
                elements[i].addEventListener(event, this[this.events[key]]);    
            }
        });
    }
    dettachEvents(){
        Object.keys(this.events).forEach((key) => {
            let keyParts = key.split(' ');
            let event = keyParts[0];
            let selector = keyParts.length > 1 ? keyParts.slice(1).join(' ') : undefined;
            let elements = selector !== undefined ? this.el.querySelectorAll(selector) : [this.el];
            for(let i = 0; i < elements.length; i++){
                elements[i].removeEventListener(event, this[this.events[key]]);
            }
        });
    }
    render() {
        return this;
    }
}