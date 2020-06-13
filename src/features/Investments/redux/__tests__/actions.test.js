import * as InvestmentsActions from '../actions'
import * as InvestmentsTypes from '../types'
import { LAST_YEAR_INDEX } from '../../constants/periods'

describe('InvestmentsActions' , () => {
  it('fetchInvestmentsData', () => {
    const result = InvestmentsActions.fetchInvestmentsData()
    expect(result.type).toBe(InvestmentsTypes.FETCH_INVESTMENTS_DATA)
    expect(result.payload).toBe(undefined)
  })

  it('setInvestmentsData', () => {
    const data = {
      dates: ['teste'],
      values: ['teste'],
    }
    const result = InvestmentsActions.setInvestmentsData(data)
    expect(result.type).toBe(InvestmentsTypes.SET_INVESTMENTS_DATA)
    expect(result.payload).toStrictEqual(data)
  })

  it('setInvestmentsChartData', () => {
    const data = {
      dates: ['teste'],
      values: ['teste'],
    }
    const result = InvestmentsActions.setInvestmentsChartData(data)
    expect(result.type).toBe(InvestmentsTypes.SET_INVESTMENTS_CHART_DATA)
    expect(result.payload).toStrictEqual(data)
  })

  it('setMothsInPastByIndex', () => {
    const index = LAST_YEAR_INDEX
    const result = InvestmentsActions.setMothsInPastByIndex(index)
    expect(result.type).toBe(InvestmentsTypes.SET_MONTHS_IN_PAST_BY_INDEX)
    expect(result.payload).toStrictEqual(index)
  })
})