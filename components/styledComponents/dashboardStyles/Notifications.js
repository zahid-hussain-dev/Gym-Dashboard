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
export const NotificationRow = styled.div`
border-radius: 10px;
margin-left: 8px;
margin-right: 5px;
display: flex;
align-items: center;
justify-items: center;
  &:hover{
    background-image: linear-gradient(to right bottom, #39b54a, #0d723b);
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 10px;
    cursor: pointer;
}
   `;
export const NotificationView = styled.div`
   display: block;
   color: #6c757d;
   font-size: 14px;
   margin-left: auto;
   `;
export const NotificationText = styled.div`
   display: flex;
   align-items: center;
   justify-items: center;
   min-height: 35px;
   `;
export const MainBox = styled.div`
padding: 20px;
display: flex;
margin-bottom: 12px;
justify-content: space-evenly;
   `;
export const LeftBox = styled.div`
   width:45%;
   `;
export const RightBox = styled.div`
   width:45%;
   `;
export const NotificationCard = styled.div`
   box-shadow: 2px 6px 6px 6px lightgray;
   border-radius: 25px;
   margin-bottom: 30px;
   max-height: 345px;
   overflow-y: auto;
   `;
   export const ObservationCard = styled.div`
   box-shadow: 2px 6px 6px 6px lightgray;
   border-radius: 25px;
   margin-bottom: 30px;
   min-height: 100px;
   overflow: hidden;
   padding:10px;
   `;