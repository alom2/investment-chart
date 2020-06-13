import * as InvestmentsActions from '../actions'
import * as InvestmentsTypes from '../types'

describe('InvestmentsActions' , () => {
  it('fetchInvestmentsData', () => {
    const result = InvestmentsActions.fetchInvestmentsData()
    expect(result.type).toBe(InvestmentsTypes.FETCH_INVESTMENTS_DATA)
    expect(result.payload).toBe(undefined)
  })

  it('setInvestmentsData', () => {
    const data = ['teste']
    const result = InvestmentsActions.setInvestmentsData(data)
    expect(result.type).toBe(InvestmentsTypes.SET_INVESTMENTS_DATA)
    expect(result.payload).toBe(data)
  })
})