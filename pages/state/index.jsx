import React, { useState, useEffect } from 'react';
import { Button, ViewButton, AcceptButton, RejectButton } from '../../components/styledComponents/button/Button';
import * as Style from "../../components/styledComponents/state/State";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import Loader from '../../components/styledComponents/loader/loader';
import swal from "sweetalert";
import moment from "moment";

const index = () => {
    const [role, setRole] = useState("");
    const router = useRouter();
    const [showModal2, setShowModal2] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const [allStates, setAllStates] = useState([]);
    const dispatch = useDispatch();
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

    const getAllStates = async () => {
        try {
            setLoading(true)
            console.log("api calling for all states")
            const res = await axiosInterceptor().get(
                `/api/states`,
            );
            console.log("responsse of all states=======", res.data.data)
            setAllStates(res.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    useEffect(() => {
        getAllStates();

    }, [])

    console.log("evnts all", events)
    return (
        <div style={{ marginTop: "10%" }}>
            {role && role === "admin" &&
                <React.Fragment >
                    <Style.TableContainer style={{ marginTop: "5%" }}>
                        <Style.TableWrapper>
                            <thead>
                                <Style.TableRow>
                                    <Style.TableHead>ID</Style.TableHead>
                                    <Style.TableHead>STATES</Style.TableHead>
                                </Style.TableRow>
                            </thead>
                            <tbody>
                                {allStates && allStates.map((data, index) => (
                                    <Style.TableRow2 key={index}>
                                        <Style.TableCell>{data?.id}</Style.TableCell>
                                        <Style.TableCell>{data?.name}</Style.TableCell>
                                    </Style.TableRow2>
                                ))}
                            </tbody>
                        </Style.TableWrapper>
                    </Style.TableContainer>
                </React.Fragment>
            }
            <Loader isLoading={loading}></Loader>
        </div>
    )
}

export default index
