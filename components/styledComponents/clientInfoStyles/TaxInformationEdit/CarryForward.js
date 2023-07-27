import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
  width: 70rem;

  @media (max-width: 1300px) {
    width: 50rem;
  }
`;



export const ButtonsContainer = styled.div`
  width: 70rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;
