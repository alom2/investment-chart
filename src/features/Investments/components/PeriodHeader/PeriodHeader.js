import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { PeriodSelector } from '../PeriodSelector'
import { PERIODS_IN_PAST_MONTHS } from '../../constants/periods'
import { PeriodHeaderContainer, PeriodHeaderPeriod } from './ui'

export const PeriodHeader = () => {
  const monthsInPastIndex = useSelector(state => state.investments.monthsInPastIndex)
  return (
    <PeriodHeaderContainer>
      <div>
        <FontAwesomeIcon icon={faCalendarAlt}/> Você está vendo o período <PeriodHeaderPeriod>{PERIODS_IN_PAST_MONTHS[monthsInPastIndex].label}</PeriodHeaderPeriod>
      </div>
      <PeriodSelector />
    </PeriodHeaderContainer>
  )
}
