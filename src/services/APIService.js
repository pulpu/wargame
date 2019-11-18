
class APIService  {
    constructor() {
        this.proxyUrl = 'https://cors-anywhere.herokuapp.com/'; 
      //  this.proxyUrl = ''; 
    }
    
    async getdeck() {
      return  fetch(this.proxyUrl + 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
                .then(res=>res.json())
                .then(res=> 
                    fetch(this.proxyUrl + 'https://deckofcardsapi.com/api/deck/' + res.deck_id + '/draw/?count=52')
                        .then(res=> res.json())
                        .then(res => res)
                )
    }

    async addingToPiles(deskId, playerName, cardsString) {
        return fetch(this.proxyUrl + 'https://deckofcardsapi.com/api/deck/' + deskId + '/pile/' + playerName + '/add/?cards=' + cardsString +'')
    }

    async drawingFromPiles(deskId,playerName,count) {
        return fetch(this.proxyUrl + 'https://deckofcardsapi.com/api/deck/' + deskId + '/pile/' + playerName + '/draw/bottom/?count=' + count)
                .then(res=>res.json())
                .then(res=> res)

    }


}
export default APIService;