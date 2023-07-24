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
export const PercentageCardSection = styled.div`
   padding: 20px;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
`;
