import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { setMothsInPastByIndex } from '../../redux/actions'
import { SelectorButton, SelectorOptionsContainer, SelectorOption } from './ui'
import { PERIODS_IN_PAST_MONTHS } from '../../constants/periods'
import { getLastIndex } from '../../../../utils/array'

const Container = styled.div({
  position: 'relative'
})

export const PeriodSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const monthsInPastIndex = useSelector(state => state.investments.monthsInPastIndex)
  const dispatch = useDispatch()

  const toggleIsOpen = () => setIsOpen(!isOpen)

  const closeFromOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  const setPeriodByIndex = useCallback((index) => {
    dispatch(setMothsInPastByIndex(index))
  }, [dispatch])

  const goToPrevPeriod = useCallback(() => {
    if (monthsInPastIndex > 0) {
      setPeriodByIndex(monthsInPastIndex - 1)
    }
  }, [monthsInPastIndex, setPeriodByIndex])

  const goToNextPeriod = useCallback(() => {
    if (monthsInPastIndex < getLastIndex(PERIODS_IN_PAST_MONTHS)) {
      setPeriodByIndex(monthsInPastIndex + 1)
    }
  }, [monthsInPastIndex, setPeriodByIndex])

  const changePeriodWithKeyboard = useCallback((event) => {
    const keyCode = event.which
    if (keyCode === 38 || keyCode === 37) {
      goToPrevPeriod()
    }
    if (keyCode === 39 || keyCode === 40) {
      goToNextPeriod()
    }
  }, [goToNextPeriod, goToPrevPeriod])

  useEffect(() => {
    window.addEventListener('keydown', changePeriodWithKeyboard)
    return () => {
      window.removeEventListener('keydown', changePeriodWithKeyboard)
    }
  }, [changePeriodWithKeyboard])

  useEffect(() => {
    window.addEventListener('mousedown', closeFromOutside)
    return () => {
      window.removeEventListener('mousedown', closeFromOutside)
    }
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
