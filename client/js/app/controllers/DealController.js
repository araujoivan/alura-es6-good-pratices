class DealController {

    constructor() {

        // it doesnt work because the querySelector execution context "this"
        // is document. When attributing querySelector to $ pointer it loose this context
        // let $ = document.querySelector
        // Solution ?   usinng bind function I can pass the execution context by parameter 

        let $ = document.querySelector.bind(document)

        this._date = $('#data')
        this._quantity = $('#quantidade')
        this._value = $('#valor')
        this._dealList = new DealList()
        this._messageView = new MessageView($('#messageView'))
        this._dealView = new DealView($('#dealView'))

        this._dealView.update(this._dealList)
        this._message = new Message()
        this._messageView.update(this._message)
        
    }

    add(event) {
        event.preventDefault()

        this._dealList.add(this._createDeal())

        this._clearForm()

        this._dealView.update(this._dealList)

        this._message.text = 'Negotiation added successfuly!'

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