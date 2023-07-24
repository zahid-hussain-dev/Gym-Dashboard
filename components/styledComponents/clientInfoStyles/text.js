import styled from "styled-components";
export const Text = styled.p`
  font-size: ${({style}) => (style && style.fontSize || "1rem")};
  font-family: ${(props) => props.fontFamily || "Roboto"};
  font-weight: ${({style}) => (style && style.fontWeight || "normal")};
  color: ${(props) => props.color || "#343a40"};
  padding: ${(props) => props.padding};
  letter-spacing: ${({ letterspace }) => letterspace || "0px"};
  line-height: ${({ lineHeight }) => lineHeight || "0rem"};
  margin: 0;
  text-align: ${({ textAlign }) => textAlign || "left"};
  cursor: ${(props) => props.cursor};
  width: ${({width})=> width};
  font-family: "Roboto", sans-serif;

`;
export const Steric = styled.span`
  color: red;
`;