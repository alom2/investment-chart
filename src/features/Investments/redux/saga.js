import { all, takeEvery, call, put } from 'redux-saga/effects'
import * as InvestmentsTypes from './types'
import { fetchInvestmentsDataFromGist } from '../services/investmentDataService'
import { setInvestmentsData } from './actions'

export function* fetchInvestmentsDataWorker () {
  const resp = yield call(fetchInvestmentsDataFromGist)
  yield put(setInvestmentsData(resp))
}

export function* watchFetchInvestmentsData () {
  yield takeEvery(InvestmentsTypes.FETCH_INVESTMENTS_DATA, fetchInvestmentsDataWorker)
}

export function* investmentsSaga () {
  yield all([
    watchFetchInvestmentsData()
  ])
}
