import React, { useState, useEffect } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "../../components/MainComponents/Events";
import { Button, ViewButton, AcceptButton, RejectButton } from '../../components/styledComponents/button/Button';
import * as Style from "../../components/styledComponents/coachesStyle/coaches";
import AddCoache from "../../components/styledComponents/modal/AddCoache"
import { useRouter } from 'next/navigation';
import { setCoachName } from '../../store/slices/user/userSlice';
import { useDispatch, useSelector } from "react-redux";
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
    const [isMapped, setIsMapped] = useState(false);
    const schRef = React.createRef()

    const [allCoaches, setAllCoaches] = useState([]);
    const dispatch = useDispatch();
    const handleButtonClick2 = () => {
        setShowModal2(true);
        console.log("modal click")

    };
    function formatTimestamp(timestamp) {
        const [datePart, timePart] = timestamp.split("T");
        const [year, month, day] = datePart.split("-");
        const [hours, minutes] = timePart.slice(0, -1).split(":");
        const adjustedHours = String(Number(hours)).padStart(2, "0");
        return `${year} ${Number(month)} ${Number(day)} ${adjustedHours}:${minutes}`;
    }
    const CustomEditor = ({ scheduler }) => {
        const event = scheduler.edited;
        console.log("scheduler", scheduler);

        return (
            <div>
                <AddCoache style={{ position: "absolute", top: "40%", left: "52%", zIndex: "1" }} closeModal={() => { closeModal2(); scheduler.close() }} />
            </div>
        );
    };

    const closeModal2 = () => {
        setShowModal2(false);
    };
    const handleConfirm = async (event, action) => {
        console.log("handleConfirm =", action, event.title);
        console.log("evnets", event)
        if (action === "edit") {
            /** PUT event to remote DB */
        } else if (action === "create") {
            /**POST event to remote DB */
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
            from: "2023-08-10",
            to: "2023-08-18"
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
                item['start'] = new Date(formatTimestamp(new Date(item.from).toISOString())),
                item['end'] = new Date(formatTimestamp(new Date(item.to).toISOString())),
                item['editable'] = false,
                item['deletable'] = false,
                item['color'] = "#50b500"
            ))
            setEvents(res.data);
            setLoading(false)
            getCoachGymScedule();

        } catch (error) {
            setLoading(false)
            swal('Oops!', "error.data.message", 'error')
            console.log(error)
        }
    }
    const getCoachGymScedule = async () => {
        try {
            setLoading(true)
            console.log("api calling for schedule")
            const res = await axiosInterceptor().get(
                `/api/gym/schedule`,
            );
            console.log("responsse of schedule gym", res.data)
            res.data.map((item, index) => (
                item['event_id'] = item.id,
                item['title'] = "Open hours",
                item['start'] = new Date(formatTimestamp(new Date(item.from).toISOString())),
                item['end'] = new Date(formatTimestamp(new Date(item.to).toISOString())),
                item['editable'] = false,
                item['deletable'] = false,
                item['color'] = "#0000FF"
            ))
            setEvents(res.data)
            // setEvents((prev) => {
            //     return [
            //         ...prev,
            //         ...res.data
            //     ]
            // });
            setIsMapped(true);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            swal('Oops!', "error.data.message", 'error')
            console.log(error)
        }
    }
    const handleApprove = async (id) => {
        try {
            setLoading(true)
            console.log("api calling for schedule")
            const res = await axiosInterceptor().put(
                `/api/admin/update?id=${id}`,
                {
                    status: "APPROVED",
                    private: true,
                }
            );
            setLoading(false)
            getAllCoaches();
            console.log("responsse of Approved", res)
        } catch (error) {
            setLoading(false)
            swal('Oops!', error.data.message, 'error')
            console.log(error)
        }
    }
    const handleReject = async (id) => {
        try {
            setLoading(true)
            console.log("api calling for schedule")
            const res = await axiosInterceptor().put(
                `/api/admin/update?id=${id}`,
                {
                    status: "REJECTED",
                    private: true,
                }
            );
            setLoading(false)
            getAllCoaches();
            console.log("responsse of Reject", res)
        } catch (error) {
            setLoading(false)
            swal('Oops!', error.data.message, 'error')
            console.log(error)
        }
    }
    const getAllCoaches = async () => {
        try {
            setLoading(true)
            console.log("api calling for all coaches")
            const res = await axiosInterceptor().get(
                `/api/coach/?limit=50`,
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
            // getCoachGymScedule();
        }
        if (role == "admin") {
            console.log("here in admin")
            getAllCoaches();
        }
    }, [role, showModal2])

    console.log("evnts all", events)
    //       const headingStyle = {
    //   backgroundColor: 'white',
    // //   filter: 'blur(5px)'
    //   };
    useEffect(() => {
        schRef.current?.scheduler.handleState(events, "events")
    }, [events])
    return (
        <div style={{ marginTop: "10%" }}>
            {role && role === "admin" &&
                <React.Fragment >
                    <h2 style={{ color: "white" }}> Coach Listing</h2>
                    <Style.TableContainer style={{ marginTop: "5%" }}>
                        <Style.TableWrapper>
                            <thead>
                                <Style.TableRow>
                                    <Style.TableHead>COACH</Style.TableHead>
                                    <Style.TableHead>GYM</Style.TableHead>
                                    <Style.TableHead>STATUS</Style.TableHead>
                                    <Style.TableHead>ACTIONS</Style.TableHead>

                                </Style.TableRow>
                            </thead>
                            {/* <Style.TableScroll> */}
                            <tbody>
                                {/* <Style.TableScroll> */}
                                {allCoaches && allCoaches.map((data, index) => (
                                    <Style.TableRow2 key={index}>
                                        <Style.TableCell>{data?.userName}</Style.TableCell>
                                        <Style.TableCell>{data?.gym.name}</Style.TableCell>
                                        {/* <Style.TableCell>{data?.status}
                                        
                                        </Style.TableCell> */}
                                        {data?.status === "PENDING_APPROVAL"
                                            ?
                                            <Style.TableCell style={{ display: "flex", justifyContent: "space-evenly" }} >
                                                <AcceptButton onClick={() => {
                                                    handleApprove(data.id);
                                                }}>Accept</AcceptButton>
                                                <RejectButton onClick={() => {
                                                    handleReject(data.id);
                                                }}>Cancel</RejectButton>
                                            </Style.TableCell>
                                            :
                                            <Style.TableCell>
                                                {data.status === "APPROVED" ?
                                                    <AcceptButton disabled={true}>{data.status}</AcceptButton>
                                                    :
                                                    <RejectButton disabled={true} > {data.status}</RejectButton>
                                                }
                                            </Style.TableCell>
                                        }

                                        <Style.TableCell>
                                            {role === "admin" &&
                                                <ViewButton onClick={() => {
                                                    dispatch(setCoachName(data.userName));
                                                    router.push(`/coaches/view/${data?.id}`)
                                                }}>View</ViewButton>
                                            }
                                        </Style.TableCell>

                                    </Style.TableRow2>
                                ))}
                                {/* </Style.TableScroll> */}
                            </tbody>
                            {/* </Style.TableScroll> */}
                        </Style.TableWrapper>
                    </Style.TableContainer>
                </React.Fragment>
            }
            {role && role !== "admin" &&
                <React.Fragment style={{ marginTop: "5%" }}>
                    <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "84%", marginTop: "10px" }} onClick={handleButtonClick2}>+</Button>
                    <Style.MainDiv>
                        <Style.Schedular style={{ filter: showModal2 ? 'blur(5px)' : 'none' }}>
                            <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem", textAlign: "center", filter: showModal2 ? 'blur(5px)' : 'none' }}>Schedule </div>

                            {events.length > 0 && isMapped ?
                                <Scheduler
                                    fields={[
                                        {
                                            name: "TimeStatus",
                                            type: "select",
                                            default: "PUBLIC",
                                            // Should provide options with type:"select"
                                            options: [
                                                { id: 1, text: "Public", value: "PUBLIC" },
                                                { id: 2, text: "Private", value: "PRIVATE" }
                                            ],
                                            config: { label: "Time Status", required: true, errMsg: "Plz Select Status" }
                                        },
                                    ]}
                                    ref={schRef}
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
                                <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem", textAlign: "center", filter: showModal2 ? 'blur(5px)' : 'none' }}>No Schedule Exist </div>
                            }
                        </Style.Schedular>
                        {showModal2 && <AddCoache style={{ position: "absolute", top: "40%", left: "52%", zIndex: "1" }} closeModal={() => closeModal2()} />}
                    </Style.MainDiv>
                </React.Fragment>
            }
            <Loader isLoading={loading}></Loader>
        </div>
    )
}

export default index
