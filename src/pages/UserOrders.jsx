import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import { Spin } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  // Function to fetch orders for the current user
  const fetchUserOrders = async () => {
    try {
      const user = auth?.currentUser?.uid;
      if (user) {
        console.log("Fetching orders for user:", user);
        
        // Fetch data from all three collections
        const fetchCollection = async (collectionName) => {
          const collectionRef = collection(db, collectionName);
          // const q = query(collectionRef, where("OrderBy", "==", user));
          const docs = await getDocs(collectionRef);
          console.log(`Fetched ${docs.docs.length} orders from ${collectionName}`);
          return docs.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            collectionName,
          }));
        };

        const assignments = await fetchCollection("assignments");
        const projects = await fetchCollection("projects");
        const guessPapers = await fetchCollection("guess_papers");

        // Combine all orders into one array
        const allOrders = [...assignments, ...projects, ...guessPapers];
        console.log("Combined orders:", allOrders);
        setOrders(allOrders);
      }
      setLoader(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setLoader(false);
    }
  };

  const renderOrders = (orders) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
      {orders.map((order) => (
        <div className="border rounded-md p-4 shadow" key={order.id}>
          <h1 className="text-xl font-semibold">Order ID: {order.id}</h1>
          <p><strong>Course Name:</strong> {order.CourseName}</p>
          <p><strong>Topic:</strong> {order.Topic}</p>
          <p><strong>For:</strong> {order.Category}</p>
          <p><strong>Collection:</strong> {order.collectionName}</p>
          <p><strong>Submission Date:</strong> {dayjs(order.createdAt.toDate()).fromNow()}</p>
          <p><strong>Due Date:</strong> {dayjs(order.createdAt.toDate()).add(7, "day").format("DD MMM YYYY")}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto">
      {loader ? (
        <div className="flex h-screen justify-center items-center">
          <Spin className="w-28 h-28" />
        </div>
      ) : (
        <div className="h-screen">
          <div className="flex justify-center my-6 lg:my-10 text-center items-center">
            <h1 className="text-3xl lg:text-4xl font-black underline">Your Academic Orders</h1>
          </div>
          {orders.length ? (
            renderOrders(orders)
          ) : (
            <div className="text-xl text-center my-96">
              <p>No orders found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserOrders;
