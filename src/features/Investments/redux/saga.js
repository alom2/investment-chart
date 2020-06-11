import { all, takeEvery, call, put } from 'redux-saga/effects'
import moment from 'moment'
import * as InvestmentsTypes from './types'
import { fetchInvestmentsDataFromGist } from '../services/investmentDataService'
import { setInvestmentsData } from './actions'

export function* fetchInvestmentsDataWorker () {
  const resp = yield call(fetchInvestmentsDataFromGist)

  const chartData = resp.reduce((acc, cur) => {
    acc.dates.push(moment(cur[0]).format('DD/MM/YYYY'))
    acc.values.push(cur[1].toFixed(2))
    return acc
  }, {
    dates: [],
    values: []
  })
  yield put(setInvestmentsData(chartData))
}

export function* watchFetchInvestmentsData () {
  yield takeEvery(InvestmentsTypes.FETCH_INVESTMENTS_DATA, fetchInvestmentsDataWorker)
}

export function* investmentsSaga () {
  yield all([
    watchFetchInvestmentsData()
  ])
}
