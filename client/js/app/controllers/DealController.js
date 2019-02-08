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

        this._currentOrder = ''

        // Arrow functions has a lexical scope.. for this reason, the "this" is
        // referencing the context which was in that moment of creation while
        // using function() the scope become dynamic
        // this._dealList = new DealList(model => this._dealView.update(model))

        // Implementing Proxy approach to enable updating view
        // We want to update view after a model change

        this._dealList = new Bind(
            new DealList(),
            new DealView($('#dealView')),
            'add', 'eraseList', 'sort', 'reverse'
        )
        
        this._message = new Bind(
            new Message(),
            new MessageView($('#messageView')),
            'text'
        ) 

        this._dealService = new DealService()

        this._init()

    }

    _init() {

        this._dealService.findAll()
            .then(deals => deals.forEach(this._dealList.add))
            .catch(error => this._message.text = error)

        setInterval(() => {
            this.importDeals()

        }, 5000)
    }

    add(event) {

        event.preventDefault()

        this._dealService.save(this._createDeal())
            .then((deal) => {
                this._dealList.add(deal)
                this._message.text = 'Negotiation added successfuly!'
                this._clearForm()
            })
            .catch(error => this._message.text = error)
    }

    erase() {

        this._dealService.deleteAll()
            .then(message => {
                this._dealList.eraseList()
                this._message.text = message
            })
            .catch(error => this._message.text = error)
    }

    _createDeal() {
        let theDate = DateHelper.textToDate(this._date.value)
        
        return new Deal(
            theDate, 
            parseInt(this._quantity.value), 
            parseFloat(this._value.value)
        )
    }

    _clearForm() {
        this._quantity.value = 1
        this._date.value = ''
        this._value.value = 0.0
        this._date.focus()

    }

    sort(column) {

        if(this._currentOrder == column) {
            this._dealList.reverse()
        } else {
            this._dealList.sort((a, b) => a[column] - b[column])
        }
        this._currentOrder = column    
    }

    importDeals() {
        // always break arrow functions after => 
        this._dealService.importAll(this._dealList.deals)
            .then(deals => deals.forEach(this._dealList.add))
            .catch(error => this._message.text = error)
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