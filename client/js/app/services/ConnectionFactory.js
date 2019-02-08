
// module pattern
// creating a private scope..wrapping all code into a function
var ConnectionFactory = (

    // anonymous 
    function() {
        const stores = ['deals']
        const version = 4
        const dbName = 'databaseName'

        var connection = null
        var close = null

        // returning just the class 
        return class ConnectionFactory {

            contructor() {
                throw new Error('Its imposible to create ConnectionFactory instances!')
            }

            static getConnection() {

                return new Promise((resolve, reject) => {

                    let openRequest = window.indexedDB.open(dbName, version)

                    openRequest.onupgradeneeded = event => {
                        ConnectionFactory._createStore(event.target.result)
                    }

                    openRequest.onsuccess = event => {

                       if(!connection) connection = event.target.result

                       // pointing to connection.close for a later execution
                       close = connection.close.bind(connection)

                        // monkey patching. overwrite the method to disallow the effects of closing connection
                        // You must not use arrow function because of the its lexical behaviour 
                       connection.close = function() {
                           throw new Error('Unable to close connection')
                       }
                        
                       resolve(connection)
                    }

                    openRequest.onerror = event => {
                        reject(event.target.error.name)
                    }

                })
            }

            static _createStore(connection) {
                stores.forEach(store => {
                    if(connection.objectStoreNames.contains(store)) {
                        event.target.result.deleteObjectStore(store)
                    }

                    connection.createObjectStore(store, {
                        autoIncrement : true
                    })
                })
            }

            static closeConnection() {
                if(connection) {
                    //another alternative for the use of bind in line 37
                    //Reflect.apply(close, connection, [])
                    close()
                    connection = null
                }
            }
        }
    }

)() // auto invoked function

