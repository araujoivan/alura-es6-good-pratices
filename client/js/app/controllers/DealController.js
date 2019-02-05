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

    sort(column) {

        if(this._currentOrder == column) {
            this._dealList.reverse()
        } else {
            this._dealList.sort((a, b) => a[column] - b[column])
        }
        this._currentOrder = column    
    }

    importDeals() {

        let dealService = new DealService()

        Promise.all([
            dealService.getDealsFromWeek(),
            dealService.getDealsFromOneWeekAgo(),
            dealService.getDealsFromTwoWeeksAgo()
        ]).then(resp => {
            resp.reduce((accum, value) => accum.concat(value), []).forEach(this._dealList.add)
            this._message.text = 'Negotiations has imported successfully'

        }).catch(error => this._message.text = error)

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