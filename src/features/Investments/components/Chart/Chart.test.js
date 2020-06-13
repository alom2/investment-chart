import configureStore from 'redux-mock-store'
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { initialState } from '../../redux'
import { formatTooltipLabel, formatYAxisLabel, Chart, formatData, formatXAxisLabel, formatTooltipTitle } from './Chart'


const middlewares = []
const mockStore = configureStore(middlewares)
describe('Chart', () => {
  it('should format tooltip label', () => {
    const tooltip = { value : '20.90' }
    const result = formatTooltipLabel(tooltip)
    expect(result).toBe('R$ 20,90')
  })

  it('should format tooltip title', () => {
    const tooltip = [{ label : '1119808200000' }]
    const result = formatTooltipTitle(tooltip)
    expect(result).toBe('26/06/2005')
  })

  it('should format yAxis label', () => {
    let result = formatYAxisLabel(9000)
    expect(result).toBe('R$ 9mil')
    result = formatYAxisLabel(45.6)
    expect(result).toBe('R$ 45,60')
  })

  it('should format xAxis label', () => {
    let result = formatXAxisLabel('2019-08-10')
    expect(result).toBe('10/08/2019')
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
      const { queryByText } = render(
        <Provider store={store}>
          <Chart />
        </Provider>
      );
      expect(queryByText('Line')).toBeNull()
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