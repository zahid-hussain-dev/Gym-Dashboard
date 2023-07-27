import TaxCredits from "./subComponets/taxInformation/TaxCredits";
import TaxInformation from "./subComponets/TaxInformation";
import CapitalGains from "./subComponets/taxInformation/CapitalGains";
import CarryForward from "./subComponets/taxInformation/CarryForward";
export const taxInflationData = { 
    taxInformation: {
      name: "taxInformation",
      title: "Tax Information",
      unique: "firstName",
      isMulti: false,
      component: TaxInformation,
      data: [
        {
          "State Taxation": "Alaska",
          "Tax Filling Election": "Single",
          Deductions: "Itemized",
          "State Tax Effective Rate": 19,
          "Federal Tax Rate": 50,
          "Total Tax Rate": 70,
          "Federal Collectible Tax Rate": 100,
          "Gross Income": 10,
        },
      ],
    },
    taxCredits: {
      name: "taxCredits",
      title: "Tax Credits",
      unique: "Other Tax Credit",
      isMulti: true,
      component: TaxCredits,
      data: [
        {
          "Other Tax Credit": "600",
          "Amount Of Credit": "200",
          "Whose Credit": "50",
        },
        {
          "Other Tax Credit": "20",
          "Amount Of Credit": "200",
          "Whose Credit": "560",
        },
        {
          "Other Tax Credit": "690",
          "Amount Of Credit": "200",
          "Whose Credit": "50",
        },
      ],
    },
    capitalGains: {
      name: "capitalGains",
      title: "Capital Gains",
      unique: "firstName",
      component: CapitalGains,
      isMulti: false,
      data: [
        {
          "Subject to Cap Gains": "50",
          "Gains Rate Federal": "80",
          "Gains Rate State": "10",
        },
      ],
    },
    carryForward: {
      name: "carryForward",
      title: "Carry Forward",
      unique: "matric",
      isMulti: false,
      component: CarryForward,
      data: [
        {
          "Total Carry Forward": "50",
          "Short Term Carry Forward": "80",
          "Long Term Carry Forward": "10",
          "Carry Forward Updated": "09/12/22",
          "Carry Forward Loss Notes": "Sample Notes",
        },
      ],
    },
    inflationRates: {
      name: "inflationRates",
      title: "Inflation Rates",
      unique: "firstName",
      // component: InflationRates,
      isMulti: false,
      data: [
        {
          "General Inflation": "Static",
          "General Inflation Rate": "50",
          "Medical Inflation": "Federal",
          "Medical Inflation Rate": "100",
          "Education Inflation": "Static",
          "Education Inflation Rate": "Static",
          "Luxury Inflation": "Static",
          "Luxury Inflation Rate": "55",
          "Housing Inflation": "Static",
          "Housing Inflation Rate": "77",
        },
      ],
    },
  };