
// Example of wrapping a anonymous class and return static operations  Module Pattern
var MathOperation = (() => {

    return class _ {

        constructor() {
            throw new Error('Unable to return an instance')
        }

        static add(a, b) {
            return a + b
        }
    
        static sub(a, b) {
            return a - b
        }
    
        static div(a, b) {
            return a / b
        }
    
        static  mul(a, b){
            return a * b
        }
    }

})()