import styled from "styled-components";

export const StyledForm = styled.form`
//   background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
  font-family: "Roboto", sans-serif;
`;
export const StyledLabel = styled.label`
font-weight: 500;
color: #323a46;
display: inline-block;
margin-bottom: 0.5rem;
margin-top: 0.5rem;
font-family: "Roboto", sans-serif;

//   color: ${props => props.invalid ? 'red' : 'black'};
`;
export const StyledInput = styled.input`
width: 100%;
outline: none;
padding: 8px 12px;
border: 1px solid lightgray;
border-radius: 4px;
font-size: 1rem;
color: gray;
transition: box-shadow 0.3s;
font-family: "Roboto", sans-serif;

&:focus{
    box-shadow: 0 0 0 2px rgb(170,173,254,0.5);
}
`;
export const StyledTextArea = styled.textarea`
width: 100%;
outline: none;
padding: 8px 12px;
border: 1px solid lightgray;
border-radius: 4px;
font-size: 1rem;
color: gray;
transition: box-shadow 0.3s;
font-family: "Roboto", sans-serif;

&:focus{
    box-shadow: 0 0 0 2px rgb(170,173,254,0.5);
}
`;
export const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  &:disabled {
    opacity: 0.5;
  }
  &:enabled {
    opacity: 1.0;
  }
  opacity: ${props => !props.enabled ? 0.5 : 1};
`;
export const RadioGroup = styled.div`
display:flex;
flex-wrap:wrap;
`;
export const RadioField = styled.div`
display:flex;
`;
export const RadioLabel = styled.label`
padding-right: 0.6rem;
 margin-left: 6px;
`;
export const Select = styled.select`
   border-radius: 10px;
   border:none;
   background: white;
   padding:5px;
   box-shadow: 2px 5px 8px 6px lightgray;
   width: 300px;
   font-size:20px;
   display: flex;
   align-items: center;
   justify-content: center;
   `;