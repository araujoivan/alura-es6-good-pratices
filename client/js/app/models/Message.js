class Message {

    //passing a default value to constructor
    constructor(text='') {
        this._text = text
    }

    get text() {
        return this._text
    }

    set text(text) {
        this._text = text
    }
}