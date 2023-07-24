import styled from "styled-components";

export const Button = styled.button`
  height: ${({ style }) => style && style.h_md || "2.7rem"};
  width: ${({ style }) => style && style.w_md || "7rem"};
  border-radius: ${({ style }) => style && style.borderRadius || "4px"};
  /* border-radius: 4px; */
  display: flex;
  letter-spacing: 0px;
  justify-content: center;
  align-items: center;
  border: ${({ style }) => style && style.border || "1px solid"};
  background-color: ${({ style }) => style && style.backgroundColor || "#39b54a"};
  color: ${({ style }) =>style &&  style.color || "#FFFFFF"};
  font-size: ${"1rem"};
  font-weight: bold;
  cursor: pointer;

  :hover {
    color: ${({ style }) => style && style.hoverColor || "#FFFFFF"};
    background-color: ${({ style }) => style && style.hoverBackgroundColor || "#4cba5b"};
  }
`;
