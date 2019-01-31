class Deal { //ECMA SCRPIT 6

    constructor(date, quantity, value) {
        // by convension underline is a private prefix
        // defensive programming
        this._date = new Date(date.getTime())
        this._quantity = quantity
        this._value = value
        Object.freeze(this) //become this instance totally final
    }

    get volume() {
        return  this._value * this._quantity
    }

    //access like a propoerty
    // ex:  negocicao.date
    get date() {

        // defensive programming techinique
        return new Date(this._date.getTime())
    }

    get quantity() {
        return this._value
    }

    get value() {
        return this._value
    }

}