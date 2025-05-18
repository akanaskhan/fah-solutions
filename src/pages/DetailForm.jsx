import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, message, Upload } from "antd";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { auth, db, storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { FiFile } from "react-icons/fi";
import SideMenu from "../components/SideMenu";

export default function DetailForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);
  const [categories, setCategories] = useState([]);



  const onSubmit = async (data) => {
    try {
      // Determine the collection name based on the selected option
      let collectionName = "";
      switch (data.Category) {
        case "Assignment":
          collectionName = "assignments";
          break;
        case "Project":
          collectionName = "projects";
          break;
        case "Guess Paper":
          collectionName = "guess_papers";
          break;
        default:
          message.error("Please select a valid option.");
          return;
      }
  
      const productCollectionRef = collection(db, collectionName);
  
      // Handle image upload only if an image is provided
      let downloadURL = null;
      if (data.img && data.img.length > 0) {
        const imageFile = data.img[0];
        const fileRef = ref(storage, `images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(fileRef, imageFile);
  
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress);
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.error("Error during upload: ", error);
              reject(error);
            },
            async () => {
              downloadURL = await getDownloadURL(fileRef);
              resolve();
            }
          );
        });
      }
  
      // Prepare product data
      const productData = {
        ...data,
        img: "null",
        //  downloadURL || null, // Set to null if no image is provided
    
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
        status: "active",
      };
  
      // Save product data to Firestore
      await addDoc(productCollectionRef, productData);
      reset();
      setProgress(0);
      // message.success("Product Added Successfully");
    } catch (error) {
      console.error("Error uploading image or saving product:", error);
      message.info("Something went wrong");
    }
  };
  
  
  

  return (
    <>
      <div className="flex h-screen textColor secondbackgroundColor">
        <div className="flex flex-col w-full  justify-center">
          <div className="text-3xl font-black text-center m-4 underline">
          Provide  Assignment, Project Details and Guess Paper
          </div>
          <form
            className="flex flex-col text-center"
            onSubmit={handleSubmit(onSubmit)}
          >
             <div className="mx-4">
              <select
              
                className=" mt-2 w-full shadow lg:w-2/3 mx-auto p-2 px-3 rounded-md "
                {...register("Category", { required: true })}
              >
                <option value="">Select Assignment/Project</option>
                <option value="Assignment">Assignment</option>
                <option value="Project">Project</option>
                <option value="Guess Paper">Guess Paper</option>
              </select>
              {errors.ML && (
                <span className="text-sm mb-1 text-red-500">
                 <br/> Select the option
                </span>
              )}
            </div>
            <CustomInput
              placeholder={"Subject/Course Name"}
              obj={{ ...register("CourseName", { required: true }) }}
              errorMsg={"Subject/Course Name is required"}
              formKey={"Name"}
              errors={errors}
            />
            <CustomInput
              placeholder={"Assignment/Project Topic"}
              obj={{ ...register("Topic", { required: true }) }}
              errorMsg={"Assignment/Project Topic is required"}
              formKey={"Topic"}
              errors={errors}
            />
            <div className=" mx-4">

            <textarea
            placeholder="Description"
            className=" mt-2 w-full  shadow flex flex-grow-0 lg:w-2/3 mx-auto p-4 m-0 rounded-md "
            rows="4"
            {...register("Description", { required: true })}
            ></textarea>
            </div>
          {errors.message && <span className="text-sm z-50 text-red-500">Description is required</span>}

           
          
            <div className="flex justify-center">
            <CustomInput
  placeholder={"Upload image"}
  obj={{ ...register("img", { required: false }) }}
  errorMsg={"Image is required"}
  formKey={"img"}
  type={"file"}
  errors={errors}
  className={
    "mt-2 flex justify-center border-[--bs-primary] border-2 rounded pb-2 hover:bg-zinc-300"
  }
  style={{
    color: "transparent",
    textIndent: "-999em",
    position: "relative",
  }}
  id={"form-control"}
/>

              <label
                htmlFor="form-control"
                className="absolute mt-3 cursor-pointer"
              >
                <i className="fa-solid fa-file-arrow-up text-md mr-2" />
              Click here to upload file 
              </label>
            </div>
            <button
              className="bg-black text-white btn learn-btn my-4 inline rounded cursor-pointer mx-auto p-2 px-4 tracking-widest"
              type="submit"
              placeholder="Next">{progress
                ? `${progress.toFixed(2)}% Uploading`
                : `Next`}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const CustomInput = ({
  formKey,
  obj,
  placeholder,
  errors,
  errorMsg,
  type,
  style,
  className,
  row,
  id,
}) => {
  return (
    <div className="flex flex-col mx-4">
      <input
        className={
          className
            ? className
            : " mt-2 w-full h-10 shadow flex flex-grow-0 lg:w-2/3 mx-auto p-4 rounded-md"
        }
        placeholder={placeholder}
        style={style}
        type={type ? type : "text" ? type : 'textarea'}
        row={row}
        {...obj}
      />
      {errors[formKey] && (
        <span className="text-sm mb-1 text-red-500">{errorMsg}</span>
      )}
    </div>
  );
};
