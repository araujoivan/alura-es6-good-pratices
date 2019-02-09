import {dealControllerInstance} from './controllers/DealController'

let dealController = new dealControllerInstance()

// bindings
document.querySelector('.form').onsubmit = dealController.add.bind(dealController)
document.querySelector('[type=button]').onclick = dealController.erase.bind(dealController)
