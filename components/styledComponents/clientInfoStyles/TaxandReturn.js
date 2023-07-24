import styled from "styled-components";
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 3rem;
  margin-top: 1rem;
`;

export const TableHeader = styled.div`
  background-image: linear-gradient(to top right, #39b54a, #0d723b);
  color: white;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  min-width: 17rem;
  font-family: "Roboto", sans-serif;

`;

export const TableBodyRow = styled.div`
  height: 2.8rem;
  width: 25rem;
  min-width: 17rem;
  /* background-color: lightgray; */
  background-color: ${({ backgroundcolor }) => backgroundcolor || "white"};
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "Roboto", sans-serif;

`;
