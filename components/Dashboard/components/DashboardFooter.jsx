import React from 'react'
import Stock from "../../../public/assests/DashboardAssets/Stock.png";
import RealWorld from "../../../public/assests/DashboardAssets/Real-World.png";
import Image from 'next/image';
import * as Style from "../../styledComponents/dashboardStyles/DashboardFooter";
import "./dashboard.css";

const DashboardFooter = () => {
    return (
        <div style={{ paddingTop: "20px", marginBottom: "3rem" }}>
            <div style={{ display: "flex" }}>
                <Style.ContentSection >
                    <Image src={Stock} alt='stock' height="160" width="140" />
                    <p className="notification-header-text-bottom-sec">
                        Portfolio Tracker
                    </p>
                </Style.ContentSection>
                <Style.ContentSection style={{ marginLeft: "2rem" }}>
                    <Image src={RealWorld} alt='real' height="160" width="140" />
                    <p className="notification-header-text-bottom-sec">
                        Personalized News
                    </p>
                </Style.ContentSection>
            </div>
        </div>
    )
}

export default DashboardFooter
