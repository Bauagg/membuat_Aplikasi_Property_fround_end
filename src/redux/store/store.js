import { combineReducers, createStore } from 'redux'
import reducerLogin from '../reducer/reducer'
import reducerGlobalCart from '../reducer/reducer.product'

const rootReducer = combineReducers({
    reducLogin: reducerLogin,
    reducProduct: reducerGlobalCart
})

const storeUser = createStore(rootReducer)

export default storeUser