import styled from "styled-components";

export const BudgetMainSection = styled.div`
// background: #F9F9F9;
padding-top: 35px;
width: 100%;
margin-top: 20px ;

`;
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
export const LeftBox = styled.div`
   display: flex;
   width:45%;
   `;
export const RightBox = styled.div`
   display: flex;
   width:45%;
   `;
export const GreenCard = styled.div`
    width:100%;
   border-radius: 10px;
   background-image: linear-gradient(to top right, #39b54a, #0d723b);
   box-shadow: 6px 6px 6px 1px lightgray;
   `;
export const WhiteCard = styled.div`
   width: 100%;
  border-radius: 10px;
  background: white;
  box-shadow: 2px 6px 6px 6px lightgray;
   `;

export const CardContent = styled.div`
   height: 100%;
margin-bottom: 25%;
padding-bottom: 2%;
   `;
export const CardContentWhite = styled.div`
   height: 100%;
   margin-bottom: 15.5%;
   padding-bottom: 1%;
   `;
export const CardHeader = styled.div`
height: 20%;
 margin-top: 1.5%;
   `;
export const CardHeading = styled.p`
   margin-bottom: -0px;
   text-align: center;
   color: white;
   font-family: gilroy;
   font-size: 1.8vw;
   line-height: 2vw;
//    padding-top: 8px;   
   `;
export const CardLowerSection = styled.div`
   height: 100%;
display: flex;
justify-content: space-between; 
   `;
export const CardItems = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 35%;  
   `;
export const CardItemsRight = styled.div`
   height: 100%;
   width: 50%;
   display: flex;
   align-items: center;
   justify-content: center;  
   `;
export const CardSection = styled.div`
   height: 100%;
    display: flex;
     justify-content: space-around ;
   `;
export const ImageSection = styled.div`
   display: flex;
justify-content: center;
align-items: center;
height: 50%;
   `;
export const ImageHeader = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 15%;
   `;
export const ImagePrice = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 35%;
   `;