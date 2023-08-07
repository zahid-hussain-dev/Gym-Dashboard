import styled from "styled-components";

export const Button = styled.button`
min-width: 54px;
width: 100%;
padding: 10px 16px;
// background-image: linear-gradient(to bottom right, #39b54a, #0d723b);
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
cursor: pointer;
transition: all 0.3s;
&:hover{
    background-image: linear-gradient(to bottom, right, #0d723b, #39b54a);
}
`;
export const AcceptButton = styled.button`
// width: 25%;
padding: 0.4rem 1rem;
background:#00753D;
color: black;
border: 0;
border-radius: 4px;
font-family: gilroy;
outline: none;
letter-spacing: 0.087rem;
cursor: pointer;
transition: all 0.3s;
&:hover{
    background-image: linear-gradient(to bottom, right, #0D723B, #39B54A);
}
`
export const RejectButton = styled.button`
// width: 25%;
padding: 0.4rem 1rem;
background:#ff0000;
color: black;
border: 0;
border-radius: 4px;
font-family: gilroy;
outline: none;
letter-spacing: 0.087rem;
cursor: pointer;
transition: all 0.3s;
&:hover{
    background-image: linear-gradient(to bottom, right, #0D723B, #39B54A);
}
`
export const ViewButton = styled.button`
// width: 25%;
padding: 0.4rem 1rem;
background:#E3DC22;
color: black;
border: 0;
border-radius: 4px;
font-family: gilroy;
outline: none;
letter-spacing: 0.087rem;
cursor: pointer;
transition: all 0.3s;
&:hover{
    background-image: linear-gradient(to bottom, right, #0D723B, #39B54A);
}
`