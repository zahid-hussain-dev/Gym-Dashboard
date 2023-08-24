import React, { useState, useEffect } from 'react';
import { Button, ViewButton, AcceptButton, RejectButton } from '../../components/styledComponents/button/Button';
import * as Style from "../../components/styledComponents/state/State";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import Loader from '../../components/styledComponents/loader/loader';
import swal from "sweetalert";
import moment from "moment";
import AddState from "../../components/styledComponents/modal/AddState"
import UpdateState from "../../components/styledComponents/modal/UpdateState"
const index = () => {
    const [role, setRole] = useState("");
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showStateModal, setShowStateModal] = useState(false);
    const [showUpdateStateModal, setShowUpdateStateModal] = useState(false);
    const [clickedId, setClickedId]= useState();
    const [allStates, setAllStates] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
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
    // const updateState = async (id) => {
    //     try {
    //         setLoading(true)
    //         setShowUpdateStateModal(true);
    //         console.log("api calling for update states")
    //         const res = await axiosInterceptor().put(
    //             `/api/states?id=${id}`,
    //         );
    //         setLoading(false);
    //         getAllStates();
    //     } catch (error) {
    //         setLoading(false)
    //         console.log(error)
    //     }
    // }
    const deleteState = async (id) => {
        try {
            setLoading(true)
            console.log("api calling for delete states")
            const res = await axiosInterceptor().delete(
                `/api/states?id=${id}`,
            );
            setLoading(false);
            getAllStates();
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    useEffect(() => {
        getAllStates();
   
    }, [])
    const handleAddChildClick = () => {
        setShowStateModal(true);
      };
      const handleCloseStateModal = () => {
        setShowStateModal(false);
        console.log("modal false")
        getAllStates();
      };
      const handleUpdateStateClick = () => {
        setShowUpdateStateModal(true);
      };
      const handleCloseUpdateStateModal = () => {
        setShowUpdateStateModal(false);
        console.log("modal false")
        getAllStates();
      };
    console.log("evnts all", events)
    return (
        <div style={{ marginTop: "10%" }}>
                <div style={{marginTop: "10%", display:"flex", justifyContent:"space-between",alignItems:"center" }}>
                <h2 style={{color:"white",marginRight:"40%"}}> States Listing</h2>
                <div style={{marginRight:"10%"}}>
      <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} >Add State</Button>
      <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem"  }} onClick={handleAddChildClick} >+</Button>
      </div>
      {showStateModal && <AddState onClose={handleCloseStateModal} />}
      {showUpdateStateModal && <UpdateState onClose={handleCloseUpdateStateModal} id={clickedId}/>}
      </div>
            {role && role === "admin" &&
                <React.Fragment >
                    <Style.TableContainer style={{ marginTop: "5%", filter: showStateModal ? 'blur(5px)' : 'none' }}>
                        <Style.TableWrapper>
                            <thead>
                                <Style.TableRow>
                                    <Style.TableHead>ID</Style.TableHead>
                                    <Style.TableHead>STATES</Style.TableHead>
                                    <Style.TableHead>ACTIONS</Style.TableHead>
                                </Style.TableRow>
                            </thead>
                            <tbody>
                                {allStates && allStates.map((data, index) => (
                                    <Style.TableRow2 key={index}>
                                        <Style.TableCell>{data?.id}</Style.TableCell>
                                        <Style.TableCell>{data?.name}</Style.TableCell>
                                        <Style.TableCell style={{ display: "flex", justifyContent: "space-evenly" }}>

                                            <AcceptButton onClick={() => {
                                                handleUpdateStateClick() 
                                                setClickedId(data.id)
                                            }} >Update</AcceptButton>

                                            <RejectButton onClick={() => {
                                                deleteState(data?.id)
                                            }} >Delete</RejectButton>


                                        </Style.TableCell>
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
