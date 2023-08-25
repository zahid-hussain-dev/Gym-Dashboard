import React, { useState, useEffect } from 'react';
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import { Button, RejectButton,UpdateButton } from '../../components/styledComponents/button/Button';
import * as Style from '../../components/styledComponents/gymnast/Gymnast';
import { useRouter } from 'next/router'; 
import AddChildren from "../../components/styledComponents/modal/AddChildren"
import UpdateChild from "../../components/styledComponents/modal/UpdateChild"
import Loader from '../../components/styledComponents/loader/loader'

const Index = () => {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [childList, setChildList] = useState([]);
  const [showModal5, setShowModal5] = useState(false);
  const [showModalUpdate, setshowModalUpdate] = useState(false);
  const [clickedId, setClickedId]= useState();
  const [clickUpdateChild, setClickUpdateChild]= useState();

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem("Userrole"));
    setRole(userRole);
    getChildList();
  }, []);
  const Id = router.query.ViewId;
  const getChildList = async () => {
    try {
      setLoading(true)
      console.log("api calling for child list")
      const res = await axiosInterceptor().get(
        `/api/gymnast/children?gymnast=${router.query.ViewId}`,
      );
      console.log("responsse of children ID", res)
      setLoading(false)
      setChildList(res?.data?.result)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }

  const handleAddChildClick = () => {
    setShowModal5(true);
  };
  const handleUpdateChildClick = () => {
    setshowModalUpdate(true);
  };
  const handleCloseModal5 = () => {
    setShowModal5(false);
    getChildList();
  };
  useEffect(() => {
    getChildList();
  }, [showModalUpdate]);
  const deleteChild = async (id) => {
    try {
      setLoading(true)
      console.log("api calling for child list")
      const res = await axiosInterceptor().delete(
        `/api/gymnast/children?id=${id}`,
      );
      console.log("responsse of children ID", res)
      setLoading(false)
      getChildList();
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const handleCloseModalUpdate = () => {
    setshowModalUpdate(false);
    setLoading(true);
    getChildList();
  };
  useEffect(() => {
    if (Id && role == "admin") {
      getChildList();
      getBookingList();
    }
    if (Id && role == "gymnast") {
      getGymnastChildList();
      getGymnastBookingList();
    }
  }, [Id, role])
  return (
    <div style={{marginTop: "10%" }}>
        {Id}
      <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem" }} >Add Child</Button>
      <Button style={{ width: "auto", marginBottom: "1rem", marginLeft: "1rem"  }} onClick={handleAddChildClick} >+</Button>
      <div>
        {showModal5 && <AddChildren onClose={handleCloseModal5} />}
        {showModalUpdate && <UpdateChild onClose={handleCloseModalUpdate} id={clickedId} childUpdate={clickUpdateChild} />}
        <Style.TableContainer style={{  filter: showModal5 || showModalUpdate ? 'blur(5px)' : 'none', pointerEvents: showModal5 || showModalUpdate ? 'none' : 'auto'  }} >
          <Style.TableWrapper >
            <thead>
              <Style.TableRow>
                <Style.TableHead>ID</Style.TableHead>
                <Style.TableHead>CHILD</Style.TableHead>
                <Style.TableHead>ACTIONS</Style.TableHead>
              </Style.TableRow>
            </thead>
            <tbody>
            {
              childList && childList.map((data, index) => (
                <Style.TableRow key={index}>
                  <Style.TableCell>{data?.id}</Style.TableCell>
                  <Style.TableCell>{data?.name}</Style.TableCell>
                  <Style.TableCell>
                  <RejectButton onClick={() => { console.log(data.id); deleteChild(data.id) }}>Delete</RejectButton>
                    <UpdateButton onClick={()=>{
                      handleUpdateChildClick(); 
                      setClickUpdateChild(data?.name)
                      setClickedId(data.id)
                    }}>Update</UpdateButton>
                  </Style.TableCell>

                </Style.TableRow>
              ))}
            </tbody>
          </Style.TableWrapper>
        </Style.TableContainer>
        <Loader isLoading={loading}></Loader>
      </div>
    </div>
  );
};

export default Index;
