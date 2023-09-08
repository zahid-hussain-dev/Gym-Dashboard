'use client'
import { useState, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';
// dummy page for page.jsx client side rendering;
const NewPage = () => {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [userRole, setUserRole] = useState("");
    const userRole1 = localStorage.getItem("Userrole") != 'undefined' && JSON.parse(localStorage.getItem("Userrole"));
    const userLoginToken = localStorage.getItem("userLoginToken");

    useEffect(() => {
        // Perform localStorage action
        const userLoginToken = localStorage.getItem("userLoginToken");
        setToken(userLoginToken);

        const userRole1 = JSON.parse(localStorage.getItem("Userrole"))
        setUserRole(userRole1);

    }, [])
    console.log("token", userLoginToken)
    console.log("userRole", userRole1)

    if (userLoginToken && userRole1 === "admin") {
        return (
            router.push("/coaches")
        );
    }
    else if (userLoginToken && userRole1 === "gym") {
        router.push("/gym")
    }
    else if (userLoginToken && userRole1 === "gymnast") {
        router.push("/gymnast")
    }
    else if (userLoginToken && userRole1 === "coach") {
        router.push("/coaches")
    }
    else {
        router.push("/login")
    }
}

export default NewPage
