import { call, fork, put, takeEvery, select } from 'redux-saga/effects'
import * as InvestmentsTypes from '../types'
import * as Saga from '../saga'
import moment from 'moment'
import { fetchInvestmentsDataFromGist } from '../../services/investmentDataService'
import { setInvestmentsData, setMothsInPastByIndex, setInvestmentsChartData } from '../actions'
import { MONTHS_IN_PAST_STORAGE_KEY } from '../../constants/localstorage'

const toTimeStamp = (date) => (new Date(date)).getTime()

describe('InvestmentsSaga', () => {
  describe('Workers', () => {
    it('should call the service', () => {
      const saga = Saga.fetchInvestmentsDataWorker()
      let result = saga.next()
      
      let expectedStep = call(fetchInvestmentsDataFromGist)
      expect(result.value).toStrictEqual(expectedStep)
  
      const data = [[1602320900000, 9000]]
      result = saga.next(data)
      
      const expectedResult = { 
        dates: [1602320900000],
        values: ['9000.00']
      }
  
      expectedStep = put(setInvestmentsData(expectedResult))
      expect(result.value).toStrictEqual(expectedStep)
  
      result = saga.next()
      expectedStep = put(setMothsInPastByIndex(0))
      expect(result.value).toStrictEqual(expectedStep)
  
      expect(saga.next().done).toBeTruthy()
    })
  
    it('should get info from localStorage', () => {
      const monthsInPastIndex = 2
      localStorage.setItem(MONTHS_IN_PAST_STORAGE_KEY, monthsInPastIndex)
      const saga = Saga.fetchInvestmentsDataWorker()
      saga.next() // chama api
      saga.next([]) // salva os dados da api
      const result = saga.next()
      const expectedStep = put(setMothsInPastByIndex(monthsInPastIndex))
      expect(result.value).toStrictEqual(expectedStep)
    })

    describe('setMonthsInPastWorker Periods', () => {

      it('should filter data of all time', () => {
        const saga = Saga.setMonthsInPastWorker()
        const data = {
          dates: [toTimeStamp('2005-03-11'), toTimeStamp('2020-03-11')],
          values: [1, 2]
        }
        const state = {
          monthsInPastIndex: 0,
          data,
        }
        let result = saga.next() // faz o select na store
        expect(saga.next(state).value).toStrictEqual(put(setInvestmentsChartData(data)))
      })

      it('should filter data from the last month', () => {
        const saga = Saga.setMonthsInPastWorker()
        const data = {
          dates: [toTimeStamp('2005-03-11'), toTimeStamp('2020-03-20'), toTimeStamp('2020-06-11')],
          values: [1, 2, 3]
        }
        const state = {
          monthsInPastIndex: 1,
          data,
        }
        let result = saga.next() // faz o select na store
        expect(saga.next(state).value).toStrictEqual(put(setInvestmentsChartData({
          dates: [data.dates[2]],
          values: [data.values[2]]
        })))
      })

      it('should filter data from the last 3 months', () => {
        const saga = Saga.setMonthsInPastWorker()
        const data = {
          dates: [toTimeStamp('2005-03-11'), toTimeStamp('2020-03-20'), toTimeStamp('2020-06-11')],
          values: [1, 2, 3]
        }
        const state = {
          monthsInPastIndex: 2,
          data,
        }
        let result = saga.next() // faz o select na store
        expect(saga.next(state).value).toStrictEqual(put(setInvestmentsChartData({
          dates: [data.dates[1], data.dates[2]],
          values: [data.values[1], data.values[2]]
        })))
      })

      it('should filter data from the last 1 year', () => {
        const saga = Saga.setMonthsInPastWorker()
        const data = {
          dates: [toTimeStamp('2005-03-11'), toTimeStamp('2019-09-02'), toTimeStamp('2020-06-11')],
          values: [1, 2, 3]
        }
        const state = {
          monthsInPastIndex: 3,
          data,
        }
        let result = saga.next() // faz o select na store
        expect(saga.next(state).value).toStrictEqual(put(setInvestmentsChartData({
          dates: [data.dates[1], data.dates[2]],
          values: [data.values[1], data.values[2]]
        })))
      })
      it('should filter data from the last 2 years', () => {
        const saga = Saga.setMonthsInPastWorker()
        const data = {
          dates: [toTimeStamp('2005-03-11'), toTimeStamp('2018-09-02'), toTimeStamp('2020-06-11')],
          values: [1, 2, 3]
        }
        const state = {
          monthsInPastIndex: 4,
          data,
        }
        let result = saga.next() // faz o select na store
        expect(saga.next(state).value).toStrictEqual(put(setInvestmentsChartData({
          dates: [data.dates[1], data.dates[2]],
          values: [data.values[1], data.values[2]]
        })))
      })
    })
  
  })

  describe('Watchers', () => {
    it('should handle fetchInvestmentsData', () => {
      const saga = Saga.watchFetchInvestmentsData()
      const result = saga.next()
      const expectedStep = takeEvery(InvestmentsTypes.FETCH_INVESTMENTS_DATA, Saga.fetchInvestmentsDataWorker)
      expect(result.value).toStrictEqual(expectedStep)
    })

    it('should handle setMonthsInPast', () => {
      const saga = Saga.watchSetMonthsInPast()
      const result = saga.next()
      const expectedStep = takeEvery(InvestmentsTypes.SET_MONTHS_IN_PAST_BY_INDEX, Saga.setMonthsInPastWorker)
      expect(result.value).toStrictEqual(expectedStep)
    })
  })

  it('should run all watchers', () => {
    const saga = Saga.investmentsSaga()
    let result = saga.next()

    expect(result.value.type).toBe('ALL')
    expect(result.value.payload).toStrictEqual([
      Saga.watchFetchInvestmentsData(),
      Saga.watchSetMonthsInPast(),
    ])
    expect(result.done).toBe(false)

    result = saga.next()

    expect(result.done).toBe(true)
  })
})