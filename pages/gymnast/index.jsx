import React, { useState, useEffect } from 'react'
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

            {role && role === "coach" ?
                <Button style={{ width: "auto", marginBottom: "1rem" }}>Approve Private Booking</Button>
                : <>gymnast listing</>
            }

        </div>
    )
}

export default index
