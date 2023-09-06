import React, { useState, useEffect } from 'react'
import { Button ,ViewButton } from '../../components/styledComponents/button/Button';
import * as Style from '../../components/styledComponents/gymnast/Gymnast';
import { useRouter } from 'next/navigation';
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import Loader from '../../components/styledComponents/loader/loader';
import swal from "sweetalert";
import AddChildForm from '../../components/styledComponents/modal/Booking';
import { setGymnastName } from '../../store/slices/user/userSlice';
import { useDispatch } from "react-redux";
import Select from 'react-select';
import { Scheduler } from "@aldabil/react-scheduler";
const index = () => {

  
  const schRef = React.createRef()
  const [childList, setChildList] = useState([]);
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const [childrens, setChildrens] = useState([]);
  const [bookingDate, setBookingDate] = useState();
  const [bookingCoach, setBookingCoach] = useState();
  const [events, setEvents] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [selectedOptionCoaches, setSelectedOptionCoaches] = useState('');
  const [childData, setChildData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [allGymnast, setAllGymnast] = useState([]);
  const [selectedOptionCoach, setSelectedOptionCoach] = useState('');
  const [formData, setFormData] = useState({});
  const [gymnastBookingList, setGymnastBookingList] = useState([]);
  //  const Id = router.query.ViewId;
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
      console.log("responsse of Booking list", res)
      setGymnastBookingList(res?.data?.data)
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
  const handleSelectChangeCoach = (event) => {
    setSelectedOptionCoach(event.value);
    setSelectedOptionCoaches(event.name)
    setBookingCoach(event.value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      coachId: event.value,
    }));
  };
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
    if (bookingCoach && bookingDate) {
      getAvailableTimeSlots();
    }
  }, [bookingCoach, bookingDate])
  const [showModal4, setShowModal4] = useState(false);
  const getChildren = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().get(
        `/api/gymnast/children`,
      );
    
      res.data.result.map((item,index)=>{
        item['text']=item.name,
        item['value']=item.name
      }),
        console.log("children data=============", res.data.result)
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
  // const getAvailableTimeSlots = async () => {
  //   const id = bookingCoach;
  //   const date = bookingDate;
  //   try {
  //     if(bookingCoach&&bookingDate){
  //     const res = await axiosInterceptor().get(
  //       `api/gymnast/coach/info?coachId=${id}&date=${date}`,
  //     );
  //     console.log("responsse of timeslots", res)
  //     if (res.status === 200) {
  //       const coachAvailability = res.data.privateAllowedSlots[0];
  //       const startTime = new Date(coachAvailability.from);
  //       const endTime = new Date(coachAvailability.to);
  //       const bookingSlots = res.data.bookings;
  //       const localBookingSlots = bookingSlots.map(booking => {
  //         const bookingStart = new Date(booking.currentFrom);
  //         const bookingEnd = new Date(booking.currentTo);
  //         return {
  //           currentFrom: bookingStart,
  //           currentTo: bookingEnd,
  //         };
  //       });
  //       const fetchedSlots = [];
  //       const halfHour = 30 * 60 * 1000; 
  //       let currentSlot = new Date(startTime);
  //       while (currentSlot.getTime() + halfHour <= endTime.getTime()) {
  //         const fromTime = new Date(currentSlot);
  //         const toTime = new Date(currentSlot.getTime() + halfHour);
  //         const isSlotAvailable = !localBookingSlots.some(
  //           booking =>
  //             currentSlot >= booking.currentFrom &&
  //             currentSlot < booking.currentTo,
  //         );
  //         if (isSlotAvailable) {
  //           fetchedSlots.push({
  //             from: formatTimeTo12Hour(fromTime),
  //             to: formatTimeTo12Hour(toTime),
  //           });
  //         }
  //         currentSlot = new Date(currentSlot.getTime() + halfHour);
  //       }
  //       setFetchedHours(fetchedSlots);
  //       console.log('ALert',fetchedSlots)
  //     }
  //   }
  //   } catch (error) {
  //     setLoading(false)
  //     // swal('Oops!', error.data.message, 'error')
  //     console.log(error)
  //   }
  // }
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
  const handleConfirm = async (event, action) => {
    console.log("handleConfirm =", action, event.title);
    console.log("evnets", event)
    if (action === "edit") {
    } else if (action === "create") {
      const Payload = {
        from: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
        to: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
        type: event.TimeStatus,
      }
      console.log("payload", Payload)
      try {
        setLoading(true)
        const res = await axiosInterceptor().post(
          `/api/coach/open/slots`,
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
  // const getChildList = async () => {
  //   try {
  //     setLoading(true)
  //     console.log("api calling for child list")
  //     const res = await axiosInterceptor().get(
  //       `/api/gymnast/children?gymnast=${router.query.ViewId}`,
  //     );
  //     console.log("responsse of children ID", res)
  //     setLoading(false)
  //     setChildList(res?.data?.result)
  //   } catch (error) {
  //     setLoading(false)
  //     swal('Oops!', error.data.message, 'error')
  //     console.log(error)
  //   }
  // }
  const getGymnastScehdule = async () => {
    // console.log("booking Date", );
    console.log("fetchedHours in gymnast schedule", fetchedHours)
    getChildList();
    let desArr = '';
    if (fetchedHours) {
      desArr = bookingDate.split("-")

      fetchedHours && fetchedHours.map((item, index) => (
        item['event_id'] = Math.random(),
        item['title'] = "Available Slots",
        item['start'] = new Date(`${desArr[0]} ${desArr[1]} ${desArr[2]} ${item.from}`),
        item['end'] = new Date(`${desArr[0]} ${desArr[1]} ${desArr[2]} ${item.to}`),
        item['editable'] = true,
        item['deletable'] = false,
        item['color'] = "#50b500"
      ))
      console.log("fetchedHours event", fetchedHours)
      setEvents(prevState => [...prevState, ...fetchedHours])
    }
  }
  const getGymScedule = async (id) => {
    try {
      setLoading(true)
      getChildList();
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
              console.log("formattedDate", formattedDate)
              filteredEvents.push(
                ...eventsForDay.map(event => ({
                  ...event,
                  start: moment.utc(`${formattedDate} ${event.start}`).toDate(),  // new Date(formatTimestamp(`${formattedDate} ${event.start}`)),
                  end:  moment.utc(`${formattedDate} ${event.end}`).toDate(),    // new Date(formatTimestamp(`${formattedDate} ${event.end}`)),
                  // color: "#50b500",
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
  const getAvailableTimeSlots = async () => {
    const id = bookingCoach;
    const date = bookingDate;
    try {
      // setLoading(true)
      if (bookingCoach && bookingDate) {
        setLoading(true)

        const res = await axiosInterceptor().get(
          `api/gymnast/coach/info?coachId=${id}&date=${date}`,
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
                from: formatTimeTo12Hour(fromTime),
                to: formatTimeTo12Hour(toTime),
              });
            }
            currentSlot = new Date(currentSlot.getTime() + halfHour);
          }
          console.log("fetchedSlots", fetchedSlots)
          setFetchedHours(fetchedSlots);
          console.log('ALert', fetchedSlots)
        }

        setLoading(false)

      }
      // setLoading(false)
    } catch (error) {
      setLoading(false)
      swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
    getGymnastScehdule();

  }
  useEffect(() => {
    if (bookingCoach && bookingDate) {
      getAvailableTimeSlots();
    }
  }, [bookingCoach, bookingDate])
  const getChildList = async () => {
    try {
      setLoading(true)
      console.log("api calling for child list")
      const res = await axiosInterceptor().get(
        `/api/gymnast/children?gymnast=${router.query.ViewId}`,
      );
      console.log("responsse of children ID===========", res?.data?.result)
      setLoading(false)
      setChildList(res?.data?.result)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  useEffect(() => {
    if (role == "admin") {
      console.log("here in admin site")
      // getAdminCoach();
      // getAdminChildren();
      getGymScedule();
      getChildList();
      // getBookingList();
    }
    if (role == "gymnast") {
      // getGymnastChildList();
      getGymnastBookingList();
    }
  }, [role])
  useEffect(() => {
    schRef.current?.scheduler.handleState(events, "events")
    console.log("events in useeffect", events)
  }, [events])
  return (
    <div closeModal={closeModal4} style={{marginTop: "10%" }}>
      {role!=="admin" &&
      <div style={{marginLeft: "1%" }}>
              <Style.FirstMain>
      <div style={{ fontSize: "24px", color: "white", marginBottum: "20%", padding: "1%" }}>Schedule</div>
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
        <Style.Schedular>
          {/* <div style={{ fontSize: "24px", color: "white",marginBottum:"20%",padding:"1%" }}>Schedule</div> */}
          {events.length > 0 &&  childrens.length>0 ?
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
                  options: childrens,
                  config: { label: "Children", required: true, errMsg: "Plz Select child" }
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
            childrens.length > 0 &&
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
                  options: childrens,
                  config: { label: "Children", required: true, errMsg: "Plz Select child" }
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
            {childrens.lenght>0 && 
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
                  options: childrens,
                  config: { label: "Children", required: true, errMsg: "Plz Select child" }
                },
              ]}
              week={{
                weekDays: [0, 1, 2, 3, 4, 5, 6],
                weekStartOn: 0,
                startHour: 0,
                endHour: 24,
                step: 30
              }}
            />
            }
            
        </Style.Schedular>
      </Style.MainDiv>
<Button  style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem",marginTop:"5%" }} >Add Bookings</Button>
   {/* <Button  style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} onClick={handleAddChildClick}>+</Button> */}
   
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
        <Style.TableContainer style={{ filter: showModal4 ? 'blur(5px)' : 'none',marginTop: "5%" }} >
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

