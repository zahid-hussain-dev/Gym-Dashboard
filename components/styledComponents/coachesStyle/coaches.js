import styled from 'styled-components'

export const MainDiv = styled.div`
display: flex;
 justify-content: space-around;

`;
export const Schedular = styled.div`
width: 75%;
 height: 50%;

`;
export const TableContainer = styled.div`
color:#d5b93b;
width:60%;
margin:0px auto;
margin-top:80px;
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
  border-radius: 5px;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
    border-radius: 5px;
    text-align: center;
  }
`;

export const TableRow2 = styled.tr` {
    background-color: #f2f2f2;
    border-radius: 5px;
    color:#d5b93b;
  }
`
;
export const TableCell = styled.td`
  padding: 10px;
  background-color: black;
  color:white;
  border:1px solid #d5b93b;
`;