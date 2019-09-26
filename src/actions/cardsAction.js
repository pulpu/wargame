import * as actionTypes from './actionType';

export const computerCardsAction = (computer) => {
    return {
      type: actionTypes.COMPUTER_CARDS,
      computer: computer
    }
  };

  export const playerCardsAction = (player) => {
    return {
      type: actionTypes.PLAYER_CARDS,
      player: player
    }
  };