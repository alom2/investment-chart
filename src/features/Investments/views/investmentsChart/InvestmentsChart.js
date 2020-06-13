import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard } from '@fortawesome/free-regular-svg-icons'
import { fetchInvestmentsData } from '../../redux'
import { Chart, PeriodHeader } from '../../components'
import { Card, Footer } from '../../ui'

export const InvestmentsChart = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchInvestmentsData())
  }, [dispatch])

  return (
    <Card>
      <PeriodHeader />
      <Chart />
      <Footer>
        Use as setas para controlar o período de exibição do gráfico <FontAwesomeIcon icon={faKeyboard} />
      </Footer>
    </Card>
  )
}
