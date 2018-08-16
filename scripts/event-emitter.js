class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }
    off(event, listener) {
        if (listener && event && this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(
                eListener => eListener !== listener,
            );
        } else if (event) {
            this.listeners[event] = [];
        } else {
            this.listeners = {};
        }
    }
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => {
                listener(data);
            });
        }
    }
}
