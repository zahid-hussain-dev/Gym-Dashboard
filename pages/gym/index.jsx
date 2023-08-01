import React, {useState,useEffect} from 'react'
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "../../components/MainComponents/Events";
import { Button } from '../../components/styledComponents/button/Button';

const index = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
      // Perform localStorage action
      const userRole = JSON.parse(localStorage.getItem("Userrole"))
      setRole(userRole);
  }, [])
  return (
    <div>
    {role && (role==="admin" || role==="gym") &&
      <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }}>Add Gym Schedule</Button>
  }
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

export default index
