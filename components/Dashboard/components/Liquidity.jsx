import React, { useState } from 'react'
import * as Style from '../../styledComponents/dashboardStyles/Liquidicity';
import plus from "../../../public/assests/SVGs/plus.svg";
import minus from "../../../public/assests/SVGs/minus.svg";
import Image from 'next/image';
import "./dashboard.css";
const Liquidity = () => {
    const [statsVisible, setStatsVisible] = useState("expanded");

    const getCollapsableRow = (attribute = "", title = "") => {
        return (
            <Style.CollapsableSection
            >
                <Style.BorderCollapsable>
                    {statsVisible === "collapsed" ? (
                        <Style.CollapseIcon
                            onClick={() => {
                                setStatsVisible("expanded");
                            }}
                        >
                            <Image src={plus} alt='plus' height={15} width={30} />
                        </Style.CollapseIcon>
                    ) : (
                        <Style.CollapseIcon
                            onClick={() => {
                                setStatsVisible("collapsed");
                            }}
                        >
                            <Image src={minus} alt='minus' height={15} width={30} />
                        </Style.CollapseIcon>
                    )}
                </Style.BorderCollapsable>
                <Style.Title >{title}</Style.Title>
            </Style.CollapsableSection>
        );
    };
    const getLiquidityRow = (
        title = "",
        pc1 = 0,
        pc2 = 0,
        pc3 = 0,
        opt1 = "",
        opt2 = "",
        opt3 = ""
    ) => {
        return (
            <div style={{ height: "33%" }} span={24}>
                <div style={{ height: "40%" }}>
                    <Style.LiquidicityTitle
                    >
                        <p className="liquidity-sub-header-text">{title}</p>
                    </Style.LiquidicityTitle>
                </div>
                <div style={{ height: "40%", display: "flex" }}>
                    <Style.LiquidicityRowLeft
                    >
                        <div className="cust">
                            <div
                                className="green-gradient"
                                style={{
                                    marginTop: "6px",
                                    marginBottom: "6px",
                                    width: `${pc1}%`,
                                    // background: "#0d723b",
                                    borderRadius: "20px",
                                }}
                            ></div>
                            <div
                                className="green-blue-gradient"
                                style={{
                                    marginTop: "6px",
                                    marginBottom: "6px",
                                    width: `${pc2}%`,
                                    // background: "cyan",
                                    borderRadius: "20px",
                                }}
                            ></div>
                            <div
                                style={{
                                    marginTop: "6px",
                                    marginBottom: "6px",
                                    width: `${pc3}%`,
                                    background: "red",
                                    borderRadius: "20px",
                                }}
                            ></div>
                        </div>
                    </Style.LiquidicityRowLeft>
                    <Style.LiquidicityRowRight
                    >
                        <div
                            style={{
                                width: `33.3%`,
                                display: "flex",
                            }}
                        >
                            <div className="custom-circle-style-green"></div>
                            <Style.LiquidicityOptions
                            >
                                <p className="notify-left-black-sm">{opt1}</p>
                            </Style.LiquidicityOptions>
                        </div>

                        <div
                            style={{
                                width: `33.3%`,
                                display: "flex",
                            }}
                        >
                            <div className="custom-circle-style-cayn"></div>
                            <Style.LiquidicityOptions
                            >
                                <p className="notify-left-black-sm">{opt2}</p>
                            </Style.LiquidicityOptions>
                        </div>

                        <div
                            style={{
                                width: `33.3%`,
                                display: "flex",
                            }}
                        >
                            <div className="custom-circle-style-red"></div>
                            <Style.LiquidicityOptions
                            >
                                <p className="notify-left-black-sm">{opt3}</p>
                            </Style.LiquidicityOptions>
                        </div>
                    </Style.LiquidicityRowRight>
                </div>
            </div>
        );
    };
    return (
        <div>
            {getCollapsableRow("liquidityRowVisible", "Liquidity")}

            <div id="expand-container">
                <div
                    id="expand-contract"
                    class={`${statsVisible}`}
                >
                    <div
                        justify="center"
                        style={{ padding: "20px", display: "flex" }}
                    >
                        {/* Liquidity Row  */}
                        <div className="liquidity-container">
                            <Style.LiquidicityRow
                            >
                                <p className="liquidity-header-text">Liquidity</p>
                            </Style.LiquidicityRow>

                            <div style={{ height: "80%", marginBottom: "14%" }} span={24}>
                                <div style={{ height: "100%" }}>
                                    {getLiquidityRow(
                                        "Taxable",
                                        65,
                                        35,
                                        0,
                                        "Net Liquidity: $450,450",
                                        "Taxes: $242,550",
                                        "Penalties: $0"
                                    )}
                                    {getLiquidityRow(
                                        "Tax Deferred",
                                        90,
                                        0,
                                        10,
                                        "Net Liquidity: $405,900",
                                        "Taxes: $0",
                                        "Penalties: $45,100"
                                    )}
                                    {getLiquidityRow(
                                        "Total",
                                        67,
                                        28,
                                        5,
                                        "Net Liquidity: $856,350",
                                        "Taxes: $242,550",
                                        "Penalties: $45,100"
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Liquidity
