import React, { useState, useEffect } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { Button, AcceptButton, RejectButton } from '../../../components/styledComponents/button/Button';
import * as Style from "../../../components/styledComponents/coachesStyle/coaches";
import AddCoache from '../../../components/styledComponents/modal/AddCoache';
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import { useRouter } from 'next/router';
import Loader from '../../../components/styledComponents/loader/loader';
import { useSelector } from "react-redux";
import moment from "moment";

const ViewId = () => {
    const router = useRouter();
    const Id = router.query.ViewId;
    const [showModal2, setShowModal2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [coachName, setCoachName] = useState('');
    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
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
    const CoachName = useSelector((state) => state.user.coachName);
    const gymId = useSelector((state) => state.user.gymId);

    console.log("gymId", gymId)

    const getGymScedule = async (id) => {
        try {
            setLoading(true)
            console.log("api calling for schedule")
            const res = await axiosInterceptor().get(
                // `/api/gym/schedule?gym=${gymId}`,
                `/api/gym/schedule?coachId=${router.query.ViewId}`,
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
                            // console.log("formattedDate", formattedDate)
                            filteredEvents.push(
                                ...eventsForDay.map(event => ({
                                    ...event,
                                    start: new Date(`${formattedDate} ${event.start}`),
                                    end: new Date(`${formattedDate} ${event.end}`),
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
    const getCoachScedule = async (id) => {
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
            to: lastDay.toISOString().slice(0, 10),
        }
        try {
            setLoading(true)
            console.log("api calling for schedule")
            const res = await axiosInterceptor().post(
                `/api/coach/my/schedule?coach=${router.query.ViewId}`,
                Payload,
            );
            console.log("responsse of schedule ID", res)
            res.data.map((item, index) => (
                item['event_id'] = item.id,
                item['title'] = item.type,
                item['start'] = new Date(formatTimestamp(new Date(item.from).toISOString())),
                item['end'] = new Date(formatTimestamp(new Date(item.to).toISOString())),
                item['editable'] = false,
                item['deletable'] = false,
                item['color'] = "#50b500"
            ))
            // setEvents(res.data);
            console.log("res.data coach", res.data[0])
            setEvents(prevState => [...prevState, ...res.data])
            
            // setEvents(prevState => [...prevState, res.data])
            setLoading(false)
        } catch (error) {
            setLoading(false)
            swal('Oops!', "No Data Found", 'error')
            console.log(error)
        }
    }
    const getCoachBookings = async (id) => {
        try {
            setLoading(true)
            console.log("api calling for schedule")
            const res = await axiosInterceptor().get(
                `/api/bookings/all?coach=${router.query.ViewId}`,
            );
            console.log("responsse of coach bookings", res.data.data)
            setBookings(res.data.data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            swal('Oops!', error.data.message, 'error')
            console.log(error)
        }
    }
    const handleConfirm = async (event, action) => {
        console.log("handleConfirm =", action, event.title);
        console.log("evnets", event)
        if (action === "edit") {
        } else if (action === "create") {
            console.log("Id query", Id)
            const Payload = {
                from: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
                to: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
                type: event.TimeStatus,
                coach: router.query.ViewId,
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
    const handleApprove = async (id) => {
        try {
            setLoading(true)
            console.log("api calling for schedule")
            const res = await axiosInterceptor().put(
                `/api/bookings?id=${id}&status=ACCEPT`
            );
            setLoading(false)
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
                `/api/bookings?id=${id}&status=REJECT`,
            );
            setLoading(false)
            console.log("responsse of Reject", res)
        } catch (error) {
            setLoading(false)
            swal('Oops!', error.data.message, 'error')
            console.log(error)
        }
    }
    useEffect(() => {
        if (Id) {
            getGymScedule();
            getCoachScedule();
            getCoachBookings();
        }
    }, [showModal2, Id])
    console.log("all events", events);
    const closeModal2 = () => {
        setShowModal2(false);
    };
    const tableCell = [
        { id: 1, timeSlote: '9 - 10', child: 'wasiq', coach: 'mudasir' },
        { id: 2, timeSlote: '10 - 11', child: 'shakeel', coach: 'rohab' },
    ];
    useEffect(() => {
        schRef.current?.scheduler.handleState(events, "events")
        console.log("events in useeffect",events)
    }, [events])
    return (
        <div style={{ marginTop: "5%" }}>

            <React.Fragment >
                <Button style={{ width: "auto", marginLeft: "83%", marginTop: "2%" }} onClick={handleButtonClick2}>+</Button>
                {showModal2 && <AddCoache closeModal={closeModal2} id={Id} />}
                {showModal2 ?
                    <Style.MainDiv style={{ filter: showModal2 ? 'blur(5px)' : 'none', pointerEvents: showModal2 ? 'none' : 'auto' }}>
                        <div style={{ fontSize: "24px", color: "white", marginBottum: "20%", padding: "1%" }}>Schedule</div>
                        <Style.Schedular>
                            {/* <div style={{ fontSize: "24px", color: "white",marginBottum:"20%",padding:"1%" }}>Schedule</div> */}
                            {events.length > 0 ?
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
                                    }} />
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
                                        // step: 30
                                    }}
                                />}
                        </Style.Schedular>
                    </Style.MainDiv>
                    :
                    <Style.MainDiv2 style={{ filter: showModal2 ? 'blur(5px)' : 'none', pointerEvents: showModal2 ? 'none' : 'auto', marginTop: "0%" }} >
                        <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem", textAlign: "center" }}>Schedule </div>
                        <Style.Schedular >
                            {/* <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem",textAlign:"center"  }}>Schedule </div> */}
                            {events.length > 0 ?
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
                                    }} />
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
                                    }} />
                            }
                        </Style.Schedular>
                    </Style.MainDiv2>}
            </React.Fragment>
            <Style.SubTitle style={{ marginTop: "1rem", marginLeft: "5%", filter: showModal2 ? 'blur(5px)' : 'none', pointerEvents: showModal2 ? 'none' : 'auto', marginTop: "10%" }}>Booking Listing</Style.SubTitle>
            <Style.TableContainer style={{ filter: showModal2 ? 'blur(5px)' : 'none', pointerEvents: showModal2 ? 'none' : 'auto', marginTop: "30%", marginTop: "4%" }}>
                <Style.TableWrapper>
                    <thead>
                        <Style.TableRow>
                            <Style.TableHead>GYMNAST</Style.TableHead>
                            <Style.TableHead>COACH</Style.TableHead>
                            <Style.TableHead>TIME SLOT</Style.TableHead>
                            <Style.TableHead>ACTIONS</Style.TableHead>
                        </Style.TableRow>
                    </thead>
                    <tbody>
                        {bookings && bookings.map((data, index) => (
                            <Style.TableRow key={index}>
                                <Style.TableCell>{data.childrenId}</Style.TableCell>
                                <Style.TableCell>{data.coachId}</Style.TableCell>
                                <Style.TableCell>{new Date(data?.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} {"-"} {new Date(data?.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} </Style.TableCell>
                                {data.status === "PENDING"
                                    &&
                                    <Style.TableCell style={{ display: "flex", justifyContent: "space-evenly" }} >
                                        <AcceptButton onClick={() => {
                                            handleApprove(data.id);
                                        }}>Accept</AcceptButton>
                                        <RejectButton onClick={() => {
                                            handleReject(data.id);
                                        }}>Cancel</RejectButton>
                                    </Style.TableCell>
                                }
                                {data.status === "ACCEPT"
                                    &&
                                    <Style.TableCell style={{ display: "flex", justifyContent: "space-evenly" }}>
                                        <RejectButton onClick={() => {
                                            handleReject(data.id);
                                        }}>Cancel</RejectButton>
                                    </Style.TableCell>
                                }
                                {data.status === "REJECT"
                                    &&
                                    <Style.TableCell style={{ display: "flex", justifyContent: "space-evenly" }}>
                                        <AcceptButton onClick={() => {
                                            handleApprove(data.id);
                                        }}>Accept</AcceptButton>
                                    </Style.TableCell>
                                }
                            </Style.TableRow>
                        ))}
                    </tbody>
                </Style.TableWrapper>
            </Style.TableContainer>
            <Loader isLoading={loading}></Loader>
        </div>
    )
}

export default ViewId;
