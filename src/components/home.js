import React from 'react'
import APIService from '../services/APIService'
import Header from './Header'
import PlayersCardsView from './PlayersCardsView'
import PlayerControl from './PlayerControl'
import { connect } from 'react-redux';

class Home extends React.Component {
    constructor(props){
        super(props)
        this.APIService = new APIService();
        this.state = {
            deckId: '',
            PlayerOneObjectDeck: {},
            PlayerTwoObjectDeck: {},
            playerOneDeck: '',
            playerTwoDeck: ''
          }
    }

    componentDidMount(){
        this.startGame();
    }

    startGame() {
        console.log('home')
        this.APIService.getdeck().then(res=>{
            console.log('>>>',res)
            var PlayerOneObjectDeck = res.cards.slice(0, 26),
            PlayerTwoObjectDeck = res.cards.slice(26, 52),
                playerOneDeck = PlayerOneObjectDeck.map(function(e){return e.code}).join(','),
                playerTwoDeck = PlayerTwoObjectDeck.map(function(e){return e.code}).join(',');

            this.setState({
                deckId: res.deck_id,
                PlayerOneObjectDeck: PlayerOneObjectDeck,
                PlayerTwoObjectDeck: PlayerTwoObjectDeck,
                playerOneDeck: playerOneDeck,
                playerTwoDeck: playerTwoDeck
            })

            this.APIService.addingToPiles(res.deck_id, 'computer',playerTwoDeck)
            this.APIService.addingToPiles(res.deck_id, 'player',playerOneDeck)


        })
    }

    render(){
        return(
            <div className="container">
                {this.props.computer.length  && this.props.player.length 
                ?
                <Header PlayerPileRemaining={this.props.player[0].pileRemaining}
                        ComputerPileRemaining={this.props.computer[0].pileRemaining}
                />
                : null}
                <div className="row">
                    <div className="col-8">
                        {this.props.computer.length  && this.props.player.length
                            ? 
                            <PlayersCardsView   PlayerCard={this.props.player[0].cardImage}
                                                ComputerCard={this.props.computer[0].cardImage}/>
                            : null     
                        }

                    </div>
                    <div className="col-4">
                        <PlayerControl deckId={this.state.deckId}/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
};
  
export default connect(mapStateToProps)(Home);