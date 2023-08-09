import React, { useState, useEffect } from 'react'
import { Button, ViewButton } from '../../components/styledComponents/button/Button';
import Image from "next/image";
import * as Style from '../../components/styledComponents/gymnast/Gymnast';
import { useRouter } from 'next/navigation';
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import Loader from '../../components/styledComponents/loader/loader';
import swal from "sweetalert";

const index = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});

  const [bookingDate, setBookingDate] = useState();
  const [bookingCoach, setBookingCoach] = useState();

  const [availableSlots, setavailableSlots] = useState();

  const [childData, setChildData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [childrens, setChildrens] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [allGymnast, setAllGymnast] = useState([]);
  const [gymnastBookingList, setGymnastBookingList] = useState([]);

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

  const option2 = [
    { value: '9 - 10', label: '9 - 10' },
    { value: '10 - 11', label: '10 - 11' },
    { value: '11 - 12', label: '11 - 12' },
    // Add more options here as needed
  ];
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionCoach, setSelectedOptionCoach] = useState('');
  const [selectedOptionTime, setSelectedOptionTime] = useState('');
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
      swal('Oops!', error.data.message, 'error')
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
      swal('Oops!', error.data.message, 'error')
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
    setSelectedOption(event.target.value);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSelectChangeCoach = (event) => {
    setSelectedOptionCoach(event.target.value);
    const { name, value } = event.target;
    setBookingCoach(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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
    console.log("formData", formData)

  };
  const handleSelectChild = (event) => {
    setSelectedOption(event.target.value);
    const { name, value } = event.target;
    setChildData((prevChildData) => ({
      ...prevChildData,
      [name]: value,
    }));
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
      setLoading(true)
      const res = await axiosInterceptor().get(
        `api/gymnast/coach/info?coachId=${id}&date=${date}`,
      );
      console.log("responsse of timeslots", res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  return (
    <div>

      {role && role !== "admin" &&
        <Style.FormContainer className="add-child-form">
          {/* Form content */}
          <div className="Add-child-main">
            <Style.AddChildWrapper className="Add-child">
              <Style.Wrapper>
                <Style.LabelHeader className="label">Add New Child:</Style.LabelHeader>
                <Style.Header>
                  <Style.InputData
                    className="input-dataa"
                    type="text"
                    id="message"
                    name="name"
                    onChange={handleSelectChild}
                  />
                  <Style.AddChildButton type="submit" onClick={(e) => handleSubmitChild(e)}>
                    Add Child
                  </Style.AddChildButton>
                </Style.Header>
              </Style.Wrapper>
            </Style.AddChildWrapper>
            <Style.SecondForm className="second-form">
              <Style.AddBookingHeading className="add-booking">Add Booking</Style.AddBookingHeading>
              <div>
                <Style.CenteredDropdownContainer className="dropdown-container">
                  <div>
                    <Style.Label className="label">Select New Child:</Style.Label>
                    <Style.Select className="input-dataa" name='child' value={selectedOption} onChange={handleSelectChange}>
                      <option value="">Child</option>
                      {childrens && childrens.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Style.Select>
                  </div>
                  <div>
                    <Style.Label className="label">Select Coaches:</Style.Label>
                    <Style.Select className="input-dataa" name='coach' value={selectedOptionCoach} onChange={handleSelectChangeCoach}>
                      <option value="">Coaches</option>
                      {coaches && coaches.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.userName}
                        </option>
                      ))}
                    </Style.Select>
                  </div>
                  <div>
                    <Style.Label className="label">Select Date:</Style.Label>
                    <Style.InputData
                      type="date"
                      name="date"
                      onChange={(e) => {
                        handleChange(e);
                        console.log("date", e.target.value)
                        setBookingDate(e.target.value)
                      }}
                      value={formData.date}
                    />
                  </div>

                </Style.CenteredDropdownContainer>
                <div style={{    display: "flex",flexDirection: "column", justifyContent: "center",alignItems: "center", marginLeft:"6%"}}>
                  <Style.Label className="label">Time Slotes:</Style.Label>
                  <Style.Select className="input-dataa" name='time' value={selectedOptionTime} onChange={handleSelectChangeTime}>
                    <option value="">Time Slotes</option>
                    {option2.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Style.Select>
                </div>
                <Button onClick={(e) => handleSubmit(e)}>Book</Button>
              </div>
              {/* Rest of the code */}
            </Style.SecondForm>
          </div>
        </Style.FormContainer>

      }
      {role && role === "admin"
        ?
        <Style.TableContainer>
          <Style.TableWrapper>
            <thead>
              <Style.TableRow>
                <Style.TableHead>ID</Style.TableHead>
                <Style.TableHead>GYMNAST</Style.TableHead>
                <Style.TableHead>ACTIONS</Style.TableHead>

              </Style.TableRow>
            </thead>
            <tbody>

             {allGymnast && allGymnast.map((data, index) => (
                <Style.TableRow key={index}>
                  <Style.TableCell>{data?.id}</Style.TableCell>
                  <Style.TableCell>{data?.firstName}{" "}{data?.lastName}</Style.TableCell>
                  <Style.TableCell>                    
                    <ViewButton onClick={() => {
                      { router.push(`/gymnast/view/${data.id}`) }
                    }}>View</ViewButton>
                    </Style.TableCell>
                  
                </Style.TableRow>
              ))}

              
            </tbody>
          </Style.TableWrapper>
        </Style.TableContainer>
        :
        <Style.TableContainer>
          <Style.TableWrapper>
            <thead>
              <Style.TableRow>
                <Style.TableHead>CHILD</Style.TableHead>
                <Style.TableHead>COACH</Style.TableHead>
                <Style.TableHead>TIME SLOT</Style.TableHead>
                <Style.TableHead>ACTIONS</Style.TableHead>

              </Style.TableRow>
            </thead>
            <tbody>
              {gymnastBookingList && gymnastBookingList.map((data, index) => (
                <Style.TableRow key={index}>
                  <Style.TableCell>{data.childrenId}</Style.TableCell>
                  <Style.TableCell>{data.coachId}</Style.TableCell>
                  <Style.TableCell>{new Date(data?.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} {"-"} {new Date(data?.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}</Style.TableCell>
                  <Style.TableCell>
                    <ViewButton onClick={() => { router.push(`/gymnast/view/${data.id}`) }}>View</ViewButton></Style.TableCell>

                </Style.TableRow>
              ))}
            </tbody>
          </Style.TableWrapper>
        </Style.TableContainer>
      }

    </div>
  )
}

export default index