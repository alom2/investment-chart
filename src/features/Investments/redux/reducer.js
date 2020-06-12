import * as InvestmentsTypes from './types'

const baseChartData = {
  dates: [],
  values: []
}

export const initialState = {
  data: baseChartData,
  monthsInPastIndex: 0,
  chartData: baseChartData
}

export const investmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case InvestmentsTypes.SET_MONTHS_IN_PAST_BY_INDEX: {
      return {
        ...state,
        monthsInPastIndex: action.payload
      }
    }
    case InvestmentsTypes.SET_INVESTMENTS_DATA:
      return {
        ...state,
        data: action.payload
      }
    case InvestmentsTypes.SET_INVESTMENTS_CHART_DATA:
      return {
        ...state,
        chartData: action.payload
      }
    default: return state
  }
}
