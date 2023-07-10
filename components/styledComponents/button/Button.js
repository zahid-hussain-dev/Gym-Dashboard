import styled from "styled-components";

export const Button = styled.button`
min-width: 54px;
width: 100%;
padding: 10px 16px;
background-image: linear-gradient(to bottom right, #39b54a, #0d723b);
color: white;
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