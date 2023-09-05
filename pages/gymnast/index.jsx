import React, { useState, useEffect } from 'react'
import { Button, ViewButton } from '../../components/styledComponents/button/Button';
import * as Style from '../../components/styledComponents/gymnast/Gymnast';
import { useRouter } from 'next/navigation';
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import Loader from '../../components/styledComponents/loader/loader';
import swal from "sweetalert";
import AddChildForm from '../../components/styledComponents/modal/Booking';
import { setGymnastName, setCoachId } from '../../store/slices/user/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { Scheduler } from "@aldabil/react-scheduler";
import moment from "moment";
import Select from 'react-select';


const index = () => {
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const [bookingDate, setBookingDate] = useState();
  const [bookingCoach, setBookingCoach] = useState();
  const [childData, setChildData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [allGymnast, setAllGymnast] = useState([]);
  const [gymnastBookingList, setGymnastBookingList] = useState([]);
  const coachId = useSelector((state) => state.user.coachId);


  // for schedular functionality
  const [events, setEvents] = useState([]);
  const schRef = React.createRef()
  const [selectedOptionValue, setSelectedOptionValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionCoach, setSelectedOptionCoach] = useState('');
  const [selectedOptionCoaches, setSelectedOptionCoaches] = useState('');
  const [coaches, setCoaches] = useState([]);
  const [formData, setFormData] = useState({});
  const [newCoachId, setNewCoachId] = useState(null);
  // const [bookingCoach, setBookingCoach] = useState();
  const [fetchedHours, setFetchedHours] = useState([]);
  const [adminchildrens, setAdminChildrens] = useState([]);
  const [childrens, setChildrens] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSelectChangeCoach = (event) => {
    console.log("handle chnage coach", event.value)
    setSelectedOptionCoach(event.value);
    let val = event.value;
    setNewCoachId(val);
    console.log("coachId", newCoachId)
    setSelectedOptionCoaches(event.name)
    setBookingCoach(event.value);
    dispatch(setCoachId(event.value))
    setFormData((prevFormData) => ({
      ...prevFormData,
      coachId: event.value,
    }));
  };


  async function handleConfirm(event, action) {
    console.log("handleConfirm =", action, event.title);
    console.log("evnets in handleconfirm", event)
    const childId = childrens.filter(item => item.name === event["Select Child"]);
    // const coachesId=
    console.log("newCoachId", newCoachId)


    console.log("childId", childId[0].id)
    if (action === "edit") {

      let Payload = {
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
    console.log("fetchedSlots in hour", fetchedSlots)
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
        `/api/gym/schedule`,
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
  useEffect(() => {
    schRef.current?.scheduler.handleState(events, "events")
    console.log("events in useeffect", events)
  }, [events])
  //end of schedular functionality

  const formatTimeTo12Hour = date => {
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };
  const getGymnastBookingList = async (id) => {
    try {
      setLoading(true)
      console.log("api calling for booking list")
      const res = await axiosInterceptor().get(
        `api/bookings`,
      );
      setGymnastBookingList(res.data.data)

      console.log("responsse of Booking list", res.data.data);
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
  useEffect(() => {
    // Perform localStorage action
    const userRole = JSON.parse(localStorage.getItem("Userrole"))
    setRole(userRole);
  }, [])
  const getAllGymnast = async () => {
    try {
      setLoading(true)
      console.log("api calling for all Gymnast")
      const res = await axiosInterceptor().get(
        `/api/gymnast/`,
      );
      console.log("responsse of all Gymnast", res)
      setAllGymnast(res?.data?.rows)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  useEffect(() => {
    if (role == "gymnast") {
      getGymScedule();
      getChildren();
      getCoach();
      getGymnastBookingList();
    }
    if (role == "admin") {
      console.log("admin side")
      getAllGymnast();
    }
  }, [role])
  useEffect(() => {
    if (bookingCoach) {
      getAvailableTimeSlots();
      console.log("gymnastBookingList", gymnastBookingList)
    }
  }, [bookingCoach])
  const [showModal4, setShowModal4] = useState(false);
  const getChildren = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().get(
        `/api/gymnast/children`,
      );
      console.log("children data", res)
      res.data.result.map((item, index) => (
        item['value'] = item.name,
        item['text'] = item.name
      ))
      setChildrens(res.data.result)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const getCoach = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().get(
        `/api/coach/private`,
      );
      console.log("children data", res)
      setCoaches(res.data.coaches)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  };
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
      if (bookingCoach) {
        setLoading(true)

        const res = await axiosInterceptor().get(
          `api/gymnast/coach/info?coachId=${id}&from=${firstDay.toISOString().slice(0, 10)}&to=${lastDay.toISOString().slice(0, 10)}`,
        );
        console.log("responsse of timeslots", res)
        if (res.status === 200) {
          const coachAvailability = res.data.privateAllowedSlots[0];
          const startTime = new Date(coachAvailability.from);
          const endTime = new Date(coachAvailability.to);
          const bookingSlots = res.data.bookings;
          console.log("bookingSlots", bookingSlots)
          const localBookingSlots = bookingSlots.map(booking => {
            const bookingStart = new Date(booking.currentFrom);
            const bookingEnd = new Date(booking.currentTo);
            const bookingDay = booking.day;
            return {
              currentFrom: bookingStart,
              currentTo: bookingEnd,
            };
          });
          console.log("localBookingSlots", localBookingSlots)
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
          setFetchedHours(fetchedSlots);
          console.log('ALert', fetchedSlots)
          getGymnastScehdule(fetchedSlots);
          setLoading(false);

        }

      }
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }

  }
  const updateButtonState = (emailValue) => {
    setIsButtonDisabled(emailValue === '');
  };
  const handleAddChildClick = () => {
    setShowModal4(true);
    console.log("modal click")
  };
  const closeModal4 = () => {
    setShowModal4(false);
  };
  const handleCloseModal4 = () => {
    setShowModal4(false);
  };
  return (
    <div closeModal={closeModal4} style={{marginTop: "10%" }}>
      {role!=="admin" &&
      <div style={{marginLeft: "1%" }}>
<Button  style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} >Add Bookings</Button>
   <Button  style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} onClick={handleAddChildClick}>+</Button>
      </div>
     }   
     {showModal4 &&   <AddChildForm  Closed={handleCloseModal4} onSubmit={handleSubmitChild} />}
     {role && role === "admin" &&
<div style={{display:"flex", justifyContent:"space-between" }}> 
<h2  style={{ color:"white",marginLeft:"30px"}}>Gymnast Listing</h2> 
</div>
}
{role && role === "admin"
        ?
        <Style.TableContainer style={{ filter: showModal4 ? 'blur(5px)' : 'none', marginTop: "5%" }} >
          <Style.TableWrapper>
            <thead>
              <Style.TableRow>
                {/* <Style.TableHead>ID</Style.TableHead> */}
                <Style.TableHead>GYMNAST</Style.TableHead>
                <Style.TableHead>ACTIONS</Style.TableHead>
              </Style.TableRow>
            </thead>
            <tbody>
              {allGymnast && allGymnast.map((data, index) => (
                <Style.TableRow key={index}>
                  {/* <Style.TableCell>{data?.id}</Style.TableCell> */}
                  <Style.TableCell>{data?.firstName}{" "}{data?.lastName}</Style.TableCell>
                  <Style.TableCell>
                    <ViewButton onClick={() => {
                      dispatch(setGymnastName(data.firstName));
                      { router.push(`/gymnast/view/${data.id}`) }
                    }}>View</ViewButton>
                  </Style.TableCell>
                </Style.TableRow>
              ))}
            </tbody>
          </Style.TableWrapper>
        </Style.TableContainer>
        :
        <Style.TableContainer style={{ filter: showModal4 ? 'blur(5px)' : 'none' }} >
          <Style.TableWrapper>
            <thead>
              <Style.TableRow>
                <Style.TableHead>CHILD</Style.TableHead>
                <Style.TableHead>COACH</Style.TableHead>
                <Style.TableHead>TIME SLOT</Style.TableHead>
                <Style.TableHead>STATUS</Style.TableHead>
              </Style.TableRow>
            </thead>
            <tbody>
              {gymnastBookingList && gymnastBookingList.map((data, index) => (
                <Style.TableRow key={index}>
                  <Style.TableCell>{data?.children.name}</Style.TableCell>
                  <Style.TableCell>{data?.coach.firstName + " " + data?.coach.lastName}</Style.TableCell>
                  <Style.TableCell>{new Date(data?.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} {"-"} {new Date(data?.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}</Style.TableCell>
                  <Style.TableCell>{data.status}</Style.TableCell>
                </Style.TableRow>
              ))}
            </tbody>
          </Style.TableWrapper>
        </Style.TableContainer>
      }
      <Loader isLoading={loading}></Loader>
    </div>
  )
}

export default index

