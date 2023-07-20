import styled from "styled-components";

export const CollapsableSection = styled.div`
display: flex;
flexDirection: row;
align-items: center;
padding-top: 12px;
`;

export const BorderCollapsable = styled.div`
  box-shadow: 2px 6px 6px 6px lightgray;
  border-radius: 20px;
  width: 4vw;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  `;
export const CollapseIcon = styled.span`
  right: 24px;
  `;
export const Title = styled.span`
  padding-right: 10px;
  padding-left: 15px;
  text-align: center;
  color: black;
  font-family: "gilroy";
  font-size: 1.7vw;
  line-height: 1.7vw; 
   `;
export const MainBox = styled.div`
padding: 20px;
display: flex;
margin-bottom: 12px;
justify-content: space-evenly;
   `;
export const LiquidicityTitle = styled.div`
display: flex;
align-items: center;
margin-left: 10px;
   `;
export const LiquidicityRow = styled.div`
   display: flex;
    justify-content: start;
 align-items: center;
  height: 20%;
   `;
export const LiquidicityRowLeft = styled.div`
   display: flex;
   width: 60%;
    padding-right: 10px;
    padding-left: 10px;
    height: 70%;
   `;
export const LiquidicityRowRight = styled.div`
display: flex;
height: 70%;
width: 35%;
margin-left: 3%;
   `;
   export const LiquidicityOptions = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-left: 5px;
   `;