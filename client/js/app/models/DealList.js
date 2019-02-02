class DealList {

    constructor() {
 // constructor(updateViewCallback) {
       // this.updateViewCallback = updateViewCallback
        this.eraseList()
    }

    add(deal) {

        // a possible workaround to trigger proxy access.
        // terrible workaround
        // this._deals = [].concat(this._deals, deal)
        this._deals.push(deal)
      //  this.updateViewCallback(this)
    }

    get deals() {
        // defensive programming technique.  returning just a copy of the original array
        return [].concat(this._deals)
    }

    eraseList() {
        this._deals = []
       // this.updateViewCallback(this)
    }

}

/*
Example of how to use Proxy to intercept variable access

class Person { constructor(name) { this.name = name} }

personProxy = new Proxy(new Person('John'), {
    
    // target -> the wrapped object
    // property -> the property being accessed
    // value ->  the new value being assigned to the property
    // receiver -> a reference to the proxy
    set: (target, property, value, receiver) => {
		
		console.log(`Old value ${target[property]} new value ${value}`)
        
        // we need to return a value
	    Reflect.set(target, property, value, receiver)
    }

	get: (target, property, receiver) => {
		
		console.log(`The property ${property} was intercepted`)
        
        // we need to return a value
		return Reflect.get(target, property, receiver)
    }

})

personProxy.name // logs -> The property name was intercepted

*/