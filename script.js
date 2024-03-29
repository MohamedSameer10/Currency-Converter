const container = document.querySelector('.currency-container')
const inputElement = document.getElementById('amount')
const fromElement = document.getElementById('from')
const toElement = document.getElementById('to')
const reArrange = document.getElementById('rearrage')
const btn = document.getElementById('button')
const fromSelect = document.querySelector('.from-select')
const toSelect = document.querySelector('.to-select')
const RESULT = document.querySelector('.result')
const countries = []


const HOST = 'api.frankfurter.app'

async function api() {
    const details = await fetch(`https://${HOST}/currencies`)
    const response = await details.json()

    for (items in response) {
        countries.push(items)
    }

    countries.forEach((value) => {
        const opt = option(value)
        fromElement.appendChild(opt)
    })

    countries.reverse()

    countries.forEach((value) => {
        const opt = option(value)
        toElement.appendChild(opt)
    })

}

api()


function option(value) {
    const optionElement = document.createElement('option')
    optionElement.value = value
    optionElement.textContent = value
    return optionElement
}

reArrange.addEventListener('click', () => {

    let fromSelectElement = fromSelect.firstElementChild
    let toSelectElement = toSelect.firstElementChild

    fromSelectElement.remove()
    toSelectElement.remove()

    fromSelect.appendChild(toSelectElement)
    toSelect.appendChild(fromSelectElement)

})



 btn.addEventListener('click', async (event) => {
    event.preventDefault()
    const userInputValue = inputElement.value
    if(userInputValue == ""){
        alert('Please Enter the value')
    }
    else{
        container.classList.add('res-container')
        const fromElem = fromSelect.firstElementChild.value
        const toElem = toSelect.firstElementChild.value
        const fetchDetails = await fetch(`https://${HOST}/latest?amount=${userInputValue}&from=${fromElem}&to=${toElem}`)
        const response = await fetchDetails.json()

            const resultValue = response.rates[`${toElem}`]
            RESULT.classList.add("animate")
            RESULT.innerHTML = `<span>
                        ${userInputValue} ${fromSelect.firstElementChild.value} = <span class="green">${resultValue}</span> ${toSelect.firstElementChild.value}
            </span>`
    }

        // console.log(fromElement.querySelectorAll('option')[fromElement.selectedIndex].textContent);  <--- this is another way to get select element value but this is old way and very long 
})

