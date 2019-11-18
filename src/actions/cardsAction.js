import * as actionTypes from './actionType';
import HelperMethods from '../helperMethod';

export const computerCardsAction = (computer) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      computer.then((data)=>{
        dispatch({
          type: actionTypes.COMPUTER_CARDS,
          computer: {
            cardcode: data.cards.map((_v)=>{return _v.code}),
            cardValue: HelperMethods.TransformValueToNumber(data.cards.slice(-1).pop().value),
            cardImage: data.cards.slice(-1).pop().image,
            pileRemaining: data.piles.computer.remaining,
          },
        })
        resolve(data)
      })  
    })
  }
};

export const playerCardsAction = (player) => {
  return (dispatch) => {
     return new Promise((resolve, reject) => {
        player.then((data)=>{
          dispatch({
            type: actionTypes.PLAYER_CARDS,
            player: {
              cardcode: data.cards.map((_v)=>{return _v.code}),                    
              cardValue: HelperMethods.TransformValueToNumber(data.cards.slice(-1).pop().value),
              cardImage: data.cards.slice(-1).pop().image,
              pileRemaining: data.piles.player.remaining,
            }
          })
          resolve(data)
      })  
    })
  }
};