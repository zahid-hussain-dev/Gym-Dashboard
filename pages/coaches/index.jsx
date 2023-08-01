import React, { useState, useEffect } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "../../components/MainComponents/Events";
import { Button } from '../../components/styledComponents/button/Button';
import * as Style from "../../components/styledComponents/coachesStyle/coaches";

const index = () => {
    const [role, setRole] = useState("");
    useEffect(() => {
        // Perform localStorage action
        const userRole = JSON.parse(localStorage.getItem("Userrole"))
        setRole(userRole);
    }, [])

    return (
        <div>
            {role && role === "admin" &&
                <Button style={{ width: "auto", marginBottom: "1rem" }}>Approve</Button>
            }
            <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }}>Add Schedule</Button>

            <Style.MainDiv>
                <Style.Schedular >
                    <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem" }}> Private Schedule </div>
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
                <Style.Schedular>
                    <div style={{ fontSize: "24px", color: "white", marginBottom: "1rem" }}> Public Schedule </div>
                    <Scheduler
                        // height={300}
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
        </div>
    )
}

export default index
