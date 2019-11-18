
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
        }
    }

    componentDidUpdate(prevProps){
        if((prevProps.player.length > 0) && (prevProps.computer.length > 0)){ 
            if(this.props.computer[0].pileRemaining <= this.state.count) {
                console.log('player win',this)
                this.refs.btn.setAttribute("disabled", "disabled");
            } 
            if(this.props.player[0].pileRemaining <= this.state.count) {
                console.log('computer win',this)
                this.refs.btn.setAttribute("disabled", "disabled");
            } 
         }

     }

    startNewGame() {
        this.refs.btn.setAttribute("disabled", "disabled");
            this.props.computerCardsAction(this.services.drawingFromPiles(this.props.deckId, 'computer', this.state.count)).then(()=>{
                this.props.playerCardsAction(this.services.drawingFromPiles(this.props.deckId, 'player', this.state.count)).then(()=>{ 
                    this.refs.btn.removeAttribute("disabled");
                });
            })
        


        if((this.props.player[0] !== 'undefined') && (this.props.computer!== 'undefined' )){ 
            if(this.props.player[0]) {
                if(this.props.computer[0].cardValue > this.props.player[0].cardValue) {
                    this.services.addingToPiles(this.props.deckId, 'computer', (this.props.computer[0].cardcode + ',' + this.props.player[0].cardcode+ ',' + this.state.warCards))
                    this.setState({
                        ...this.state,
                        warCards:'',
                        count: 1,
                    })
        
                }  else if (this.props.computer[0].cardValue < this.props.player[0].cardValue){
                    this.setState({
                        ...this.state,
                        warCards:'',
                        count: 1,
                    })
                    this.services.addingToPiles(this.props.deckId, 'player', (this.props.computer[0].cardcode + ',' + this.props.player[0].cardcode + ',' + this.state.warCards))
        
                } else {
                    this.setState({
                        ...this.state,
                        warCards: this.props.computer[0].cardcode + ',' + this.props.player[0].cardcode,
                        count: 4,
                    })
                }
            }
        }
    }

    render() {
        return (
            <div>
                {(this.props.deckId)
                ?
                <button ref="btn" onClick={this.startNewGame}>Play</button>
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