import React, { useState } from "react";
import IconInput from "../../../../styledComponents/IconInput/icon-input";
import DropDown from "../../../../styledComponents/customDropDown/dropdown";
import * as B from "../../../../styledComponents/clientInfoStyles/button";
import { Text } from "../../../../styledComponents/clientInfoStyles/text";
import AddModal from "../../../../styledComponents/modal/add-modal/add-modal";
import UpdateModal from "../../../../styledComponents/modal/update-modal/update-modal";
import { defaultStyles } from "../../../../../components/ClientInfo/style-constants/utils";
import * as Style from "../../../../styledComponents/clientInfoStyles/TaxInformationEdit/Taxcredit";
import TaxInformation from "../TaxInformation";
import CapitalGains from "./CapitalGains";
function TaxCredits({ handleTaxInflationObject, nextForm, preForm }) {
  const taxCreditObj = {
    "Other Tax Credit": "",
    "Amount Of Credit": "",
    "Whose Credit": "",
  };

  const [taxCreditData, setTaxCreditData] = useState({ ...taxCreditObj });
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [dataList, setDataList] = useState([
    { "Other Tax Credit": "Bookkeeper", "Amount Of Credit": "200", "Whose Credit": "Bookkeeper" },
    { "Other Tax Credit": "CPA", "Amount Of Credit": "200", "Whose Credit": "CPA" },
    { "Other Tax Credit": "Financial Advisor", "Amount Of Credit": "200", "Whose Credit": "Financial Advisor" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [updatedObject, setUpdateObject] = useState({});
  const [updatedObject1, setUpdateObject1] = useState({
    "Other Tax Credit": "",
    "Amount Of Credit": "",
    "Whose Credit": "",
  });

  const { styles } = defaultStyles;

  const professionList = [
    { id: 1, name: "Bookkeeper" },
    { id: 2, name: "CPA" },
    { id: 3, name: "Financial Advisor" },
  ];

  const handleTaxCreditInfo = (obj) => {
    const { name, value } = obj;

    setTaxCreditData({
      ...taxCreditData,
      [name]: value,
    });
  };

  const handleTaxCreditUpdatedInfo = (obj) => {
    const { name, value } = obj;

    setUpdateObject1({
      ...updatedObject1,
      [name]: value,
    });
  };

  const nextComponent = {
    name: "capitalGains",
    title: "Capital Gains",
    unique: "firstName",
    component: CapitalGains,
    isMulti: true,
    capitalGains: {},
  };

  const preComponent = {
    name: "taxInformation",
    title: "Tax Information",
    unique: "firstName",
    isMulti: false,
    component: TaxInformation,
    taxInformation: {},
  };

  const submitData = () => {
    dataList.push(taxCreditData);

    handleTaxInflationObject(dataList);
    // nextForm(nextComponent)
  };

  const getSelectedRow = (idx) => {
    setShowUpdateModal(true);

    setSelectedIndex(idx);

    // get selected row (this will return array of object)
    const selectedRow = dataList.filter((row, index) => {
      return index == idx;
    });


    // console.log("selected row", selectedRow);

    setUpdateObject(selectedRow[0])
    setUpdateObject1(selectedRow[0])
  };


  // console.log("updated Object", updatedObject);
  // console.log("updated Object1", updatedObject1);

  const updateRow = () => {
    // console.log("updated Object1 in update method", updatedObject1);

    dataList[selectedIndex] = updatedObject1;
    handleTaxInflationObject(dataList);

  };

  const deleteRow = (index) => {
    let newArray = [];
    for (let i = 0; i < dataList.length; i++) {
      if (i == index) {
      } else {
        newArray.push(dataList[i]);
      }
    }

    setDataList(newArray);
    handleTaxInflationObject(newArray);
  };

  const handelCloseModal = () => {
    setShowModal(false);
    setShowUpdateModal(false);
  };

  const fields = [
    {
      Component: DropDown,
      value: {
        style: styles.dropDown.smallDropDown,
        name: "Other Tax Credit",
        title: "Other Tax Credit",
        setSelectedItem: handleTaxCreditInfo,
        list: professionList,
        displayKey: "name",
      },
    },
    {
      Component: IconInput,
      value: {
        style: styles.textInput.smallTextInput,
        name: "Amount Of Credit",
        title: "Amount Of Credit",
        icon: "$",
        iconPosition: "start",
        onChange: (event) => handleTaxCreditInfo(event.target),
      },
    },
    {
      Component: DropDown,
      value: {
        style: styles.dropDown.smallDropDown,
        name: "Whose Credit",
        title: "Whose Credit",
        setSelectedItem: handleTaxCreditInfo,
        list: professionList,
        displayKey: "name",
      },
    },
  ];

  const update_fields = [
    {
      Component: DropDown,
      value: {
        style: styles.dropDown.smallDropDown,
        name: "Other Tax Credit",
        title: "Other Tax Credit",
        setSelectedItem: handleTaxCreditUpdatedInfo,
        list: professionList,
        displayKey: "name",
        value: updatedObject["Other Tax Credit"]
      },
    },
    {
      Component: IconInput,
      value: {
        style: styles.textInput.smallTextInput,
        name: "Amount Of Credit",
        title: "Amount Of Credit",
        icon: "$",
        iconPosition: "start",
        value: updatedObject["Amount Of Credit"],
        onChange: (event) => handleTaxCreditUpdatedInfo(event.target),
      },
    },
    {
      Component: DropDown,
      value: {
        style: styles.dropDown.smallDropDown,
        name: "Whose Credit",
        title: "Whose Credit",
        setSelectedItem: handleTaxCreditUpdatedInfo,
        value: updatedObject["Whose Credit"],
        list: professionList,
        displayKey: "name",
      },
    },
  ];

  return (
    <>
      <Style.MainContainer>
        <Text style={styles.text.formHeaderText} padding="2rem 0 3rem 0">
          New Tax Credit
        </Text>

        <Style.FieldsContainer>
          <Text style={styles.text.formHeaderText}>Tax Credit</Text>
          <B.Button
            style={styles.button.sqaureButton}
            onClick={() => setShowModal(true)}
          >
            +
          </B.Button>
        </Style.FieldsContainer>

        {dataList &&
          dataList.map((item, index) => (
            <Style.RowContainer key={index}>
              <Style.LeftContainer>{index + 1}</Style.LeftContainer>
              <Style.RightContainer>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", width: "100%"
                }}>
                  <Style.TextBlock>
                    <span style={{ fontWeight: "bold" }}>Other Tax Credit</span>{" "}
                    :{item["Other Tax Credit"]}
                  </Style.TextBlock>
                  <Style.TextBlock>
                    <span style={{ fontWeight: "bold" }}>Amount of Credit</span>{" "}
                    :{item["Amount Of Credit"]}
                  </Style.TextBlock>
                  <Style.TextBlock>
                    <span style={{ fontWeight: "bold" }}>Whose Credit</span> :
                    {item["Whose Credit"]}
                  </Style.TextBlock>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                }}>
                  <B.Button
                    type="link"
                    style={{ fontSize: "21px" }}
                    icon="edit"
                    onClick={() => getSelectedRow(index)}
                  >Edit</B.Button>

                  <B.Button
                    type="link"
                    style={{ fontSize: "21px" }}
                    icon="delete"
                    onClick={() => deleteRow(index)}
                  >Delete</B.Button>
                </div>
              </Style.RightContainer>
            </Style.RowContainer>
          ))}

        <Style.ButtonsContainer>
          <B.Button onClick={() => preForm(preComponent)}>Previous</B.Button>
          <B.Button onClick={() => nextForm(nextComponent)}>Next</B.Button>
        </Style.ButtonsContainer>
      </Style.MainContainer>
      <AddModal
        show={showModal}
        close={handelCloseModal}
        fields={fields}
        handleTaxCreditInfo={handleTaxCreditInfo}
        setTaxCreditData={setTaxCreditData}
        submitData={submitData}
      />
      <UpdateModal
        show={showUpdateModal}
        close={handelCloseModal}
        fields={update_fields}
        setTaxCreditData={setTaxCreditData}
        updateRow={updateRow}
      />
    </>
  );
}

export default TaxCredits;
