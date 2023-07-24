import React, { useState } from 'react';
import plus from "../../../public/assests/SVGs/plus.svg";
import minus from "../../../public/assests/SVGs/minus.svg";
import { generalTiles } from '../dashboradConstant';
import Image from 'next/image';
import * as Style from '../../styledComponents/dashboardStyles/GeneralSection';
import "./dashboard.css";

const GeneralSection = () => {
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
                <Style.SavingGoal >{title}</Style.SavingGoal>
            </Style.CollapsableSection>
        );
    };
    return (
        <Style.MainSection className='main-section'>
            {getCollapsableRow("statsVisible", "General tiles")}
            <div id="expand-container">
                <div id="expand-contract" className={`${statsVisible}`}>
                    <div>
                        <Style.ExpandableSection >
                            {generalTiles.map((item, index) => (
                                <Style.GeneralSection key={index} >
                                    <Style.cardBlock  >
                                        <Style.SectionHeader
                                        >
                                            <Style.cardName >
                                                <span class="left">{item.cardName}</span>
                                            </Style.cardName>
                                            <Style.cardImg >
                                                <Image alt={item.cardName} src={item.image} height="50" width="60" />
                                            </Style.cardImg>
                                        </Style.SectionHeader>
                                        <Style.SectionFooter >
                                            <Style.cardPriceSection >
                                                <span className="left">$</span>
                                            </Style.cardPriceSection>
                                            <Style.cardPrice className="item4">
                                                <span className="right">{item.price}</span>
                                            </Style.cardPrice>
                                        </Style.SectionFooter>
                                    </Style.cardBlock>
                                </Style.GeneralSection>
                            ))}


                        </Style.ExpandableSection>
                    </div>
                </div>
            </div>
        </Style.MainSection>
    )
}

export default GeneralSection
