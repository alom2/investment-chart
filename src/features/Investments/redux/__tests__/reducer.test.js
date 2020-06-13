import * as InvestmentsActions from '../actions'
import { investmentsReducer, initialState } from '../reducer'
import { LAST_YEAR_INDEX } from '../../constants/periods'

describe('InvestmentsReducer' , () => {
  it('initialState', () => {
    const state = investmentsReducer(undefined, {})
    expect(state).toBe(initialState)
  })

  it('setInvestmentsData', () => {
    const data = {
      dates: ['teste'],
      values: ['teste'],
    }
    const action = InvestmentsActions.setInvestmentsData(data)
    const state = investmentsReducer(initialState, action)
    expect(state.data).toStrictEqual(data)
  })

  it('setInvestmentsChartData', () => {
    const data = {
      dates: ['teste'],
      values: ['teste'],
    }
    const action = InvestmentsActions.setInvestmentsChartData(data)
    const state = investmentsReducer(initialState, action)
    expect(state.chartData).toStrictEqual(data)
  })

  it('setMothsInPastByIndex', () => {
    const monthsIndex = LAST_YEAR_INDEX
    const action = InvestmentsActions.setMothsInPastByIndex(monthsIndex)
    const state = investmentsReducer(initialState, action)
    expect(state.monthsInPastIndex).toStrictEqual(monthsIndex)
  })

})