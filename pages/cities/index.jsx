import React, { useState, useEffect } from 'react';
import { Button, ViewButton, AcceptButton, RejectButton } from '../../components/styledComponents/button/Button';
import * as Style from "../../components/styledComponents/state/State";
import { useRouter } from 'next/navigation';
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import Loader from '../../components/styledComponents/loader/loader';
import { useDispatch,useSelector  } from "react-redux";
import AddCities from "../../components/styledComponents/modal/AddCities"
import UpdateCities from "../../components/styledComponents/modal/UpdateCity"
const index = () => {
    const [role, setRole] = useState("");
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCitiesModal, setShowCitiesModal] = useState(false);
    const [showUpdateCitiesModal, setShowUpdateCitiesModal] = useState(false);
    const [allCities, setAllCities] = useState([]);
    const [clickedId, setClickedId]= useState();
    const [clickedName, setClickedName]= useState();
    const [clickedStateName, setClickedStateName]= useState();
    const dispatch = useDispatch();
    const getRequest = useSelector((state) => state.user.getRequest);
    console.log("GetRequest", getRequest)
    useEffect(() => {
        const userRole = JSON.parse(localStorage.getItem("Userrole"))
        setRole(userRole);
    }, [])
    const getAllCities = async () => {
        try {
            setLoading(true)
            console.log("api calling for all states")
            const res = await axiosInterceptor().get(
                `/api/city`,
            );
            console.log("responsse of all states=======", res.data.data)
            setAllCities(res.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    useEffect(() => {
        getAllCities();
    }, [getRequest])
    const handleAddChildClick = () => {
      setShowCitiesModal(true);
      };
      const handleCloseCitiesModal = () => {
        setShowCitiesModal(false);
        setLoading(true)
        getAllCities();
      };
      const handleUpdateCityClick = () => {
        setShowUpdateCitiesModal(true);
        };
      const handleCloseUpdateModal = () => {
        setShowUpdateCitiesModal(false);
        setLoading(true)
        getAllCities();
      };
      const deleteCity = async (id) => {
        try {
            setLoading(true)
            console.log("api calling for delete City")
            const res = await axiosInterceptor().delete(
                `/api/city?id=${id}`,
            );
            setLoading(false);
            getAllCities();
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    console.log("evnts all", events)
    return (
        <div style={{ marginTop: "10%" }}>
                <div style={{marginTop: "10%", display:"flex", justifyContent:"space-between",alignItems:"center" }}>
                <h2 style={{color:"white",marginRight:"40%"}}> City Listing</h2>
                <div style={{marginRight:"10%"}}>
                <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} >Add Cities</Button>
                <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem"  }} onClick={handleAddChildClick} >+</Button>
               </div>
      {showCitiesModal && <AddCities onClose={handleCloseCitiesModal} />}
      {showUpdateCitiesModal && <UpdateCities onClose={handleCloseUpdateModal} id={clickedId} stateName={clickedStateName} cityName={clickedName}/>}
      </div>
            {role && role === "admin" &&
                <React.Fragment >
                    <Style.TableContainer style={{ marginTop: "5%", filter: showCitiesModal || showUpdateCitiesModal ? 'blur(5px)' : 'none', pointerEvents: showCitiesModal || showUpdateCitiesModal ? 'none' : 'auto' }}>
                        <Style.TableWrapper >
                            <thead>
                                <Style.TableRow>
                                    {/* <Style.TableHead>ID</Style.TableHead> */}
                                    <Style.TableHead>CITIES</Style.TableHead>
                                    <Style.TableHead>STATE</Style.TableHead>
                                    <Style.TableHead>ACTIONS</Style.TableHead>
                                </Style.TableRow>
                            </thead>
                            <tbody>
                                {allCities && allCities.map((data, index) => (
                                    <Style.TableRow2 key={index}>
                                        {/* <Style.TableCell>{data?.id}</Style.TableCell> */}
                                        <Style.TableCell>{data?.name}</Style.TableCell>
                                        <Style.TableCell>{data['state.name']}</Style.TableCell>
                                        <Style.TableCell style={{ display: "flex", justifyContent: "space-evenly" }}>

                                            <AcceptButton onClick={() => {
                                                handleUpdateCityClick()
                                                // updateCity(data?.id);
                                                setClickedId(data.id)
                                                setClickedName(data.name)
                                                setClickedStateName(data['state.name'])
                                            }} >Update</AcceptButton>

                                            <RejectButton onClick={() => {
                                                deleteCity(data?.id)
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

export default index;
