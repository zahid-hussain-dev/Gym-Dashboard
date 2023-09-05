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
  // const getGymScedule = async (id) => {
  //   try {
  //     setLoading(true)
  //     console.log("api calling for schedule")
  //     const res = await axiosInterceptor().get(
  //       `/api/gym/schedule?gym=${router.query.ViewId}`,
  //     );
  //     console.log("responsse of schedule ID", res)
  //     res.data.map((item, index) => (
  //       item['event_id'] = item.id,
  //       item['title'] = "Open Hours",
  //       item['start'] = new time(item.from),
  //       item['end'] = new time(item.to),
  //       item['day'] = new day(days),
  //       item['editable'] = true,
  //       item['deletable'] = false,
  //       item['color'] = "#50b500"
  //     ))
  //     setEvents(res.data);
  //     setLoading(false)
  //   } catch (error) {
  //     setLoading(false)
  //     console.log(error)
  //   }
  // }
  const closeModal = () => {
    setShowModal(false);
    console.log("get gym schedule on close")
    getGymScedule();
  };


  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  function formatDate(date) {
    console.log("timestampdate",date)
    let localtime= date.getTime();
    console.log(localtime)
    let localOffset=date.getTimezoneOffset()*60000;
    console.log(localOffset)
    let timezoneOffset=date.getTimezoneOffset()
    console.log("loaclOffset",timezoneOffset)
    let utc = localtime+ localOffset
    const timestampInUTC = moment.tz(date, Intl.DateTimeFormat().resolvedOptions().timeZone).utc().toString()
    console.log("timestampInUTC",timestampInUTC,utc)
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getUTCMonth() + 1),
        padTo2Digits(date.getUTCDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getUTCHours()),
        padTo2Digits(date.getUTCMinutes()),
        padTo2Digits(date.getUTCSeconds()),
      ].join(':')
    );
  }
  // :point_down:️ "2022-12-17 14:57:28"
  // console.log(formatDate(new Date()));


  function formatTimestamp(timestamp) {
    console.log("timestamp", timestamp)
    // new Date(new Date(timestamp).getTime() + 18000000) = hours added
    let local=moment.utc(timestamp).toDate();
    console.log("local",local)
    let date = new Date(timestamp).getHours();
    console.log("date",date)
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


  // function getAllDaysOfWeek(d, endDate) {
  //   d = d ? new Date(+d) : new Date();
  //   d.setHours(0, 0, 0, 0);

  //   var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  //   var dates = [];
  //   while (d <= endDate) {
  //     dates.push(new Date(d));
  //     d.setDate(d.getDate() + 1);
  //   }

  //   var daysWithNames = dates.map(function(date) {
  //     return {
  //       date: date,
  //       dayOfWeek: daysOfWeek[date.getDay()]
  //     };
  //   });

  //   return daysWithNames;
  // }

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
        }));
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
                  start: moment.utc(`${formattedDate} ${event.start}`).toDate(),  // new Date(formatTimestamp(`${formattedDate} ${event.start}`)),
                  end:  moment.utc(`${formattedDate} ${event.end}`).toDate(),    // new Date(formatTimestamp(`${formattedDate} ${event.end}`)),
                  color: "#50b500",
                  editable: true,
                  deletable: false,
                  title: "Open Hours",
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


  // var startDate = new Date(); // Current date
  // startDate.setFullYear(startDate.getFullYear() - 1); // One year ago
  // var endDate = new Date(); // Current date

  // var daysList = getAllDaysOfWeek(startDate, endDate);

  // daysList.forEach(function(day) {
  //   console.log(day.date.toLocaleString('en-US', {
  //     weekday: 'short',
  //     day: 'numeric',
  //     month: 'short',
  //     year: 'numeric'
  //   }) + ' - ' + day.dayOfWeek);
  // });

  // console.log('There are ' + daysList.length + ' days in the range');

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
                <div style={{ height: "30rem", overflowY: "auto", borderRadius: "5px" }}>
                  <Scheduler
                    view='week'
                    onSelectedDateChange={false}
                    onConfirm={handleConfirm}
                    events={events}
                    ref={schRef}
                    week={{
                      weekDays: [0, 1, 2, 3, 4, 5, 6],
                      weekStartOn: 6,
                      startHour: 0,
                      endHour: 24,
                    }}
                  />
                </div>
                :
                <div style={{ height: "30rem", overflowY: "auto", borderRadius: "5px" }}>
                  <Scheduler
                    view='week'
                    onSelectedDateChange={false}
                    onConfirm={handleConfirm}
                    events={events}
                    ref={schRef}
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
              <div
                style={{
                  fontSize: "24px",
                  color: "white",
                  marginBottom: "1rem",
                  width: "100%",
                  textAlign: "center",
                  filter: showModal ? 'blur(5px)' : 'none',
                  pointerEvents: showModal ? 'none' : 'auto'
                }}
              >
                Gym Schedule{" "}
              </div>
              {events.length > 0 ?
                <div style={{ height: "30rem", overflowY: "auto", borderRadius: "5px" }}>
                  <Scheduler
                    view='week'
                    ref={schRef}
                    onSelectedDateChange={false}
                    onConfirm={handleConfirm}
                    events={events}
                    week={{
                      weekDays: [0, 1, 2, 3, 4, 5, 6],
                      weekStartOn: 6,
                      startHour: 0,
                      endHour: 24,
                    }}
                  />
                </div>
                :
                <div style={{ height: "30rem", overflowY: "auto", borderRadius: "5px" }}>
                  <Scheduler
                    view='week'
                    ref={schRef}
                    onSelectedDateChange={false}
                    onConfirm={handleConfirm}
                    events={events}
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
