import styled from "styled-components";

export const TextArea = styled.textarea`
  height: ${({ style }) => style && style.h_md || "5rem"};
  width: ${({ style }) => style && style.w_md || "10rem"};
  border-radius: 0.3rem;
  outline: none;
  padding: 1rem;
  max-width: 35rem;
  min-width: ${({ style }) => style && style.w_md || "10rem"};
  max-height: 9.8rem;
  min-height: ${({ style }) => style && style.h_md || "5rem"};
  border: ${({ style }) => style && style.border || "0.5px solid #d9d9d9"};
  font-size: ${({ theme }) => theme.fonts.md || "0.8rem"};

  ::placeholder {
    /* color: ${({ theme }) => theme.colors.grayPlaceholderColor}; */
  font-size: ${({ theme }) => theme.fonts.sm || "0.9rem"};

  }
`;
