import React from 'react';
import Image from "next/image";
import logo from "@/public/assests/Images/logo.png";
import { useRouter } from 'next/router';
import DropdownUser from "@/components/styledComponents/dropdown/dropdownUser";
const Navbar = () => {
  const router = useRouter()
  return (
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
