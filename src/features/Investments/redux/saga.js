import { all, takeEvery, call, put, select } from 'redux-saga/effects'
import moment from 'moment'
import * as InvestmentsTypes from './types'
import { fetchInvestmentsDataFromGist } from '../services/investmentDataService'
import { setInvestmentsData, setMothsInPastByIndex, setInvestmentsChartData } from './actions'
import { MONTHS_IN_PAST_STORAGE_KEY } from '../constants/localstorage'
import { PERIODS_IN_PAST_MONTHS } from '../constants/chart'

export function* fetchInvestmentsDataWorker () {
  const resp = yield call(fetchInvestmentsDataFromGist)

  const chartData = resp.reduce((acc, cur) => {
    acc.dates.push(cur[0])
    acc.values.push(cur[1].toFixed(2))
    return acc
  }, {
    dates: [],
    values: []
  })
  const monthsInPastIndex = localStorage.getItem(MONTHS_IN_PAST_STORAGE_KEY) || 0
  yield put(setInvestmentsData(chartData))
  yield put(setMothsInPastByIndex(Number(monthsInPastIndex)))
}

export function* setMonthsInPastWorker () {
  const { monthsInPastIndex, data } = yield select(state => state.investments)
  localStorage.setItem(MONTHS_IN_PAST_STORAGE_KEY, monthsInPastIndex)
  const monthsNumber = PERIODS_IN_PAST_MONTHS[monthsInPastIndex].value

  if (monthsNumber < 0) {
    yield put(setInvestmentsChartData(data))
    return
  }
  const finalIndex = data.dates.length - 1

  // como só vai ter dados até janeiro, coloquei pra exibir do ultimo dado pra trás
  // descomentar a linha de baixar pra usar a data atual como inicial
  // const startDate = moment()
  const startDate = moment(data.dates[finalIndex])
  const chartData = {
    dates: [],
    values: []
  }
  for (let i = finalIndex; i >= 0; i--) {
    const currentIndexDate = moment(data.dates[i])
    if (startDate.diff(currentIndexDate, 'months') > monthsNumber) {
      break
    }
    chartData.dates.unshift(data.dates[i])
    chartData.values.unshift(data.values[i])
  }
  yield put(setInvestmentsChartData(chartData))
}

export function* watchFetchInvestmentsData () {
  yield takeEvery(InvestmentsTypes.FETCH_INVESTMENTS_DATA, fetchInvestmentsDataWorker)
}

export function* watchSetMonthsInPast () {
  yield takeEvery(InvestmentsTypes.SET_MONTHS_IN_PAST_BY_INDEX, setMonthsInPastWorker)
}

export function* investmentsSaga () {
  yield all([
    watchFetchInvestmentsData(),
    watchSetMonthsInPast()
  ])
}
