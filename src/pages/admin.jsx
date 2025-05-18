import { useContext } from "react";
import { Link } from "react-router-dom";
import { SignOut } from "../context/SignOut";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { message } from "antd";
import { useNavigate } from "react-router";
import SideMenu from "../components/SideMenu";
import { AuthContext } from "../context/AuthContext";


export default function Admin(){
  const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const HandleSignOut = () => {
        signOut(auth)
          .then(() => {
            navigate("/")
            message.success("Log Out successful.");
          })
          .catch((error) => {
            console.log("signout error", error);
          });
      };
    return(
        <>
        <div className="flex">
            <SideMenu/>
        <div className="w-screen h-screen flex flex-col gap-2">
            <div className="text-center  font-black text-3xl">Hello {user.displayName}</div>
            <div className="text-center  font-black text-3xl">Welcome to Admin Panel</div>
           
          
            <div className="items-end text-end">

            <button className="btn  learn-btn"
            onClick={HandleSignOut}
            >Log Out</button>
          
            </div>
          
        </div>
        
            </div>
        </>
    )
}