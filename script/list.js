import query from './queryCall.js'

const list = {
    sport: function(results) {
        const elSportList = document.querySelector('#sporter')
        const p = document.createElement('p'),
            a = document.createElement('a'),
            pdiv = document.createElement('div')
            console.log(results)
            a.innerHTML = results.value
            p.classList.add('sport')
            p.appendChild(a) 
            pdiv.appendChild(p)
            elSportList.appendChild(pdiv)

            return sportsProccesed++
                
    },
    sporter: function() {
        
    }
}

export default list