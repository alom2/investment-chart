// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import jestMock from 'jest-fetch-mock'
import moment from 'moment'
import 'moment/locale/pt-br'
import numeral from 'numeral'
import 'numeral/locales/pt-br'
import React from 'react'

moment.locale('pt-br')
numeral.locale('pt-br')

jestMock.enableMocks()

// mock para o gráfico por que o chart js usa o canvas que nao tem total suporte no jest
jest.mock('react-chartjs-2', () => ({
  Line: () => <div>Line</div>
}))
