import React, { useState, useEffect } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "../../../components/MainComponents/Events";
import { Button } from '../../../components/styledComponents/button/Button';
import * as Style from "../../../components/styledComponents/coachesStyle/coaches";
import AddCoache from '../../../components/styledComponents/modal/AddCoache';
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import { useRouter } from 'next/router';

const ViewId = () => {
    const router = useRouter();
    const Id = router.query.ViewId;
    const [showModal2, setShowModal2] = useState(false);
    const [loading, setLoading] = useState(false);

    const [events, setEvents] = useState([]);

    const handleButtonClick2 = () => {
        setShowModal2(true);
        console.log("modal click")
    };

    // const closeModal2 = () => {
    //     setShowModal2(false);
    // };
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
            from: "2023-07-25",
            to: "2023-07-26"
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
    const handleConfirm = async (event, action) => {
        console.log("handleConfirm =", action, event.title);

        if (action === "edit") {
            /** PUT event to remote DB */
        } else if (action === "create") {
            /**POST event to remote DB */
            const Payload = {
                from: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
                to: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
                type: "PUBLIC",
                coach: Id,
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
        if (Id) {

            getCoachScedule();
        }

    }, [showModal2, Id])
    const closeModal2 = () => {
        setShowModal2(false);
        // const modalElement = document.getElementById('modal');
        // modalElement.style.filter = 'blur(5px)';
    };
    return (
        <div>
            <React.Fragment>
                <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} onClick={handleButtonClick2}>Add Schedule</Button>
                {showModal2 && <AddCoache closeModal={closeModal2} id={Id} />}
                {showModal2 ?
                    <Style.MainDiv>
                        <Style.Schedular style={{ filter: showModal2 ? 'blur(5px)' : 'none' }} >
                            <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem" }}>Schedule </div>
                            {events.length > 0 ?
                                <Scheduler
                                    // height={300}
                                    // loading={true}
                                    onSelectedDateChange={false}
                                    events={events}
                                    onConfirm={handleConfirm}
                                    week={{
                                        weekDays: [0, 1, 2, 3, 4, 5, 6],
                                        weekStartOn: 6,
                                        startHour: 9,
                                        endHour: 24
                                        // step: 30
                                    }}
                                />

                                :
                                <div style={{ fontSize: "18px", color: "white", marginBottom: "1rem" }}>No Schedule Exist for this Coach {Id} </div>
                            }
                        </Style.Schedular>

                    </Style.MainDiv>
                    :
                    <Style.MainDiv2>
                        <Style.Schedular >
                            <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem" }}>Schedule </div>
                            {events.length > 0 ?

                                <Scheduler
                                    // height={300}
                                    // loading={true}
                                    onSelectedDateChange={false}
                                    events={events}
                                    onConfirm={handleConfirm}
                                    week={{
                                        weekDays: [0, 1, 2, 3, 4, 5, 6],
                                        weekStartOn: 6,
                                        startHour: 9,
                                        endHour: 24
                                        // step: 30
                                    }}
                                />
                                :
                                <div style={{ fontSize: "18px", color: "white", marginBottom: "1rem" }}>No Schedule Exist for this Coach {Id} </div>

                            }
                        </Style.Schedular>
                    </Style.MainDiv2>}
            </React.Fragment>

        </div>
    )
}

export default ViewId
