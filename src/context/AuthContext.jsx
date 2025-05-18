import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Spin } from "antd";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ isLogin: false });
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        try {
          const userInfo = (await getDoc(docRef)).data();
          // console.log("userInfo=>", userInfo);

          // Only set the user state if userInfo is not undefined
          setUser({
            isLogin: true,
            ...userInfo,
          });
        } catch (error) {
          console.error("Error fetching user info:", error);
          setUser({ isLogin: false }); // Optionally set a default state
        }
      } else {
        setUser({ isLogin: false });
      }
      setLoader(false); // Set loader to false after checking user state
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loader ? (
        <div className="flex h-screen justify-center items-center">
          <Spin className="w-28 h-28" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
