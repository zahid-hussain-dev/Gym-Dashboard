import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Button, RejectButton, AcceptButton } from '../../../components/styledComponents/button/Button';
import * as Style from '../../../components/styledComponents/gymnast/Gymnast';
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import Loader from '../../../components/styledComponents/loader/loader';
const ViewId = () => {
  const router = useRouter();
  const [role, setRole] = useState("");

  const Id = router.query.ViewId;
  const tableCell = [
    { id: 1, timeSlote: '9 - 10', child: 'wasiq', coach: 'mudasir' },
    { id: 2, timeSlote: '10 - 11', child: 'shakeel', coach: 'rohab' },
  ];

  const [loading, setLoading] = useState(false);
  const [childList, setChildList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [gymnastchildList, setGymnastChildList] = useState([]);
  const [gymnastbookingList, setGymnastBookingList] = useState([]);
  useEffect(() => {
    // Perform localStorage action
    const userRole = JSON.parse(localStorage.getItem("Userrole"))
    setRole(userRole);

  }, [])
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

  return (
    <div>
      ViewId details {Id}
      <Style.SubTitle>Child Listing</Style.SubTitle>
      <Style.TableContainer>
        <Style.TableWrapper>
          <thead>
            <Style.TableRow>
              <Style.TableHead>ID</Style.TableHead>
              <Style.TableHead>CHILD</Style.TableHead>
              <Style.TableHead>ACTIONS</Style.TableHead>

            </Style.TableRow>
          </thead>
          <tbody>
            {role && role === "admin" &&
              childList && childList.map((data, index) => (
                <Style.TableRow key={index}>
                  <Style.TableCell>{data?.id}</Style.TableCell>
                  <Style.TableCell>{data?.name}</Style.TableCell>
                  <Style.TableCell>
                    <RejectButton onClick={() => { console.log(data.id) }}>Delete</RejectButton>
                  </Style.TableCell>

                </Style.TableRow>
              ))}
            {role && role === "gymnast" &&
              gymnastchildList && gymnastchildList.map((data, index) => (
                <Style.TableRow key={index}>
                  <Style.TableCell>{data?.id}</Style.TableCell>
                  <Style.TableCell>{data?.name}</Style.TableCell>
                  <Style.TableCell>
                    <RejectButton onClick={() => { console.log(data.id) }}>Delete</RejectButton>
                  </Style.TableCell>

                </Style.TableRow>
              ))}

          </tbody>
        </Style.TableWrapper>
      </Style.TableContainer>
      <Style.SubTitle style={{ marginTop: "1rem" }}>Booking Listing</Style.SubTitle>
      <Style.TableContainer>
        <Style.TableWrapper>
          <thead>
            <Style.TableRow>
              <Style.TableHead>ID</Style.TableHead>
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
                  <Style.TableCell>{data?.id}</Style.TableCell>
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
