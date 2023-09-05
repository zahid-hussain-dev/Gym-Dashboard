import styled from 'styled-components';

export const PopupHeading = styled.h2`

  color: rgb(232, 174, 51);
 margin-left:39%;
`;
export const MainDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width:100%;
  // filter: blur(5px);
`;
export const PopupContainer = styled.div`
   background-color: rgb(63, 63, 63);
  padding: 10px;
  width: 40%;
  margin: 0px auto;
  border-radius: 10px;
  margin-top: 0%;
  position:fixed;
  z-index:9999;
  left:35%;
`;
export const PopupMainHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  left:30px
  width:65%;
  margin-bottom: 20px;
`;

export const FormContainer = styled.div`
 text-align: center;

`;

export const Header = styled.div`
display:flex;
width:40%;
justify-content: center;
background-color:gray;
border-radius:10px;
padding-right:25px;
align-items:center;
`;
export const LabelHeader = styled.div`
color: #d5b93b;
`;
export const Wrapper = styled.div`
color: #d5b93b;
display:flex;
justify-content: space-between;
align-items:center;
width:60%;

`;
export const Schedular = styled.div`
  width: 75%;
  height: 30rem;
  overflow-y: auto;
  border-radius:5px;
`;
export const AddChildWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-item:center;
  margin-top: 50px;

`;

export const AddChildButton = styled.button`
  border: none;
  background-color: #d5b93b;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  width: 23%;
  height:30px;
  font-size:0.6vw;

  
`;

export const AddBookingHeading = styled.h2`
  color: rgb(232, 174, 51);
  padding: 20px;
  height:80px;
  text-align: center;

`;

export const SecondForm = styled.div`
  background-color: rgb(63, 63, 63);
  opacity: 0.9;
  width: 60%;
  margin-left: 20%;
  margin-top: 30px;
  border-radius: 10px;
  // height:200px;
`;

export const SubmitButton = styled.button`
  border: none;
  background-color: #d5b93b;
  color: white;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  width: 10px;
  height: 30px;
  margin-top: 20px;
  margin: 5px;
`;

export const InputData = styled.input`
margin: 20px;
padding: 6px;
border-radius: 2px;
border: none;
margin-left: 20px;
width: 100%;
background-color: #f8f8f8; /* Optional: Add background color to the dropdown */
`;
export const InputDataa = styled.input`
margin: 20px;
padding: 6px;
border-radius: 2px;
border: none;
margin-left: 20px;
width: 100%;
height:2.3rem;
background-color: #f8f8f8; /* Optional: Add background color to the dropdown */
`;
export const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  margin-left:0px;
`;

export const CenteredDropdownContainer = styled(DropdownContainer)`
  display:flex;
  justify-content: space-around;
  align-items:center;
  margin-bottom: 10px; /* Add margin to separate multiple dropdowns */
  width:100%;
`;

export const Label = styled.label`
  color: rgb(251, 235, 64);
  font-size: medium;
margin-left:19px;

`;

export const Labeled = styled.label`
  color: rgb(251, 235, 64);
  font-size: medium;
margin-left:2px;



`;
export const Lbl = styled.label`
display:flex;
flex-direction:column;
 row-gap:1rem;

`;
export const SecondMain = styled.label`
display:flex;
flex-direction:column;
row-gap:2rem;
margin-bottom:15px;
`;
export const FirstMain = styled.label`
display:flex;
width: 87%;
justify-content: space-between;

`;
export const Mains = styled.label`
margin-right:15px;
width:32%;

`;
export const SecondInput = styled.label`

  display: flex;
  flex-direction: column;
  row-gap:1rem;


`;
export const Select = styled.select`
  margin: 20px;
  padding: 6px;
  border-radius: 2px;
  border: none;
  margin-left: 20px;
  width: 100%;
height:2.3rem;
  background-color: #f8f8f8; /* Optional: Add background color to the dropdown */
`;
export const TableContainer = styled.div`
color:#d5b93b;
width:60%;
margin:0px auto;
// margin-top:10px;
height: 25rem;
overflow-y: auto;

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
  &:nth-child(even) {
    background-color: #f2f2f2;
    text-align: center;
  }
`;

export const TableRow2 = styled.tr` {
    background-color: #f2f2f2;
    color:#d5b93b;
  }
`
  ;
;
export const TableCell = styled.td`
  padding: 10px;
  background-color: black;
  color:white;
  border:1px solid #d5b93b;
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
margin-left:5%;
margin-top: 35px;

`;