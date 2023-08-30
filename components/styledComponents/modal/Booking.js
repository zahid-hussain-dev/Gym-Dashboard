import React, { useState, useEffect } from 'react';
import * as Style from '../../styledComponents/gymnast/Gymnast';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";
import Select from 'react-select';
import {Buttton} from '../../../components/styledComponents/button/Button';
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import moment from "moment";
import Loader from '../../../components/styledComponents/loader/loader';


const AddChildForm = ({ Closed, id }) => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});
  const [bookingDate, setBookingDate] = useState();
  const [bookingCoach, setBookingCoach] = useState();
  const [childData, setChildData] = useState({});
  const [loading, setLoading] = useState(false);
  const [childrens, setChildrens] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [allGymnast, setAllGymnast] = useState([]);
  const [gymnastBookingList, setGymnastBookingList] = useState([]);
  const [fetchedHours, setFetchedHours] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionValue, setSelectedOptionValue] = useState('');
  const [selectedOptionCoaches, setSelectedOptionCoaches] = useState('');
  const [selectedOptionCoach, setSelectedOptionCoach] = useState('');
  const [selectedOptionTime, setSelectedOptionTime] = useState('');
  const [showModal4, setShowModal4] = useState(false);

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
      console.log("admin side");
      getAdminChildren();
      getAdminCoach();
      getAllGymnast();
    }
  }, [role])
  useEffect(() => {
    if (bookingCoach && bookingDate) {
      getAvailableTimeSlots();
    }
  }, [bookingCoach, bookingDate])

  const option2 = [
    { value: '9 - 10', label: '9 - 10' },
    { value: '10 - 11', label: '10 - 11' },
    { value: '11 - 12', label: '11 - 12' },
  ];

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
      console.log("coaches data", res)
      setCoaches(res.data.coaches)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const getAdminChildren = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().get(
        `/api/gymnast/children?gymnast=${id}`,
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
  const getAdminCoach = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().get(
        `/api/coach/private?gymnastId=${id}`,
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
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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
  const handleSelectChangeCoach = (event) => {
    setSelectedOptionCoach(event.value);
    setSelectedOptionCoaches(event.name)
    setBookingCoach(event.value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      coachId: event.value,
    }));
  };
  const handleSelectChangeTime = (event) => {
    setSelectedOptionTime(event.target.value);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const splitTime = formData.time.split("-")
    console.log("formData", formData)
    var from = moment(
      `${formData.date} ${splitTime[0]}`,
      'YYYY-MM-DD h:mm a',
    ).format('YYYY-MM-DD HH:mm:ss');
    var to = moment(
      `${formData.date} ${splitTime[1]}`,
      'YYYY-MM-DD h:mm a',
    ).format('YYYY-MM-DD HH:mm:ss');

    let Payload = {
      childrenId: formData.childrenId,
      coachId: formData.coachId,
      from: from,
      to: to,
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
    } catch (error) {
      setLoading(false)
      swal('Oops!', error.data.message, 'error')
      console.log(error)
    }

  };

  // const handleSubmitChild = async (event) => {
  //   event.preventDefault();
  //   console.log("ChildData", childData)
  //   try {
  //     setLoading(true)
  //     const res = await axiosInterceptor().post(
  //       `/api/gymnast/children`,
  //       childData,
  //     );
  //     console.log("responsse of login", res)
  //     swal('Success!', res.data.message, 'success')
  //     getChildren();
  //     setLoading(false)
  //   } catch (error) {
  //     setLoading(false)
  //     swal('Oops!', error.data.message, 'error')
  //     console.log(error)
  //   }
  // };

  const getAvailableTimeSlots = async () => {
    const id = bookingCoach;
    const date = bookingDate;
    try {
      // setLoading(true)
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
      // setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }

  const updateButtonState = (emailValue) => {
    setIsButtonDisabled(emailValue === '');
  };

 

  return (
    <Style.PopupContainer >
      <Style.PopupMainHeading>
        <Style.PopupHeading>Add Booking</Style.PopupHeading>
        <Image src={close} className="close" onClick={Closed} alt="close" width={20} height={20} />
      </Style.PopupMainHeading>
      <form onSubmit={handleSubmit} >
      
                <Style.CenteredDropdownContainer className="dropdown-container">
                  <Style.FirstMain>
                    <Style.SecondMain>
                    <Style.Lbl>
                    <Style.Labeled >Select Child:</Style.Labeled>
                    <Select
                      name='childrenId'
                      value={selectedOptionValue}
                      onChange={handleSelectChange}
                      options={childrens.map(option => ({ value: option.id, label: option.name }))}
                      placeholder="Select Child"
                      isSearchable
                    />
                    </Style.Lbl>
                    <Style.SecondInput >
                    <Style.Labeled className="label" >Select Coach:</Style.Labeled>
                    <Select
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
                  <Style.Mains>
                  <div>
                    <Style.Label className="label">Select Date:</Style.Label>
                    <Style.InputDataa
                      type="date"
                      name="date"
                      defaultValue={new Date().toISOString().substring(0, 10)}
                      onChange={(e) => {
                        handleChange(e);
                        console.log("date", e.target.value)
                        setBookingDate(e.target.value)
                      }}
                      value={formData.date}
                    />
                 </div>
                 <div>
                  <Style.Label className="label">Time Slots:</Style.Label>
                  <Style.Select className="input-dataa" name='time' value={selectedOptionTime} onChange={handleSelectChangeTime}>
                   
                  {fetchedHours && fetchedHours.map((option, index) => (
                      <option key={index} value={`${option.from} - ${option.to}`}>
                        {option.from} - {option.to}
                      </option>
                    ))}
                  </Style.Select>
                </div>
              </Style.Mains>
                </Style.CenteredDropdownContainer>
                <Buttton onClick={(e) => {handleSubmit(e); Closed()} }   >Book</Buttton>
      </form>
      <Loader isLoading={loading}></Loader>

    </Style.PopupContainer>
  );
};

export default AddChildForm;