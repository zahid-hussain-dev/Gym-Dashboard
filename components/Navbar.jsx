import React from 'react';
import Image from "next/image";
import logo from "@/public/assests/Images/logo.png";
import { useRouter } from 'next/router';
import DropdownUser from "@/components/styledComponents/dropdown/dropdownUser";
const Navbar = () => {
  const router = useRouter()
  return (
    // <div style={{  height: "fit-content", width: "auto", padding: "8px", boxShadow: "2px 2px #1F1D13",position:"sticky",top:"0" }}>
    //   <div
    //     style={{
    //       minHeight: "60px",
    //       background: "#1F1D13",
    //       align: "middle",
    //       justify: "center",
    //     }}
    //   >
    //     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
    //     >
    //       <div >
    //         <React.Fragment></React.Fragment>
    //       </div>
    //       <div >
    //         <div style={{ display: "flex", alignItems: "center", color: "white" }}>
    //           <Image src={logo} alt='logo' width={100} height={60} />
    //         </div>
    //       </div>
    //       <div >
    //         <div style={{ marginRight: "20px" }}>
    //           {router.asPath === "/signup" || router.asPath === "/login" ?
    //             <React.Fragment></React.Fragment>
    //             :
    //             <DropdownUser />
    //           }
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='nav-main'>
      <div></div>
      <div style={{marginLeft:"0%"}}><Image src={logo} alt='logo' width={100} height={60} /></div>
      <div>
      {router.asPath === "/signup" || router.asPath === "/login" ?
                <React.Fragment></React.Fragment>
                :
                <DropdownUser />
              }
      </div>
    </div>

  )
}

export default Navbar
