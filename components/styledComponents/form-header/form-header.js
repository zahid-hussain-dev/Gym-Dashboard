import React, { useState, useEffect } from "react";
import * as Style from "./styles/form-header";
// import useActiveTabs from "../../../hooks/active-tabs";

function FormHeader({
  headerData,
  setActiveTabData,
  activeTabData,
  activeTabsArray,
  handleActiveTabsArray,
}) {
  useEffect(() => {}, []);
  // console.log("headerData", headerData);
  // console.log("activeTabsArray", activeTabsArray);

  const headerDataLength = Object.values(headerData).length;
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
                      activeTabsArray && activeTabsArray.includes(item.name)
                        ? "#9bc5b1"
                        : "#e0e0e0"
                    }
                    onClick={() => {
                      // setActiveTabData(item);
                      // handleActiveTabsArray(item.name);
                      console.log("itemm", item);
                    }}
                  >
                    {index + 1}
                  </Style.Circle>
                  {headerDataLength == index + 1 ? null : (
                    <Style.Line></Style.Line>
                  )}
                  {/* <Style.Line></Style.Line> */}
                </Style.SubContainer>
                <p
                  style={{
                    // textAlign: "center",
                    // width: "7rem",
                    color: "rgb(0, 100, 0)",
                  }}
                >
                  {item.title}
                </p>
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
