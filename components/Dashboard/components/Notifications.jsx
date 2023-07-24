import React, { useState } from 'react'
import * as Style from '../../styledComponents/dashboardStyles/Notifications';
import plus from "../../../public/assests/SVGs/plus.svg";
import minus from "../../../public/assests/SVGs/minus.svg";
import cancel from "../../../public/assests/SVGs/cancel.svg";
import eye from "../../../public/assests/SVGs/eye.svg";
import Image from 'next/image';
import ViewUpdateModal from './ViewModal';
import { NotificationsUpdate, NotificationsUpdateSnoozed } from '../dashboradConstant';
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
  const NotificationRowUpdated = (props) => {
    return (
      <Style.NotificationRow >
        <Style.NotificationText
        >
          <div className="notification-text">{props.text}</div>
        </Style.NotificationText>
        <div style={{
          marginLeft: "auto",
        }}>
          <Image src={eye} alt='eye' height={15} width={30} />
        </div>
        <div >
          <Image src={cancel} alt='cancel' height={15} width={30} />
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
                    {NotificationsUpdate.map((item, index) =>
                      <NotificationRowUpdated key={index} text={item.text} />

                    )}

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
                    {NotificationsUpdateSnoozed.map((item, index) =>
                      <NotificationRowUpdated key={index} text={item.text} />

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
