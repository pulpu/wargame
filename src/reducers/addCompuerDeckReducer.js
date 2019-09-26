import * as actionTypes from '../actions/actionType';

export default (state = [], action) => {
    switch (action.type){
      
      case actionTypes.COMPUTER_CARDS:
      return [
        Object.assign({}, action.computer)
      ];
      default:
            return state;
    }
  };