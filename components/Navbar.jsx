import React from 'react';
import Image from "next/image";
import logo from "@/public/assests/Images/asset-planet-background.png";
import user from "@/public/assests/SVGs/user.svg";
import { useRouter } from 'next/router';
import DropdownUser from "@/components/styledComponents/dropdown/dropdownUser";
const Navbar = () => {
  const router = useRouter()
  return (
    <div style={{ background: "white", height: "fit-content", width: "auto", padding: "8px" }}>
      <div
        // className="content-page"
        style={{
          minHeight: "60px",
          // padding: isMobile ? "0 12px" : "0 20px",
          background: "#FFF",
          displat: "flex",
          align: "middle",
          justify: "center"
        }}
      >
        <div >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          //  type="flex" align="middle"
          >
            <div >
              <React.Fragment></React.Fragment>
            </div>
            <div >
              <div style={{ display: "flex", alignItems: "center" }}
              //  type="flex" justify="center"
              >
                <Image src={logo} height="45" width="300" alt="asset-planet-logo" />
              </div>
            </div>
            <div >
              <div style={{ marginRight: "20px" }}>
                {router.asPath === "/otpValidate" || router.asPath === "/signup" || router.asPath === "/login" ?
                  <React.Fragment></React.Fragment> :
                  <React.Fragment>
                    <DropdownUser />
                    {/* <Image style={{ verticalAlign: "middle", cursor: "pointer" }} src={user} height="25" width="30" alt="asset-planet-logo" /> */}
                  </React.Fragment>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
