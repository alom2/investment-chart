import { call, fork, put, takeEvery, select } from 'redux-saga/effects'
import * as InvestmentsTypes from '../types'
import * as Saga from '../saga'
import moment from 'moment'
import { fetchInvestmentsDataFromGist } from '../../services/investmentDataService'
import { setInvestmentsData, setMothsInPastByIndex, setInvestmentsChartData } from '../actions'
import { MONTHS_IN_PAST_STORAGE_KEY } from '../../constants/localstorage'
import { ALL_TIME_INDEX, LAST_MONTH_INDEX, LAST_THREE_MONTHS_INDEX, LAST_YEAR_INDEX, LAST_TWO_YEARS_INDEX } from '../../constants/periods'

const toTimeStamp = (date) => (new Date(date)).getTime()

describe('InvestmentsSaga', () => {
  
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
      const monthsInPastIndex = ALL_TIME_INDEX
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
          monthsInPastIndex: ALL_TIME_INDEX,
          data,
        }
        const result = saga.next() // faz o select na store
        expect(saga.next(state).value).toStrictEqual(put(setInvestmentsChartData(data)))
        expect(saga.next().done).toBeTruthy()
      })

      it('should filter data from the last month', () => {
        const saga = Saga.setMonthsInPastWorker()
        const data = {
          dates: [toTimeStamp('2005-03-11'), toTimeStamp('2020-03-20'), toTimeStamp('2020-06-11')],
          values: [1, 2, 3]
        }
        const state = {
          monthsInPastIndex: LAST_MONTH_INDEX,
          data,
        }
        const result = saga.next() // faz o select na store
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
          monthsInPastIndex: LAST_THREE_MONTHS_INDEX,
          data,
        }
        const result = saga.next() // faz o select na store
        expect(saga.next(state).value).toStrictEqual(put(setInvestmentsChartData({
          dates: [data.dates[1], data.dates[2]],
          values: [data.values[1], data.values[2]]
        })))
      })

      it('should filter data from the last year', () => {
        const saga = Saga.setMonthsInPastWorker()
        const data = {
          dates: [toTimeStamp('2005-03-11'), toTimeStamp('2019-09-02'), toTimeStamp('2020-06-11')],
          values: [1, 2, 3]
        }
        const state = {
          monthsInPastIndex: LAST_YEAR_INDEX,
          data,
        }
        const result = saga.next() // faz o select na store
        expect(saga.next(state).value).toStrictEqual(put(setInvestmentsChartData({
          dates: [data.dates[1], data.dates[2]],
          values: [data.values[1], data.values[2]]
        })))
      })

      it('should not filter when all data is at the period', () => {
        const saga = Saga.setMonthsInPastWorker()
        const data = {
          dates: [
            toTimeStamp('2018-07-15'),
            toTimeStamp('2019-09-02'),
            toTimeStamp('2020-06-11')
          ],
          values: [2, 3, 4]
        }
        const state = {
          monthsInPastIndex: LAST_TWO_YEARS_INDEX,
          data,
        }
        const result = saga.next() // faz o select na store
        expect(saga.next(state).value).toStrictEqual(put(setInvestmentsChartData(data)))
      })

      it('should filter data from the last 2 years', () => {
        const saga = Saga.setMonthsInPastWorker()
        const data = {
          dates: [
            toTimeStamp('2005-03-11'),
            toTimeStamp('2018-07-15'),
            toTimeStamp('2019-09-02'),
            toTimeStamp('2020-06-11')
          ],
          values: [1, 2, 3, 4]
        }
        const state = {
          monthsInPastIndex: LAST_TWO_YEARS_INDEX,
          data,
        }
        const result = saga.next() // faz o select na store
        expect(saga.next(state).value).toStrictEqual(put(setInvestmentsChartData({
          dates: [data.dates[1], data.dates[2], data.dates[3]],
          values: [data.values[1], data.values[2], data.values[3]]
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
})