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
export const SavingHeader = styled.div`
   height: 100%;
   display: flex;
    align-items: center;
    justify-content: center;
  `;
export const SavingBox = styled.div`
  height: 100%;
  border-radius: 10px;
  background: white;
  box-shadow: 2px 4px 6px 4px lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  `;
export const SavingBoxHeaderText = styled.span`
  padding-right: 10px;
  padding-left: 15px;
  text-align: center;
  color: black;
  font-family: "gilroy";
  font-size: 1.7vw;
  line-height: 1.7vw;
  `;
export const SavingBoxHeader = styled.span`
  padding-right: 10px;
  padding-left: 10px;
  text-align: center;
  color: black;
  font-family: "gilroy";
  font-size: 2vw;
  line-height: 2vw;
  `;
export const SavingBudgetBlock = styled.div`
  background: white;
  box-shadow: 2px 6px 6px 6px lightgray;
  height: 20%;
  padding:20px;
  margin-top:20px;
  margin-bottom: 20px;
//   margin-right: 10px;
  border-radius: 10px;
  width:95%;
  margin-inline: auto;
    `;
export const SavingBudgetColumn = styled.div`
  padding-top: 30px;
  display:flex;
flex-wrap:wrap;
    justify-content:space-around;
    

  `;
export const SavingChartColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
    

  `;
export const ChartBlock = styled.div`
 width:45%;

  `;