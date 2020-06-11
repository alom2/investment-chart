import configureStore from 'redux-mock-store'
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { initialState } from '../../redux'
import { formatTooltipLabel, formatYAxisLabel, Chart, formatData } from './Chart'


const middlewares = []
const mockStore = configureStore(middlewares)
describe('Chart', () => {
  it('should format tooltip', () => {
    const tooltip = { value : '20.90' }
    const result = formatTooltipLabel(tooltip)
    expect(result).toBe('R$ 20,90')
  })

  it('should format yAxis', () => {
    const value = 9000
    const result = formatYAxisLabel(9000)
    expect(result).toBe('R$ 9mil')
  })

  it('should format data', () => {
    const values = ['values']
    const dates = ['dates']
    const result = formatData({ values, dates })
    expect(result.labels).toBe(dates)
    expect(result.datasets[0].data).toBe(values)
  })

  describe('Component', () => {
    it('should not render when it doesnt have value', () => {
      const store = mockStore({
        investments: { charData: null }
      })
      const { queryByTestId } = render(
        <Provider store={store}>
          <Chart />
        </Provider>
      );
      expect(queryByTestId('Line')).toBeNull()
    })

    it('should render when it has value', () => {
      const store = mockStore({
        investments: initialState
      })
      const { queryByText } = render(
        <Provider store={store}>
          <Chart />
        </Provider>
      );
      expect(queryByText('Line')).toBeTruthy()
    })
  })
})