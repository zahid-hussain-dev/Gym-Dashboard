import styled from 'styled-components'

export const DropdownContainer = styled.div`
  display: inline-block;
  position: relative;
`

export const DropdownMenu = styled.div`
  background-color: #f9f9f9;
  display: none;
  padding: 12px 16px;
  position: absolute;
  right: 0;
  z-index: 1;
`

export const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  color: inherit;

  &:hover + & {
    display: inline-block;
  }
`