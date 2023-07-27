import React, { useState } from "react";
import { Text } from "../text";
import { defaultStyles } from "../../../constants/style-constants/utils";
import * as Style from "./styles/form-header";

function FormHeader({ headerData, setActiveTabData, activeTabData }) {
  const headerDataLength = Object.values(headerData).length;

  const { colors } = defaultStyles;

  const tabsArray = Object.values(headerData);
  let [activeTabsArray1, setActiveTabsArray1] = useState([activeTabData.name]);
  let activeTabsArray = [];
  const handleAtiveTabsArray = (name) => {
    activeTabsArray = [];
    for (let i = 0; i < tabsArray.length; i++) {
      if (tabsArray[i].name == name) {
        activeTabsArray.push(tabsArray[i].name);
        break;
      } else {
        activeTabsArray.push(tabsArray[i].name);
      }
    }

    setActiveTabsArray1([...activeTabsArray]);
    // if (activeTabsArray.includes(name)) {
    //   // activeTabsArray.pop(name);
    // } else {
    //   console.log("nameeee in if",name);
    //   activeTabsArray.push(name);
    // }
  };

  return (
    <>
      <Style.HeaderContainer>
        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {headerData &&
            Object.values(headerData).map((item, index) => (
              <Style.MainContainer key={index + 1}>
                <Style.SubContainer>
                  <Style.Circle
                    backgroundColor={
                      activeTabsArray1 && activeTabsArray1.includes(item.name)
                        ? "#9bc5b1"
                        : "#e0e0e0"
                    }
                    onClick={() => {
                      setActiveTabData(item);
                      handleAtiveTabsArray(item.name);
                    }}
                  >
                    {index + 1}
                  </Style.Circle>
                  {headerDataLength == index + 1 ? null : <Style.Line></Style.Line>}
                  {/* <Style.Line></Style.Line> */}
                </Style.SubContainer>
                <p style={{ textAlign: "center", width: "6rem",color:"rgb(0, 100, 0)" }}>{item.title}</p>
                {/* <div style={{ width: "6rem" }}> */}
                  {/* <Text color="#9bc5b1">{item.title}</Text> */}
                {/* </div> */}
              </Style.MainContainer>
            ))}
        </div>
      </Style.HeaderContainer>
    </>
  );
}

export default FormHeader;
