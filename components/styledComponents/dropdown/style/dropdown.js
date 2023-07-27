import styled from 'styled-components'

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;
export const DropdownButton = styled.button`
  background-color: transparent;
  color: black;
  padding: 10px;
  font-size:16px;
  font-weight:400;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: black;
    border-radius:0.5rem;
  }
`;
export const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right:2%;
  background-color: black;
  color:white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;
export const DropdownItem = styled.a`
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  &:hover {
    background-color: #E3DC22;
    color:white;
  }
`;
