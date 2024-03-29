import React, { useState, useEffect } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { Button, ViewButton, AcceptButton, RejectButton } from '../../components/styledComponents/button/Button';
import * as Style from "../../components/styledComponents/coachesStyle/coaches";
import AddCoache from "../../components/styledComponents/modal/AddCoache"
import { useRouter } from 'next/navigation';
import { setCoachName, setGymId } from '../../store/slices/user/userSlice';
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
    const [allCoaches, setAllCoaches] = useState([]);
    const dispatch = useDispatch();
    const schRef = React.createRef()
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
            from: firstDay.toISOString().slice(0, 10),
            to: lastDay.toISOString().slice(0, 10)
        }
        try {
            getCoachGymScedule();

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
            // setEvents(res.data);
            setEvents(prevState => [...prevState, ...res.data])
            setLoading(false)
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
                // `/api/gym/schedule?gym=${gymId}`,
                `/api/gym/schedule`,
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
        }
        if (role == "admin") {
            console.log("here in admin")
            getAllCoaches();
        }
    }, [role, showModal2])
    console.log("evnts all", events)
    useEffect(() => {
        schRef.current?.scheduler.handleState(events, "events")
        console.log("all events",events)
    }, [events])
    return (
        <div style={{ marginTop: "10%" }}>
            {role && role === "admin" &&
                <React.Fragment >
                    <h2 style={{ color: "white",marginLeft:"30px" }}> Coach Listing</h2>
                    <Style.TableContainer style={{ marginTop: "5%",borderBottom: "2px solid rgb(213, 185, 59)" }}>
                        <Style.TableWrapper>
                            <thead>
                                <Style.TableRow>
                                    <Style.TableHead>COACH</Style.TableHead>
                                    <Style.TableHead>GYM</Style.TableHead>
                                    <Style.TableHead>STATUS</Style.TableHead>
                                    <Style.TableHead>ACTIONS</Style.TableHead>
                                </Style.TableRow>
                            </thead>
                            <tbody>
                                {allCoaches && allCoaches.map((data, index) => (
                                    <Style.TableRow2 key={index}>
                                        <Style.TableCell>{data?.userName}</Style.TableCell>
                                        <Style.TableCell>{data?.gym.name}</Style.TableCell>
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
                                                    dispatch(setGymId(data?.gym.id));
                                                    router.push(`/coaches/view/${data?.id}`)
                                                }}>View</ViewButton>
                                            }
                                        </Style.TableCell>
                                    </Style.TableRow2>
                                ))}
                            </tbody>
                        </Style.TableWrapper>
                    </Style.TableContainer>
                </React.Fragment>
            }
            {role && role !== "admin" &&
            <div>
                <React.Fragment>
                    <Button style={{ width: "auto", marginLeft: "84%", }} onClick={handleButtonClick2}>+</Button>
                    <div style={{ fontSize: "24px", color: "white", textAlign: "center", filter: showModal2 ? 'blur(5px)' : 'none',padding:"15px" }}>Schedule </div>
                    <Style.MainDiv>
                        <Style.Schedular style={{ filter: showModal2 ? 'blur(5px)' : 'none' }}>
                            {events.length > 0 && isMapped ?
                                <Scheduler
                                    view='week'
                                    fields={[
                                        {
                                            name: "TimeStatus",
                                            type: "select",
                                            default: "PUBLIC",
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
                                        startHour: 0,
                                        endHour: 24
                                    }}
                                />
                                :
                                <Scheduler
                                    view='week'
                                    fields={[
                                        {
                                            name: "TimeStatus",
                                            type: "select",
                                            default: "PUBLIC",
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
                                        startHour: 0,
                                        endHour: 24
                                    }}
                                />}
                        </Style.Schedular>
                        {/* {showModal2 && <AddCoache style={{ position: "absolute", top: "40%", left: "52%", zIndex: "1" }} closeModal={() => closeModal2()} />} */}
                    </Style.MainDiv>
                </React.Fragment>
                </div>
            }
            <Loader isLoading={loading}></Loader>
        </div>
    )
}

export default index
