import dashboardSVG from "../../public/assests/SVGs/gym-dashboard-black.svg";
import coachSVG from "../../public/assests/SVGs/coach-black.svg";
import gymSVG from "../../public/assests/SVGs/gym-black.svg";
import gymnastSVG from "../../public/assests/SVGs/gymnast-black.svg";
import dashboardWhiteSVG from "../../public/assests/SVGs/gym-dashboard-white.svg";
import coachWhiteSVG from "../../public/assests/SVGs/coach-white.svg";
import gymWhiteSVG from "../../public/assests/SVGs/gym-white.svg";
import gymnastWhiteSVG from "../../public/assests/SVGs/gymnast-white.svg";
export const sideItemsAdmin = [
    // {
    //     href: "/dashboard",
    //     title: "Dashboard",
    //     image: dashboardSVG,
    //     imageWhite: dashboardWhiteSVG,
    // },
    {
        href: "/coaches",
        title: "Coaches",
        image: coachSVG,
        imageWhite: coachWhiteSVG,
    },
    {
        href: "/gym",
        title: "Gym",
        image: gymSVG,
        imageWhite: gymWhiteSVG,
    },
    {
        href: "/gymnast",
        title: "Gymnast",
        image: gymnastSVG,
        imageWhite: gymnastWhiteSVG,
    },


];
export const sideItemsCoach = [
    {
        href: "/coaches",
        title: "Schedule",
        image: coachSVG,
        imageWhite: coachWhiteSVG,

    },
    // {
    //     href: "/gym",
    //     title: "Gym",
    //     image: dashboardSVG,
    //     imageWhite: gymWhiteSVG,
    // },
    {
        href: "/privateBookings",
        title: "Private Booking",
        image: gymnastSVG,
        imageWhite: gymnastWhiteSVG,
    },


];
export const sideItemsGym = [
    {
        href: "/gym",
        title: "Gym",
        image: gymSVG,
        imageWhite: gymWhiteSVG,
    },


];
export const sideItemsGymnast = [
    {
        href: "/gymnast",
        title: "Booking",
        image: gymnastSVG,
        imageWhite: gymnastWhiteSVG,
    },


];