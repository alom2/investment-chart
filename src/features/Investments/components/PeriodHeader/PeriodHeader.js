import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { PeriodSelector } from '../PeriodSelector'
import { useSelector } from 'react-redux'
import { PERIODS_IN_PAST_MONTHS } from '../../constants/chart'

const Container = styled.header({
  backgroundColor: '#eff2f5',
  color: '#597183',
  fontSize: 18,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 20,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5
})

const Period = styled.strong({
  fontWeight: 600,
  color: '#159ce4'
})

export const PeriodHeader = () => {
  const monthsInPastIndex = useSelector(state => state.investments.monthsInPastIndex)
  return (
    <Container>
      <div>
        <FontAwesomeIcon icon={faCalendarAlt}/> Você está vendo o período <Period>{PERIODS_IN_PAST_MONTHS[monthsInPastIndex].label}</Period>
      </div>
      <PeriodSelector />
    </Container>
  )
}
