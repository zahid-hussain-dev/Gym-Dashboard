import React, { useState, useEffect } from 'react';
import { axiosInterceptor } from '../../axios/axiosInterceptor';
import { Button, RejectButton } from '../../components/styledComponents/button/Button';
import * as Style from '../../components/styledComponents/gymnast/Gymnast';
import { useRouter } from 'next/router'; 
import AddChildren from "../../components/styledComponents/modal/AddChildren"

const Index = () => {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [childList, setChildList] = useState([]);
  const [showModal5, setShowModal5] = useState(false);

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem("Userrole"));
    setRole(userRole);
    getChildList();
  }, []);
  const Id = router.query.ViewId;
  const getChildList = async (id) => {
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
  
  const handleCloseModal5 = () => {
    setShowModal5(false);
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
        <Style.TableContainer style={{ filter: showModal5 ? 'blur(5px)' : 'none',marginTop: "5%"  }} >
          <Style.TableWrapper>
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
                    <RejectButton onClick={() => { console.log(data.id) }}>Delete</RejectButton>
                  </Style.TableCell>

                </Style.TableRow>
              ))}
            </tbody>
          </Style.TableWrapper>
        </Style.TableContainer>
      </div>
    </div>
  );
};

export default Index;
