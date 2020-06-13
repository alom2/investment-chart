import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const show = keyframes({
  from: {
    top: -50,
    opacity: 0
  },
  to: {
    top: 0,
    opacity: 1
  }
})

export const Card = styled.div({
  position: 'relative',
  top: -50,
  opacity: 0,
  borderRadius: 5,
  display: 'flex',
  flex: 1,
  width: 800,
  flexDirection: 'column',
  animation: `${show} ease-out .7s forwards`
})
