import styled from '@emotion/styled'
import { BaseButton } from './SelectorButton'

export const SelectorOptionsContainer = styled.div({
  backgroundColor: '#fff',
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  borderBottomRightRadius: 5,
  borderBottomLeftRadius: 5,
  boxShadow: '0 3px 3px 0 rgba(0,0,0,0.2)'
})

export const SelectorOption = styled(BaseButton)(({ active }) => ({
  fontSize: 16,
  backgroundColor: active ? '#e1e7ec' : '#fff',
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '10px 20px',
  fontWeight: active ? 600 : 400,
  ':last-child': {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },
  ':hover': {
    backgroundColor: '#e1e7ec'
  }
}))
