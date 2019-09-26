import React from 'react'
import APIService from '../services/APIService'
import { connect } from 'react-redux';
import * as cardsAction from '../actions/cardsAction';


class PlayerControl extends React.Component {
    constructor(props){
        super(props)
        this.services = new APIService()
        this.startNewGame = this.startNewGame.bind(this)
        this.state = {
            warCards: '',
            count: 1,
            gameOver: false
        }
    }

    componentDidUpdate(prevProps){
        if( (prevProps.player !== this.props.player[0]) && (prevProps.computer !== this.props.computer[0])){ 
            if(this.props.player[0]) {
                if(this.props.computer[0].pileRemaining <= this.state.count) {
                    alert('player win')

                } 
                if(this.props.player[0].pileRemaining <= this.state.count) {
                    alert('computer win')
                } 
            }
         }
     }

    startNewGame() {
        this.services.drawingFromPiles(this.props.deckId, 'computer', this.state.count).then(res=>{
            this.props.computerCardsAction( {                     
                cardcode: res.cards.map((_v)=>{return _v.code}),
                cardValue: this.TransformValueToNumber(res.cards.slice(-1).pop().value),
                cardImage: res.cards.slice(-1).pop().image,
                pileRemaining: res.piles.computer.remaining
            });
        })

        this.services.drawingFromPiles(this.props.deckId, 'player', this.state.count).then(res=>{
            this.props.playerCardsAction( { 
                cardcode: res.cards.map((_v)=>{return _v.code}),                    
                cardValue: this.TransformValueToNumber(res.cards.slice(-1).pop().value),
                cardImage: res.cards.slice(-1).pop().image,
                pileRemaining: res.piles.player.remaining
            });
        })

        if( (this.props.player[0] !== 'undefined') && (this.props.computer!== 'undefined' )){ 
            if(this.props.player[0]) {
                if(this.props.computer[0].cardValue > this.props.player[0].cardValue) {
                    this.services.addingToPiles(this.props.deckId, 'computer', (this.props.computer[0].cardcode + ',' + this.props.player[0].cardcode+ ',' + this.state.warCards))
                    this.setState({
                        count: 1
                    })
        
                }  else if (this.props.computer[0].cardValue < this.props.player[0].cardValue){
                    this.services.addingToPiles(this.props.deckId, 'player', (this.props.computer[0].cardcode + ',' + this.props.player[0].cardcode + ',' + this.state.warCards))
                    this.setState({
                        count: 1
                    })
        
                } else {
                    this.setState({
                        warCards: this.props.computer[0].cardcode + ',' + this.props.player[0].cardcode,
                        count: 4,
                    })
                }
            }
         }
    }

    TransformValueToNumber(value) {
        switch(value) {
            case 'ACE' :
                return 14;
            case 'JACK': 
                return 11;
            case 'QUEEN' :
                return 12;
            case 'KING' :
                return 13;
            default :
                return Number(value)
        }
    }


    render() {
        return (
            <div>
                {this.props.deckId && !this.state.gameOver
                ?
                <button onClick={this.startNewGame}>Play</button>
                : null
            }
            </div>
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        computer: state.computer,
        player: state.player,

    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        computerCardsAction: computerCards => dispatch(cardsAction.computerCardsAction(computerCards)),
        playerCardsAction: playerCards => dispatch(cardsAction.playerCardsAction(playerCards))
    }
  };


  export default connect(mapStateToProps, mapDispatchToProps)(PlayerControl);