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
      console.log("children data", res)
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
    try {
      if(bookingCoach&&bookingDate){
      const res = await axiosInterceptor().get(
        `api/gymnast/coach/info?coachId=${id}&date=${date}`,
      );
      console.log("responsse of timeslots", res)
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
        setFetchedHours(fetchedSlots);
        console.log('ALert',fetchedSlots)
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

