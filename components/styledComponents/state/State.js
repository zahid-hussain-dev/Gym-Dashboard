import styled from "styled-components";

export const MainDiv = styled.div`
  display: flex;
  justify-content: space-around;
  // filter: blur(5px);
`;
export const MainDiv2 = styled.div`
  display: flex;
  justify-content: space-around;
  
`;
export const Schedular = styled.div`
  width: 75%;
  height: 50%;
`;
export const TableContainer = styled.div`
  color: #d5b93b;
  width: 50%;
  margin: 0px auto;
  margin-top: 10%;
  height: 20rem;
   overflow-y: auto;
  filter: showModal2 ? 'blur(5px)' : 'none';
`;
export const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
`;

export const TableHead = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  text-align: center;
  border-radius: 5px 5px 0px 0px;
  position:sticky;
  top:0;
`;

export const TableRow = styled.tr`
 {
    background-color: #f2f2f2;
    border-radius: 5px;
    text-align: center;
  }
`;

export const TableRow2 = styled.tr`
   {
    background-color: #f2f2f2;
    border-radius: 5px;
    color: #d5b93b;
    height: 20px;
    overflow-y: auto;
  }
`;
export const TableCell = styled.td`
  padding: 10px;
  background-color: black;
  color: white;
  border: 1px solid #d5b93b;
`;
export const SubTitle = styled.p`
// min-width: 54px;
width: fit-content;
padding: 10px 16px;
background:#E3DC22;
color: black;
border: 0;
border-radius: 4px;
font-family: gilroy;
outline: none;
font-size: 1.2rem;
font-weight: 500;
line-height: 1.5;
letter-spacing: 0.087rem;


`;