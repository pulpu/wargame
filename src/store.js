import {createStore} from 'redux'
import rootReducers from './reducers/rootReducers'

function configurateStore(initialState) {
    return createStore(rootReducers, initialState)
}

export default configurateStore;