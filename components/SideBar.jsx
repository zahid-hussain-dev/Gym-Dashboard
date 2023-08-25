import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/router';
import menu from "@/public/assests/SVGs/menu.svg";
import dashboard from "@/public/assests/Images/dashboard.png";
import dashboardSVG from "@/public/assests/SVGs/dashboard-2-svgrepo-com.svg";
import { setShowCollapse } from '@/store/slices/user/userSlice';
import { useDispatch,useSelector  } from "react-redux";
import { sideItemsAdmin, sideItemsCoach, sideItemsGymnast, sideItemsGym } from "./MainComponents/SidebarConstants";

const SideBar = () => {
  const router = useRouter();
  const showCollapse = useSelector((state) => state.user.showCollapse);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [sidebarItems, setSidebarItems] = useState([]);
  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem("Userrole"))
    setRole(userRole);
    if (userRole === "admin") {
      setSidebarItems(sideItemsAdmin);
    }
    else if (userRole === "coach") {
      setSidebarItems(sideItemsCoach)
    }
    else if (userRole === "gym") {
      setSidebarItems(sideItemsGym)
    }
    else if (userRole === "gymnast") {
      setSidebarItems(sideItemsGymnast) 
    }
  }, [])
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleCollapse = () => {
    setIsMenuOpened(!isMenuOpened);
    dispatch(setShowCollapse(!showCollapse));
  }
  return (
    <div style={{ display: "flex",}} className='menu-width'>
      <aside className={!isMenuOpened ? "left-side-menu left-sidebar--opened" : "left-side-menu left-sidebar--collapsed"}
      >
        <nav style={{ width: "100%",backgroundColor:"rgb(63, 63, 63)",     borderRight:" 1px solid #7b7b5c",height:"100%"  }}>
          <div id="sidebar-menu">
            <div
              style={{
                height: "70px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className='' onClick={handleCollapse} style={{ cursor: "pointer", marginLeft: "20px", marginTop: "40px" }}>
                <Image src={menu} alt='menu' width={30} height={30} className="" />
              </div>
            </div>
            {!isMenuOpened ?
              <ul className="metismenu in nav" id="side-menu">
                {sidebarItems.map((item, index) => (
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
                        <div className="">
                        {router.asPath === item.href ?
                          <Image src={item.image} alt={item.title} width={30} height={30} className="img-icon" />
                          :<Image src={item.imageWhite} alt={item.title} width={30} height={26} className="img-icon" />
                        }                        </div>
                        <span
                          className={
                            router.asPath === item.href
                              ? `side-menu-title1 ml-2 side-menu-block1`
                              : `side-menu-title ml-2 side-menu-block`
                          }>   {item.title} </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              :
              <ul className="metismenu in nav" id="side-menu">
                {sidebarItems.map((item, index) => (
                  <li key={index}>
                    <Link className="side-nav-link-re nav-link" style={{ color: "white", fontSize: "16px", marginBottom: "8px" }} href={item.href}  >
                      <div className={
                        router.asPath === item.href
                          ? `side-menu-block1`
                          : `side-menu-block`
                      }>
                        <div className="">
                        {router.asPath === item.href ?
                          <Image src={item.image} alt={item.title} width={30} height={30} className="img-icon" />
                          :<Image src={item.imageWhite} alt={item.title} width={30} height={30} className="img-icon" />
                        }
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




SideBar.js
