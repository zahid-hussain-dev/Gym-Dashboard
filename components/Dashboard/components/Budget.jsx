import React, { useState } from 'react'
import * as Style from '../../styledComponents/dashboardStyles/GeneralSection';
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
                <Style.SavingGoal >{title}</Style.SavingGoal>
            </Style.CollapsableSection>
        );
    };

    return (
        <Style.BudgetMainSection >
        {getCollapsableRow("statsVisible", "Budget and Net Worth")}
        <div id="expand-container">
            <div id="expand-contract" className={`${statsVisible}`}>
                <div
                    gutter={[16, 16]}
                    style={{
                        padding: "20px",
                        display: "flex",
                        marginBottom: "12px",
                    }}
                >
                    {/* LEFT BOX */}
                    <div
                        xs={24}
                        sm={12}
                        lg={12}
                        xl={12}
                        style={{ display: "flex",width:"50%" }}
                    >
                        <div className="main-dashboard-card" style={{width:"100%"}}>
                            <div
                                style={{
                                    height: "100%",
                                    marginBottom: "25%",
                                    paddingBottom: "2%",
                                }}
                            >
                                <div
                                    span={24}
                                    style={{ height: "20%", marginTop: "1.5%" }}
                                >
                                    <p className="left" style={{ paddingTop: "8px" }}>
                                        Budget Expenses
                                    </p>
                                </div>
                                <div span={24} style={{ height: "80%" }}>
                                    <div style={{ height: "100%", display:"flex", justifyContent:"space-between" }}>
                                        <div span={12} style={{ height: "100%",width:"50%" }}>
                                            <div style={{ height: "100%" }}>
                                                <div span={24} style={{ height: "15%" }}>
                                                    <p className="left-white">Monthly</p>
                                                </div>
                                                <div
                                                    span={24}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        height: "35%",
                                                    }}
                                                >
                                                    <div className="item3-custom">
                                                        <p className="left">$</p>
                                                    </div>
                                                    <div className="item4-custom">
                                                        <p className="right">18,084</p>
                                                    </div>
                                                </div>
                                                <div span={24} style={{ height: "15%" }}>
                                                    <p className="left-white">Annually</p>
                                                </div>
                                                <div
                                                    span={24}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        height: "35%",
                                                    }}
                                                >
                                                    <div className="item3-custom">
                                                        <p className="left">$</p>
                                                    </div>
                                                    <div className="item4-custom">
                                                        <p className="right">217,008</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            span={12}
                                            style={{
                                                height: "100%",
                                                width:"50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <div className="image-display">
                                                <Image src={Budgetnet} height="195" width="165" alt='budget' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT BOX */}
                    <div
                        xs={24}
                        sm={12}
                        lg={12}
                        xl={12}
                        style={{ display: "flex",width:"50%" }}
                    >
                        <div className="main-dashboard-card-white">
                            <div
                                style={{
                                    height: "100%",
                                    marginBottom: "15.5%",
                                    paddingBottom: "1%",
                                }}
                            >
                                <div span={24} style={{ height: "20%" }}>
                                    <p className="left-black">Net Worth</p>
                                </div>
                                <div span={24} style={{ height: "80%" }}>
                                    <div style={{ height: "100%", display:"flex", justifyContent:"space-around" }}>
                                        <div span={12} style={{ height: "100%" }}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "50%",
                                                }}
                                            >
                                                <Image src={Networth3} height="195" width="140" alt='networth' />
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "15%",
                                                }}
                                            >
                                                <p className="left-black-sm">
                                                    With Primary Residence
                                                </p>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "35%",
                                                }}
                                            >
                                                <div className="item3-custom">
                                                    <p className="left">$</p>
                                                </div>
                                                <div className="item4-custom-border">
                                                    <p className="right">1,144,000</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div span={12} style={{ height: "100%" }}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "50%",
                                                }}
                                            >
                                                <Image
                                                    src={networth_without_house}
                                                    height="195"
                                                    width="140"
                                                    alt='nethouse'
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "15%",
                                                }}
                                            >
                                                <p className="left-black-sm">
                                                    Without Primary Residence
                                                </p>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "35%",
                                                }}
                                            >
                                                <div className="item3-custom">
                                                    <p className="left">$</p>
                                                </div>
                                                <div className="item4-custom-border">
                                                    <p className="right">320,955</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Style.BudgetMainSection>
    )
}

export default Budget
