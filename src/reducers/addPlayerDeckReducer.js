import * as actionTypes from '../actions/actionType';

export default (state = [], action) => {
    switch (action.type){
      case actionTypes.PLAYER_CARDS:
      return [
        Object.assign({}, action.player)
      ];
      default:
            return state;
    }
  };