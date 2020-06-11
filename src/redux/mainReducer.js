import { combineReducers } from 'redux'
import { investmentsReducer } from '../features/Investments/redux'

export const mainReducer = combineReducers({
  investments: investmentsReducer
})
