import { combineReducers } from 'redux'
import photoStockReducer from './photoStockReducer'

export const rootReducer = combineReducers({
    photoStockReducer: photoStockReducer
})
