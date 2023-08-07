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
    useEffect(() => {

        getCoachScedule();
    }, [showModal2])
    const closeModal2 = () => {
        setShowModal2(false);
        // const modalElement = document.getElementById('modal');
        // modalElement.style.filter = 'blur(5px)';
    };
    const tableCell = [
        { id: 1, timeSlote: '9 - 10', child: 'wasiq', coach: 'mudasir' },
        { id: 2, timeSlote: '10 - 11', child: 'shakeel', coach: 'rohab' },
    ];
    return (
        <div>
            ViewId details {Id}
            <React.Fragment>
                <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} onClick={handleButtonClick2}>Add Schedule</Button>
                {showModal2 && <AddCoache closeModal={closeModal2} />}
                {showModal2 ?
                    <Style.MainDiv>
                        <Style.Schedular style={{ filter: showModal2 ? 'blur(5px)' : 'none' }} >
                            <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem" }}>Schedule </div>
                            <Scheduler
                                // height={300}
                                // loading={true}
                                onSelectedDateChange={false}
                                events={EVENTS}
                                week={{
                                    weekDays: [0, 1, 2, 3, 4, 5, 6],
                                    weekStartOn: 6,
                                    startHour: 9,
                                    endHour: 24
                                    // step: 30
                                }}
                            />
                        </Style.Schedular>
                    </Style.MainDiv>
                    :
                    <Style.MainDiv2>
                        <Style.Schedular >
                            <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem" }}>Schedule </div>
                            <Scheduler
                                // height={300}
                                // loading={true}
                                onSelectedDateChange={false}
                                events={EVENTS}
                                week={{
                                    weekDays: [0, 1, 2, 3, 4, 5, 6],
                                    weekStartOn: 6,
                                    startHour: 9,
                                    endHour: 24
                                    // step: 30
                                }}
                            />
                        </Style.Schedular>
                    </Style.MainDiv2>}
            </React.Fragment>

        </div>
    )
}

export default ViewId
