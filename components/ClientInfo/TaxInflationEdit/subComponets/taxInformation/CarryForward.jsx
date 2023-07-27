import React, { useState } from 'react'
import { Button } from '../../../../styledComponents/clientInfoStyles/button';
import IconInput from '../../../../styledComponents/IconInput/icon-input';
import { InputGroup } from '../../../../styledComponents/inputGroup/InputGroup';
import { Input } from '../../../../styledComponents/IconInput/styles/input';
import { TextArea } from "../../../../styledComponents/clientInfoStyles/text-area";
import { defaultStyles } from "../../../../../components/ClientInfo/style-constants/utils";
import * as Style from "../../../../styledComponents/clientInfoStyles/TaxInformationEdit/CarryForward";
import CapitalGains from './CapitalGains';
const CarryForward = ({ handleTaxInflationObject, nextForm, preForm, data }) => {

    const uniqueKey = Object.keys(data.carryForward.data)[0];
    const carryForwardObj = data.carryForward.data[uniqueKey];


    const carryForwardObjMain = {
        "Total Carry Forward": "50",
        "Short Term Carry Forward": "80",
        "Long Term Carry Forward": "10",
        "Carry Forward Updated": "800",
        "Carry Forward Loss Notes": "Sample Notes",
    };

    const [carryForwardData, setCarryForwardData] = useState(
        {
            "Total Carry Forward": carryForwardObj && carryForwardObj["Total Carry Forward"] || carryForwardObjMain["Total Carry Forward"],
            "Short Term Carry Forward": carryForwardObj && carryForwardObj["Short Term Carry Forward"] || carryForwardObjMain["Short Term Carry Forward"],
            "Long Term Carry Forward": carryForwardObj && carryForwardObj["Long Term Carry Forward"] || carryForwardObjMain["Long Term Carry Forward"],
            "Carry Forward Updated": carryForwardObj && carryForwardObj["Carry Forward Updated"] || carryForwardObjMain["Carry Forward Updated"],
            "Carry Forward Loss Notes": carryForwardObj && carryForwardObj["Carry Forward Loss Notes"] || carryForwardObjMain["Carry Forward Loss Notes"],
        }
    );

    const { styles } = defaultStyles;

    const handleCarryForwardInfo = (obj) => {
        const { name, value } = obj;

        setCarryForwardData({
            ...carryForwardData,
            [name]: value,
        });
    };

    const nextComponent = {
        name: "inflationRates",
        title: "Inflation Rates",
        unique: "firstName",
        //   component: InflationRates,
        isMulti: true,
        inflationRates: {},
    };

    const preComponent = {
        name: "capitalGains",
        title: "Capital Gains",
        unique: "firstName",
        component: CapitalGains,
        isMulti: true,
        capitalGains: {},
    };

    const submitData = () => {
        handleTaxInflationObject(carryForwardData);

        nextForm(nextComponent);
    };

    const fields = [
        {
            Component: IconInput,
            value: {
                name: "Total Carry Forward",
                title: "Total Carry Forward",
                iconPosition: "start",
                placeholder: "#,###,###,##",
                value: carryForwardData["Total Carry Forward"],
                icon: "$",
                onChange: (event) => handleCarryForwardInfo(event.target),
            },
        },
        {
            Component: IconInput,
            value: {
                name: "Short Term Carry Forward",
                placeholder: "#,###,###,##",
                title: "Short Term Carry Forward",
                value: carryForwardData["Short Term Carry Forward"],
                iconPosition: "start",
                icon: "$",

                onChange: (event) => handleCarryForwardInfo(event.target),
            },
        },
        {
            Component: IconInput,
            value: {
                name: "Long Term Carry Forward",
                placeholder: "#,###,###,##",
                title: "Long Term Carry Forward",
                value: carryForwardData["Long Term Carry Forward"],
                iconPosition: "start",
                icon: "$",

                onChange: (event) => handleCarryForwardInfo(event.target),
            },
        },
        {
            Component: Input,
            name: "Carry Forward Updated",
            title: "Carry Forward Updated",
            value: carryForwardData["Carry Forward Updated"],
            type: "date",
            onChange: (event) => handleCarryForwardInfo(event.target),
        },
    ];


    return (
        <Style.MainContainer>
            <Text style={styles.text.formHeaderText} padding="3rem 0">
                Carry Forward Loss Informations
            </Text>

            <Style.FieldsContainer>
                {fields &&
                    fields.map((data, index) => {
                        const { value, Component, name, title, type, onChange } = data;
                        return (
                            <InputGroup key={index}>
                                <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                                    {title || value.title}
                                </Text>

                                <Component
                                    key={index}
                                    value={value}
                                    name={name}
                                    onChange={onChange}
                                    type={type}
                                />
                            </InputGroup>
                        );
                    })}
            </Style.FieldsContainer>

            <Style.FieldsContainer>
                <InputGroup>
                    <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                        Carry Forward Loss Notes
                    </Text>

                    <TextArea
                        style={styles.textArea.largeTextArea}
                        name="Carry Forward Loss Notes"
                        placeholder="Enter Notes"
                        onChange={(event) => handleCarryForwardInfo(event.target)}
                        value={carryForwardData["Carry Forward Loss Notes"]}
                    />
                </InputGroup>
            </Style.FieldsContainer>

            <Style.ButtonsContainer>
                <Button onClick={() => preForm(preComponent)}>Previuos</Button>
                <Button onClick={submitData}>Next</Button>
            </Style.ButtonsContainer>
        </Style.MainContainer>
    )
}

export default CarryForward
