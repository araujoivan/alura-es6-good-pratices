export class GenericView {
    // Changing the Chrome Browser language
    //  exec defaults write com.google.Chrome AppleLanguages '(pt-BR)'
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

/*

 // Example using reflection
 class AirPlane {

            constructor(name) {
                this._name= name;
            }

            fly() {
                alert(`${this._name} is flying`);
            }

            turnMotorOn() {
                console.log('Turn motor on');
            }

            closeDoors() {
                console.log('Closing the doors');
            }
        }

        class Bird {

            constructor(name) {
                this._name = name;
            }

            fly() {
                // execute `fly` method from `AirPLane` using  as context an instance of `Bird`
                Reflect.apply(AirPlane.prototype.fly, this, []);
            }
        }
*/