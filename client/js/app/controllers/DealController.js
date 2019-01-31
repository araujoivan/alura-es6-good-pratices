class DealController {

    constructor() {

        // it doesnt' work because the querySelector execution context "this"
        // is document. When attributing querySelector to $ pointer it loose this context
        // let $ = document.querySelector
        // Solution ?   usinng bind function I can pass the execution context by parameter 

        let $ = document.querySelector.bind(document)

        this._date = $('#data')
        this._quantity = $('#quantidade')
        this._value = $('#valor')

        this._messageView = new MessageView($('#messageView'))
        this._dealView = new DealView($('#dealView'))


        // Arrow functions has a lexical scope.. for this reason, the "this" is
        // referencing the context which was in that moment of creation while
        // using function() the scope become dynamic
        this._dealList = new DealList(model => this._dealView.update(model))

        this._dealView.update(this._dealList)
        this._message = new Message()
        this._messageView.update(this._message)
        
    }

    add(event) {
        event.preventDefault()

        this._dealList.add(this._createDeal())

        this._clearForm()

        this._showMessage('Negotiation added successfuly!')   
    }

    erase() {
        this._dealList.eraseList()
        this._showMessage('Negotiations erased successfuly!')
    }

    _showMessage(message) {
        this._message.text = message
        this._messageView.update(this._message)
    }

    _createDeal() {
        let theDate = DateHelper.textToDate(this._date.value)
        
        return new Deal(
            theDate, 
            this._quantity.value, 
            this._value.value
        )
    }

    _clearForm() {
        this._quantity.value = 1
        this._date.value = ''
        this._value.value = 0.0
        this._date.focus()

    }
}