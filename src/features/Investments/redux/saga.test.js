import * as InvestmentsTypes from './types'
import * as Saga from './saga'
import { call, fork, put } from 'redux-saga/effects'
import moment from 'moment'
import { fetchInvestmentsDataFromGist } from '../services/investmentDataService'
import { setInvestmentsData } from './actions'

describe('InvestmentsSaga', () => {
  it('should call the service', () => {
    const saga = Saga.fetchInvestmentsDataWorker()
    let result = saga.next()
    
    let expectedStep = call(fetchInvestmentsDataFromGist)
    expect(result.value).toStrictEqual(expectedStep)

    const data = [[1602320900000, 9000]]
    result = saga.next(data)
    
    const expectedResult = { 
      dates: ['10/10/2020'],
      values: ['9000.00']
    }
    expectedStep = put(setInvestmentsData(expectedResult))
  
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