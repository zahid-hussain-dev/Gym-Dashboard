import React, {useState} from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "../../../components/MainComponents/Events";
import { Button } from '../../../components/styledComponents/button/Button';
import * as Style from "../../../components/styledComponents/coachesStyle/coaches";
import AddCoache from '../../../components/styledComponents/modal/AddCoache'
import { useRouter } from 'next/router';

const ViewId = () => {
    const router = useRouter();
    const Id = router.query.ViewId;
    const [showModal2, setShowModal2] = useState(false);

    const handleButtonClick2 = () => {
        setShowModal2(true);
        console.log("modal click")
    };

    const closeModal2 = () => {
        setShowModal2(false);
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
        </Style.MainDiv2>    }
            </React.Fragment>

        </div>
    )
}

export default ViewId
