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
        // this._dealList = new DealList(model => this._dealView.update(model))


        // Implementing Proxy approach to enable updating view
        // We want to update view after a model change

        this._dealList = ProxyFactory.create(
            new DealList(),
            ['add', 'eraseList'],
            (model) => this._dealView.update(model))

        this._dealView.update(this._dealList)
        
        this._message = ProxyFactory.create(
            new Message(),
            ['text'],
            (model) => this._messageView.update(model)
        )

        this._messageView.update(this._message)
  
    }

    add(event) {
        event.preventDefault()

        this._dealList.add(this._createDeal())

        this._clearForm()

        this._message.text = 'Negotiation added successfuly!'
    }

    erase() {
        this._dealList.eraseList()
        this._message.text = 'Negotiations erased successfuly!'
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

    /*
        In a literal object like the one bellow...
        
        let objeto = {
            exibeMensagem : function(){
                console.log("Hi");
            }
        }  

        ------- OR -------
        
        we can simplify the method declaration like this one

        let objeto = {
            exibeMensagem {
                console.log("Hi");
            }
        }

    */
}