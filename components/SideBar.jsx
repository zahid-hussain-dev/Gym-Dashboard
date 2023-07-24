import React, { useState } from 'react'
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/router';
import menu from "@/public/assests/SVGs/menu.svg";
import user from "@/public/assests/SVGs/user.svg"
import dashboard from "@/public/assests/Images/dashboard.png";
import insurance from "@/public/assests/Images/insurance.png";
import report from "@/public/assests/Images/reports.png";
import client from "@/public/assests/Images/client.png";
import organizer from "@/public/assests/Images/organized-Bliss.png";
import form from "@/public/assests/Images/form.png";
import { setShowCollapse } from '@/store/slices/user/userSlice';
import { useDispatch, useSelector } from "react-redux";

const SideBar = () => {
  const router = useRouter();
  const showCollapse = useSelector((state) => state.user.showCollapse);
  const dispatch = useDispatch();

  const sideItems = [
    {
      href: "/dashboard",
      title: "Dashboard",
      image: dashboard,
    },
    {
      href: "/clientInformtion",
      title: "Client Information",
      image: client,
    },
    {
      href: "",
      title: "Organizer",
      image: organizer,
    },
    {
      href: "",
      title: "Planner",
      image: form,
    },
    {
      href: "",
      title: "Protector",
      image: insurance,
    },
    {
      href: "",
      title: "Reports / Schedules",
      image: report,
    },
    {
      href: "",
      title: "Inventory",
      image: dashboard,
    },
    // {
    //   href: "",
    //   title: "Logout",
    //   image: dashboard,
    // },

  ];
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleCollapse = () => {
    setIsMenuOpened(!isMenuOpened);
    dispatch(setShowCollapse(!showCollapse));
  }
  const signOut=(e) =>{
    e.preventDefault();
    localStorage.removeItem("userLoginToken");
    localStorage.removeItem("role");
    localStorage.removeItem("otp");
    localStorage.removeItem("userData");
    router.push("/login");
  }
  return (
    <div style={{ display: "flex" }} className='menu-width'>
      <aside className={!isMenuOpened ? "left-side-menu left-sidebar--opened" : "left-side-menu left-sidebar--collapsed"}
      >
        <nav style={{ width: "100%" }}>
          <div id="sidebar-menu">
            <div
              style={{
                height: "70px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className='' onClick={handleCollapse} style={{ cursor: "pointer", marginLeft: "20px", marginTop: "40px" }}>
                <Image src={menu} alt='menu' width={30} height={30} className="img-icon" />
              </div>
             
            </div>
            {!isMenuOpened ?
              <ul className="metismenu in nav" id="side-menu">
                {sideItems.map((item, index) => (
                  <li key={index}>
                    <Link className={
                      router.asPath === item.href
                        ? `side-nav-link-re nav-link`
                        : `side-nav-link-re nav-link`
                    } style={{ color: "white", fontSize: "16px", marginBottom: "8px" }} href={item.href}  >
                      <div className={
                        router.asPath === item.href 
                          ? `side-menu-block1`
                          : `side-menu-block`
                      }>
                        <div className="side-menu-image-background">
                          <Image src={item.image} alt={item.title} width={30} height={30} className="img-icon" />
                        </div>
                        <span
                          className={
                            router.asPath === item.href
                              ? `side-menu-title1 ml-2`
                              : `side-menu-title ml-2`
                          }>   {item.title} </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              :
              <ul className="metismenu in nav" id="side-menu">
                {sideItems.map((item, index) => (
                  <li key={index}>
                    <Link className="side-nav-link-re nav-link" style={{ color: "white", fontSize: "16px", marginBottom: "8px" }} href={item.href}  >
                      <div className={
                        router.asPath === item.href
                          ? `side-menu-block1`
                          : `side-menu-block`
                      }>
                        <div className="side-menu-image-background">
                          <Image src={item.image} alt={item.title} width={30} height={30} className="img-icon" />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            }

          </div>
        </nav>

      </aside>

    </div>
  )
}

export default SideBar
