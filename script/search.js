const search = {
    sport: function() {

        const elInput = document.querySelector('.searchSport'), 
            elDiv = document.querySelectorAll("#sportList div"),
            elP = document.querySelectorAll('.sport')
        
        elInput.addEventListener('keyup', function() {
            const filter = elInput.value.toUpperCase()
            for (let i = 0; i < elP.length; i++) {
                const elA = document.querySelectorAll('a')
                if (elA[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    elDiv[i].classList.remove('gone')
                } else {
                    elDiv[i].classList.add('gone')
                }
            }
        })
    },
    sporter: function() {
        const elInput = document.querySelector('.searchName'), 
            elDiv = document.querySelectorAll(".sporterList div"),
            elP = document.querySelectorAll('.sporter')
    
        elInput.addEventListener('keyup', function() {
            const filter = elInput.value.toUpperCase()
            for (let i = 0; i < elP.length; i++) {
                const elA = document.querySelectorAll('.sporter a')
                if (elA[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    elDiv[i].classList.remove('gone')
                } else {
                    elDiv[i].classList.add('gone')
                }
            }
        })
    }
    
}

export default search