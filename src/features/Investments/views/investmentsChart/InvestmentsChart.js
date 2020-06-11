import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { fetchInvestmentsData } from '../../redux'
import { Card } from '../../../../sharedComponents'
import { Chart } from '../../components'

const InvestmentsCard = styled(Card)({
  display: 'flex',
  flex: 1,
  width: '100%',
  maxWidth: 900,
  flexDirection: 'column'
})

export const InvestmentsChart = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchInvestmentsData())
  }, [dispatch])

  return (
    <InvestmentsCard>
      <Chart />
    </InvestmentsCard>
  )
}
