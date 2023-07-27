import styled from "styled-components";

export const Input = styled.input`
  height: ${({ style }) => (style && style.h_md) || "2.5rem"};
  width: ${({ style }) => (style && style.w_md) || "20rem"};
  outline: none;
  border: ${({ style }) => (style && style.border) || "0.5px solid #d9d9d9"};
  border-color: ${"#d9d9d9"};
  border-radius: 0.2rem;
  padding: 0rem 1rem;

  S & ::placeholder {
    /* color: ${"#d9d9d9"}; */
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still   even though it's hidden */
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  -moz-appearance: textfield !important;

  @media (max-width: 1300px) {
    height: ${({ style }) => (style && style.h_sm) || "2.5rem"};
    width: ${({ style }) => (style && style.w_sm) || "13rem"};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  /* flex: 0 0 45%; */
`;

export const InputGroup1 = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  flex: 0 0 45%;
`;

export const InputGroupFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: ${({ columnGap }) => columnGap || "0rem"};
  height: 3rem;
`;

export const IconContainer = styled.div`
  width: 2rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d9d9d9;
`;
