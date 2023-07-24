import styled from "styled-components";
export const Container = styled.div`
//   position: relative;
`;

export const Circle = styled.circle`
  fill: transparent;
//   stroke: hsla(225, 20%, 92%, 0.9);
  stroke-linecap: round;
`;

export const FilledCircle = styled(Circle)`
  stroke: white;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.5s ease-out;
`;

export const Text = styled.div`
  align-items: center;
  color:white;
  font-family: gilroy;
  font-size: 40px;
  margin-top: 2rem;
//   color: hsla(225, 23%, 62%, 1);
  display: flex;
  font-weight: bold;
  height: 100%;
  justify-content: center;
  left: 0;
  letter-spacing: 0.025em;
  margin-bottom: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 100;
`;
export const MainCard = styled.div`
  width: 22%;
`;
export const CardHeader = styled.div`
height: 20%;
display: flex;
justify-content: center;
align-items: center;
text-align:center;
`;
export const CardLowerSection = styled.div`
height: 80%;
background: white;
border-radius: 30px;
display: flex;
justify-content: center;
align-items: center;
`;
export const CardLowerSectionBack = styled.div`
height: 80%;
background: white;
border-radius: 30px;
`;
export const CardItems = styled.div`
height: 30%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
export const CardItemsText = styled.div`
display: flex;
 height: 40%; 
 width: 80%;
`;
export const AchievementText = styled.div`
width: 70%;
display: flex;
justify-content: center;
`;
export const AchievementDays = styled.div`
width: 70%;
height: 40%;
display: flex;
justify-content: center;
`;