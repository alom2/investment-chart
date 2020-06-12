import React from 'react'
import styled from '@emotion/styled'

const Button = styled.button({
  backgroundColor: '#e1e7ec',
  border: 0,
  fontFamily: 'Quicksand',
  color: '#597183',
  fontWeight: 600,
  cursor: 'pointer',
  outline: 'none',
  padding: 20,
  fontSize: 18,
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  transition: 'all .3s',
  ':hover': {
    backgroundColor: '#c8d3dc'
  }
})

export const PeriodSelector = () => {
  return (
    <div>
      <Button>Selecionar Período</Button>
    </div>
  )
}
