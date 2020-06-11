import * as InvestmentsTypes from './types'

export const fetchInvestmentsData = () => ({
  type: InvestmentsTypes.FETCH_INVESTMENTS_DATA
})

export const setInvestmentsData = (investmentsData) => ({
  type: InvestmentsTypes.SET_INVESTMENTS_DATA,
  payload: investmentsData
})
