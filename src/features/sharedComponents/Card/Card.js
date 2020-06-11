import React from 'react'
import styled from '@emotion/styled'

const StyledCard = styled.div({
  backgroundColor: '#fff',
  padding: 20
})

export const Card = ({ children }) => <StyledCard>{children}</StyledCard>
