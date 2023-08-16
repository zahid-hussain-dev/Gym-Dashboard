import React, { useEffect, useState } from 'react';
import { Button } from '../../components/styledComponents/button/Button';
import AddUserForm from '../../components/styledComponents/modal/AddUserForm';
import AddCoache from '../../components/styledComponents/modal/AddCoache'
import Loader from '../../components/styledComponents/loader/loader';
const index = () => {
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  // var userRole = ""
  // if (typeof window !== 'undefined') {
  //   userRole = JSON.parse(localStorage.getItem("Userrole"))
  // }


  const handleButtonClick2 = () => {
    setShowModal2(true);
    setShowModal(false);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };


  const handleButtonClick = () => {
    setShowModal(true);
    setShowModal2(false);
    setLoading(true)
  };

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    // Perform localStorage action
    const userRole = JSON.parse(localStorage.getItem("Userrole"))
    setRole(userRole);
  }, [])


  return (
    <React.Fragment >
      <div style={{ fontSize: "24px", color: "white", textAlign: "center" }}> GYM Dashboard </div>
      <div style={{ fontSize: "24px", color: "white", display: "flex", justifyContent: "space-between", margin: "30px" }}>
        {role && role === "admin" ?
          <Button style={{ width: "auto" }} onClick={handleButtonClick}>Add Coach</Button>
          :

          <Button style={{ width: "auto" }}>New</Button>
        }
        {role && role === "admin" ?
          <Button style={{ width: "auto" }} onClick={handleButtonClick2}>Add Booking</Button>
          :

          <Button style={{ width: "auto" }}>New</Button>
        }
      </div>
      {showModal && <AddUserForm closeModal={closeModal} />}
      {showModal2 && <AddCoache closeModal={closeModal2} />}
      <Loader isLoading={loading}></Loader>
    </React.Fragment>
   
  )
}

export default index
