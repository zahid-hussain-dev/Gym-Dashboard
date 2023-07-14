import React, { useState } from 'react'
import * as Style from '../../styledComponents/dashboardStyles/BudgetSection';
import Budgetnet from "../../../public/assests/DashboardAssets/Budget.png";
import Networth3 from "../../../public/assests/DashboardAssets/Networth3.png";
import networth_without_house from "../../../public/assests/DashboardAssets/networth_without_house.png";
import plus from "../../../public/assests/SVGs/plus.svg";
import minus from "../../../public/assests/SVGs/minus.svg";
import Image from 'next/image';
import "./dashboard.css";

const Budget = () => {
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
        <Style.BudgetMainSection >
            {getCollapsableRow("statsVisible", "Budget and Net Worth")}
            <div id="expand-container">
                <div id="expand-contract" className={`${statsVisible}`}>
                    <Style.MainBox
                    >
                        {/* LEFT BOX */}
                        <Style.LeftBox
                        >
                            <Style.GreenCard>
                                <Style.CardContent
                                >
                                    <Style.CardHeader
                                    >
                                        <Style.CardHeading >
                                            Budget Expenses
                                        </Style.CardHeading>
                                    </Style.CardHeader>
                                    <div style={{ height: "80%" }}>
                                        <Style.CardLowerSection >
                                            <div style={{ height: "100%", width: "50%" }}>
                                                <div style={{ height: "100%" }}>
                                                    <div style={{ height: "15%" }}>
                                                        <p className="left-white">Monthly</p>
                                                    </div>
                                                    <Style.CardItems
                                                    >
                                                        <div className="item3-custom">
                                                            <Style.CardHeading>$</Style.CardHeading>
                                                        </div>
                                                        <div className="item4-custom">
                                                            <p className="right">18,084</p>
                                                        </div>
                                                    </Style.CardItems>
                                                    <div style={{ height: "15%" }}>
                                                        <p className="left-white">Annually</p>
                                                    </div>
                                                    <Style.CardItems
                                                    >
                                                        <div className="item3-custom">
                                                            <Style.CardHeading>$</Style.CardHeading>
                                                        </div>
                                                        <div className="item4-custom">
                                                            <p className="right">217,008</p>
                                                        </div>
                                                    </Style.CardItems>
                                                </div>
                                            </div>

                                            <Style.CardItemsRight
                                            >
                                                <div className="image-display">
                                                    <Image src={Budgetnet} height="195" width="165" alt='budget' />
                                                </div>
                                            </Style.CardItemsRight>
                                        </Style.CardLowerSection>
                                    </div>
                                </Style.CardContent>
                            </Style.GreenCard>
                        </Style.LeftBox>

                        {/* RIGHT BOX */}
                        <Style.RightBox
                        >
                            <Style.WhiteCard >
                                <Style.CardContentWhite
                                >
                                    <div style={{ height: "20%" }}>
                                        <p className="left-black">Net Worth</p>
                                    </div>
                                    <div style={{ height: "80%" }}>
                                        <Style.CardSection>
                                            <div style={{ height: "100%" }}>
                                                <Style.ImageSection
                                                >
                                                    <Image src={Networth3} height="195" width="140" alt='networth' />
                                                </Style.ImageSection>
                                                <Style.ImageHeader

                                                >
                                                    <p className="left-black-sm">
                                                        With Primary Residence
                                                    </p>
                                                </Style.ImageHeader>
                                                <Style.ImagePrice

                                                >
                                                    <div className="item3-custom">
                                                        <p className="left">$</p>
                                                    </div>
                                                    <div className="item4-custom-border">
                                                        <p className="right">1,144,000</p>
                                                    </div>
                                                </Style.ImagePrice>
                                            </div>
                                            <div style={{ height: "100%" }}>
                                                <Style.ImageSection
                                                >
                                                    <Image
                                                        src={networth_without_house}
                                                        height="195"
                                                        width="140"
                                                        alt='nethouse'
                                                    />
                                                </Style.ImageSection>
                                                <Style.ImageHeader

                                                >
                                                    <p className="left-black-sm">
                                                        Without Primary Residence
                                                    </p>
                                                </Style.ImageHeader>
                                                <Style.ImagePrice

                                                >
                                                    <div className="item3-custom">
                                                        <p className="left">$</p>
                                                    </div>
                                                    <div className="item4-custom-border">
                                                        <p className="right">320,955</p>
                                                    </div>
                                                </Style.ImagePrice>
                                            </div>
                                        </Style.CardSection>
                                    </div>
                                </Style.CardContentWhite>
                            </Style.WhiteCard>
                        </Style.RightBox>
                    </Style.MainBox>
                </div>
            </div>
        </Style.BudgetMainSection>
    )
}

export default Budget
