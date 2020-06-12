import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { setMothsInPastByIndex } from '../../redux/actions'
import { SelectorButton } from './SelectorButton'
import { SelectorOptionsContainer, SelectorOption } from './SelectorOptions'
import { PERIODS_IN_PAST_MONTHS } from '../../constants/chart'

const Container = styled.div({
  position: 'relative'
})

export const PeriodSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const monthsInPastIndex = useSelector(state => state.investments.monthsInPastIndex)
  const dispatch = useDispatch()

  const toggleIsOpen = () => setIsOpen(!isOpen)
  const close = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  const setPeriodByIndex = (index) => {
    dispatch(setMothsInPastByIndex(index))
    setIsOpen(false)
  }

  useEffect(() => {
    window.addEventListener('mousedown', close)
    return () => window.removeEventListener('mousedown', close)
  }, [])

  return (
    <Container isOpen={isOpen} ref={containerRef}>
      <SelectorButton isOpen={isOpen} onClick={toggleIsOpen}>Selecionar Período</SelectorButton>
      {isOpen && (
        <SelectorOptionsContainer>
          {PERIODS_IN_PAST_MONTHS.map(({ value, label }, index) => (
            <SelectorOption
              key={value}
              active={index === Number(monthsInPastIndex)}
              onClick={() => setPeriodByIndex(index)}
            >
              {label}
            </SelectorOption>
          ))}
        </SelectorOptionsContainer>
      )}
    </Container>
  )
}
