import React, { useState } from 'react'
import useActiveTabs from "../../../hooks/active-tabs";
import FormHeader from "../../../components/styledComponents/form-header/form-header";
import TaxInformation from './subComponets/TaxInformation';
import { taxInflationData } from "./TaxInflationConstant";
const TaxInflationMain = () => {
  const [activeTabData, setActiveTabData] = useState({
    name: "taxInformation",
    title: "Tax Information",
    unique: "firstName",
    isMulti: false,
    component: TaxInformation,
  });
  const ActiveComponent = activeTabData.component;

  const [rightToggleClass, setRightToggleClass] = useState(false);
  const handleRightToggleClass = () => {
    setRightToggleClass(!rightToggleClass);
  };
  const [allFormsData, setAllFormsData] = useState(taxInflationData);

  const tabsArray = Object.values(taxInflationData);
  const [activeTabsArray, setActiveTabsArray] = useState(["taxInformation"]);

  //  pass all tabs array and selected tab name to useActiveTabs hook
  //  useActiveTabs Hook will return all previous tabs with selected tab
  const handleActiveTabsArray = (name) => {
    const activeTabs = useActiveTabs(tabsArray, name);

    setActiveTabsArray([...activeTabs]);
  };

  const nextForm = (nextFormData) => {
    setActiveTabData(nextFormData);

    const activeTabs = useActiveTabs(tabsArray, nextFormData.name);

    setActiveTabsArray([...activeTabs]);
  };
  const preForm = (previousFormData) => {
    setActiveTabData(previousFormData);

    const activeTabs = useActiveTabs(tabsArray, previousFormData.name);

    setActiveTabsArray([...activeTabs]);
  };

  // pass all form data of one component and update in main object (allFormsData)
  const handleTaxInflationObject = (pageData) => {
    // setAllFormsData((formData) => {
    //   return {
    //     ...formData,
    //     [activeTabData.name]: {
    //       ...formData[activeTabData.name],
    //       [activeTabData.name]: activeTabData.isMulti
    //         ? {
    //             ...formData[activeTabData.name][activeTabData.name],
    //             [pageData[activeTabData.unique]]: pageData,
    //           }
    //         : { [pageData[activeTabData.unique]]: pageData },
    //     },
    //   };
    // });
    console.log("pageData", pageData)
    setAllFormsData((formData) => {
      return {
        ...formData,
        [activeTabData.name]: {
          ...formData[activeTabData.name],
          data: activeTabData.isMulti ? pageData : [pageData],
        },
      };
    });
  };

  // console.log("allFormsData", allFormsData);

  return (
    <>
      <div
        className={
          rightToggleClass
            ? "form-page-container-wrap right-side--opend"
            : "form-page-container-wrap right-side--collapsed"
        }
      >
        <div style={{ paddingRight: rightToggleClass ? "400px" : "0px" }}>
          <FormHeader
            headerData={taxInflationData}
            activeTabData={activeTabData}
            setActiveTabData={setActiveTabData}
            activeTabsArray={activeTabsArray}
            handleActiveTabsArray={handleActiveTabsArray}
          />
        </div>
        <div style={{ paddingRight: rightToggleClass ? "400px" : "0px" }}>
          <ActiveComponent
            handleTaxInflationObject={handleTaxInflationObject}
            data={allFormsData}
            nextForm={nextForm}
            preForm={preForm}
            activeTabData={activeTabData}
          />
        </div>

      </div>
    </>
  )
}

export default TaxInflationMain
