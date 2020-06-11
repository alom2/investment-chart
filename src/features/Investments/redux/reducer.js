import * as InvestmentsTypes from './types'

export const initialState = {
  chartData: {
    dates: [],
    values: []
  }
}

export const investmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case InvestmentsTypes.SET_INVESTMENTS_DATA:
      return {
        ...state,
        chartData: action.payload
      }
    default: return state
  }
}
