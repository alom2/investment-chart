import * as InvestmentsTypes from './types'
import * as Saga from './saga'
import { call, fork, put } from 'redux-saga/effects'
import { fetchInvestmentsDataFromGist } from '../services/investmentDataService'
import { setInvestmentsData } from './actions'

describe('InvestmentsSaga', () => {
  it('should call the service', () => {
    const saga = Saga.fetchInvestmentsDataWorker()
    let result = saga.next()
    
    let expectedStep = call(fetchInvestmentsDataFromGist)
    expect(result.value).toStrictEqual(expectedStep)

    const data = ['test']
    result = saga.next(data)
    expectedStep = put(setInvestmentsData(data))
    expect(result.value).toStrictEqual(expectedStep)

    expect(saga.next().done).toBe(true)
  })

  it('should handle fetchInvestmentsData', () => {
    const saga = Saga.watchFetchInvestmentsData()
    const { payload } = saga.next().value
    expect(payload.args).toStrictEqual([InvestmentsTypes.FETCH_INVESTMENTS_DATA, Saga.fetchInvestmentsDataWorker])
  })

  it('should run all', () => {
    const saga = Saga.investmentsSaga()

    let result = saga.next()

    expect(result.value.type).toBe('ALL')
    expect(result.value.payload).toStrictEqual([
      Saga.watchFetchInvestmentsData()
    ])
    expect(result.done).toBe(false)

    result = saga.next()

    expect(result.done).toBe(true)
  })
})