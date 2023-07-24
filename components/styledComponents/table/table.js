import React from "react";

import {
  StyledTable,
  TableHead,
  TableBody,
  TR,
  TH,
  TD,
  TableContainer,
} from "./styles/table";

function Table({ tableColumnsData, tableBodyData, backgroundcolor, color }) {
  let c = 0;
  // const router = useRouter();

  // const handleRouting = (e, path) => {
  //   router.push(path);
  // };

  const getComponent = (rowData, data, index) => {
    const Component = rowData.componentName;
    if (rowData.componentName == "image") {
      return (
        <div onClick={() => rowData.handler(data, index)}>
          {/* <img src={rowData.url} height={20} width={20} /> */}
        </div>
      );
    } else {
      return (
        <Component
          value={rowData.value}
          handler={rowData.handler}
          index={index}
          data={data}
        />
      );
    }
  };
  return (
    <TableContainer>
      <StyledTable>
        <TableHead backgroundcolor={backgroundcolor} color={color}>
          <TR>
            {tableColumnsData.map((data) => (
              <TH
                style={data.class}
                key={data.id}
                backgroundcolor={backgroundcolor}
              >
                {data.name}
              </TH>
            ))}
          </TR>
        </TableHead>

        <TableBody>
          {tableBodyData &&
            tableBodyData.map((data, index) => {
              console.log("data", data);
              let rowValues = Object.values(data);
              return (
                <TR
                  key={index}
                // key={c++}
                // onClick={(e) => {
                //   if (path != "") {
                //     handleRouting(e, path);
                //   }
                // }}
                >
                  {rowValues.map((rowData, index1) => {
                    console.log("rowData", rowData);
                    if (typeof rowData == "object") {
                      const Component = rowData.componentName;
                      if (rowData == null) {
                        return (
                          <TD
                            key={index1}
                            backgroundcolor={
                              (index + 1) % 2 === 0
                                ? "white"
                                : "rgba(0,0,0,.05)"
                            }
                          >
                            N/A
                          </TD>
                        );
                      } else {
                        return (
                          <TD
                            key={index1}
                            backgroundcolor={
                              (index + 1) % 2 === 0
                                ? "white"
                                : "rgba(0,0,0,.05)"
                            }
                          >
                            {
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {getComponent(rowData, data, index)}
                              </div>
                            }
                          </TD>
                        );
                      }
                    } else {
                      return (
                        <TD
                          backgroundcolor={
                            (index + 1) % 2 === 0 ? "white" : "rgba(0,0,0,.05)"
                          }
                          key={index1}
                        >
                          {rowData}
                        </TD>
                      );
                    }
                  })}
                </TR>
              );
            })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default Table;
