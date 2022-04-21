import { BsPeople } from "react-icons/bs";
import { FaRegImages } from "react-icons/fa";
import { BiImageAdd, BiHomeAlt } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";

const nav = [
   {
      icon: <BiHomeAlt className="react-icon" />,
      label: "Home",
      link: "/",
      loggedIn: true,
   },
   {
      icon: <BsPeople className="react-icon" />,
      label: "All users",
      link: "/users",
      loggedIn: true,
   },
   {
      icon: <FaRegImages className="react-icon" />,
      label: "My Memories",
      link: "/u1/memories",
      loggedIn: true,
   },
   {
      icon: <BiImageAdd className="react-icon" />,
      label: "Add Memory",
      link: "/memories/new",
      loggedIn: true,
   },
   {
      icon: <BiLogIn className="react-icon" style={{ marginLeft: "-6px" }} />,
      label: "Login",
      link: "/auth",
      loggedIn: false,
   },
];

export default nav;
