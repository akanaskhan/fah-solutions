import { useEffect, useState } from "react";
import { db, storage, auth } from "../utils/firebase"; // Import auth for Firebase Authentication
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Spin, Table, Button, message } from "antd";

export default function AdminPanel() {
  const [deletedOrders, setDeletedOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  useEffect(() => {
    fetchDeletedOrders();
  }, []);

  const fetchDeletedOrders = async () => {
    setLoader(true);
    try {
      const currentUserUID = auth?.currentUser?.uid;
      let collectionName = "";

      // Determine the collection name based on the UID
      if (currentUserUID === import.meta.env.VITE_ASSIGNMNET_MAKER_USER_UID) {
        collectionName = "assignmnetMaker";
      } else if (currentUserUID === import.meta.env.VITE_PROJECT_MAKER_USER_UID) {
        collectionName = "projectMaker";
      } else if (currentUserUID === import.meta.env.VITE_GUESS_MAKER_USER_UID) {
        collectionName = "guesspaperMaker";
      } else {
        message.error("Unauthorized user!");
        setLoader(false);
        return;
      }

      const ordersCollection = collection(db, collectionName);
      const docs = await getDocs(ordersCollection);
      const arr = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDeletedOrders(arr);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error("Failed to fetch orders.");
      setLoader(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile)); // Preview the uploaded file
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedOrder) {
      message.error("No file selected or order not specified!");
      return;
    }

    const fileRef = ref(storage, `orders/${selectedOrder.id}/${file.name}`);
    try {
      // Upload file to Firebase Storage
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      // Update the Firestore document with the file URL
      const orderDoc = doc(db, "assignmnetMaker", selectedOrder.id); // Update collection name dynamically if needed
      await updateDoc(orderDoc, { img: downloadURL });

      message.success("File uploaded successfully!");
      setFile(null);
      setPreviewURL("");
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Failed to upload file.");
    }
  };

  const renderOrderDetails = (order) => (
    <div className="pl-4">
      <div><strong>Topic:</strong> {order.Topic}</div>
      <div><strong>Course Name:</strong> {order.CourseName}</div>
      <div><strong>Description:</strong> {order.Description}</div>
      <div><strong>img:</strong> {order.img}</div>
      <div><strong>Date:</strong> {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</div>
    </div>
  );

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
    },
    {
      title: "Order Details",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (_, order) => renderOrderDetails(order),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <span>{text || "Deleted"}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, order) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            onClick={() => setSelectedOrder(order)}
          >
            Upload
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
        <div className="container mx-auto px-4 py-8 h-screen">
          <div className="flex justify-center my-4 text-center items-center">
            <h1 className="text-4xl font-black ">Tasks</h1>
          </div>
          <Table
            dataSource={deletedOrders}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}

      {/* Upload Modal */}
      {selectedOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h3 className="text-xl font-bold mb-4">Upload File for Order</h3>
      <p><strong>Note:</strong>only pdf file</p>
      <input
        type="file"
        accept=".pdf, .docx"
        onChange={handleFileChange}
        className="mb-4"
      />
      {file && (
        <div className="mb-4">
          <div className="text-sm text-gray-700 mb-2">
            <strong>Selected File:</strong> {file.name}
          </div>
          {file.type === "application/pdf" ? (
            <iframe
              src={URL.createObjectURL(file)}
              className="w-full h-48 border"
              title="PDF Preview"
            ></iframe>
          ) : file.name.endsWith(".docx") ? (
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                URL.createObjectURL(file)
              )}`}
              className="w-full h-48 border"
              title="DOCX Preview"
            ></iframe>
          ) : (
            <div className="text-red-500">Preview not available</div>
          )}
        </div>
      )}
      <div className="flex justify-end space-x-2">
        <Button onClick={() => setSelectedOrder(null)}>Cancel</Button>
        <Button type="primary" onClick={handleUpload} disabled={!file}>
          Submit
        </Button>
      </div>
    </div>
  </div>
)}


    </>
  );
}
