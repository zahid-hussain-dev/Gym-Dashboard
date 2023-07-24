import Asset from "../../public/assests/DashboardAssets/Asset.png";
import Contributions from "../../public/assests/DashboardAssets/Contributions.png";
import contributionsIncome from "../../public/assests/DashboardAssets/Contributions-income.png";
import Budget from "../../public/assests/DashboardAssets/Budget.png";
import Savings from "../../public/assests/DashboardAssets/Savings.png";
import Debt from "../../public/assests/DashboardAssets/Debt.png";
import Networth3 from "../../public/assests/DashboardAssets/Networth3.png";
import Stock from "../../public/assests/DashboardAssets/Stock.png";
import realworld from "../../public/assests/DashboardAssets/Real-World.png";
import bell from "../../public/assests/DashboardAssets/bell.png";
import del from "../../public/assests/DashboardAssets/del.png";
export const generalTiles = [
    {
        cardName: "Assets",
        price: "1,144,000",
        image: Asset,
    },
    {
        cardName: "Income",
        price: "232,551",
        image: contributionsIncome,

    },
    {
        cardName: "Monthly Savings",
        price: "1,295",
        image: Savings,
    },
    {
        cardName: "Debt",
        price: "823,045",
        image: Debt,
    }
];
export const percentCardData = [
    {
        cardName: "Getting Married",
        have: "12,036.36",
        percentage: 89,
        need: "13,524",
        days: "126",
    },
    {
        cardName: "Starting Business",
        have: "25,000",
        percentage: 74,
        need: "25,000",
        days: "547",

    },
    {
        cardName: "John's College",
        have: "97,500",
        percentage: 65,
        need: "150,000",
        days: "3,650",
    },
    {
        cardName: "Buying Vacation Home",
        have: "149,500",
        percentage: 46,
        need: "325,000",
        days: "5,475",
    },
    {
        cardName: "Retirement",
        have: "120,000",
        percentage: 3,
        need: "4,000,000",
        days: "8,395",
    },
];
export const LiquidityData = [
    {
        title: "Taxable",
        pc1: 65,
        pc2: 35,
        pc3: 0,
        opt1: "Net Liquidity: $450,450",
        opt2: "Taxes: $242,550",
        opt3: "Penalties: $0",
    },
    {
        title: "Tax Deferred",
        pc1: 90,
        pc2: 0,
        pc3: 10,
        opt1: "Net Liquidity: $405,900",
        opt2: "Taxes: $0",
        opt3: "Penalties: $45,100",

    },
    {
        title: "Total",
        pc1: 67,
        pc2: 28,
        pc3: 5,
        opt1: "Net Liquidity: $856,350",
        opt2: "Taxes: $242,550",
        opt3: "Penalties: $45,100",
    },

];
export const NotificationsUpdate = [
    {
        text: "Asset Planet has added new Asset to the list"
    },
    {
        text: "Asset Planet has developed a new category in the Inventory App"
    },
    {
        text: "Remember, Monday is a bank holiday. Enjoy the day off!"
    },
    {
        text: "Asset Planet has gifted another free month to you. Thank you for the referral!"
    },
    {
        text: "Update Inflation Projection"
    },
    {
        text: "Update Inflation Projection"
    },
];
export const NotificationsUpdateSnoozed = [
    {
        text: "Your Inventory App Sync is complete"

    },
    {
        text: "Your Life Insurance policy will expire in 90 days"

    },
    {
        text: "Your Retirement Goal date is within 90 days"

    },
    {
        text: "Your Ford F150 has a loan payment due within 10 days"

    },
    {
        text: "There is a New Client being shared with you"

    },
    {
        text: "Your Inflation input has not been udpated in over 1 year"

    },
];
export const Observationtext = [
    {
        text: "Based on your Net Worth, consider an Umbrella Insurance Policy. You have $34,343 in networth with $0 Umbrella policy."
        ,
    },
    {
        text: "There is no Power of Attorney listed in your plan. Consult with an attorney to determine strategy to create a Power of Attorney."
        ,
    },
    {
        text: "There is no Will listed in your plan. Consult with an attorney to determine strategy to create a Will."
        ,
    },
    {
        text: "There is no Life Insurance listed in your plan. Consult with an insurance or financial professional to determine what is best for your needs."
        ,
    },
    {
        text: "Based on the loan rate on Frank and Tracy Rental, consider refinance. Your loan is $0 at 4.000% Current rates are 3.50%. Consider a refinance."
        ,
    },
    {
        text: "There is no Advance Healthcare Directive listed in your plan. Consult with an attorney to determine strategy to create an Advance Healthcare Directive."

    },

]