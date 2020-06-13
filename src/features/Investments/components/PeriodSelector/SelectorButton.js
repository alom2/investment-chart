import styled from '@emotion/styled'
import { BaseButton } from '../../ui'

export const SelectorButton = styled(BaseButton)(({ isOpen }) => ({
  backgroundColor: isOpen ? '#c8d3dc' : '#e1e7ec',
  fontWeight: 600,
  padding: 20,
  fontSize: 18,
  borderTopRightRadius: 5,
  borderBottomRightRadius: isOpen ? 0 : 5,
  transition: 'background-color .3s',
  ':hover': {
    backgroundColor: '#c8d3dc'
  }
}))
