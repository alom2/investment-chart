import * as InvestmentsTypes from './types'

export const fetchInvestmentsData = () => ({
  type: InvestmentsTypes.FETCH_INVESTMENTS_DATA
})

export const setInvestmentsData = ({ dates, values }) => ({
  type: InvestmentsTypes.SET_INVESTMENTS_DATA,
  payload: {
    dates,
    values
  }
})

export const setMothsInPastByIndex = (index) => ({
  type: InvestmentsTypes.SET_MONTHS_IN_PAST_BY_INDEX,
  payload: index
})

export const setInvestmentsChartData = ({ dates, values }) => ({
  type: InvestmentsTypes.SET_INVESTMENTS_CHART_DATA,
  payload: {
    dates,
    values
  }
})
