import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FieldsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70rem;

  @media (max-width: 1300px) {
    width: 50rem;
  }
`;

export const RowContainer = styled.div`
  width: 70rem;
  height: 5rem;
  box-shadow:2px 4px 6px 4px #d3d3d3;
  border-radius: 0.5rem;
  margin: 2rem 0;
  display: flex;
  padding-right: 3rem;
  justify-content: space-between;
  align-items: center;
`;

export const LeftContainer = styled.div`
width: 5rem;
height: 5rem;
font-size:1rem;
border-radius: 0.5rem;
color: white;
background-image: linear-gradient(to top right,#39b54a,#0d723b);
display: flex;
justify-content: center;
align-items: center;
`;

export const RightContainer = styled.div`
display: flex;
padding-left: 1rem;
column-gap: 3rem;
width:100%;
// justify-content: center;
// align-items: center;
`;

export const ButtonsContainer = styled.div`
  width: 70rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;
export const TextBlock = styled.p`
  font-size: ${({ style }) => (style && style.fontSize || "1rem")};
  font-family: ${(props) => props.fontFamily || "Roboto"};
  font-weight: ${({ style }) => (style && style.fontWeight || "normal")};
  color: ${(props) => props.color || "#343a40"};
  padding: ${(props) => props.padding};
  letter-spacing: ${({ letterspace }) => letterspace || "0px"};
  // line-height: ${({ lineHeight }) => lineHeight || "0rem"};
  margin: 0;
  text-align: ${({ textAlign }) => textAlign || "left"};
  cursor: ${(props) => props.cursor};
  width: ${({ width }) => width};
  font-family: "Roboto", sans-serif;

`;
export const Steric = styled.span`
  color: red;
`;