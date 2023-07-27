import styled from "styled-components";

export const HeaderContainer = styled.div`
  background-color: #eee;
  height: 15rem;
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 0 5rem; */
`;

export const MainContainer = styled.div`
  row-gap: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
`;
export const SubContainer = styled.div`
/* width: 100%;  */
  display: flex;
  align-items: center;
`;

export const Circle = styled.div`
cursor: pointer;
  height: 5rem;
  width: 7rem;
  border-radius: 100%;
  background-color: #e0e0e0;
background-color:${({backgroundColor})=>backgroundColor};

  color: rgb(0, 100, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

export const Line = styled.div`
  width: 100%;
  height: 0.2rem;
  background-color: #e0e0e0;
`;
