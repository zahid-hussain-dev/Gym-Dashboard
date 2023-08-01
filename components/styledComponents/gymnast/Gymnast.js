import styled from 'styled-components';

export const FormContainer = styled.div`
  text-align: center;

`;

export const AddChildWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

`;

export const AddChildButton = styled.button`
  border: none;
  background-color: #d5b93b;
  color: white;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  width: 80px;
  height: 30px;
  margin-top: 9px;
  
`;

export const AddBookingHeading = styled.h2`
  color: rgb(232, 174, 51);
  padding: 20px;
  height:80px;
`;

export const SecondForm = styled.div`
  background-color: rgb(63, 63, 63);
  opacity: 0.9;
  width: 60%;
  margin-left: 20%;
  margin-top: 30px;
  border-radius: 10px;
  height:200px;
`;

export const SubmitButton = styled.button`
  border: none;
  background-color: #d5b93b;
  color: white;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  height: 30px;
  margin-top: 20px;
  margin: 5px;
`;

export const InputData = styled.input`
  margin: 10px;
  padding: 6px;
  border-radius: 2px;
  border: none;
  margin-left: 20px;
  width: 135px;
`;

export const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

export const CenteredDropdownContainer = styled(DropdownContainer)`
  justify-content: center;
  margin-bottom: 10px; /* Add margin to separate multiple dropdowns */
`;

export const Label = styled.label`
  color: rgb(251, 235, 64);
  font-size: medium;
  margin-left: 15px;
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
