import { combineReducers } from 'redux'
import nameOfReducer from './nameOfReducer'
import computerCardsData from './addCompuerDeckReducer';
import playerCardsData from './addPlayerDeckReducer';

export default combineReducers ({
    nameOfReducer : nameOfReducer,
    player: playerCardsData,
    computer: computerCardsData
})