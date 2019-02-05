class DealService {

    constructor() {
        this._http = new HttpService()
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

}