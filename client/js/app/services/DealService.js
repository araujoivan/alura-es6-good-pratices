class DealService {

    constructor() {
        this._http = new HttpService()
    }

    getAllDeals() {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getDealsFromWeek(),
                this.getDealsFromOneWeekAgo(),
                this.getDealsFromTwoWeeksAgo()
            ]).then(resp => {
                resolve(resp.reduce((accum, value) => accum.concat(value), []))
            }).catch(error => reject('An error occurried while fetching deals.'))
        })
    }

    getDealsFromWeek() {
        return this._getDealsFrom('negociacoes/semana')
    }

    getDealsFromOneWeekAgo() {
        return this._getDealsFrom('negociacoes/anterior')
    }

    getDealsFromTwoWeeksAgo() {
        return this._getDealsFrom('negociacoes/retrasada')
    }

    _getDealsFrom(from) {

        return new Promise((resolve, reject) => {

            this._http.get(from).then(resp => resolve(resp.map(obj => new Deal(new Date(obj.data), obj.quantidade, obj.valor))))
                .catch(error => reject(`A error occcurred while trying to recover ${from} .`))
        })
    }

    save(deal) {
        return new Promise((resolve, reject) => {
            ConnectionFactory
                .getConnection()
                .then(conn => {
                    new DealDao(conn)
                        .add(deal)
                        .then(resp => resolve(resp))
                }).catch(error => reject(error))
        })
    }

    deleteAll() {
        return new Promise((resolve, reject) => {

            ConnectionFactory
                .getConnection()
                .then(conn => new DealDao(conn))
                .then(dao => dao.eraseAll())
                .then(resp => resolve(resp))
                .catch(error => reject(error))

        })
    }

    findAll() {
        return new Promise((resolve, reject) => {
            ConnectionFactory
                .getConnection()
                .then(conn => new DealDao(conn))
                .then(dao => dao.listAll())
                .then(deals => resolve(deals))
                .catch(error => reject)
        })
    }

    importAll(currentList) {
        return this.getAllDeals()
        .then(deals => 
             deals.filter(deal => 
                 !currentList.some(existentDeal =>  JSON.stringify(deal) == JSON.stringify(existentDeal)))
         )
         .catch(error => { throw new Error(error) })
    }
}

/*

// Alternative to compare object instances
class Person {
 
	constructor(name) {
    	this.name = name
	}

	equals(other) {
		if(!!other && other instanceof Person) {
			return JSON.stringify(this) == JSON.stringify(other)
        }
		return false
    }  
} 
*/