import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "../../../components/MainComponents/Events";
import { Button } from "../../../components/styledComponents/button/Button";
import AddGymSchedule from "../../../components/styledComponents/modal/AddGymSchedule";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import Loader from '../../../components/styledComponents/loader/loader';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"; 

const ViewId = () => {
  const router = useRouter();
  const Id = router.query.ViewId;
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
    console.log("modal click");
  };
  const GymName = useSelector((state) => state.user.gymName);
  console.log("CoachName", GymName)
  const closeModal = () => {
    //   setShowModal(false);
    setShowModal((prev) => !prev);
  };
  const getGymScedule = async (id) => {
    try {
      setLoading(true)
      console.log("api calling for schedule")
      const res = await axiosInterceptor().get(
        `/api/gym/schedule?gym=${router.query.ViewId}`,
      );
      console.log("responsse of schedule ID", res)
      res.data.map((item, index) => (
        item['event_id'] = item.id,
        item['title'] = "Events",
        item['start'] = new Date(item.from),
        item['end'] = new Date(item.to),
        item['editable'] = false,
        item['deletable'] = false,
        item['color'] = "#50b500"
      ))
      setEvents(res.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const handleConfirm = async (event, action) => {
    console.log("handleConfirm =", action, event.title);

    if (action === "edit") {
      /** PUT event to remote DB */
    } else if (action === "create") {
      /**POST event to remote DB */
      const Payload = {
        from: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
        to: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
        gym: Id,
      }
      console.log("payload", Payload)

      try {
        setLoading(true)
        const res = await axiosInterceptor().post(
          `/api/gym/schedule`,
          Payload,
        );
        console.log("responsse of schedule create", res)
        swal('Success!', res.data.message, 'success')
        setLoading(false);
        return { ...event, event_id: event.event_id || Math.random() }
      } catch (error) {
        setLoading(false)
        console.log("error", error)
        swal('Oops!', error.data.message, 'error')
        console.log(error)
        throw error
      }

    }
  };
  
  useEffect(() => {
    if (Id) {
      getGymScedule();
    }

  }, [showModal, Id])
  return (
    <>
      {/* <Styled.Globalstyle/> */}
      <div style={{marginTop: "10%" }}>
        <Button
          style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }}
          
        >
          Add Gym Schedule
        </Button>
        <Button
          style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }}
          onClick={handleButtonClick}
        >
          +
        </Button>
        {/* {showModal && <AddGymSchedule closeModal={closeModal} />} */}
        {showModal && <AddGymSchedule closeModal={closeModal} id={Id} />}
        {showModal ? (
         <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            filter: "blur(5px)",
            textAlign:"center"
          }}
        >
          <div style={{ width: "90%", height: "40%",marginTop:"2%"}}>
            <div
              style={{
                fontSize: "24px",
                color: "white",
                marginBottom: "1rem",
                textAlign:"center"
              }}
            >
                Gym Schedule{" "}
              </div>
              {events.length > 0 ?
                <Scheduler
                  // height={300}
                  // loading={true}
                  onSelectedDateChange={false}
                  onConfirm={handleConfirm}
                  events={events}
                  week={{
                    weekDays: [0, 1, 2, 3, 4, 5, 6],
                    weekStartOn: 6,
                    startHour: 9,
                    endHour: 24,
                    // step: 30
                  }}
                />
                :
                <div style={{ fontSize: "18px", color: "white", marginBottom: "1rem",  textAlign:"center" }}>No Schedule Exist for this Gym {GymName} </div>
              }
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: "90%", height: "50%",marginTop:"2%"}}>
              <div
                style={{
                  fontSize: "24px",
                  color: "white",
                  marginBottom: "1rem",
                  width:"100%",
                  textAlign:"center"
                }}
              >
                Gym Schedule{" "}
              </div>
              {events.length > 0 ?
                <Scheduler
                  // height={300}
                  // loading={true}
                  onSelectedDateChange={false}
                  onConfirm={handleConfirm}
                  events={events}
                  week={{
                    weekDays: [0, 1, 2, 3, 4, 5, 6],
                    weekStartOn: 6,
                    startHour: 9,
                    endHour: 24,
                    // step: 30
                  }}
                />
                :
                <div style={{ fontSize: "18px", color: "white", marginBottom: "1rem",  textAlign:"center" }}>No Schedule Exist for this Gym {GymName} </div>
              }
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewId;
