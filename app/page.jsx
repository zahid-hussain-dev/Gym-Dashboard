'use client'
import { useState, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    // Perform localStorage action
    const userLoginToken = localStorage.getItem("userLoginToken");
    setToken(userLoginToken);

    const userRole1 = JSON.parse(localStorage.getItem("Userrole"))
    setUserRole(userRole1);

  }, [])

  if (token && userRole === "admin") {
    return (
      router.push("/coaches")
    );
  }
  else if (token && userRole === "gym") {
    router.push("/gym")
  }
  else if (token && userRole === "gymnast") {
    router.push("/gymnast")
  }
  else if (token && userRole === "coach") {
    router.push("/coaches")
  }
  // else{
  //   router.push("/login")
  // }

}
