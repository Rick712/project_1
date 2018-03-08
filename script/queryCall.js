import search from './search.js'

const query = {

    callSport: function() {
        const endpointUrl = 'https://query.wikidata.org/sparql',
            sparqlQuery = `
            SELECT DISTINCT ?sportclass ?sportclassLabel WHERE {
                ?person wdt:P19 wd:Q727 .
                ?person wdt:P106 ?sportclass .
                ?sportclass wdt:P279 wd:Q2066131 .
                SERVICE wikibase:label { bd:serviceParam wikibase:language "nl". 
            }
        }ORDER BY ?sportclassLabel`,
            fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery ),
            headers = { 'Accept': 'application/sparql-results+json' };

        fetch( fullUrl, { headers } )
        .then( body => body.json() )
        .then( json => {
            
            const { head: { vars }, results } = json,
                elSportList = document.querySelector('#sportList')
            let sportsProccesed = 0

            for ( const result of results.bindings ) {

                const p = document.createElement('p'),
                        a = document.createElement('a'),
                pdiv = document.createElement('div')
                a.innerHTML = (result.sportclassLabel.value)
                p.classList.add('sport')
                p.appendChild(a) 
                pdiv.appendChild(p)
                elSportList.appendChild(pdiv)
                sportsProccesed++

                pdiv.addEventListener('click', function() {
                    const wikidataUri = result.sportclass.value
                    console.log(wikidataUri)
                    query.callSporter(wikidataUri);
                })
            }
            search.sport(); 
        });
    },
    callSporter: function(wikidataUri) {
        const elSporters = document.querySelector('#sporters'),
            back = document.querySelector('.back')
        elSporters.classList.add('sporterListShow')
        back.addEventListener('click', function() {
            elSporters.classList.remove('sporterListShow')
        })

        const endpointUrl = 'https://query.wikidata.org/sparql'
        wikidataUri = wikidataUri.replace('http://www.wikidata.org/entity/', '')
        const sparqlQuery = 
        
        `SELECT ?personLabel WHERE {
            ?person wdt:P19 wd:Q727 .
            ?person wdt:P106 wd:` + wikidataUri + ` .
            SERVICE wikibase:label { bd:serviceParam wikibase:language "nl". }
            }
        ORDER BY ?personLabel`,
    
        fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery ),
        headers = { 'Accept': 'application/sparql-results+json' };
    
        fetch( fullUrl, { headers } )
        .then( body => body.json() )
        .then( json => {
            const { head: { vars }, results } = json;
            
            for ( const result of results.bindings ) {
        
                const p = document.createElement('p'),
                elSporterList = document.querySelector('.sporterList'),
                a = document.createElement('a'),
            pdiv = document.createElement('div')
            a.innerHTML = (result.personLabel.value)
            p.classList.add('sporter')
            p.appendChild(a) 
            pdiv.appendChild(p)
            elSporterList.appendChild(pdiv)
            
            }

            search.sporter()

        });
            
    }
}

export default query
