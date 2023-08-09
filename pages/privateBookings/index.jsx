import React, { useState, useEffect } from 'react'
import { Button, AcceptButton, RejectButton } from '../../components/styledComponents/button/Button';
import Image from "next/image";
import * as Style from '../../components/styledComponents/gymnast/Gymnast';
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import Loader from '../../components/styledComponents/loader/loader';
import moment from "moment";
import swal from "sweetalert";

const index = () => {
    const [role, setRole] = useState("");
    useEffect(() => {
        // Perform localStorage action
        const userRole = JSON.parse(localStorage.getItem("Userrole"))
        setRole(userRole);
    }, [])
    const [loading, setLoading] = useState(false);
    const [privateBookings, setPrivateBookings] = useState(false);


    const getPrivateBookings = async () => {
        try {
            setLoading(true)
            console.log("api calling for private")
            const res = await axiosInterceptor().get(
                `/api/bookings`,
            );
            setLoading(false)
            console.log("responsse of Private", res)
            setPrivateBookings(res.data.data)
        } catch (error) {
            setLoading(false)
            swal('Oops!', error.data.message, 'error')
            console.log(error)
        }
    }
    const handleApprove = async (id) => {
        try {
            setLoading(true)
            console.log("api calling for schedule")
            const res = await axiosInterceptor().put(
                // `/api/bookings`,
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
        getPrivateBookings();
    }, [])

    const tableCell = [
        { timeSlote: '9 - 10', client: 'wasiq' },
        { timeSlote: '10 - 11', client: 'shakeel' },
    ];
    return (
        <div>
            <Button style={{ width: "auto", marginBottom: "1rem" }}>Approve Private Booking</Button>
            <Style.TableContainer>
                <Style.TableWrapper>
                    <thead>
                        <Style.TableRow>
                            <Style.TableHead>Client</Style.TableHead>
                            <Style.TableHead>TIME SLOT</Style.TableHead>
                            <Style.TableHead>ACTIONS</Style.TableHead>

                        </Style.TableRow>
                    </thead>
                    <tbody>
                        {privateBookings && privateBookings.map((data, index) => (
                            <Style.TableRow key={index}>
                                <Style.TableCell>{data.coach.userName}</Style.TableCell>
                                <Style.TableCell>{new Date(data?.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', })} {"-"} {new Date(data?.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', })} </Style.TableCell>
                                {data.status === "PENDING"
                                    ?
                                    <Style.TableCell>
                                        <AcceptButton onClick={() => {
                                            handleApprove(data.id);

                                        }}>Accept</AcceptButton>
                                        <RejectButton onClick={() => {
                                            handleReject(data.id);

                                        }}>Reject</RejectButton>
                                    </Style.TableCell>
                                    :
                                    <Style.TableCell>
                                        {data.status === "REJECT" ?
                                            <p style={{ color: "#ff0000"  }}>  {data.status}ED</p>
                                            :
                                            <p style={{ color: "#00753D" }}>  {data.status}ED</p>

                                        }
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

export default index