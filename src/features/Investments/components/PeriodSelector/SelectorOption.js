import styled from '@emotion/styled'
import { BaseButton } from '../../ui'

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
