class Message {

    //passing a default value to constructor
    constructor(text = '') {
        this._text = text
    }

    //get and set are acccessed as properties and not as methods
    // ex: message.text = 'Hi'
    get text() {
        return this._text
    }

    set text(text) {
        this._text = text
    }
}