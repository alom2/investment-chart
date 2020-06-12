import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { PeriodSelector } from '../PeriodSelector'

const Container = styled.header({
  backgroundColor: '#eff2f5',
  color: '#597183',
  fontSize: 18,
  marginBottom: 40,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 20,
  borderRadius: 5
})

const Period = styled.strong({
  fontWeight: 600
})

export const PeriodHeader = ({ period }) => (
  <Container>
    <div>
      <FontAwesomeIcon icon={faCalendarAlt}/> Você está vendo o período <Period>{period}</Period>
    </div>
    <PeriodSelector />
  </Container>
)
