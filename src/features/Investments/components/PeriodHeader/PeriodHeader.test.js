import configureStore from 'redux-mock-store'
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { LAST_MONTH_INDEX, PERIODS_IN_PAST_MONTHS } from '../../constants/periods'
import { PeriodHeader } from './PeriodHeader'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('PeriodHeader', () => {
  it('should have the text for selected period', () => {
    const selectedIndex = LAST_MONTH_INDEX
    const store = mockStore({
      investments: { monthsInPastIndex: selectedIndex }
    })
    const { queryByText } = render(
      <Provider store={store}>
        <PeriodHeader />
      </Provider>
    )
    const label = PERIODS_IN_PAST_MONTHS[selectedIndex].label
    expect(queryByText(label)).toBeTruthy()
  })
})