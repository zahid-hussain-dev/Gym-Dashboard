import React, { useState } from 'react'
import * as Style from '../../styledComponents/dashboardStyles/Notifications';
import plus from "../../../public/assests/SVGs/plus.svg";
import minus from "../../../public/assests/SVGs/minus.svg";
import cancel from "../../../public/assests/SVGs/cancel.svg";
import eye from "../../../public/assests/SVGs/eye.svg";
import Image from 'next/image';
import ViewUpdateModal from './ViewModal';
import "./dashboard.css";
const Observation = () => {
    const [statsVisible, setStatsVisible] = useState("expanded");
    const [viewModal, setviewModal] = useState(false);
    const closeModal = () => {
        setviewModal(!viewModal);
    };

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
    const notificationRowUpdated = (text = "Update Inflation Projection") => {
        return (
            <Style.NotificationRow >
                <Style.NotificationText
                >
                    <div className="notification-text">{text}</div>
                </Style.NotificationText>
                <div style={{
                    marginLeft: "auto",
                }}>
                    <Image src={eye} alt='eye' height={15} width={30} />
                    {/* <Icon type="eye" className="icon-style"></Icon> */}
                </div>
                <div >
                    <Image src={cancel} alt='cancel' height={15} width={30} />
                    {/* <Icon type="close" className="icon-style"></Icon> */}
                </div>
            </Style.NotificationRow>
        );
    };
    const notificationRowViewAll = () => (
        <Style.NotificationView >
            <div >
                <div
                    style={{ textAlign: "end", marginRight: "10px", cursor: "pointer" }}
                    onClick={() => { setviewModal(true) }}
                >
                    View All
                </div>
            </div>
        </Style.NotificationView>
    );
    return (
        <div>
            {getCollapsableRow("observationRowVisible", "Observations")}

            <div id="expand-container">
                <div
                    id="expand-contract"
                    class={`${statsVisible}`}
                >
                    <Style.MainBox j>
                        {/* Observation Row */}
                        <div span={24}>
                            <Style.ObservationCard >
                                <div style={{ height: "100%", background: "white" }}>
                                    <div span={24} style={{ minHeight: "50px" }}>
                                        <p className="notification-header-text">Observations</p>
                                    </div>

                                    <div span={24} style={{ background: "white" }}>
                                        {notificationRowUpdated(
                                            "Based on your Net Worth, consider an Umbrella Insurance Policy. You have $34,343 in networth with $0 Umbrella policy."
                                        )}
                                        {notificationRowUpdated(
                                            "There is no Power of Attorney listed in your plan. Consult with an attorney to determine strategy to create a Power of Attorney."
                                        )}
                                        {notificationRowUpdated(
                                            "There is no Will listed in your plan. Consult with an attorney to determine strategy to create a Will."
                                        )}
                                        {notificationRowUpdated(
                                            "There is no Life Insurance listed in your plan. Consult with an insurance or financial professional to determine what is best for your needs."
                                        )}
                                        {notificationRowUpdated(
                                            "Based on the loan rate on Frank and Tracy Rental, consider refinance. Your loan is $0 at 4.000% Current rates are 3.50%. Consider a refinance."
                                        )}
                                        {notificationRowUpdated(
                                            "There is no Advance Healthcare Directive listed in your plan. Consult with an attorney to determine strategy to create an Advance Healthcare Directive."
                                        )}
                                        <div style={{ marginBottom: "10px" }}></div>
                                        {notificationRowViewAll()}
                                        <ViewUpdateModal
                                            show={viewModal}
                                            close={closeModal}
                                        />
                                    </div>
                                </div>
                            </Style.ObservationCard>
                        </div>
                    </Style.MainBox>
                </div>{" "}
            </div>
        </div>
    )
}

export default Observation
