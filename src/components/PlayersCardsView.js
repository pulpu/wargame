import React from 'react'

function PlayersCardsView (props) {

    return (<div className="row">
        <div className="col-6">
            <p>Computer</p>
            <img src={props.ComputerCard} alt="" />
        </div>
        <div className="col-6">
            <p>Player</p>
            <img src={props.PlayerCard} alt="" />
        </div>
    </div>)

}
export default PlayersCardsView;