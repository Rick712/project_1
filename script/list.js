import query from './queryCall.js'

const list = {
    sport: function(result) {
        
        const p = document.createElement('p'),
            a = document.createElement('a'),
            elSportList = document.querySelector('#sportList'),
            pdiv = document.createElement('div')
        a.innerHTML = (result.sportclassLabel.value)
        p.classList.add('sport')
        p.appendChild(a) 
        pdiv.appendChild(p)
        elSportList.appendChild(pdiv)
                
    },
    sporter: function() {
        
    }
}

export default list