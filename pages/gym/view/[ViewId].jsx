import React, {useState} from 'react'
import { useRouter } from 'next/router';
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "../../../components/MainComponents/Events";
import { Button } from '../../../components/styledComponents/button/Button';
import AddGymSchedule from '../../../components/styledComponents/modal/AddGymSchedule';

const ViewId = () => {
    const router = useRouter();
    const Id = router.query.ViewId;
    const [showModal, setShowModal] = useState(false);
    const handleButtonClick = () => {
      setShowModal(true);
      console.log("modal click")
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  

    return (
        <div>
            ViewId details {Id}
            <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} onClick={handleButtonClick}>Add Gym Schedule</Button>
            {showModal && <AddGymSchedule closeModal={closeModal} />}

            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ width: "45%", height: "50%" }}>
                    <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem" }}>Gym Schedule </div>
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
                </div>

            </div>
        </div>
    )
}

export default ViewId
