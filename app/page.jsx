'use client'
import Image from 'next/image';
import styles from './page.module.css';
// import "@/styles/global.css";
import { useState } from 'react';
import { useRouter, redirect } from 'next/navigation';
import { Button } from "@/components/styledComponents/button/Button";
import { Input } from "@/components/styledComponents/input/Input";
import { InputGroup } from "@/components/styledComponents/inputGroup/InputGroup";
import PhoneNumber from "@/components/styledComponents/Countrycode";

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
