import styled from "styled-components";

export const Title = styled.p`
margin: 10px 0;
font-size: 1.875rem;
font-weight: 500;
font-family: "Karla", sans-serif;
color: #343a40;
text-align: center !important;
line-height: 1.1;
`;
export const CustomInputGroup = styled.div`
  margin-bottom: 3rem;
  margin-top: 3rem;
//   text-align: left;
  font-family: gilroy;
  display: flex;
align-items: center;
justify-content: center;
`

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
export const RadioInput = styled.input`
padding-right: 0.6rem;
 margin-left: 4rem;
`;
export const SmallInput = styled.input`
width: 30%;
outline: none;
padding: 8px 12px;
border: 1px solid lightgray;
margin-left:2rem;
border-radius: 4px;
font-size: 1rem;
color: gray;
transition: box-shadow 0.3s;
font-family: "Roboto", sans-serif;

&:focus{
    box-shadow: 0 0 0 2px rgb(170,173,254,0.5);
}
`;
export const LargeInput = styled.input`
width: 60%;
outline: none;
padding: 8px 12px;
border: 1px solid lightgray;
margin-left:2rem;
border-radius: 4px;
font-size: 1rem;
color: gray;
transition: box-shadow 0.3s;
font-family: "Roboto", sans-serif;

&:focus{
    box-shadow: 0 0 0 2px rgb(170,173,254,0.5);
}
`;
export const CustomTextArea = styled.textarea`
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
export const CustomLabel = styled.label`
margin: 10px 0;
// font-weight: 600;
color: #343a40;
// column-gap: 1rem;
font-weight: 500;
font-size: 1.125rem;
text-align:left;
display: inline-block;
margin-bottom: 0.5rem;
margin-top: 0.5rem;
font-family: "Karla", sans-serif;

//   color: ${props => props.invalid ? 'red' : 'black'};
`;
export const Select = styled.select`
border: 1px solid lightgray;
border-radius: 4px;
   background: white;
   padding:5px;
   width: 300px;
   font-size:20px;
   margin-left:2rem;
   display: flex;
   align-items: center;
   justify-content: center;
   `;