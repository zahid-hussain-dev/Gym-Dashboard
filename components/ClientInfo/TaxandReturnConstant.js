export const tableColumnsData = [
    { id: "1", name: "Tax Credit", class: { width: "10rem" } },
    { id: "2", name: "Amount Of Credit", class: { width: "10rem" } },
    { id: "3", name: "Whose Credit", class: { width: "10rem" } },
];

export const tableBodyData = [
    { tc: "600", ac: "200", wc: "50" },
    { tc: "10", ac: "900", wc: "50" },
    { tc: "600", ac: "78", wc: "83" },
];

export const taxInfoObj = {
    "State Taxation": "Alaska",
    "Tax Filling Election": "Single",
    "Deductions": "Itemized",
    "State Tax Effective Rate": 19,
    "Federal Tax Rate": 50,
    "Total Tax Rate": 70,
    "Federal Collectible Tax Rate": 100,
    "Gross Income": 10,
};

export const taxCreditObj = {
    "Tax Credit": "Adoption Credit",
    "Amount Of Credit": "80",
    "Whose Credit": "Child",

};

export const capitalGainObj = {
    "Subject to Cap Gains": "50",
    "Gains Rate Federal": "80",
    "Gains Rate State": "10",

};

export const carryForwardObj = {
    "Total Carry Forward": "50",
    "Short Term Carry Forward": "80",
    "Long Term Carry Forward": "10",
    "Carry Forward Updated": "800",
    "Carry Forward Loss Notes": "Sample Notes",
};

export const inflationRateObj = {
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
};

export const allData = [
    { title: "Tax Information", data: taxInfoObj },
    { title: "Capital Gains", data: capitalGainObj },
    { title: "Carry Forward", data: carryForwardObj },
    { title: "Inflation Rates", data: inflationRateObj },
];
