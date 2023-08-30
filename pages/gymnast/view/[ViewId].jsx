import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Button, RejectButton, AcceptButton,UpdateButton } from '../../../components/styledComponents/button/Button';
import * as Style from '../../../components/styledComponents/gymnast/Gymnast';
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import Loader from '../../../components/styledComponents/loader/loader';
import { useSelector } from "react-redux";
import AddChildForm from '../../../components/styledComponents/modal/Booking';
import AddChildren from "../../../components/styledComponents/modal/AddChildren"
import UpdateChild from "../../../components/styledComponents/modal/UpdateChild"
const ViewId = () => {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [childData, setChildData] = useState({});
  const [childrens, setChildrens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [childList, setChildList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [gymnastchildList, setGymnastChildList] = useState([]);
  const [gymnastbookingList, setGymnastBookingList] = useState([]);
  const [showModalUpdate, setshowModalUpdate] = useState(false);
  const [clickedId, setClickedId]= useState();
  const Id = router.query.ViewId;
  const [clickUpdateChild, setClickUpdateChild]= useState();
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
  const GymnastName = useSelector((state) => state.user.gymnastName);
  console.log("GymnastName", GymnastName)
  const getChildList = async (id) => {
    try {
      setLoading(true)
      console.log("api calling for child list")
      const res = await axiosInterceptor().get(
        `/api/gymnast/children?gymnast=${router.query.ViewId}`,
      );
      console.log("responsse of children ID", res)
      setLoading(false)
      setChildList(res?.data?.result)
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
        `api/bookings/all?coach=${router.query.ViewId}`,
      );
      console.log("responsse of Booking list", res)
      setBookingList(res?.data?.data)
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
    const payload={
      gymnastId:router.query.ViewId,
      name:childData
    }
    try {
      setLoading(true)
      const res = await axiosInterceptor().post(
        `/api/gymnast/children?gymnast=${router.query.ViewId}`,
        payload,

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
      getChildList();
      getBookingList();
    }
    if (Id && role == "gymnast") {
      getGymnastChildList();
      getGymnastBookingList();
    }
  }, [Id, role])
  const deleteChild = async (id) => {
    try {
      setLoading(true)
      console.log("api calling for child list")
      const res = await axiosInterceptor().delete(
        `/api/gymnast/children?id=${id}`,
      );
      console.log("responsse of children ID", res)
      setLoading(false)
      getChildList();
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const handleUpdateChildClick = () => {
    setshowModalUpdate(true);
  };
  const handleCloseModalUpdate = () => {
    setshowModalUpdate(false);
    setLoading(true);
    getChildList();
  };
  const handleAddChildClicks = () => {
    setShowModal5(true);
  };
  const handleCloseModal5 = () => {
    setShowModal5(false);
    getChildList();
  };
  useEffect(() => {
    getChildList();
  }, [showModalUpdate]);
  return (
    <div style={{marginTop: "10%" }}>
      {Id}
       <div style={{display:"flex", alignItems:"center"}}>
      <Style.SubTitle>Child Listing</Style.SubTitle>
      <Button style={{ width: "auto", marginLeft: "1rem"  }} onClick={handleAddChildClicks} >+</Button>
      </div>
      {showModal4 &&   <AddChildForm  Closed={handleCloseModal4} onSubmit={handleSubmitChild} id={Id} />}
      {showModal5 && <AddChildren onClose={handleCloseModal5} Id={Id} />}
      {showModalUpdate && <UpdateChild onClose={handleCloseModalUpdate} id={clickedId} childUpdate={clickUpdateChild} />}
      <Style.TableContainer style={{ marginTop:"3%", filter: showModal4 ? 'blur(5px)' : 'none', pointerEvents: showModal4 ? 'none' : 'auto' }} >
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
                    <RejectButton onClick={() => { console.log(data?.id); deleteChild(data?.id) }}>Delete</RejectButton>
                    <UpdateButton onClick={()=>{
                      handleUpdateChildClick(); 
                      setClickUpdateChild(data?.name)
                      setClickedId(data.id)
                    }}>Update</UpdateButton>
                  </Style.TableCell>
                </Style.TableRow>
              ))}
              {childList.length<=0 &&
              (<Style.TableRow style={{ fontSize: "18px",textAlign:"center"}}>
                 <p style={{ fontSize: "18px", color: "#E3DC22", marginTop: "35%",marginLeft:"38%",textAlign:"center", filter: showModal4 ? 'blur(5px)' : 'none', pointerEvents: showModal4 ? 'none' : 'auto'  }}>No Listing Exist for this Coach {GymnastName} </p>
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
      <span style={{ display:"flex",alignItems:"center",marginTop:"5%" }} >
      <Style.SubTitle style={{ marginTop: "1rem" }}>Booking Listing</Style.SubTitle>
      <Button  style={{ width: "auto", marginTop: "1rem", marginLeft: "1rem" }} onClick={handleAddChildClick}>+</Button>
      </span>
      <Style.TableContainer style={{marginTop: "5%", filter: showModal4 ? 'blur(5px)' : 'none', pointerEvents: showModal4 ? 'none' : 'auto' }} >
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
                  {/* <Style.TableCell>{data?.id}</Style.TableCell> */}
                  <Style.TableCell>{data?.childrenId}</Style.TableCell>
                  <Style.TableCell>{data?.coachId}</Style.TableCell>
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
      <Loader isLoading={loading}></Loader>
    </div>
  )
}

export default ViewId
