class DealDao {

    constructor(connection) {

        this._connection = connection
        this._store = 'deals'
    }

    eraseAll() {
        return new Promise((resolve, reject) => {

            let request = this._connection
            .transaction([this._store], 'readwrite')
            .objectStore(this._store)
            .clear()

            request.onsuccess = e => resolve('Negotiations removed succefully!')
            request.onerror = e => reject('Fail while removing Negotiations!')
        })
    }

    listAll() {
        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readonly')
                .objectStore(this._store)
                .openCursor()
    
            let deals = []

            cursor.onsuccess = e => {
                let current = e.target.result
    
                if(!!current) {
                    let data = current.value
    
                    deals.push(new Deal(data._date, data._quantity, data._value))
                    
                    current.continue()
    
                } else {
                    resolve(deals)
                }
            }
    
            cursor.onerror = e => {
                reject('An error occurred while accessing database')
            }

        })
    }

    add(deal) {

        //transaction.abort() 
        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(deal)

            request.onsuccess = (e) => {
                resolve(deal)
            }

            request.onerror = (e) => {
                reject('Error while adding deal')
            }

        })
    }

}

/*
// Test from chrome console 
ConnectionFactory.getConnection()
.then(conn => new DealDao(conn).add(new Deal(new Date(), 4, 200))
.then(res => console.log('Deal saved!'))).catch(console.log)

*/
