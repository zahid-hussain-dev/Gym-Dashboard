import React, { useState, useEffect } from 'react'
import * as Style from "./style/dropdown";
import Image from 'next/image';
import { useRouter } from 'next/router';
import user from "@/public/assests/SVGs/user-svgrepo-com.svg";

const DropdownUser = () => {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    useEffect(() => {
        // Perform localStorage action
        let data = JSON.parse(localStorage.getItem("userData"));
       
        const user = data?.userName;
        console.log("heloooo=======",data)
        setUserName(user)

    }, [])


    const [isOpen, setIsOpen] = useState(false);
    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    };
    const handleLogoutClick = () => {
        // Perform  logic here
        console.log('Logout clicked');
        // e.preventDefault();
        localStorage.removeItem("userLoginToken");
        localStorage.removeItem("role");
        localStorage.removeItem("otp");
        localStorage.removeItem("userData");
        localStorage.removeItem("Userrole");

        router.push("/login");
        setIsOpen(!isOpen);
    }
    return (
        <Style.DropdownContainer>
            <Style.DropdownButton onClick={handleDropdownClick}>
                <span style={{color:"white"}}>{userName} </span>
                <Image style={{ verticalAlign: "middle", cursor: "pointer",color:"black" }} src={user} height="25" width="30" alt="asset-planet-logo" />
            </Style.DropdownButton>
            <Style.DropdownContent open={isOpen}>
                <Style.DropdownItem onClick={handleLogoutClick}>Logout</Style.DropdownItem>
            </Style.DropdownContent>
        </Style.DropdownContainer>

    )
}

export default DropdownUser
