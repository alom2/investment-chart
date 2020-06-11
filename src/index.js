import React from 'react'
import ReactDOM from 'react-dom'
import { InvestmentsChart } from './features/Investments/views'
import { Global, css } from '@emotion/core'

const globalStyles = css({
  body: {
    margin: 0
  }
})

ReactDOM.render(
  <React.StrictMode>
    <>
      <Global styles={globalStyles} />
      <InvestmentsChart />
    </>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
