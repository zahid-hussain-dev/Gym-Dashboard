import React, { useState } from 'react'
import * as Style from '../../styledComponents/dashboardStyles/GoalSection';
import plus from "../../../public/assests/SVGs/plus.svg";
import minus from "../../../public/assests/SVGs/minus.svg";
import Image from 'next/image';
import { percentCardData } from '../dashboradConstant';
import PercentageCard from './PercentageCard';
import "./dashboard.css";
const Goals = () => {
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
            {getCollapsableRow("cardsRowVisible", "Goals")}

            <div id="expand-container">
                <div id="expand-contract" className={`${statsVisible}`}>
                    <Style.PercentageCardSection>
                        {percentCardData.map((item, index) => (
                        <PercentageCard key={index} name={item.cardName} have={item.have} need={item.need} days={item.days} percentage={item.percentage} />
                        ))}
                    </Style.PercentageCardSection>
                </div>
            </div>

        </div>
    )
}

export default Goals
