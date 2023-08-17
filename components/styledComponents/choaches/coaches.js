import styled from 'styled-components';

export const PopupHeading = styled.h2`

  color: rgb(232, 174, 51);
 margin-left:39%;
`;

export const PopupContainer = styled.div`
   background-color: rgb(63, 63, 63);
  padding: 10px;
  width: 40%;
  margin: 0px auto;
  border-radius: 10px;
  margin-top: 10%;
  position:fixed;
  z-index:9999;
  left:35%;
`;

export const MainForm = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 15px;
  padding-right: 4%;

`;

export const Label = styled.label`
  color: rgb(251, 235, 64);
  font-size: medium;
  margin-left: 15px;
`;

export const InputData = styled.input`
  margin: 10px;
  padding: 6px;
  border-radius: 2px;
  border: none;
  width:100%;
`;

export const PopupMainHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  left:30px
  width:65%;
  margin-bottom: 20px;
`;


export const SubmitForm = styled.button`
  border: none;
  background-color: #d5b93b;
  color: white;
  padding: 8px;
  border-radius: 5px;
  margin-left: 45%;
  cursor: pointer;
  margin-top: 20px;
  width: 100px;
`;
export const Select = styled.select`
margin: 10px;
padding: 6px;
border-radius: 2px;
border: none;
width:100%;
`;



