import React from 'react'
import SideBar from './SideBar';
import Navbar from './Navbar';
import { useRouter } from "next/router"
export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", width:"100%" }}>

      <div style={{ display: "flex", height:"100vh" }} >
        <SideBar />
      </div>

      <div style={{width:"100%"}}>
        <Navbar />
        <main style={{ display: "flex" }}>{children}</main>
      </div>

    </div>
  )
}
