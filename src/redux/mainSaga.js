import { all } from 'redux-saga/effects'
import { investmentsSaga } from '../features/Investments/redux'

export function* mainSaga () {
  yield all([
    investmentsSaga()
  ])
}
