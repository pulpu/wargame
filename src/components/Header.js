import React from 'react'

function Header(props)  {

    return(<header className="mt-2 mb-2">
        <div className="row">
            <div className="col-6">
                <span>Computer: </span><span>{props.ComputerPileRemaining}</span>
            </div>
            <div className="col-6">
                <span>Player: </span><span>{props.PlayerPileRemaining}</span>
            </div>
        </div>
        <hr/>
    </header>)
}



export default Header;