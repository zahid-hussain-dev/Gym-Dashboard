import React from 'react';
import Image from "next/image";
import logo from "@/public/assests/Images/logo.png";
import { useRouter } from 'next/router';
import DropdownUser from "@/components/styledComponents/dropdown/dropdownUser";
const Navbar = () => {
  const router = useRouter()
  return (
    <div style={{ background: "#1F1D13", height: "fit-content", width: "auto", padding: "8px", boxShadow: "2px 2px #1F1D13", }}>
      <div
        style={{
          minHeight: "60px",
          background: "#1F1D13",
          // display: "flex",
          align: "middle",
          justify: "center",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <div >
            <React.Fragment></React.Fragment>
          </div>
          <div >
            <div style={{ display: "flex", alignItems: "center", color: "white" }}
            >
              <Image src={logo} alt='logo' width={100} height={60} />
            </div>
          </div>
          <div >
            <div style={{ marginRight: "20px" }}>
              {router.asPath === "/signup" || router.asPath === "/login" ?
                <React.Fragment></React.Fragment> :
                <React.Fragment>
                  <DropdownUser />
                </React.Fragment>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
