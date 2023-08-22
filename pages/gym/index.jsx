import React, { useState, useEffect } from 'react'
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "../../components/MainComponents/Events";
import { Button, ViewButton } from '../../components/styledComponents/button/Button';
import AddGymSchedule from '../../components/styledComponents/modal/AddGymSchedule';
import * as Style from "../../components/styledComponents/coachesStyle/coaches";
import { useRouter } from 'next/navigation';
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import Loader from '../../components/styledComponents/loader/loader';
import swal from "sweetalert";
import moment from "moment";
import { setGymName } from '../../store/slices/user/userSlice';
import { useDispatch, useSelector } from "react-redux";
import  AddGymModal from "../../components/styledComponents/modal/AddGymModal"

const index = () => {
  const [role, setRole] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [allGyms, setAllGyms] = useState([]);
  const [showGymModal, setShowGymModal] = useState(false);
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    setShowModal(true);
    console.log("modal click")
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleAddGym = () => {
    setShowGymModal(true);
    console.log("modal click")
  };
  useEffect(() => {
    // Perform localStorage action
    const userRole = JSON.parse(localStorage.getItem("Userrole"))
    setRole(userRole);
  }, [])
  function formatTimestamp(timestamp) {
    const [datePart, timePart] = timestamp.split("T");
    const [year, month, day] = datePart.split("-");
    const [hours, minutes] = timePart.slice(0, -1).split(":");
    const adjustedHours = String(Number(hours)).padStart(2, "0");
    return `${year} ${Number(month)} ${Number(day)} ${adjustedHours}:${minutes}`;
  }
  const getGymSchedule = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().get(
        `/api/gym/schedule`,
      );
      console.log("responsse of schedule", res)
      res.data.map((item, index) => (
        item['event_id'] = item.id,
        item['title'] = "Open Hours",
        item['start'] = new Date(formatTimestamp(new Date(item.from).toISOString())),
        item['end'] = new Date(formatTimestamp(new Date(item.to).toISOString())),
        item['editable'] = false,
        item['deletable'] = false
        // item['color'] = "#50b500"
      ))
      setEvents(res.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      swal('Oops!', "Some Thing went Wrong", 'error')
      console.log(error)
    }
  }
  const getAllGym = async () => {
    try {
      setLoading(true)
      console.log("api calling for all Gyms")
      const res = await axiosInterceptor().get(
        `/api/gym/`,
      );
      console.log("responsse of all Gyms", res)
      setAllGyms(res?.data?.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const handleConfirm = async (event, action) => {
    console.log("handleConfirm =", action, event.title);

    if (action === "edit") {
      /** PUT event to remote DB */
    } else if (action === "create") {
      /**POST event to remote DB */
      const Payload = {
        from: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
        to: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
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
    // setTimeout(() => {
    //   res({
    //     ...event,
    //     event_id: event.event_id || Math.random()
    //   });
    // }, 1000);

    // const isFail = Math.random() > 0.6;
    // // Make it slow just for testing
    // console.log("isFail", isFail)
    // setTimeout(() => {
    //   if (isFail) {
    //     rej("Ops... Faild");
    //   } else {
    //     res({
    //       ...event,
    //       event_id: event.event_id || Math.random()
    //     });
    //   }
    // }, 1000)
  };

  useEffect(() => {
    if (role == "gym") {

      getGymSchedule();
    }
    if (role == "admin") {
      getAllGym();
    }
  }, [role, showModal])

  const tableCell = [
    { id: 1, timeSlote: '9 - 10', name: 'Gym1', },
    { id: 4, timeSlote: '10 - 11', name: 'Gym2', },
  ];

  useEffect(() => {
    console.log("events", events)

  }, [events])
const closeGymModal = ( ) =>{
  setShowGymModal(false);
};

  return (
    <div style={{marginTop: "10%" }}>
      {role && role === "gym" &&
      <div>
 <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} >Add Gym Schedule</Button>
 <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} onClick={handleButtonClick}>+</Button>
      </div>
      }
      <div>
<Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "77%" }} onClick={handleAddGym} >+</Button>
</div>
{showGymModal && <AddGymModal closeModal={closeGymModal}/>}
      {role && role === "admin" &&
        <Style.TableContainer style={{ filter: showModal ? 'blur(5px)' : 'none' }} >
          <Style.TableWrapper style={{ filter: showGymModal ? 'blur(5px)' : 'none' }}>
            <thead>
              <Style.TableRow>
                <Style.TableHead>Gym Id</Style.TableHead>
                <Style.TableHead>Gym Name</Style.TableHead>
                <Style.TableHead>Actions</Style.TableHead>

              </Style.TableRow>
            </thead>
            <tbody>
              {allGyms && allGyms.map((data, index) => (
                <Style.TableRow key={index}>
                  <Style.TableCell>{data?.id}</Style.TableCell>
                  <Style.TableCell>{data?.name}</Style.TableCell>
                  
                  <Style.TableCell>
                    <ViewButton onClick={() => {
                      dispatch(setGymName(data.name));
                      { router.push(`/gym/view/${data.id}`) }
                    }}>View</ViewButton>
                  </Style.TableCell>

                </Style.TableRow>
              ))}
            </tbody>
          </Style.TableWrapper>
        </Style.TableContainer>
      }
      {showModal && <AddGymSchedule closeModal={closeModal} />}
      {role && role === "gym" &&
        <div style={{ display: "flex", justifyContent: "space-around",filter: showModal? 'blur(5px)' : 'none'  }}>
          <div style={{ width: "75%", height: "50%" }}>
            <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem", textAlign:"center" }}>Gym Schedule </div>
            {events.length > 0 &&
              <Scheduler
                // height={300}
                // loading={true}
                onSelectedDateChange={false}
                events={events}
                onConfirm={handleConfirm}
                week={{
                  weekDays: [0, 1, 2, 3, 4, 5, 6],
                  weekStartOn: 6,
                  startHour: 0,
                  endHour: 24
                  // step: 30
                }}
              />}
          </div>

        </div>
      }
      <Loader isLoading={loading}></Loader>

    </div>
  )
}

export default index;



