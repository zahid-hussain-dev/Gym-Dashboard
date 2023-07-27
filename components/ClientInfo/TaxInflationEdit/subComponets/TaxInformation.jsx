import React, { useState } from 'react'
import { defaultStyles } from "../../style-constants/utils";
import * as Style from "../../../styledComponents/clientInfoStyles/TaxInformationEdit/TaxInformation";
import DropDown from "../../../styledComponents/customDropDown/dropdown";
import { InputGroup } from "../../../styledComponents/inputGroup/InputGroup";
import { Button } from '../../../styledComponents/clientInfoStyles/button';
import { Text } from '../../../styledComponents/clientInfoStyles/text';
import IconInput from "../../../styledComponents/IconInput/icon-input";
import TaxCredits from './taxInformation/TaxCredits';
import {
    deductionsList,
    taxFillingElectionList,
    statesList,
} from "./taxInformation/TaxInformationConstants";

const TaxInformation = ({ handleTaxInflationObject, nextForm, data }) => {
    const uniqueKey = Object.keys(data.taxInformation.data)[0];
    const taxInfooObj = data.taxInformation.data[uniqueKey];
  
    const taxInfoObj = {
      "State Taxation": taxInfooObj && taxInfooObj["State Taxation"],
      "Tax Filling Election": taxInfooObj && taxInfooObj["Tax Filling Election"],
      Deductions: taxInfooObj && taxInfooObj["Deductions"],
      "State Tax Effective Rate":
        taxInfooObj && taxInfooObj["State Tax Effective Rate"],
      "Federal Tax Rate": taxInfooObj && taxInfooObj["Federal Tax Rate"],
      "Total Tax Rate": taxInfooObj && taxInfooObj["Total Tax Rate"],
      "Federal Collectible Tax Rate":
        taxInfooObj && taxInfooObj["Federal Collectible Tax Rate"],
      "Gross Income": taxInfooObj && taxInfooObj["Gross Income"],
    };
  
    const [taxInformationData, setTaxInformationData] = useState({
      "State Taxation": taxInfooObj && taxInfooObj["State Taxation"],
      "Tax Filling Election": taxInfooObj && taxInfooObj["Tax Filling Election"],
      Deductions: taxInfooObj && taxInfooObj["Deductions"],
      "State Tax Effective Rate":
        taxInfooObj && taxInfooObj["State Tax Effective Rate"],
      "Federal Tax Rate": taxInfooObj && taxInfooObj["Federal Tax Rate"],
      "Total Tax Rate": taxInfooObj && taxInfooObj["Total Tax Rate"],
      "Federal Collectible Tax Rate":
        taxInfooObj && taxInfooObj["Federal Collectible Tax Rate"],
      "Gross Income": taxInfooObj && taxInfooObj["Gross Income"],
    });
  
    // console.log("taxInformationData", taxInformationData);
    const { styles } = defaultStyles;
  
    const professionList = [
      { id: 1, name: "Bookkeeper" },
      { id: 2, name: "CPA" },
      { id: 3, name: "Financial Advisor" },
    ];
  
    const handleTaxInformation = (obj) => {
      // console.log("obj", obj);
      const { name, value } = obj;
  
      setTaxInformationData({
        ...taxInformationData,
        [name]: value,
      });
    };
  
    const nextComponent = {
      name: "taxCredits",
      title: "Tax Credits",
      unique: "Other Tax Credit",
      isMulti: true,
      component: TaxCredits,
      taxCredits: {},
    };
  
    const submitData = () => {
      handleTaxInflationObject(taxInformationData);
      console.log("taxInformationData",taxInformationData)
      nextForm(nextComponent);
    };
  
    const fields = [
      {
        Component: DropDown,
        value: {
          name: "State Taxation",
          title: "State Taxation",
          setSelectedItem: handleTaxInformation,
          list: statesList,
          displayKey: "name",
          value: taxInformationData["State Taxation"],
        },
      },
      {
        Component: DropDown,
        value: {
          name: "Tax Filling Election",
          title: "Tax Filling Election",
          setSelectedItem: handleTaxInformation,
          list: taxFillingElectionList,
          displayKey: "name",
          value: taxInformationData["Tax Filling Election"],
        },
      },
      {
        Component: DropDown,
        value: {
          name: "Deductions",
          title: "Deductions",
          setSelectedItem: handleTaxInformation,
          list: deductionsList,
          displayKey: "name",
          value: taxInformationData["Deductions"],
        },
      },
      {
        Component: IconInput,
        value: {
          name: "State Tax Effective Rate",
          title: "State Tax Effective Rate",
          icon: "%",
          iconPosition: "end",
          value: taxInformationData["State Tax Effective Rate"],
          onChange: (event) => handleTaxInformation(event.target),
        },
      },
      {
        Component: IconInput,
        value: {
          name: "Federal Tax Rate",
          title: "Federal Tax Rate",
          icon: "%",
          iconPosition: "end",
          value: taxInformationData["Federal Tax Rate"],
          onChange: (event) => handleTaxInformation(event.target),
        },
      },
      {
        Component: IconInput,
        value: {
          name: "Total Tax Rate",
          title: "Total Tax Rate",
          icon: "%",
          iconPosition: "end",
          value: taxInformationData["Total Tax Rate"],
          onChange: (event) => handleTaxInformation(event.target),
        },
      },
      {
        Component: IconInput,
        value: {
          name: "Federal Collectible Tax Rate",
          title: "Federal Collectible Tax Rate",
          icon: "%",
          iconPosition: "end",
          value: taxInformationData["Federal Collectible Tax Rate"],
          onChange: (event) => handleTaxInformation(event.target),
        },
      },
      {
        Component: IconInput,
        value: {
          name: "Gross Income",
          title: "Gross Income",
          icon: "%",
          iconPosition: "end",
          value: taxInformationData["Gross Income"],
          onChange: (event) => handleTaxInformation(event.target),
        },
      },
    ];
  
    return (
        <Style.MainContainer>
        <Text style={styles.text.formHeaderText} padding="2rem 0">
          Tax Information
        </Text>
  
        <Style.FieldsContainer>
          {fields &&
            fields.map((data, index) => {
              const { value, Component } = data;
              return (
                <InputGroup key={index}>
                  <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                    {value.title}
                  </Text>
  
                  <Component key={index} value={value} />
                </InputGroup>
              );
            })}
        </Style.FieldsContainer>
  
        <Style.ButtonContainer>
          <Button onClick={submitData}>Next</Button>
        </Style.ButtonContainer>
      </Style.MainContainer>
    )
}

export default TaxInformation
