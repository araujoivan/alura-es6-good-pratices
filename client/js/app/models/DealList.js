class DealList {

    constructor(updateViewCallback) {
        this.updateViewCallback = updateViewCallback
        this.eraseList()
    }

    add(deal) {
        this._deals.push(deal)
        this.updateViewCallback(this)
    }

    get deals() {
        // defensive programming technique.  returning just a copy of the original array
        return [].concat(this._deals)
    }

    eraseList() {
        this._deals = []
        this.updateViewCallback(this)
    }

}