import styled from '@emotion/styled'

export const BaseButton = styled.button({
  border: 0,
  fontFamily: 'Quicksand',
  color: '#597183',
  transition: 'background-color .3s',
  cursor: 'pointer',
  outline: 'none'
})

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
