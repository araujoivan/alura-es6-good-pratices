class DealView extends GenericView {

    template(model) {

        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATE</th>
                    <th>QUANTITY</th>
                    <th>VALUE</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${
                    model.deals.map(deal => `
                        <tr>
                            <td>${DateHelper.dateToText(deal.date)}</td>
                            <td>${deal.quantity}</td>
                            <td>${deal.value}</td>
                            <td>${deal.volume}</td>
                        </tr>
                    `)
                }
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <!-- IIFE Immediately Invoked Function Expression 
                     into a expression it can have only one return
                -->
                <td>${
                    (() => {
                        let total  = 0
                        model.deals.forEach(deal => total += deal.volume);
                        return total
                    })()

                    // in a less verbose way
                    // Obs: reduce operation doesn't need a second parameter 
                    // model.deals.reduce((total, v) => total += v.volume, 0.0 )
                }
                
                </td>
            </tfoot>
        </table>

        `
    }

}