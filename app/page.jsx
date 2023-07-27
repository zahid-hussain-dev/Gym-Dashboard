'use client'
import { useState } from 'react';
import { useRouter, redirect } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const userLoginToken = localStorage.getItem("userLoginToken");
  const [token, setToken] = useState(userLoginToken);
  const handleClickLogin = () => {
    router.push("/login");
  };
  return (
    token ? (
      router.push("/dashboard")
    ) : (router.push("/login"))

  )
}
