import React from 'react';
import "./dashboard.css";
import GeneralSection from './GeneralSection';
import * as Style from "../../styledComponents/dashboardStyles/GeneralSection";
import Budget from './Budget';
const DashboardHeader = () => {

    const MainTop = () => {
        return (
            <Style.HeaderText>
                <Style.HeaderTextTitle>
                    Frank Jones and Tracy Jones
                </Style.HeaderTextTitle>
                <Style.HeaderTextSubTitle>
                    First Plan
                </Style.HeaderTextSubTitle>
            </Style.HeaderText>
        );
    };

    return (
        <React.Fragment>

            <div className={`mb-4 fixed-header fixed-header-container`}>
                <div className="mt-2" style={{ marginTop: "10px" }}>
                    <div className='MainTop'>
                        <MainTop />
                    </div>
                </div>
                <div className='dropdown-section'>
                    <div style={{ height: "100%" }} >

                        {/*  <div className="top-dropdown-style">*/}
                        <Style.Select>
                            <option value={"Client Name"}>Client Name</option>
                            <option value={"Frank Jones"}>Frank Jones</option>

                            <option value={"Smith & Billy"}>Lisa & Anoty</option>
                            <option value={"Smith & Peggy"}>Smith & Peggy</option>

                        </Style.Select>
                        {/* </div>*/}
                    </div>
                    <div style={{ height: "100%" }}>
                        {/*   <div className="top-dropdown-style">*/}
                        <Style.Select>
                            <option value={"Plan Name"}>Plan Name</option>
                            <option value={"Frank Jones"}>Frank Jones</option>
                            <option value={"Smith & Billy"}>Lisa & Anoty</option>
                            <option value={"Smith & Peggy"}>Smith & Peggy</option>

                        </Style.Select>
                        {/*    </div>*/}
                    </div>
                </div>
            </div>

            <React.Fragment> <GeneralSection /></React.Fragment>
        </React.Fragment>
    )
}

export default DashboardHeader
