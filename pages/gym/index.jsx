import React, { useState, useEffect } from 'react'
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "../../components/MainComponents/Events";
import { Button } from '../../components/styledComponents/button/Button';
import AddGymSchedule from '../../components/styledComponents/modal/AddGymSchedule';
import * as Style from "../../components/styledComponents/coachesStyle/coaches";
import { useRouter } from 'next/navigation';
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import swal from "sweetalert";
import moment from "moment";// 

const index = () => {
  const [role, setRole] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleButtonClick = () => {
    setShowModal(true);
    console.log("modal click")
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Perform localStorage action
    const userRole = JSON.parse(localStorage.getItem("Userrole"))
    setRole(userRole);
  }, [])

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
        item['start'] = new Date(item.from),
        item['end'] = new Date(item.to),
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

  const handleConfirm = async (event, action) => {
    console.log("handleConfirm =", action, event.title);
    console.log("event", event)
    /**
     * Make sure to return 4 mandatory fields:
     * event_id: string|number
     * title: string
     * start: Date|string
     * end: Date|string
     * ....extra other fields depend on your custom fields/editor properties
     */
    // Simulate http request: return added/edited event
    return new Promise((res, rej) => {
      if (action === "edit") {
        /** PUT event to remote DB */
      } else if (action === "create") {
        /**POST event to remote DB */

        console.log("new Date(event.start)Date String()", new Date(event.start).toDateString())
        console.log("event", new Date(event.start).toISOString().slice(0, 10), new Date(event.start).toISOString().slice(11, 19))
        var dateChangedStart = new Date(event.start).toISOString().slice(0, 10).replace(/\//g, "-");
        console.log("datechnage", dateChangedStart)
        var dateChangedEnd = new Date(event.end).toISOString().slice(0, 10).replace(/\//g, "-");
        console.log("datechnage", dateChangedEnd)
        const Payload = {
          from: dateChangedStart + " " + new Date(event.start).toISOString().slice(11, 19),
          to: dateChangedEnd + " " + new Date(event.end).toISOString().slice(11, 19),
        }
        console.log("payload", Payload)
        // try {
        //   setLoading(true)
        //   const res = axiosInterceptor().post(
        //     `/api/gym/schedule`,
        //     Payload,
        //   );
        //   console.log("responsse of login", res)
        //   swal('Success!', res.data.message, 'success')
        //   setLoading(false)
        // } catch (error) {
        //   setLoading(false)
        //   // swal('Oops!', error.data.message, 'error')
        //   console.log(error)
        // }

      }

      const isFail = Math.random() > 0.6;
      // Make it slow just for testing
      setTimeout(() => {
        if (isFail) {
          rej("Ops... Faild");
        } else {
          res({
            ...event,
            event_id: event.event_id || Math.random()
          });
        }
      }, 3000);
    });
  };

  useEffect(() => {
    if (role == "gym") {

      getGymSchedule();
    }
  }, [role])

  const tableCell = [
    { id: 1, timeSlote: '9 - 10', name: 'Gym1', },
    { id: 4, timeSlote: '10 - 11', name: 'Gym2', },
  ];

  useEffect(() => {
    console.log("events", events)

  }, [events])

  return (
    <div>
      {role && role === "gym" &&
        <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} onClick={handleButtonClick}>Add Gym Schedule</Button>

      }
      {role && role === "admin" &&

        <Style.TableContainer>
          <Style.TableWrapper>
            <thead>
              <Style.TableRow>
                <Style.TableHead>Gym Id</Style.TableHead>
                <Style.TableHead>Gym Name</Style.TableHead>
                <Style.TableHead>Timing</Style.TableHead>
                <Style.TableHead>Actions</Style.TableHead>

              </Style.TableRow>
            </thead>
            <tbody>
              {tableCell.map((data, index) => (
                <Style.TableRow key={index}>
                  <Style.TableCell>{data.id}</Style.TableCell>
                  <Style.TableCell>{data.name}</Style.TableCell>
                  <Style.TableCell>{data.timeSlote}</Style.TableCell>
                  <Style.TableCell>
                    <button onClick={() => {
                      { router.push(`/gym/view/${data.id}`) }
                    }}>View</button>
                  </Style.TableCell>

                </Style.TableRow>
              ))}
            </tbody>
          </Style.TableWrapper>
        </Style.TableContainer>
      }
      {showModal && <AddGymSchedule closeModal={closeModal} />}
      {role && role === "gym" &&
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ width: "75%", height: "50%" }}>
            <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem" }}>Gym Schedule </div>
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
    </div>
  )
}

export default index
