import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  outline: none;
  padding: 8px 12px;
  border: 1px solid lightgray;
  border-radius: 4px;
  font-size: 1rem;
  color: gray;
  transition: box-shadow 0.3s;

  &:focus{
      box-shadow: 0 0 0 2px rgb(170,173,254,0.5);
  }
`;
