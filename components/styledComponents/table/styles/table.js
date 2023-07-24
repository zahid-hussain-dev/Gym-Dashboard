import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  /* height: 35rem; */
  max-height: 33rem;
  position: relative;
  overflow: auto;
  font-family: "Roboto", sans-serif;
 
`;

export const StyledTable = styled.table`
  width: 100%;
  /* height: 100%; */

  border-collapse: collapse;
  table-layout: auto;
  overflow: auto;
  min-width: 20rem;
  font-family: "Roboto", sans-serif;
`;

export const TableHead = styled.thead`
  /* background-color: ${({ theme, backgroundcolor }) =>
    backgroundcolor || "#4cba5b"}; */
  background-image: linear-gradient(to top right, #39b54a, #0d723b);

  color: ${({ theme, color }) => color || "#FFFFFF"};
  text-transform: uppercase;
  height: 3rem;
  max-height: 3rem;
  font-family: "Roboto", sans-serif;
`;

export const TableBody = styled.tbody`
  text-align: left;
  color: ${"#000000"};
  font-family: "Roboto", sans-serif;
`;

export const TR = styled.tr`
  /* border-bottom: 0.1rem solid; */
  /* border-bottom-color: ${"#000000"}; */
  /* padding-left: 4rem; */
  font-size: 0.89rem;
  font-family: "Roboto", sans-serif;
`;
export const TH = styled.th`
  width: ${(style) => style.width};
  min-width: ${(style) => style.minWidth};
  /* padding: 0 1rem; */
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 0.89rem;
  height: 2rem;
  max-height: 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  /* background-image: linear-gradient(to top right, #39b54a, #0d723b); */
`;

export const TD = styled.td`
  max-width: 10rem;
  height: 4rem;
  max-height: 4rem;
  overflow-wrap: break-word;
  text-align: center;
  cursor: pointer;
  font-size: ${"1rem"};
  font-family: "Roboto", sans-serif;
background-color: ${({backgroundcolor})=> backgroundcolor || "white"};
  & span {
    display: flex;
    column-gap: 2rem;
    align-items: center;
    justify-items: center;
    justify-content: center;
  }
`;
