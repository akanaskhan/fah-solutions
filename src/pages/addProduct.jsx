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

export default function AddProduct() {
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

  // Fetch categories from Firebase Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesCollectionRef = collection(db, "categories");
      const categorySnapshot = await getDocs(categoriesCollectionRef);
      const categoryList = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryList);
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      const productCollectionRef = collection(db, "products");

      // Upload image to Firebase Storage
      const imageFile = data.img[0];
      const fileRef = ref(storage, `images/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(fileRef, imageFile);

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
        },
        async () => {
          const downloadURL = await getDownloadURL(fileRef);
          const productData = {
            ...data,
            img: downloadURL,
            category: data.category, // Selected category from dropdown
            createdAt: serverTimestamp(),
            createdBy: auth.currentUser.uid,
            status: "active",
          };

          await addDoc(productCollectionRef, productData);
          reset();
          setProgress(0);
          message.success("Product Added Successfully");
        }
      );
    } catch (error) {
      console.error("Error uploading image or saving product:", error);
      message.info("Please Login");
    }
  };

  return (
    <>
      <div className="flex">
        <SideMenu className="overflow-y-auto z-10 sideMenu" />
        <div className="flex flex-col w-full lg:w-4/5 justify-center">
          <div className="text-3xl font-black text-center m-4 underline">
            ADD PRODUCT
          </div>
          <form
            className="flex flex-col text-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomInput
              placeholder={"Product Title"}
              obj={{ ...register("title", { required: true }) }}
              errorMsg={"Title is required"}
              formKey={"title"}
              errors={errors}
            />
            <CustomInput
              placeholder={"Product top notes"}
              obj={{ ...register("ProductCategory", { required: true }) }}
              errorMsg={"Product Category is required"}
              formKey={"ProductCategory"}
              errors={errors}
            />
            <CustomInput
              placeholder={"Product Description"}
              obj={{ ...register("desc", { required: true }) }}
              errorMsg={"Description is required"}
              formKey={"desc"}
              errors={errors}
            />
            <div className="mx-4">
              <select
                className="border mt-2 w-full border-purple-600 lg:w-2/3 mx-auto p-2 px-3 rounded-md"
                {...register("category", { required: true })}
              >
                
                <option value="">Select Category</option>
                <option value="Men's Perfume">Men's Perfume</option>
                <option value="Women's Perfume">Women's Perfume</option>
              </select>
              {errors.category && (
                <span className="text-sm mb-1 text-red-500">
                 <br/> Category is required
                </span>
              )}
            </div>
            <div className="mx-4">
              <select
                className="border mt-2 w-full border-purple-600 lg:w-2/3 mx-auto p-2 px-3 rounded-md"
                {...register("ML", { required: true })}
              >
                <option value="">Select ML</option>
                <option value="30 ML">30</option>
                <option value="50 ML">50</option>
              </select>
              {errors.ML && (
                <span className="text-sm mb-1 text-red-500">
                 <br/> ML is required
                </span>
              )}
            </div>
            <CustomInput
              placeholder={"Actual Price"}
              obj={{ ...register("price", { required: true }) }}
              errorMsg={"Price is required"}
              formKey={"price"}
              type={"number"}
              errors={errors}
            />
            <CustomInput
              placeholder={"Sale Price"}
              obj={{ ...register("SalePrice", { required: true }) }}
              errorMsg={"Sale Price is required"}
              formKey={"SalePrice"}
              type={"number"}
              errors={errors}
            />
            <div className="flex justify-center">
              <CustomInput
                placeholder={"Upload image"}
                obj={{ ...register("img", { required: true }) }}
                errorMsg={"Image is required"}
                formKey={"img"}
                type={"file"}
                errors={errors}
                className={
                  "mt-2 flex justify-center border border-gray rounded pb-2 hover:bg-zinc-300"
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
              Click here to upload image 
              </label>
            </div>
            <button
              className="bg-black text-white btn learn-btn my-4 inline rounded cursor-pointer mx-auto p-2 px-4"
              type="submit"
              placeholder="Upload">{progress
                ? `${progress.toFixed(2)}% Uploading`
                : `Upload`}
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
  id,
}) => {
  return (
    <div className="flex flex-col mx-4">
      <input
        className={
          className
            ? className
            : "border mt-2 w-full h-10 border-purple-600 flex flex-grow-0 lg:w-2/3 mx-auto p-4 rounded-md"
        }
        placeholder={placeholder}
        style={style}
        type={type ? type : "text"}
        {...obj}
      />
      {errors[formKey] && (
        <span className="text-sm mb-1 text-red-500">{errorMsg}</span>
      )}
    </div>
  );
};
