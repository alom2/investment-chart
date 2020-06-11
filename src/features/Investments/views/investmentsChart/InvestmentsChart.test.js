import configureStore from 'redux-mock-store'
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { initialState, fetchInvestmentsData } from '../../redux'
import { InvestmentsChart } from './InvestmentsChart'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('InvestmentsChart', () => {
  it('should call api when render', () => {
    const store = mockStore({
      investments: { charData: initialState }
    })
    render(
      <Provider store={store}>
        <InvestmentsChart />
      </Provider>
    )
    expect(store.getActions()[0]).toStrictEqual(fetchInvestmentsData())
  })
})