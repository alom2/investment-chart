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
  backgroundColor: '#fff',
  padding: 20,
  position: 'relative',
  top: -50,
  opacity: 0,
  animation: `${show} ease-out .7s forwards`
})
