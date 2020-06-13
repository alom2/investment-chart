import * as InvestmentsTypes from './types'
import { ALL_TIME_INDEX } from '../constants/periods'

const baseChartData = {
  dates: [],
  values: []
}

export const initialState = {
  data: baseChartData,
  monthsInPastIndex: ALL_TIME_INDEX,
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
