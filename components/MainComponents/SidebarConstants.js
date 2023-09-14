import dashboardSVG from "../../public/assests/SVGs/gym-dashboard-black.svg";
import coachSVG from "../../public/assests/SVGs/coach-black.svg";
import gymSVG from "../../public/assests/SVGs/gym-black.svg";
import gymnastSVG from "../../public/assests/SVGs/gymnast-black.svg";
import coachWhiteSVG from "../../public/assests/SVGs/coach-white.svg";
import gymWhiteSVG from "../../public/assests/SVGs/gym-white.svg";
import gymnastWhiteSVG from "../../public/assests/SVGs/gymnast-white.svg";
import stateBlack from "../../public/assests/SVGs/state-black.svg";
import stateWhite from "../../public/assests/SVGs/state-white.svg";
import cityBlack from "../../public/assests/SVGs/city-black.svg";
import cityWhite from "../../public/assests/SVGs/city-white.svg";

export const sideItemsAdmin = [

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
    {
        href: "/state",
        title: "State",
        image: stateBlack,
        imageWhite: stateWhite,
    },
    {
        href: "/cities",
        title: "Cities",
        image: cityBlack,
        imageWhite: cityWhite,
    }
];
export const sideItemsCoach = [
    {
        href: "/coaches",
        title: "Schedule",
        image: coachSVG,
        imageWhite: coachWhiteSVG,

    },
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
    {
        href: "/child",
        title: "Childs",
        image: gymnastSVG,
        imageWhite: gymnastWhiteSVG,
    },

];