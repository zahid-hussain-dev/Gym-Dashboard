import styled from "styled-components";

export const MainSection = styled.div`
  background: #F9F9F9;
  paddingTop: 35px;
  marginTop: 100px ;
  width: 100%;
  `;
  export const BudgetMainSection = styled.div`
  background: #F9F9F9;
  paddingTop: 35px;
  width: 100%;
  marginTop: 20px ;

  `;
export const CollapsableSection = styled.div`
  display: flex;
  flexDirection: row;
  alignItems: center;
  paddingTop: 12px;
  `;

export const GeneralSection = styled.div`
  width:50%;
  padding: 30px;
  `;
export const SectionHeader = styled.div`
  display: flex;
  height: 65%;
  `;
export const SectionFooter = styled.div`
display: flex;
 height: 30%;
  `;
export const ExpandableSection = styled.div`
  display: flex;
   justifyContent: space-around;
  `;
export const HeaderText = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  `;
export const HeaderTextTitle = styled.h5`
  padding-right: 10px;
  padding-left: 10px;
  text-align: center;
  color: black;
  font-family: "gilroy";
  font-size: 1.2vw;
  line-height: 1.4vw;
  `;
export const HeaderTextSubTitle = styled.h6`
  margin-left: 10px;
  margin-bottom: -0px;
  text-align: start;
  color: black;
  font-family: gilroy;
  font-size: 1vw;
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
export const SavingGoal = styled.span`
  padding-right: 10px;
  padding-left: 15px;
  text-align: center;
  color: black;
  font-family: "gilroy";
  font-size: 1.7vw;
  line-height: 1.7vw; 
   `;
export const cardBlock = styled.div`
   height: 100%;
   margin-bottom: 20%
   `;
export const cardName = styled.div`
   background-image: linear-gradient(to right bottom, #39b54a, #0d723b);
   border-radius: 15px;
   padding-right: 4%;
   height: 60%;
   width: 60%;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-left: 15px;
   `;
export const cardImg = styled.div`
   box-shadow: 5px 5px 8px 6px lightgray;
   border-radius: 30px;
   background: white;
   height: 90%;
   width: 40%;
   padding: 20px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-left: -15px;
   `;
   export const cardPriceSection = styled.div`
   border-radius: 15px;
   background-image: linear-gradient(to bottom right, #39b54a, #0d723b);
   width: 25%;
   display: flex;
   align-items: center;
   justify-content: center;
   position: relative;
   left: 15px;
   `;
   export const cardPrice = styled.div`
   border-radius: 13px;
   background: white;
   box-shadow: 2px 5px 8px 6px lightgray;
   width: 75%;
   display: flex;
   align-items: center;
   justify-content: center;
   `;