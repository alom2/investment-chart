import configureStore from 'redux-mock-store'
import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ALL_TIME_INDEX, PERIODS_IN_PAST_MONTHS, LAST_TWO_YEARS_INDEX, LAST_YEAR_INDEX } from '../../constants/periods'
import { PeriodSelector } from './PeriodSelector'
import { setMothsInPastByIndex } from '../../redux/actions'
import { getLastIndex, getLast } from '../../../../utils/array'

const middlewares = []
const mockStore = configureStore(middlewares)
let store = null
let events = {}
const initialIndex = ALL_TIME_INDEX

describe('PeriodSelector', () => {

  beforeEach(() => {
    store = mockStore({
      investments: {
        monthsInPastIndex: initialIndex
      }
    })
  })

  describe('Component', () => {

    it('should toggles periods when click to select period', () => {
      const { queryByText } = render(
        <Provider store={store}>
          <PeriodSelector />
        </Provider>
      )
      const label = PERIODS_IN_PAST_MONTHS[ALL_TIME_INDEX].label
      // dropdown fechado
      expect(queryByText(label)).toBeNull()
      // dropdown aberto
      fireEvent.click(queryByText(/Selecion/i))
      expect(queryByText(label)).toBeTruthy()
      // dropdown fechado
      fireEvent.click(queryByText(/selecion/i))
      expect(queryByText(label)).toBeNull()
    })

    it('should handle click on period', () => {
      const { queryByText } = render(
        <Provider store={store}>
          <PeriodSelector />
        </Provider>
      )
      const label = PERIODS_IN_PAST_MONTHS[LAST_YEAR_INDEX].label
      fireEvent.click(queryByText(/Selecion/i))
      fireEvent.click(queryByText(label))
      const action = getLast(store.getActions())
      expect(action.payload).toBe(LAST_YEAR_INDEX)

    })

  })


  describe('Window events', () => {
  
    beforeEach(() => {
      window.addEventListener = jest.fn((event, cb) => {
        events[event] = cb
      })
      window.removeEventListener = jest.fn((event) => {
        delete events[event]
      })
    })

    it('should add events to window', () => {
      const component = render(
        <Provider store={store}>
          <PeriodSelector />
        </Provider>
      )
      expect(events).toHaveProperty('mousedown')
      expect(events).toHaveProperty('keydown')
    })

    it('should remove events from window when unmount', () => {
      const component = render(
        <Provider store={store}>
          <PeriodSelector />
        </Provider>
      )
      component.unmount()
      expect(events).not.toHaveProperty('mousedown')
      expect(events).not.toHaveProperty('keydown')
    })
  
    it('should handle outside click', () => {
      const { queryByText } = render(
        <div>
          <button>click</button>
          <Provider store={store}>
            <PeriodSelector />
          </Provider>
        </div>
      )
      const label = PERIODS_IN_PAST_MONTHS[ALL_TIME_INDEX].label
      // abre o dropdown
      fireEvent.click(queryByText(/Selecion/i))
      // clica fora do container
      act(() => { events.mousedown({ target: queryByText('click') }) })
      expect(queryByText(label)).toBeNull()
    })

    describe('Arrows event', () => {
      it('should handle next period when available', () => {
        render(
          <Provider store={store}>
            <PeriodSelector />
          </Provider>
        )
        // vai pro próximo
        act(() => { events.keydown({ which: 40 }) })
        let lastActionPayload = getLast(store.getActions()).payload
        expect(lastActionPayload).toBe(initialIndex + 1)
      })

      it('should handle next period when not available', () => {
        const testStore = mockStore({
          investments: { monthsInPastIndex: getLastIndex(PERIODS_IN_PAST_MONTHS) }
        })
        render(
          <Provider store={testStore}>
            <PeriodSelector />
          </Provider>
        )
        // não dispara nenhuma action
        act(() => { events.keydown({ which: 40 }) })
        const action = getLast(testStore.getActions())
        expect(action).toBeUndefined()
      })

      it('should handle prev period when available', () => {
        const initialIndex = getLastIndex(PERIODS_IN_PAST_MONTHS)
        const testStore = mockStore({
          investments: { monthsInPastIndex: initialIndex }
        })
        render(
          <Provider store={testStore}>
            <PeriodSelector />
          </Provider>
        )
        // volta pro period anterior
        act(() => { events.keydown({ which: 38 }) })
        const action = getLast(testStore.getActions())
        expect(action.payload).toBe(initialIndex - 1)
      })

      it('should handle prev period when not available', () => {
        render(
          <Provider store={store}>
            <PeriodSelector />
          </Provider>
        )
        // volta pro period anterior
        act(() => { events.keydown({ which: 38 }) })
        const action = getLast(store.getActions())
        expect(action).toBeUndefined()
      })

    })

  })
})