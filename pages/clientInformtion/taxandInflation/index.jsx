import React from 'react'
import * as Style from "../../../components/styledComponents/clientInfoStyles/TaxandReturn";
import Table from "../../../components/styledComponents/table/table";
import { allData, tableBodyData, tableColumnsData, TableBodyRow, TableHeader, } from '../../../components/ClientInfo/TaxandReturnConstant';
import { defaultStyles } from "../../../components/ClientInfo/style-constants/utils";
import { Button } from "../../../components/styledComponents/clientInfoStyles/button";
import { Text } from "../../../components/styledComponents/clientInfoStyles/text";
const index = () => {
  const { styles } = defaultStyles;

  return (
    <div>
      <Style.ButtonContainer>
        <Button onClick={() => console.log("clicked")}>
          Edit
        </Button>
      </Style.ButtonContainer>

      <Style.TableContainer>
        {allData &&
          allData.map((data, idx) => (
            <div key={idx} style={{ padding: "1rem 0rem 0 1rem" }}>
              <Style.TableHeader>{data.title}</Style.TableHeader>
              {data &&
                Object.keys(data.data).map((key, index) => (
                  <Style.TableBodyRow
                    key={index}
                    backgroundcolor={
                      (index + 1) % 2 === 0 ? "white" : "rgba(0,0,0,.05)"
                    }
                  >
                    <Text
                      style={styles.text.labelBoldText}
                      width="12rem"
                      color="rgba(0,0,0,.65)"
                    >
                      {key}{" "}
                    </Text>

                    <Text width="5rem" color="rgba(0,0,0,.65)">
                      {data.data[key]}
                    </Text>
                  </Style.TableBodyRow>
                ))}
            </div>
          ))}
      </Style.TableContainer>

      <Style.MainTable>
        <Table
          tableColumnsData={tableColumnsData}
          tableBodyData={tableBodyData}
        />
      </Style.MainTable>

    </div>
  )
}

export default index
