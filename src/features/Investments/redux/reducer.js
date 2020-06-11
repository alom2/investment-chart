import * as InvestmentsTypes from './types'

export const initialState = {
  data: []
}

export const investmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case InvestmentsTypes.SET_INVESTMENTS_DATA:
      return {
        ...state,
        data: action.payload
      }
    default: return state
  }
}
