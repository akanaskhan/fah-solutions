import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../utils/firebase";
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import SideMenu from "../components/SideMenu";
import { Spin, Button, Table, message } from "antd";

export default function AllOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);

  // Global collection names
  const collectionNames = ["assignments", "projects", "guess_papers"];

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const user = auth?.currentUser?.uid;
      if (user) {
        console.log("Fetching orders for user:", user);
        
        const fetchCollection = async (collectionName) => {
          const collectionRef = collection(db, collectionName);
          const docs = await getDocs(collectionRef);
          console.log(`Fetched ${docs.docs.length} orders from ${collectionName}`);
          return docs.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            collectionName,
          }));
        };

        // Fetch all orders from multiple collections
        const allOrders = await Promise.all(
          collectionNames.map((collectionName) => fetchCollection(collectionName))
        );

        // Flatten the orders array
        const flattenedOrders = allOrders.flat();
        console.log("Combined orders:", flattenedOrders);
        setOrders(flattenedOrders);
      }
      setLoader(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setLoader(false);
    }
  };

  // Helper function to render nested fields for both order and customer details
  const renderNestedFields = (obj) => {
    const requiredFields = ["img", "CourseName", "Description", "Category", "Topic", "createdAt"];
    
    return Object.keys(obj).map((key) => {
      const value = obj[key];

      if (requiredFields.includes(key)) {
        if (key === "img") {
          return (
            <div style={{ padding: "4px 0" }} key={key}>
              <strong>Image:</strong>{" "}
              <img src={value} alt={obj.title || "Order Image"} style={{ width: "50px", height: "50px" }} />
            </div>
          );
        } else if (key === "createdAt") {
          return (
            <div style={{ padding: "4px 0" }} key={key}>
              <strong>Order Booking Date:</strong> {new Date(value.seconds * 1000).toLocaleDateString()}
            </div>
          );
        } else {
          return (
            <div style={{ padding: "4px 0" }} key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </div>
          );
        }
      } else if (typeof value === "object" && value !== null) {
        return (
          <div style={{ padding: "4px 0" }} key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
            <div style={{ paddingLeft: "15px" }}>{renderNestedFields(value)}</div>
          </div>
        );
      }
      return null;
    });
  };

  // Render specific fields for order details
  const renderOrderDetails = (order) => {
    return (
      <div className="pl-4">
        {renderNestedFields(order)}
      </div>
    );
  };

  // Render customer details (assuming customer details are under order.customer)
  const renderCustomerDetails = (customer) => {
    return (
      <div className="pl-4">
        <div style={{ padding: "4px 0" }}><strong>Customer Details:</strong></div>
        <div style={{ paddingLeft: "15px" }}>
          {Object.entries(customer).map(([key, value]) => (
            <div style={{ padding: "4px 0" }} key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const markForAssignment = async (order) => {
    try {
      const orderRef = doc(db, order.collectionName, order.id);
  
      await updateDoc(orderRef, { status: "Assigned" });
  
      const deliveredOrderRef = doc(db, "assignmnetMaker", order.id);
      await setDoc(deliveredOrderRef, order);
  
      await deleteDoc(orderRef);
  
      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
  
      message.success("Order moved to the delivered page");
      console.log(`Order ${order.id} marked as shipped and moved to DeliveredOrders.`);
    } catch (error) {
      console.error("Error marking order as shipped:", error);
    }
  };
  const markForProject = async (order) => {
    try {
      const orderRef = doc(db, order.collectionName, order.id);
  
      await updateDoc(orderRef, { status: "Assigned" });
  
      const deliveredOrderRef = doc(db, "projectMaker", order.id);
      await setDoc(deliveredOrderRef, order);
  
      await deleteDoc(orderRef);
  
      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
  
      message.success("Order moved to the delivered page");
      console.log(`Order ${order.id} marked as shipped and moved to DeliveredOrders.`);
    } catch (error) {
      console.error("Error marking order as shipped:", error);
    }
  };
  const markForGuess = async (order) => {
    try {
      const orderRef = doc(db, order.collectionName, order.id);
  
      await updateDoc(orderRef, { status: "Assigned" });
  
      const deliveredOrderRef = doc(db, "guesspaperMaker", order.id);
      await setDoc(deliveredOrderRef, order);
  
      await deleteDoc(orderRef);
  
      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
  
      message.success("Order moved to the delivered page");
      console.log(`Order ${order.id} marked as shipped and moved to DeliveredOrders.`);
    } catch (error) {
      console.error("Error marking order as shipped:", error);
    }
  };

  const deleteOrder = async (order) => {
    try {
      const orderRef = doc(db, order.collectionName, order.id);
  
      await updateDoc(orderRef, { status: "Deleted" });
  
      const deletedOrderRef = doc(db, "deletedOrders", order.id);
      await setDoc(deletedOrderRef, { ...order, status: "Deleted" });
  
      await deleteDoc(orderRef);
  
      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
  
      message.success("Order moved to the deleted orders page");
      console.log(`Order ${order.id} marked as deleted and moved to DeletedOrders.`);
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("Failed to delete order.");
    }
  };

  const columns = [
    {
      title: "Order No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => `Order ${index + 1}`,
    },
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text) => text,
    },
    {
      title: "Order Details",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (_, order) => renderOrderDetails(order),
    },
    {
      title: "Customer Details",
      dataIndex: "customerDetails",
      key: "customerDetails",
      render: (_, order) => (
        <div>
          <strong>Name:</strong> {order["First Name"]} {order["Last Name"]} <br />
          <strong>Email:</strong> {order.Email} <br />
          <strong>Phone:</strong> {order["Phone Number"]} <br />
          <strong>Address:</strong> {order.Address}, {order.City}, {order.country} <br />
          <strong>Postal Code:</strong> {order["Postal code"]}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <span>{text || "Pending"}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, order) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            onClick={() => markForAssignment(order)}
          >
            Assignment maker
          </Button>
          <Button
            type="primary"
            onClick={() => markForProject(order)}
          >
            Project maker
          </Button>
          <Button
            type="primary"
            onClick={() => markForGuess(order)}
          >
            Guess maker
          </Button>
          <Button
            type="danger"
            onClick={() => deleteOrder(order)}
          >
            Delete Order
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {loader ? (
        <div className="flex h-screen justify-center items-center">
          <Spin className="w-28 h-28" />
        </div>
      ) : (
        <div className="flex">
          <SideMenu />
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center my-4 text-center items-center">
              <h1 className="text-4xl font-black underline">All Orders</h1>
            </div>
            <Table
              dataSource={orders}
              columns={columns}
              rowKey="id"
              bordered
              expandable={{
                expandedRowRender: (record) => renderCustomerDetails(record.customer || {}),
                rowExpandable: (record) => record.customer !== undefined,
              }}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
      )}
    </>
  );
}
