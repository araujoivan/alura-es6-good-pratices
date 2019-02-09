export class ProxyFactory {

    static create(target, props, action) {
        return new Proxy(target, {

            //when a DealList function is called a call to get and assign is performed
            // target : dealList
            // prop   : may be a funnction
            // receiver : reference to proxy object
            get : function(target, prop, receiver) {

                //verify if a add or eraseList functions were called
                if((props.includes(prop)) && ProxyFactory._isFunc(target[prop])) {
                    // replace the called fuction by this function
                    // I can't use arrow function here
                    return function() {
                        console.log(`Acessing ${prop}`)
                        // arguments is a global variable in javascript that contains a list of arguments passed to the function
                        // Apply the value to target because for function calls the js calls get -> apply but for variables just get
                        // we dont nedda return statement because both methods (add, eraseList) doesnt nedd to return anything
                        Reflect.apply(target[prop], target, arguments)
                        
                        return action(target)
                    }   
                }
                // if target is a variable calls just get
                return Reflect.get(target, prop, receiver)
            },

            set : function(target, prop, value, receiver) {
                if(props.includes(prop)) {
                    target[prop] = value
                    action(target)
                }

                return Reflect.set(target, prop, value, receiver)             
            }
        }) 
    }

    static _isFunc(param) {
        return typeof(param) == typeof(Function)
    }
}