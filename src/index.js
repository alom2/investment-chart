import React from 'react'
import ReactDOM from 'react-dom'
import { Global, css } from '@emotion/core'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { mainReducer, mainSaga } from './redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import moment from 'moment'
import 'moment/locale/pt-br'
import numeral from 'numeral'
import 'numeral/locales/pt-br'

import { InvestmentsChart } from './features/Investments/views'

moment.locale('pt-br')
numeral.locale('pt-br')

const globalStyles = css({
  body: {
    margin: 0,
    backgroundColor: '#1c2124',
    fontFamily: 'Quicksand',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh'
  }
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  mainReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(mainSaga)

ReactDOM.render(
  <React.StrictMode>
    <>
      <Global styles={globalStyles} />
      <Provider store={store}>
        <InvestmentsChart />
      </Provider>
    </>
  </React.StrictMode>,
  document.getElementById('root')
)
