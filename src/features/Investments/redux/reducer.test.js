import * as InvestmentsActions from './actions'
import { investmentsReducer, initialState } from './reducer'

describe('InvestmentsReducer' , () => {
  it('initialState', () => {
    const state = investmentsReducer(undefined, {})
    expect(state).toBe(initialState)
  })

  it('setInvestmentsData', () => {
    const data = 'teste'
    const action = InvestmentsActions.setInvestmentsData(data)
    const state = investmentsReducer(initialState, action)
    expect(state.chartData).toBe(data)
  })
})