import * as actionTypes from '../actions/actionType';


export default (state={}, action) => {
    switch (action.type) {
        case actionTypes.ROTATE :
            return {
                rotating : action.payload
            }
        default : 
            return state;
        
    }
};