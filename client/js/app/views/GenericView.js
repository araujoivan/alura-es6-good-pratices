class GenericView {

    constructor(element) {
        this._element = element
    }

    template(model) {
        // defensive programming
        throw new Error('Template must be implemented!')
    }

    update(model) {
        this._element.innerHTML = this.template(model)
    }
}