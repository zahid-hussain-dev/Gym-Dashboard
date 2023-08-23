import React, { useState, useEffect } from 'react';
import { Button, ViewButton, AcceptButton, RejectButton } from '../../components/styledComponents/button/Button';
import * as Style from "../../components/styledComponents/state/State";
import { useRouter } from 'next/navigation';
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import Loader from '../../components/styledComponents/loader/loader';
import swal from "sweetalert";
import moment from "moment";
import { useDispatch,useSelector  } from "react-redux";
import AddCities from "../../../Gym-Dashboard/components/styledComponents/modal/AddCities"
const index = () => {
    const [role, setRole] = useState("");
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCitiesModal, setShowCitiesModal] = useState(false);
    const [allCities, setAllCities] = useState([]);
    const dispatch = useDispatch();
   

    const getRequest = useSelector((state) => state.user.getRequest);
    console.log("GetRequest", getRequest)

    useEffect(() => {
        // Perform localStorage action
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
    console.log("evnts all", events)
    return (
        <div style={{ marginTop: "10%" }}>
                <div style={{marginTop: "10%", display:"flex", justifyContent:"space-around",alignItems:"center" }}>
                <h2 style={{color:"white",marginRight:"40%"}}> City Listing</h2>
                <div>
                <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} >Add Cities</Button>
                <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem"  }} onClick={handleAddChildClick} >+</Button>
               </div>
      {showCitiesModal && <AddCities onClose={handleCloseCitiesModal} />}
      </div>
            {role && role === "admin" &&
                <React.Fragment >
                    <Style.TableContainer style={{ marginTop: "5%", filter: showCitiesModal ? 'blur(5px)' : 'none' }}>
                        <Style.TableWrapper>
                            <thead>
                                <Style.TableRow>
                                    <Style.TableHead>ID</Style.TableHead>
                                    <Style.TableHead>CITIES</Style.TableHead>
                                    <Style.TableHead>STATE</Style.TableHead>
                                </Style.TableRow>
                            </thead>
                            <tbody>
                                {allCities && allCities.map((data, index) => (
                                    <Style.TableRow2 key={index}>
                                        <Style.TableCell>{data?.id}</Style.TableCell>
                                        <Style.TableCell>{data?.name}</Style.TableCell>
                                        <Style.TableCell>{data['state.name']}</Style.TableCell>
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
