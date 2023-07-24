import React from 'react'
import * as Style from '../../styledComponents/dashboardStyles/Liquidicity';
import "./dashboard.css";
const LiquidityRow = (props) => {
    return (
        <div style={{ height: "33%" }} >
            <div style={{ height: "40%" }}>
                <Style.LiquidicityTitle
                >
                    <p className="liquidity-sub-header-text">{props.title}</p>
                </Style.LiquidicityTitle>
            </div>
            <div style={{ height: "40%", display: "flex" }}>
                <Style.LiquidicityRowLeft
                >
                    <div className="cust">
                        <Style.GreenGradient
                            style={{
                                width: `${props.pc1}%`,
                            }}
                        ></Style.GreenGradient>
                        <Style.GreenBlueGradient
                            style={{
                                width: `${props.pc2}%`,
                            }}
                        ></Style.GreenBlueGradient>
                        <Style.SimpleGradient
                            style={{
                                width: `${props.pc3}%`,
                            }}
                        ></Style.SimpleGradient>
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
                            <p className="notify-left-black-sm">{props.opt1}</p>
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
                            <p className="notify-left-black-sm">{props.opt2}</p>
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
                            <p className="notify-left-black-sm">{props.opt3}</p>
                        </Style.LiquidicityOptions>
                    </div>
                </Style.LiquidicityRowRight>
            </div>
        </div>


    )
}

export default LiquidityRow
