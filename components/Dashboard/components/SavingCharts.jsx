import React from 'react'
import { Bar } from "react-chartjs-2";
import * as Style from '../../styledComponents/dashboardStyles/SavingSection';
import Chart from 'chart.js/auto';
const SavingCharts = () => {
    const vertical = {
        labels: [
            "Getting Married",
            "Starting Business",
            "John's College",
            "Buying Vacation Home",
            "Retirement",
        ],
        datasets: [
            {
                label: "",
                data: [12036, 18500, 97500, 149500, 120000],
                backgroundColor: [
                    "rgb(37, 122, 61)",
                    "rgba(80, 236, 144)",
                    "rgb(37, 122, 61)",
                    "rgba(80, 236, 144)",
                    "rgb(37, 122, 61)",
                ],
                borderColor: [
                    "rgb(37, 122, 61)",
                    "rgba(80, 236, 144)",
                    "rgb(37, 122, 61)",
                    "rgba(80, 236, 144)",
                    "rgb(37, 122, 61)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        legend: {
            display: false,
        },
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        fontColor: "red",
                        fontSize: 15,
                        display: true,
                        // labelString: "$",
                    },
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
            xAxes: [
                {
                    stacked: true,
                },
            ],
        },
    };

    const dataStacked = {
        labels: ["All Income Split by Expenses and Savings"],
        datasets: [
            {
                label: "Expenses",
                data: [12975],
                backgroundColor: "rgba(80, 236, 144)",
            },
            {
                label: "Savings",
                data: [1295],
                backgroundColor: "rgb(251, 226, 0)",
            },
        ],
    };

    const optionsStacked = {
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        fontColor: "red",
                        fontSize: 15,
                        display: true,
                        // labelString: "$",
                    },
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
            xAxes: [
                {
                    stacked: true,
                },
            ],
        },
    };
    return (
        <Style.SavingBudgetBlock  >
            <Style.SavingBudgetColumn>
                <Style.ChartBlock>
                    <Style.SavingChartColumn>
                        <Bar data={dataStacked} options={optionsStacked} />
                    </Style.SavingChartColumn>
                </Style.ChartBlock>
                <Style.ChartBlock>
                    <Style.SavingChartColumn>
                        <Bar data={vertical} options={options} />
                    </Style.SavingChartColumn>
                </Style.ChartBlock>
            </Style.SavingBudgetColumn>
        </Style.SavingBudgetBlock>
    )
}

export default SavingCharts
