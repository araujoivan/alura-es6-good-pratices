let fields = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor'),
]

let tbody = document.querySelector('table tbody')

document.querySelector('.form').addEventListener('submit', (event) => {

    event.preventDefault()

    let tr = document.createElement('tr')

    fields.forEach(field => {
        let td = document.createElement('td')
        td.textContent = field.value
        tr.appendChild(td)
    })
     
    let tdDimension = document.createElement('td')
    tdDimension.textContent = fields[1].value * fields[2].value
    tr.appendChild(tdDimension)
    
    tbody.append(tr)

    fields[0].value = ''
    fields[1].value = 1
    fields[2].value = 0
    fields[0].focus()
})