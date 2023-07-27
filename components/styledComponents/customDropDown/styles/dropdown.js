import styled from "styled-components";
export const DropDownInput = styled.div`
  width: ${({ style }) => (style && style.w_md || "22rem")};
  height: ${({ style }) => (style && style.h_md || "2.5rem")};
  display: flex;
  align-items: center;
  border-radius: 3px;
  padding: 0px 20px;
  justify-content: space-between;
  border: ${({ style }) => (style && style.border || "0.5px solid")};

  border-color: ${"#d9d9d9"};
  background-color: ${"#FFFFFF"};
  cursor: pointer;

  @media (max-width: 1300px) {
    height: ${({ style }) => (style && style.h_sm) || "2.5rem"};
    width: ${({ style }) => (style && style.w_sm) || "15rem"};
  }

`;
export const DropDownList = styled.div`
  width: ${({ style }) => (style && style.w_md || "22rem")};

  height: auto;
  max-height: 20rem;
  overflow-y: auto;
  border: 1px solid #d9d9d9;
  border-color: ${"#8f8f8f"};
  background-color: ${"#FFFFFF"};
  margin-top: 15px;
  position: absolute;
  z-index: 7;

  @media (max-width: 1300px) {
    height: ${({ style }) => (style && style.h_sm) || "2.5rem"};
    width: ${({ style }) => (style && style.w_sm) || "15rem"};
  } 

 
`;

export const DropDownValue = styled.input`
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  font-size: ${"1rem"};
  color: ${"#8f8f8f"};

  ::placeholder {
    font-size: ${"1rem"};
    letter-spacing: 0px;
    color: ${"#8f8f8f"};
  }
`;
export const DropDownListItems = styled.p`
  :hover {
    background-color: ${"#e6f7ff"};
  }

  margin: 0;
  padding: 12px 20px;
  text-align: left;
  font: ${"1rem"};
  letter-spacing: 0px;
  color: ${"#8f8f8f"};
  cursor: pointer;
`;

export const DropdownGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  flex-basis: 29%;

`;
