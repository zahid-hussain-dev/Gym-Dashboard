import React from 'react'
import SideBar from './SideBar';
import Navbar from './Navbar';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export default function Layout({ children }) {
  const showCollapse = useSelector((state) => state.user.showCollapse);

  return (
    <div style={{ display: "flex", width: "100%", background:"#1F1D13" }}>
      <div style={{ display: "flex", height: "100vh", }} >
        <SideBar />
      </div>

      <div
        className={showCollapse ? "marginLeftOpen" : "marginLeftCollapse"}
        style={{
          width: "100%",
          marginRight:"8px"

        }}
      >
        <Navbar />
        <main style={{ display: "contents" }}>{children}</main>
      </div>

    </div >
  )
}
