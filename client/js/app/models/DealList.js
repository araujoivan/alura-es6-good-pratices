class DealList {

    constructor() {
        this._deals = []
    }

    add(deal) {
        this._deals.push(deal)
    }

    get deals() {
        // defensive programming technique.  returning just a copy of the original array
        return [].concat(this._deals)
    }

}