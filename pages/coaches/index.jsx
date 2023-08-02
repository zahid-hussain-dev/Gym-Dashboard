import React, { useState, useEffect } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "../../components/MainComponents/Events";
import { Button } from '../../components/styledComponents/button/Button';
import * as Style from "../../components/styledComponents/coachesStyle/coaches";
import AddCoache from '../../components/styledComponents/modal/AddCoache'
import { useRouter } from 'next/navigation';

const index = () => {
    const [role, setRole] = useState("");
    const router = useRouter();
    const [showModal2, setShowModal2] = useState(false);

    const handleButtonClick2 = () => {
        setShowModal2(true);
        console.log("modal click")
    };

    const closeModal2 = () => {
        setShowModal2(false);
    };
    useEffect(() => {
        // Perform localStorage action
        const userRole = JSON.parse(localStorage.getItem("Userrole"))
        setRole(userRole);
    }, [])
    const tableCell = [
        { id: 1,  gym: 'Gym1', coach: 'mudasir' },
        { id: 2,  gym: 'Gym2', coach: 'rohab' },
    ];
    return (
        <div>
            {role && role === "admin" &&
                <React.Fragment>
                    <Style.TableContainer>
                        <Style.TableWrapper>
                            <thead>
                                <Style.TableRow>
                                    <Style.TableHead>COACH</Style.TableHead>
                                    <Style.TableHead>GYM</Style.TableHead>
                                    <Style.TableHead>ACTIONS</Style.TableHead>

                                </Style.TableRow>
                            </thead>
                            <tbody>
                                {tableCell.map((data, index) => (
                                    <Style.TableRow key={index}>
                                        <Style.TableCell>{data.coach}</Style.TableCell>
                                        <Style.TableCell>{data.gym}</Style.TableCell>
                                        <Style.TableCell>
                                            {role === "admin" &&

                                                <button onClick={() => { router.push(`/coaches/view/${data.id}`) }}>View</button>
                                            }
                                        </Style.TableCell>

                                    </Style.TableRow>
                                ))}
                            </tbody>
                        </Style.TableWrapper>
                    </Style.TableContainer>
                </React.Fragment>
            }
            {role && role!=="admin" &&
            <React.Fragment>
            <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} onClick={handleButtonClick2}>Add Schedule</Button>
            {showModal2 && <AddCoache closeModal={closeModal2} />}

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
            </React.Fragment>
         }
        </div>
    )
}

export default index
