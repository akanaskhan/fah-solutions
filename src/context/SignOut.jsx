import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { message, Spin } from "antd";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const SignOut = createContext();
function SignOutContextProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [HandleSignOut, setHandleSignOut] = useState(true);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const HandleSignOut = () => {
      signOut(auth)
      .then(() => {
          
          message.success("Log Out successful.");
        })
        .catch((error) => {
          console.log("signout error", error);
        });
    };
    return HandleSignOut;
  }, []);
  return (
    <SignOut.Provider value={{ HandleSignOut }}>
      {
        children
      }
    </SignOut.Provider>
  )
}

export default SignOutContextProvider;
