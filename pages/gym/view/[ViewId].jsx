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
  // console.log("id here==>", Id)
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const schRef = React.createRef()
  const handleButtonClick = () => {
    setShowModal(true);
  };
  const handleId = async (event, action, Id) => {
    console.log("id here==>", Id)
    const Payload = {
      from: moment(event.start).format("HH:mm"),
      to: moment(event.end).format("HH:mm"),
      day: event.Day,
      gym:router.query.ViewId,
      Id:Id,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    try {
      setLoading(true);
      const res = await axiosInterceptor().put(
        `/api/gym/schedule?id=${Id}`, // Use event.scheduleId as the ID of the gym schedule to update
        Payload
      );
      console.log("response of schedule create", res);
      swal("Success!", res.data.message, "success");
      setLoading(false);
      // Return the updated event object
      return { ...event };
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      swal("Oops!", error.data.message, "error");
      console.log(error);
      throw error;
    }
  };
  const GymName = useSelector((state) => state.user.gymName);
  console.log("CoachName", GymName)
  const closeModal = () => {
    setShowModal(false);
    console.log("get gym schedule on close")
    getGymScedule();
  };
  const getGymScedule = async (id) => {
    try {
      setLoading(true)
      console.log("api calling for schedule")
      const res = await axiosInterceptor().get(
        // `/api/gym/schedule?gym=1`,
        `/api/gym/schedule?gym=${router.query.ViewId}`,
      );
      console.log("responsse of schedule ID", res)
      if (res?.status === 200) {
        const eventData = res.data.map(item => ({
          day: item.day,
          start: item.from,
          end: item.to,
          title: item.status,
          scheduleId:item.id
        }));
        console.log("eventdata",eventData)
        const daysOfWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        const currentYear = new Date().getFullYear();
        const filteredEvents = [];
        daysOfWeek.forEach(day => {
          const eventsForDay = eventData.filter(event => event.day === day);
          const currentDate = new Date(`${currentYear}-01-01`);
          while (currentDate.getFullYear() === currentYear) {
            if (currentDate.getDay() === daysOfWeek.indexOf(day)) {
              const formattedDate = currentDate.toISOString().split('T')[0];
              filteredEvents.push(
                ...eventsForDay.map(event => ({
                  ...event,
                  start: moment.utc(`${formattedDate} ${event.start}`).toDate(),
                  end: moment.utc(`${formattedDate} ${event.end}`).toDate(), 
                  editable: true,
                  deletable: false,
                  title: "Open Hours",
                  // scheduleId:event.scheduleId,
                  // id:event.scheduleId,
                  admin_id:event.scheduleId,
                })),
              );
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });
        console.log('Filtered Events======', filteredEvents);
        setEvents(filteredEvents);
      }
      // setEvents(res.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const handleConfirm = async (event, action) => {
    handleId(event, action)
    console.log("handleConfirm =", action, event);
    if (action === "edit") {
      console.log("here in edit action", event);
    } else if (action === "create") {
      console.log("heloooooo", event);
      // const Payload = {
      //   from: moment(event.start).format("HH:mm"),
      //   to: moment(event.end).format("HH:mm"),
      //   day: event.Day,
      //   gym:router.query.ViewId,
      //   Id:Id,
      //   timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      // };
      console.log("payload88888", Payload);
      // try {
      //   setLoading(true);
      //   const res = await axiosInterceptor().put(
      //     `/api/gym/schedule?id=${Id}`, // Use event.scheduleId as the ID of the gym schedule to update
      //     Payload
      //   );
      //   console.log("response of schedule create", res);
      //   swal("Success!", res.data.message, "success");
      //   setLoading(false);
      //   // Return the updated event object
      //   return { ...event };
      // } catch (error) {
      //   setLoading(false);
      //   console.log("error", error);
      //   swal("Oops!", error.data.message, "error");
      //   console.log(error);
      //   throw error;
      // }
    }
  };
  useEffect(() => {
    if (Id) {
      getGymScedule();
    }
  }, [showModal, Id])
  useEffect(() => {
    schRef.current?.scheduler.handleState(events, "events")
  }, [events])

  // const handleConfirm = async (event, action ,Id) => {
  //   console.log("handleConfirm =", action, event);
  //   console.log("router*-*", router.query.ViewId);
  //   if (action === "edit") {
  //     console.log("here in edit action", event)
  //   } else if (action === "create") {

  //     console.log("heloooooo", event)
  //     const Payload = {
  //       from: moment(event.start).format('HH:mm'),
  //       to: moment(event.end).format('HH:mm'),
  //       day: event.Day,
  //       gym: router.query.ViewId,
  //       timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //     }
  //     console.log("payload88888", Payload)
  //     try {
  //       setLoading(true)
  //       const res = await axiosInterceptor().put(
  //         `/api/gym/schedule?id=${Id}`,
  //         Payload,
  //       );
  //       console.log("responsse of schedule create", res)
  //       swal('Success!', res.data.message, 'success')
  //       setLoading(false);
  //       return { ...event, event_id: event.event_id || Math.random() }
  //     } catch (error) {
  //       setLoading(false)
  //       console.log("error", error)
  //       swal('Oops!', error.data.message, 'error')
  //       console.log(error)
  //       throw error
  //     }
  //   }
  // };
  return (
    <>
      <div style={{ marginTop: "10%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: "24px",
              color: "white",
              filter: showModal ? 'blur(5px)' : 'none',
              pointerEvents: showModal ? 'none' : 'auto'
            }}
          >
            Gym Schedule{" "}
          </div>
          <div style={{ marginRight: "5%" }}>
            <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }}>
              Add Schedule
            </Button>
            <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }}
              onClick={handleButtonClick}>
              +
            </Button>
          </div>
        </div>

        {showModal && <AddGymSchedule closeModal={closeModal} id={Id} />}
        {showModal ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              textAlign: "center",
              filter: showModal ? 'blur(5px)' : 'none',
              pointerEvents: showModal ? 'none' : 'auto'
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
                <div style={{ height: "45rem", overflowY: "auto", borderRadius: "5px" }}>
                  <Scheduler
                    view='week'
                    onSelectedDateChange={false}
                    onConfirm={handleConfirm}
                    events={events}
                    ref={schRef}
                    fields={[
                      {
                        name: "Day",
                        type: "select",
                        default: "Monday",
                        options: [
                          { id: 1, text: "Monday", value: "Monday" },
                          { id: 2, text: "Tuesday", value: "Tuesday" },
                          { id: 3, text: "Wednesday", value: "Wednesday" },
                          { id: 4, text: "Thursday", value: "Thursday" },
                          { id: 5, text: "Friday", value: "Friday" },
                          { id: 6, text: "Saturday", value: "Saturday" },
                          { id: 6, text: "Sunday", value: "Sunday" },
                        ],
                        config: { label: "Day", required: true, errMsg: "Plz Select Status" }
                      },
                    ]}
                    
                    week={{
                      weekDays: [0, 1, 2, 3, 4, 5, 6],
                      weekStartOn: 6,
                      startHour: 0,
                      endHour: 24,
                    }}
                  />
                </div>
                :
                <div style={{ height: "345rem", overflowY: "auto", borderRadius: "5px" }}>
                  admin
                  <Scheduler
                    view='week'
                    onSelectedDateChange={false}
                    onConfirm={handleConfirm}
                    events={events}
                    ref={schRef}
                    fields={[
                      {
                        name: "Day",
                        type: "select",
                        default: "Monday",
                        options: [
                          { id: 1, text: "Monday", value: "Monday" },
                          { id: 2, text: "Tuesday", value: "Tuesday" },
                          { id: 3, text: "Wednesday", value: "Wednesday" },
                          { id: 4, text: "Thursday", value: "Thursday" },
                          { id: 5, text: "Friday", value: "Friday" },
                          { id: 6, text: "Saturday", value: "Saturday" },
                          { id: 6, text: "Sunday", value: "Sunday" },



                        ],
                        config: { label: "Day", required: true, errMsg: "Plz Select Status" }
                      },
                    ]}
                    week={{
                      weekDays: [0, 1, 2, 3, 4, 5, 6],
                      weekStartOn: 6,
                      startHour: 0,
                      endHour: 24,
                    }}
                  />
                </div>}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: "90%", height: "50%", marginTop: "2%" }}>

              {events.length > 0 ?
                <div style={{ height: "45rem", overflowY: "auto", borderRadius: "5px" }}>
                  <Scheduler
                    view='week'
                    ref={schRef}
                    onSelectedDateChange={false}
                    onConfirm={handleConfirm}
                      events={events}
                      fields={[
                        {
                          name: "Day",
                          type: "select",
                          default: "Monday",
                          options: [
                            { id: 1, text: "Monday", value: "Monday" },
                            { id: 2, text: "Tuesday", value: "Tuesday" },
                            { id: 3, text: "Wednesday", value: "Wednesday" },
                            { id: 4, text: "Thursday", value: "Thursday" },
                            { id: 5, text: "Friday", value: "Friday" },
                            { id: 6, text: "Saturday", value: "Saturday" },
                            { id: 6, text: "Sunday", value: "Sunday" },
                          ],
                          config: { label: "Day", required: true, errMsg: "Plz Select Status" }
                        },
                      ]}
                    week={{
                      weekDays: [0, 1, 2, 3, 4, 5, 6],
                      weekStartOn: 6,
                      startHour: 0,
                      endHour: 24,
                    }}
                  />
                </div>
                :
                <div style={{ height: "45rem", overflowY: "auto", borderRadius: "5px" }}>
                  <Scheduler
                    view='week'
                    ref={schRef}
                    onSelectedDateChange={false}
                    onConfirm={handleConfirm}
                      events={events}
                      fields={[
                        {
                          name: "Day",
                          type: "select",
                          default: "Monday",
                          options: [
                            { id: 1, text: "Monday", value: "Monday" },
                            { id: 2, text: "Tuesday", value: "Tuesday" },
                            { id: 3, text: "Wednesday", value: "Wednesday" },
                            { id: 4, text: "Thursday", value: "Thursday" },
                            { id: 5, text: "Friday", value: "Friday" },
                            { id: 6, text: "Saturday", value: "Saturday" },
                            { id: 6, text: "Sunday", value: "Sunday" },
                          ],
                          config: { label: "Day", required: true, errMsg: "Plz Select Status" }
                        },
                      ]}
                    week={{
                      weekDays: [0, 1, 2, 3, 4, 5, 6],
                      weekStartOn: 6,
                      startHour: 0,
                      endHour: 24,
                    }}
                  />
                </div>}
            </div>
          </div>
        )}
        <Loader isLoading={loading}></Loader>
      </div>
    </>
  );
};

export default ViewId;