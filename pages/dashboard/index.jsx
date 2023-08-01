import React, { useEffect, useState } from 'react';
import { Button } from '../../components/styledComponents/button/Button';
const index = () => {
  const [role, setRole] = useState("");
  // var userRole = ""
  // if (typeof window !== 'undefined') {
  //   userRole = JSON.parse(localStorage.getItem("Userrole"))
  // }

  useEffect(() => {
    // Perform localStorage action
    const userRole = JSON.parse(localStorage.getItem("Userrole"))
    setRole(userRole);
  }, [])


  return (
    <React.Fragment>
      <div style={{ fontSize: "24px", color: "white" }}> GYM Dashboard Admin </div> 
    </React.Fragment>
  )
}

export default index
