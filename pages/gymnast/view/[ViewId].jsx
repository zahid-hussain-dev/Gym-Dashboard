import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Scheduler } from "@aldabil/react-scheduler";
import Select from 'react-select';
import { Button, RejectButton, AcceptButton } from '../../../components/styledComponents/button/Button';
import * as Style from '../../../components/styledComponents/gymnast/Gymnast';
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import Loader from '../../../components/styledComponents/loader/loader';
import { useSelector } from "react-redux";
import AddChildForm from '../../../components/styledComponents/modal/Booking';
import moment from "moment";

const ViewId = () => {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [showModal4, setShowModal4] = useState(false);
  const [events, setEvents] = useState([]);
  const schRef = React.createRef()
  const [selectedOptionValue, setSelectedOptionValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionCoach, setSelectedOptionCoach] = useState(null);
  const [selectedOptionCoaches, setSelectedOptionCoaches] = useState('');
  const [coaches, setCoaches] = useState([]);
  const [formData, setFormData] = useState({});
  const [bookingDate, setBookingDate] = useState();
  const [bookingCoach, setBookingCoach] = useState();
  const [fetchedHours, setFetchedHours] = useState([]);
  const [adminchildrens, setAdminChildrens] = useState([]);


  const formatTimeTo12Hour = date => {
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSelectChangeCoach = (event) => {
    setSelectedOptionCoach(event.value);
    setSelectedOptionCoaches(event.name)
    setBookingCoach(event.value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      coachId: event.value,
    }));
  };
  const handleSelectChange = (event) => {
    console.log(event)
    setSelectedOption(event.value);
    setSelectedOptionValue(event.name)

    // const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      childrenId: event.value,
    }));
  };

  const getAdminCoach = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().get(
        `/api/coach/private?gymnastId=${router.query.ViewId}`,
      );
      console.log("children data===========", res)
      setCoaches(res.data.coaches)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }

  const getAvailableTimeSlots = async () => {
    const id = bookingCoach;
    const date = bookingDate;
    const today = new Date();
    const firstDay = new Date(
      today.setDate(today.getDate() - today.getDay()),
    );

    // ✅ Get the last day of the current week (Saturday)
    const lastDay = new Date(
      today.setDate(today.getDate() - today.getDay() + 6),
    );
    try {
      // setLoading(true)
      if (bookingCoach) {
        setLoading(true)

        const res = await axiosInterceptor().get(
          `api/gymnast/coach/info?coachId=${id}&from=${firstDay.toISOString().slice(0, 10)}&to=${lastDay.toISOString().slice(0, 10)}`,
        );
        console.log("responsse of timeslots", res)
        console.log("here in booking")

        if (res.status === 200) {
          const coachAvailability = res.data.privateAllowedSlots[0];
          const startTime = new Date(coachAvailability.from);
          const endTime = new Date(coachAvailability.to);
          const bookingSlots = res.data.bookings;
          const localBookingSlots = bookingSlots.map(booking => {
            const bookingStart = new Date(booking.currentFrom);
            const bookingEnd = new Date(booking.currentTo);
            return {
              currentFrom: bookingStart,
              currentTo: bookingEnd,
            };
          });
          const fetchedSlots = [];
          const halfHour = 30 * 60 * 1000;
          let currentSlot = new Date(startTime);
          while (currentSlot.getTime() + halfHour <= endTime.getTime()) {
            const fromTime = new Date(currentSlot);
            const toTime = new Date(currentSlot.getTime() + halfHour);
            const isSlotAvailable = !localBookingSlots.some(
              booking =>
                currentSlot >= booking.currentFrom &&
                currentSlot < booking.currentTo,
            );
            if (isSlotAvailable) {
              fetchedSlots.push({
                from: fromTime,
                to: toTime,
              });
            }
            currentSlot = new Date(currentSlot.getTime() + halfHour);
          }
          console.log("fetchedSlots", fetchedSlots)
          setFetchedHours(fetchedSlots);
          getGymnastScehdule(fetchedSlots);

          console.log('ALert', fetchedSlots)
        }

        setLoading(false)

      }
      // setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }

  }
  useEffect(() => {
    if (bookingCoach) {
      getAvailableTimeSlots();
      console.log("here in time slots")
    }
  }, [bookingCoach])

  console.log("fetchedHours", fetchedHours)
  const [childData, setChildData] = useState({});
  const [childrens, setChildrens] = useState([]);
  const Id = router.query.ViewId;
  const [loading, setLoading] = useState(false);
  const [childList, setChildList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [gymnastchildList, setGymnastChildList] = useState([]);
  const [gymnastbookingList, setGymnastBookingList] = useState([]);
  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem("Userrole"))
    setRole(userRole);
  }, [])
  const handleSelectChild = (event) => {
    setSelectedOption(event.target.value);
    const { name, value } = event.target;
    updateButtonState(event.target.value);
    setChildData((prevChildData) => ({
      ...prevChildData,
      [name]: value,
    }));
  };

  function formatTimestamp(timestamp) {
    const [datePart, timePart] = timestamp.split("T");
    const [year, month, day] = datePart.split("-");
    const [hours, minutes] = timePart.slice(0, -1).split(":");
    const adjustedHours = String(Number(hours)).padStart(2, "0");
    return `${year} ${Number(month)} ${Number(day)} ${adjustedHours}:${minutes}`;
  }
  const getAdminChildren = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().get(
        `/api/gymnast/children?gymnast=${id}`,
      );
      console.log("children admin data", res.data.result)
      setAdminChildrens(res.data.result)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const handleConfirm = async (event, action) => {
    console.log("handleConfirm =", action, event.title);
    console.log("evnets in handleconfirm", event)
    const childId = childList.filter(item => item.name === event["Select Child"]);
    console.log("childId", childId[0].id)
    if (action === "edit") {

      let Payload = {
        gymnastId: router.query.ViewId,
        childrenId: childId[0].id,
        coachId: +event.CoachId,
        from: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
        to: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
      }
      try {
        setLoading(true)
        const res = await axiosInterceptor().post(
          `/api/bookings`,
          Payload,
        );
        console.log("responsse of post booking", res)
        if (res.status == 201) {
          if (res.data.status === "PENDING") {
            swal('Success!', "Your Slot has beed booked wait for confirmation ", 'success')
          }
        }

        setLoading(false)
        return { ...event, event_id: event.event_id || Math.random() }
      } catch (error) {
        setLoading(false)
        swal('Oops!', error.data.message, 'error')
        console.log(error)
      }



    } else if (action === "create") {
      return { ...event, event_id: event.event_id || Math.random() }

    }
  };
  const getGymnastScehdule = async (fetchedSlots) => {
    // console.log("booking Date", );
    console.log("fetchedHours in gymnast schedule", fetchedHours)
    let desArr = '';
    if (fetchedSlots) {
      // desArr = bookingDate.split("-")

      fetchedSlots && fetchedSlots.map((item, index) => (
        item['event_id'] = Math.random(),
        item['title'] = "Available Slots",
        // item['start'] = new Date(`${desArr[0]} ${desArr[1]} ${desArr[2]} ${item.from}`),
        // item['end'] = new Date(`${desArr[0]} ${desArr[1]} ${desArr[2]} ${item.to}`),
        item['start'] = item.from,
        item['end'] = item.to,
        item['editable'] = true,
        item['deletable'] = false,
        item['color'] = "#50b500"
      ))
      console.log("fetchedHours event", fetchedSlots)
      setEvents(prevState => [...prevState, ...fetchedSlots])
    }
  }

  const getGymScedule = async (id) => {
    try {
      setLoading(true)
      console.log("api calling for schedule")
      const res = await axiosInterceptor().get(
        // `/api/gym/schedule?gym=${gymId}`,
        `/api/gym/schedule?gymnastId=${router.query.ViewId}`,
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
              // console.log("formattedDate", formattedDate)
              filteredEvents.push(
                ...eventsForDay.map(event => ({
                  ...event,
                  start: new Date(`${formattedDate} ${event.start}`),
                  end: new Date(`${formattedDate} ${event.end}`),
                  // color: "#50b500",
                  editable: false,
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
      //   setEvents(res.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const GymnastName = useSelector((state) => state.user.gymnastName);
  console.log("GymnastName", GymnastName)
  const getChildList = async (id) => {
    try {
      setLoading(true)
      console.log("api calling for child list")
      const res = await axiosInterceptor().get(
        `/api/gymnast/children?gymnast=${router.query.ViewId}`,
      );

      setLoading(false)
      res.data.result.map((item, index) => (
        item['value'] = item.name,
        item['text'] = item.name
      ))
      console.log("responsse of children ID", res.data.result)
      setChildList(res.data.result)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const handleAddChildClick = () => {
    setShowModal4(true);
    console.log("modal click")
  };
  const getBookingList = async (id) => {
    try {
      setLoading(true)
      console.log("api calling for booking list")
      const res = await axiosInterceptor().get(
        `api/bookings/all?gymnast=${router.query.ViewId}`,
      );
      console.log("responsse of Booking list", res)
      setBookingList(res?.data?.data)

      res.data.data.map((item, index) => {
        return item.status === "PENDING" ? (
          item['event_id'] = item.id,
          item['title'] = item.status,
          item['start'] = new Date(formatTimestamp(new Date(item.from).toISOString())),
          item['end'] = new Date(formatTimestamp(new Date(item.to).toISOString())),
          item['editable'] = false,
          item['deletable'] = false,
          item['color'] = "red"
        ) : (
          item['event_id'] = item.id,
          item['title'] = item.status,
          item['start'] = new Date(formatTimestamp(new Date(item.from).toISOString())),
          item['end'] = new Date(formatTimestamp(new Date(item.to).toISOString())),
          item['editable'] = false,
          item['deletable'] = false,
          item['color'] = "#50b500"
        );
      })
      setEvents(prevState => [...prevState, ...res.data.data])

      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const getGymnastChildList = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().get(
        `/api/gymnast/children`,
      );
      console.log("children data", res)
      setGymnastChildList(res.data.result)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const getGymnastBookingList = async (id) => {
    try {
      setLoading(true)
      console.log("api calling for booking list")
      const res = await axiosInterceptor().get(
        `api/bookings`,
      );
      console.log("responsse of Booking list", res)
      setGymnastBookingList(res?.data?.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const getChildren = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().get(
        `/api/gymnast/children`,
      );
      console.log("children data", res)
      setChildrens(res.data.result)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const handleSubmitChild = async (event) => {
    event.preventDefault();
    console.log("ChildData", childData)
    try {
      setLoading(true)
      const res = await axiosInterceptor().post(
        `/api/gymnast/children`,
        childData,
      );
      console.log("responsse of login", res)
      swal('Success!', res.data.message, 'success')
      getChildren();
      setLoading(false)
    } catch (error) {
      setLoading(false)
      swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  };
  const handleCloseModal4 = () => {
    setShowModal4(false);
  };
  useEffect(() => {
    if (Id && role == "admin") {
      console.log("here in admin site")
      getAdminCoach();
      getAdminChildren();
      getGymScedule();
      getChildList();
      getBookingList();
    }
    if (Id && role == "gymnast") {
      getGymnastChildList();
      getGymnastBookingList();
    }
  }, [Id, role])
  useEffect(() => {
    schRef.current?.scheduler.handleState(events, "events")
    console.log("events in useeffect", events)
  }, [events])
  return (
    <div style={{ marginTop: "10%" }}>
      <Style.FirstMain>
        <Style.SecondMain style={{ flexDirection: "row" }}>
          <Style.SecondInput style={{ width: "10rem" }}>
            <Style.Labeled className="label" >Select Coach:</Style.Labeled>
            <Select
              style={{ marginTop: "4px" }}
              name='coachId'
              value={selectedOptionCoaches}
              onChange={handleSelectChangeCoach}
              options={coaches.map(option => ({ value: option.id, label: option.userName }))}
              placeholder="Select Coach"
              isSearchable
            />
          </Style.SecondInput>
        </Style.SecondMain>

      </Style.FirstMain>



      <Style.MainDiv >

        <div style={{ fontSize: "24px", color: "white", marginBottum: "20%", padding: "1%" }}>Schedule</div>
        <Style.Schedular>
          {/* <div style={{ fontSize: "24px", color: "white",marginBottum:"20%",padding:"1%" }}>Schedule</div> */}
          {events.length > 0 && childList.length > 0 && selectedOptionCoach ?
            <Scheduler
              view='week'
              ref={schRef}
              onSelectedDateChange={false}
              events={events}
              onConfirm={handleConfirm}
              fields={[
                {
                  name: "Select Child",
                  type: "select",
                  // default: "PUBLIC",
                  options: childList && childList,
                  // options: [
                  //   { id: 1, text: "Public", value: "PUBLIC" },
                  //   { id: 2, text: "Private", value: "PRIVATE" }
                  // ],
                  config: { label: "Children", required: true, errMsg: "Plz Select child" }
                },
                {
                  name: "CoachId",
                  type: "input",
                  default: `${selectedOptionCoach && selectedOptionCoach}`,
                  config: { label: "CoachId", disabled: true }
                },
              ]}
              week={{
                weekDays: [0, 1, 2, 3, 4, 5, 6],
                weekStartOn: 0,
                startHour: 0,
                endHour: 24,
                step: 30,
              }} />
            :
            childList.length > 0 && selectedOptionCoach &&
            <Scheduler
              view='week'
              ref={schRef}
              onSelectedDateChange={false}
              events={events}
              onConfirm={handleConfirm}
              fields={[
                {
                  name: "Select Child",
                  type: "select",
                  // default: "PUBLIC",
                  options: childList && childList,
                  // options: [
                  //   { id: 1, text: "Public", value: "PUBLIC" },
                  //   { id: 2, text: "Private", value: "PRIVATE" }
                  // ],
                  config: { label: "Children", required: true, errMsg: "Plz Select child" }
                },
                {
                  name: "CoachId",
                  type: "input",
                  default: `${selectedOptionCoach && selectedOptionCoach}`,
                  config: { label: "CoachId", disabled: true }
                },
              ]}
              week={{
                weekDays: [0, 1, 2, 3, 4, 5, 6],
                weekStartOn: 0,
                startHour: 0,
                endHour: 24,
                step: 30
              }}
            />}
          {selectedOptionCoach === null &&
            <>
              nullcoach schedule
              <Scheduler
                view='week'
                ref={schRef}
                onSelectedDateChange={false}
                events={events}
                onConfirm={handleConfirm}
                fields={[
                  {
                    name: "Select Child",
                    type: "select",
                    // default: "PUBLIC",
                    options: childrens && childrens,
                    // options: [
                    //   { id: 1, text: "Public", value: "PUBLIC" },
                    //   { id: 2, text: "Private", value: "PRIVATE" }
                    // ],
                    config: { label: "Children", required: true, errMsg: "Plz Select child" }
                  },
                  {
                    name: "CoachId",
                    type: "input",
                    default: `${selectedOptionCoach && selectedOptionCoach}`,
                    config: { label: "CoachId", disabled: true }
                  },
                ]}
                week={{
                  weekDays: [0, 1, 2, 3, 4, 5, 6],
                  weekStartOn: 0,
                  startHour: 0,
                  endHour: 24,
                  step: 30
                }}
              /></>}
        </Style.Schedular>
      </Style.MainDiv>
      <span style={{ display: "flex", alignItems: "center", marginTop: "5%" }} >
      <Style.SubTitle style={{ marginTop: "1rem" }}>Booking Listing</Style.SubTitle>
 {/*     <Button style={{ width: "auto", marginTop: "1rem", marginLeft: "1rem" }} onClick={handleAddChildClick}>+</Button>*/}
    </span>
    <Style.TableContainer style={{ marginTop: "5%", filter: showModal4 ? 'blur(5px)' : 'none', pointerEvents: showModal4 ? 'none' : 'auto' }} >
      <Style.TableWrapper>
        <thead>
          <Style.TableRow>
            {/* <Style.TableHead>ID</Style.TableHead> */}
            <Style.TableHead>CHILD</Style.TableHead>
            <Style.TableHead>COACH</Style.TableHead>
            <Style.TableHead>TIME SLOT</Style.TableHead>
            <Style.TableHead>ACTIONS</Style.TableHead>
          </Style.TableRow>
        </thead>
        <tbody>
          {role && role === "admin" &&
            bookingList && bookingList.map((data, index) => (
              <Style.TableRow key={index}>
                {/* <Style.TableCell>{data?.coach.firstName}</Style.TableCell> */}
                <Style.TableCell>{data?.children.name}</Style.TableCell>
                <Style.TableCell>{data?.coach.firstName}</Style.TableCell>
                <Style.TableCell>{new Date(data?.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} {"-"} {new Date(data?.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}</Style.TableCell>
                <Style.TableCell>
                  <AcceptButton onClick={() => { console.log(data.id) }}>Cancel</AcceptButton>
                </Style.TableCell>
              </Style.TableRow>
            ))}
          {role && role === "gymnast" &&
            gymnastbookingList && gymnastbookingList.map((data, index) => (
              <Style.TableRow key={index}>
                <Style.TableCell>{data?.id}</Style.TableCell>
                <Style.TableCell>{data?.childrenId}</Style.TableCell>
                <Style.TableCell>{data?.coachId}</Style.TableCell>
                <Style.TableCell>{new Date(data?.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} {"-"} {new Date(data?.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}</Style.TableCell>
                <Style.TableCell>
                  <AcceptButton onClick={() => { console.log(data.id) }}>Cancel</AcceptButton>
                </Style.TableCell>
              </Style.TableRow>
            ))}
        </tbody>
      </Style.TableWrapper>
    </Style.TableContainer>
      <Style.SubTitle>Child Listing</Style.SubTitle>
      {showModal4 && <AddChildForm Closed={handleCloseModal4} onSubmit={handleSubmitChild} id={Id} />}
      <Style.TableContainer style={{ marginTop: "3%", filter: showModal4 ? 'blur(5px)' : 'none', pointerEvents: showModal4 ? 'none' : 'auto' }} >
        <Style.TableWrapper>
          <thead>
            <Style.TableRow>
              {/* <Style.TableHead>ID</Style.TableHead> */}
              <Style.TableHead>CHILD</Style.TableHead>
              <Style.TableHead>ACTIONS</Style.TableHead>
            </Style.TableRow>
          </thead>
          <tbody>
            {role && role === "admin" &&
              childList && childList.map((data, index) => (
                <Style.TableRow key={index}>
                  {/* <Style.TableCell>{data?.id}</Style.TableCell> */}
                  <Style.TableCell>{data?.name}</Style.TableCell>
                  <Style.TableCell>
                    <RejectButton onClick={() => { console.log(data.id) }}>Delete</RejectButton>
                  </Style.TableCell>
                </Style.TableRow>
              ))}
            {childList.length <= 0 &&
              (<Style.TableRow style={{ fontSize: "18px", textAlign: "center" }}>
                <p style={{ fontSize: "18px", color: "#E3DC22", marginTop: "35%", marginLeft: "38%", textAlign: "center", filter: showModal4 ? 'blur(5px)' : 'none', pointerEvents: showModal4 ? 'none' : 'auto' }}>No Listing Exist for this Coach {GymnastName} </p>
              </Style.TableRow>)
            }
            {role && role === "gymnast" &&
              gymnastchildList && gymnastchildList.map((data, index) => (
                <Style.TableRow key={index}>
                  {/* <Style.TableCell>{data?.id}</Style.TableCell> */}
                  <Style.TableCell>{data?.name}</Style.TableCell>
                  <Style.TableCell>
                    <RejectButton onClick={() => { console.log(data.id) }}>Delete</RejectButton>
                  </Style.TableCell>
                </Style.TableRow>
              ))}
          </tbody>
        </Style.TableWrapper>
      </Style.TableContainer>
      
      <Loader isLoading={loading}></Loader>
    </div>
  )
}

export default ViewId
