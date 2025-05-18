import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import { Spin } from "antd";
import NotFound from "../components/notfound";

export default function MyUsers() {
  const navigate = useNavigate();
  const [MyUsers, setMyUsers] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, orderBy("createdAt"));
      const docs = await getDocs(q);
      
      const UserDocIds = docs.docs.map((doc) => doc.id);

      console.log("Order Document IDs:", UserDocIds);

      setMyUsers(UserDocIds);
      setLoader(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoader(false);
    }
  };

  return (
    <>
      <div>
        {loader ? (
          <div className="flex h-screen justify-center items-center">
          <Spin className="w-28 h-28" />
        </div>
        ) : MyUsers.length > 0 ? (
          <ul>
            {MyUsers.map((user) => (
              <li key={user.id}>
                <p>Email: {user.email}</p>
                <p>Display Name: {user.displayName}</p>
              </li>
            ))}
          </ul>
        ) : (
          <NotFound/>
        )}
      </div>
    </>
  );
}
