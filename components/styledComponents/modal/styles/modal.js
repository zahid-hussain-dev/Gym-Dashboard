import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: rgb(0 0 0 / 16%) 0px 10px 99px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  pointer-events: none;
  transition: all 0.3s;
  opacity: 1;
  pointer-events: visible;
`;

export const ModalContent = styled.div`
  /* width: 100%; */

  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 0.4rem;
  transform: translate(-50%, -50%);
  background: white;

  @media (max-width: 1500px) {
    /* left: 60%; */
    /* width: 45rem; */
  }

  @media (max-width: 1200px) {
    /* width: 40rem; */
  }
`;
