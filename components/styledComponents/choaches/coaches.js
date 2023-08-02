import styled from 'styled-components';

export const PopupHeading = styled.h2`
  text-align: center;
  color: rgb(232, 174, 51);
  margin-right: 90px;
`;

export const PopupContainer = styled.div`
  background-color: rgb(63, 63, 63);
  opacity: 0.9;
  padding: 10px;
  width: 45%;
  // height: 250px;
  margin: 0px auto;
  border-radius: 10px;
  margin-top: 80px;
`;

export const MainForm = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 15px;
  margin-left: 25px;
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
  // width: 135px;
`;

export const PopupMainHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 105px;
  margin-bottom: 20px;
`;


export const SubmitForm = styled.button`
  border: none;
  background-color: #d5b93b;
  color: white;
  padding: 8px;
  border-radius: 5px;
  margin-left: 38%;
  cursor: pointer;
  margin-top: 20px;
  width: 100px;
`;
export const Select = styled.select`
  margin: 10px;
  padding: 6px;
  border-radius: 2px;
  border: none;
  margin-left: 20px;
  width: 135px;
  background-color: #f8f8f8; /* Optional: Add background color to the dropdown */
`;
