import React, { useState } from 'react'
import * as Style from '../../styledComponents/dashboardStyles/SavingSection';
import plus from "../../../public/assests/SVGs/plus.svg";
import minus from "../../../public/assests/SVGs/minus.svg";
import Image from 'next/image';
import "./dashboard.css";
import SavingCharts from './SavingCharts';
const Saving = () => {
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
            {getCollapsableRow("savingsRowVisible", "Savings")}

            <div id="expand-container">
                <div id="expand-contract" class={`${statsVisible}`}>
                    <div style={{ height: "50px" }}>
                        <Style.SavingHeader>
                            <Style.SavingBoxHeaderText>Savings & Goals</Style.SavingBoxHeaderText>
                        </Style.SavingHeader>
                    </div>

                    <div style={{ height: "50px", marginTop: "10px" }}>
                        <Style.SavingHeader >
                            <Style.SavingBox>
                                <Style.SavingBoxHeader>
                                    Savings $ 1,295
                                </Style.SavingBoxHeader>
                            </Style.SavingBox>
                        </Style.SavingHeader>
                    </div>
                    <SavingCharts />
                </div>
            </div>

        </div>
    )
}

export default Saving
