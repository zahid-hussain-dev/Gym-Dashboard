import React, { useState } from 'react'
import * as Style from '../../styledComponents/dashboardStyles/Liquidicity';
import plus from "../../../public/assests/SVGs/plus.svg";
import minus from "../../../public/assests/SVGs/minus.svg";
import { LiquidityData } from '../dashboradConstant';
import Image from 'next/image';
import "./dashboard.css";
import LiquidityRow from './LiquidityRow';
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
    return (
        <div>
            {getCollapsableRow("liquidityRowVisible", "Liquidity")}

            <div id="expand-container">
                <div
                    id="expand-contract"
                    className={`${statsVisible}`}
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

                            <div style={{ height: "80%", marginBottom: "14%" }} >
                                <div style={{ height: "100%" }}>
                                    {LiquidityData.map((item, index) => 
                                        <LiquidityRow key={index} title={item.title} pc1={item.pc1} pc2={item.pc2} pc3={item.pc3} opt1={item.opt1} opt2={item.opt2} opt3={item.opt3} />
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
