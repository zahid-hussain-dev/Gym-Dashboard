import styled from "styled-components";


export const HeaderConatiner = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 1.5rem 1rem;
border-bottom: 1px solid lightgray;
width: 65rem;
`

export const MainContainer = styled.div`
 
`;

export const FieldsContainer = styled.div`
  display: flex;
 flex-wrap: wrap;
 justify-content: start;
 align-items: center;
 padding: 0 2rem;
 column-gap: 2rem;
  width: 100%;
  margin-bottom:2rem;

  @media (max-width: 1300px) {
    width: 100%
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 1rem;
  margin-right: 1rem;
  padding: 0.8rem 0;
  border-top: 1px solid lightgray;
`;
