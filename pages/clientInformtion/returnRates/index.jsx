import React from 'react'
import * as Style from "../../../components/styledComponents/clientInfoStyles/ReturnRates";
import Table from "../../../components/styledComponents/table/table";
import { allData, tableBodyData, tableColumnsData, staticReturnRateObj, professionalPredictionsObj } from '../../../components/ClientInfo/RateofReturns';
import { defaultStyles } from "../../../components/ClientInfo/style-constants/utils";
import { Button } from "../../../components/styledComponents/clientInfoStyles/button";
import { Text } from "../../../components/styledComponents/clientInfoStyles/text";

const index = () => {
    const { styles } = defaultStyles;

    return (
        <div>
            <Style.ButtonContainer>
                <Button onClick={() => console.log("edit")}>
                    Edit
                </Button>
            </Style.ButtonContainer>

            <Style.TableContainer>
                {allData &&
                    allData.map((data, index) => (
                        <div style={{ padding: "1rem 0rem 0 1rem" }}>
                            <Style.TableHeader>{data.title}</Style.TableHeader>
                            {data &&
                                Object.keys(data.data).map((key, index) => (
                                    <Style.TableBodyRow
                                        key={index}
                                        backgroundColor={
                                            (index + 1) % 2 === 0 ? "white" : "rgba(0,0,0,.05)"
                                        }
                                    >
                                        <Text
                                            style={styles.text.labelBoldText}
                                            width="13rem"
                                            color="rgba(0,0,0,.65)"
                                        >
                                            {key}{" "}
                                        </Text>

                                        <Text width="13rem" color="rgba(0,0,0,.65)">
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
