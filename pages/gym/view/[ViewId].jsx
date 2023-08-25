import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Scheduler } from "@aldabil/react-scheduler";
import { Button } from "../../../components/styledComponents/button/Button";
import AddGymSchedule from "../../../components/styledComponents/modal/AddGymSchedule";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import Loader from '../../../components/styledComponents/loader/loader';
import { useSelector } from "react-redux";
import moment from "moment";

const ViewId = () => {
  const router = useRouter();
  const Id = router.query.ViewId;
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const schRef = React.createRef()
  const handleButtonClick = () => {
    setShowModal(true);
    console.log("modal click");
  };
  const GymName = useSelector((state) => state.user.gymName);
  console.log("CoachName", GymName)
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
        item['title'] = "Open Hours",
        item['start'] = new Date(item.from),
        item['end'] = new Date(item.to),
        item['editable'] = true,
        item['deletable'] = false,
        item['color'] = "#50b500"
      ))
      setEvents(res.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const closeModal = () => {
    setShowModal(false);
    console.log("get gym schedule on close")
    getGymScedule();
  };
  function formatTimestamp(timestamp) {
    const [datePart, timePart] = timestamp.split("T");
    const [year, month, day] = datePart.split("-");
    const [hours, minutes] = timePart.slice(0, -1).split(":");
    const adjustedHours = String(Number(hours)).padStart(2, "0");
    return `${year} ${Number(month)} ${Number(day)} ${adjustedHours}:${minutes}`;
  }
  const handleConfirm = async (event, action) => {
    console.log("handleConfirm =", action, event.title);
    if (action === "edit") {
    } else if (action === "create") {
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
      getGymScedule();
  }, [])
  useEffect(() => {
    if (Id) {
      getGymScedule();
    }
  }, [showModal, Id])
  useEffect(() => {
    schRef.current?.scheduler.handleState(events, "events")
}, [events])
  return (
    <>
      <div style={{ marginTop: "10%" }}>
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
        {showModal && <AddGymSchedule closeModal={closeModal} id={Id} />}
        {showModal ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              textAlign: "center",
              filter: showModal? 'blur(5px)' : 'none', 
              pointerEvents:  showModal? 'none' : 'auto' 
            }}
          >
            <div style={{ width: "90%", height: "40%", marginTop: "2%" }}>
              <div
                style={{
                  fontSize: "24px",
                  color: "white",
                  marginBottom: "1rem",
                  textAlign: "center",
                  padding: "1rem"
                }}
              >
                Gym Schedule{" "}
              </div>
              {events.length > 0 ?
                <Scheduler
                  view='month'
                  onSelectedDateChange={false}
                  onConfirm={handleConfirm}
                  events={events}
                  ref={schRef}
                  week={{
                    weekDays: [0, 1, 2, 3, 4, 5, 6],
                    weekStartOn: 6,
                    startHour: 9,
                    endHour: 24,
                  }}
                />
                :
                <Scheduler
                  view='month'
                  onSelectedDateChange={false}
                  onConfirm={handleConfirm}
                  events={events}
                  ref={schRef}
                  week={{
                    weekDays: [0, 1, 2, 3, 4, 5, 6],
                    weekStartOn: 6,
                    startHour: 9,
                    endHour: 24,
                  }}
                />              }
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: "90%", height: "50%", marginTop: "2%" }}>
              <div
                style={{
                  fontSize: "24px",
                  color: "white",
                  marginBottom: "1rem",
                  width: "100%",
                  textAlign: "center",
                  filter: showModal? 'blur(5px)' : 'none', 
                  pointerEvents:  showModal? 'none' : 'auto' 
                }}
              >
                Gym Schedule{" "}
              </div>
              {events.length > 0 ?
                <Scheduler
                  view='month'
                  ref={schRef}
                  onSelectedDateChange={false}
                  onConfirm={handleConfirm}
                  events={events}
                  week={{
                    weekDays: [0, 1, 2, 3, 4, 5, 6],
                    weekStartOn: 6,
                    startHour: 9,
                    endHour: 24,
                  }}
                />
                :
                <Scheduler
                  view='month'
                  ref={schRef}
                  onSelectedDateChange={false}
                  onConfirm={handleConfirm}
                  events={events}
                  week={{
                    weekDays: [0, 1, 2, 3, 4, 5, 6],
                    weekStartOn: 6,
                    startHour: 9,
                    endHour: 24,
                  }}
                />              }
            </div>
          </div>
        )}
              <Loader isLoading={loading}></Loader>
      </div>
    </>
  );
};

export default ViewId;
