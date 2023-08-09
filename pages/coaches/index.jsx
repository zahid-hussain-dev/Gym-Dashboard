import React, { useState, useEffect } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "../../components/MainComponents/Events";
import { Button, ViewButton } from '../../components/styledComponents/button/Button';
import * as Style from "../../components/styledComponents/coachesStyle/coaches";
import AddCoache from "../../components/styledComponents/modal/AddCoache"
import { useRouter } from 'next/navigation';
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import Loader from '../../components/styledComponents/loader/loader';
import swal from "sweetalert";
import moment from "moment";

const index = () => {
    const [role, setRole] = useState("");
    const router = useRouter();
    const [showModal2, setShowModal2] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allCoaches, setAllCoaches] = useState([]);
    const handleButtonClick2 = () => {
        setShowModal2(true);
        console.log("modal click")
    };

    const closeModal2 = () => {
        setShowModal2(false);
    };
    const handleConfirm = async (event, action) => {
        console.log("handleConfirm =", action, event.title);

        if (action === "edit") {
            /** PUT event to remote DB */
        } else if (action === "create") {
            /**POST event to remote DB */
            const Payload = {
                from: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
                to: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
                type: "PRIVATE",
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
        // Perform localStorage action
        const userRole = JSON.parse(localStorage.getItem("Userrole"))
        setRole(userRole);
    }, [])
    const getCoachScedule = async () => {
        const today = new Date();

        // ✅ Get the first day of the current week (Sunday)
        const firstDay = new Date(
            today.setDate(today.getDate() - today.getDay()),
        );

        // ✅ Get the last day of the current week (Saturday)
        const lastDay = new Date(
            today.setDate(today.getDate() - today.getDay() + 6),
        );
        console.log("firstDay", firstDay.toISOString().slice(0, 10))

        const Payload = {
            from: "2023-07-25",
            to: "2023-07-26"
        }

        try {
            setLoading(true)
            console.log("api calling for schedule")
            const res = await axiosInterceptor().post(
                `/api/coach/my/schedule`,
                Payload,
            );
            console.log("responsse of schedule", res)
            res.data.map((item, index) => (
                item['event_id'] = item.id,
                item['title'] = "Events",
                item['start'] = new Date(item.from),
                item['end'] = new Date(item.to),
                item['editable'] = false,
                item['deletable'] = false,
                item['color'] = "#50b500"
            ))
            setEvents(res.data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            swal('Oops!', "error.data.message", 'error')
            console.log(error)
        }
    }
    const getAllCoaches = async () => {
        try {
            setLoading(true)
            console.log("api calling for all coaches")
            const res = await axiosInterceptor().get(
                `/api/coach/`,

            );
            console.log("responsse of all coaches", res)
            setAllCoaches(res?.data?.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            // swal('Oops!', error.data.message, 'error')
            console.log(error)
        }
    }
    useEffect(() => {
        if (role == "coach") {
            console.log("here")
            getCoachScedule();
        }
        if (role == "admin") {
            console.log("here in admin")
            getAllCoaches();
        }
    }, [role, showModal2])

    const tableCell = [
        { id: 1, gym: 'Gym1', coach: 'mudasir' },
        { id: 2, gym: 'Gym2', coach: 'rohab' },
    ];

    //       const headingStyle = {
    //   backgroundColor: 'white',
    // //   filter: 'blur(5px)'
    //   };
    return (
        <div>
            {role && role === "admin" &&
                <React.Fragment>
                    <Style.TableContainer>
                        <Style.TableWrapper>
                            <thead>
                                <Style.TableRow>
                                    <Style.TableHead>COACH</Style.TableHead>
                                    <Style.TableHead>GYM</Style.TableHead>
                                    <Style.TableHead>ACTIONS</Style.TableHead>

                                </Style.TableRow>
                            </thead>
                            <tbody>
                                {allCoaches && allCoaches.map((data, index) => (
                                    <Style.TableRow key={index}>
                                        <Style.TableCell>{data.userName}</Style.TableCell>
                                        <Style.TableCell>{data?.gym.name}</Style.TableCell>
                                        <Style.TableCell>
                                            {role === "admin" &&
                                                <ViewButton onClick={() => { router.push(`/coaches/view/${data?.id}`) }}>View</ViewButton>
                                            }
                                        </Style.TableCell>

                                    </Style.TableRow>
                                ))}
                            </tbody>
                        </Style.TableWrapper>
                    </Style.TableContainer>
                </React.Fragment>
            }
            {role && role !== "admin" &&
                <React.Fragment>
                    <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} onClick={handleButtonClick2}>Add Schedule</Button>
                    {showModal2 && <AddCoache closeModal={closeModal2} />}

                    <Style.MainDiv>
                        <Style.Schedular style={{ filter: showModal2 ? 'blur(5px)' : 'none' }} >
                            <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem",textAlign:"center" }}>Schedule </div>
                            
                            {events.length > 0 ?
                                <Scheduler
                                    // height={300}
                                    // loading={true}
                                    onSelectedDateChange={false}
                                    events={events}
                                    onConfirm={handleConfirm}
                                    week={{
                                        weekDays: [0, 1, 2, 3, 4, 5, 6],
                                        weekStartOn: 0,
                                        startHour: 9,
                                        endHour: 24
                                        // step: 30
                                    }}
                                />
                                :
                                <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem",textAlign:"center",  marginTop:"30%" }}>No Schedule Exist </div>
                            }
                        </Style.Schedular>
                    </Style.MainDiv>
                </React.Fragment>
            }
            <Loader isLoading={loading}></Loader>

        </div>
    )
}

export default index
