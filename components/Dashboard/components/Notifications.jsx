import React, { useState } from 'react'
import * as Style from '../../styledComponents/dashboardStyles/Notifications';
import plus from "../../../public/assests/SVGs/plus.svg";
import minus from "../../../public/assests/SVGs/minus.svg";
import cancel from "../../../public/assests/SVGs/cancel.svg";
import eye from "../../../public/assests/SVGs/eye.svg";
import Image from 'next/image';
import ViewUpdateModal from './ViewModal';
import "./dashboard.css";

const Notifications = () => {
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
      {getCollapsableRow("notificationRowVisible",
        "Updates and Notifications")}

      <div id="expand-container">
        <div
          id="expand-contract"
          className={`${statsVisible}`}
        >
          <Style.MainBox >
            <Style.LeftBox>
              <Style.NotificationCard >
                <div style={{ height: "100%" }}>
                  <div
                    style={{ minHeight: "55px", background: "white" }}
                  >
                    <div className="notification-header-text">Updates</div>
                  </div>

                  <div
                    style={{ background: "white", minHeight: "280px" }}
                  >
                    {/* {this.notificationRowFilled()} */}
                    {notificationRowUpdated(
                      "Asset Planet has added new Asset to the list"
                    )}
                    {notificationRowUpdated(
                      "Asset Planet has developed a new category in the Inventory App"
                    )}
                    {notificationRowUpdated(
                      "Remember, Monday is a bank holiday. Enjoy the day off!"
                    )}
                    {notificationRowUpdated(
                      "Asset Planet has gifted another free month to you. Thank you for the referral!"
                    )}
                    {notificationRowUpdated()}
                    {notificationRowUpdated()}
                    {notificationRowViewAll()}
                  </div>
                </div>
              </Style.NotificationCard>
            </Style.LeftBox>

            <Style.RightBox >
              <Style.NotificationCard >
                <div style={{ height: "100%", background: "white" }}>
                  <div style={{ minHeight: "50px" }}>
                    <div className="notification-header-text">
                      Notifications
                    </div>
                  </div>

                  <div
                    style={{ background: "white", minHeight: "280px" }}
                  >

                    {/* {this.notificationRowFilled()} */}
                    {notificationRowUpdated(
                      "Your Inventory App Sync is complete"
                    )}
                    {notificationRowUpdated(
                      "Your Life Insurance policy will expire in 90 days"
                    )}
                    {notificationRowUpdated(
                      "Your Retirement Goal date is within 90 days"
                    )}
                    {notificationRowUpdated(
                      "Your Ford F150 has a loan payment due within 10 days"
                    )}
                    {notificationRowUpdated(
                      "There is a New Client being shared with you"
                    )}
                    {notificationRowUpdated(
                      "Your Inflation input has not been udpated in over 1 year"
                    )}
                    {notificationRowViewAll()}
                  </div>
                </div>
              </Style.NotificationCard>
            </Style.RightBox>
          </Style.MainBox>
        </div>
      </div>
      <ViewUpdateModal
        show={viewModal}
        close={closeModal}
      />
    </div>
  )
}

export default Notifications
