import { useForm } from "react-hook-form";
// import { categories } from "../utils/categories";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { Badge, message } from "antd";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WiDegrees } from "react-icons/wi";
import { BiCircle } from "react-icons/bi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthContext } from "../context/AuthContext";
dayjs.extend(relativeTime);

function Checkout() {
  const { cartItems, removeItemFromCart, addItemToCart, lessQuantityFromCart } =
    useContext(CartContext);
    const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const totalAmount = cartItems.reduce(
    (total, obj) => total + obj.quantity * obj.SalePrice,
    0
  );
  const totalAmountWithSipping = cartItems.reduce(
    (total, obj) => total + obj.quantity * obj.SalePrice + 200,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, obj) => total + obj.quantity,
    0
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const OderRef = collection(db, "orders");
    const obj = {
      ...data,
      ...cartItems,
      TotalAmount: totalAmountWithSipping,
      Quantity: totalQuantity,
      createdAt: serverTimestamp(),
      OrderBy: auth.currentUser.uid,
      status: "Booked",
    };
    addDoc(OderRef, obj).then(() => {
      localStorage.setItem('cartItems', '0'); 
      reset();
      message.success("Order Booked Successfully");
      navigate("/");
    });
  };

 

  return (
    <>
      <div className="container">
        <div className="text-center m-4">
          <p className="text-4xl font-black underline">Check Out</p>
        </div>
        <div className="flex lg:flex-row md:flex-row xl:flex-row flex-col-reverse mb-32">
          <div className=" w-full lg:w-2/4 ">
            <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-3">

              <div>
                <label htmlFor="" className="text-2xl font-bold">Contact:</label>
              </div>
              <CustomInput
                placeholder={"Email"}
                value={auth.currentUser.email}
                obj={{
                  ...register("Email", { required: true, maxLength: 30 }),
                }}
                errorMsg={"Email is required"}
                formKey={"email"}
                type={"email"}
                errors={errors}
                />
                </div>
                
              <div>
                <label htmlFor="" className="text-2xl font-bold mt-4">Delivery Details</label>
              </div>
              
              <div className="">
                <select
                  className="border mt-2 w-full border-purple-600 lg:w-2/3  px-3 py-2.5 rounded-md"
                  {...register("country")}
                >
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>
              <div className="flex justify-stretch">
                <CustomInput
                  placeholder={"First Name"}
                  className={
                    "border mt-2 w-full   h-10 border-purple-600   px-3 py-4 rounded-md"
                  }
                  obj={{ ...register("First Name", { required: true }) }}
                  errorMsg={"First Name is required"}
                  formKey={"First Name"}
                  type={"text"}
                  errors={errors}
                />
                <CustomInput
                  placeholder={"Last Name"}
                  className={
                    "border mt-2 w-full  h-10 border-purple-600 ml-4    px-3 py-4 rounded-md"
                  }
                  obj={{ ...register("Last Name", { required: true }) }}
                  errorMsg={"Last Name is required"}
                  formKey={"Last Name"}
                  type={"text"}
                  errors={errors}
                />
              </div>

              <CustomInput
                placeholder={"Address"}
                obj={{ ...register("Address", { required: true }) }}
                errorMsg={"Address is required"}
                formKey={"Address"}
                errors={errors}
              />
             
                <div className="flex justify-stretch">
                  <CustomInput
                    placeholder={"City"}
                    className={
                      "border mt-2 w-full   h-10 border-purple-600   px-3 py-4 rounded-md"
                    }
                    obj={{ ...register("City", { required: true }) }}
                    errorMsg={"City is required"}
                    formKey={"City"}
                    type={"text"}
                    errors={errors}
                  />
                  <CustomInput
                    placeholder={"Postal code"}
                    className={
                      "border mt-2 w-full  h-10 border-purple-600 ml-4   px-3 py-4 rounded-md"
                    }
                    obj={{ ...register("Postal code", { required: true }) }}
                    errorMsg={"Postal code is required"}
                    formKey={"Postal code"}
                    type={"number"}
                    errors={errors}
                  />
                </div>
             
              <CustomInput
                placeholder={"Phone Number 03XXXXXXXXX"}
                obj={{ ...register("Phone Number", { required: true,  maxLength: 11 }) }}
                errorMsg={"Phone Number is required and length should be 11"}
                formKey={"Phone Number"}
                type={"number"}
                errors={errors}
              />
              <div>
                <label htmlFor="" className="text-2xl font-bold mt-4">Shipping</label>
              </div>
              <CustomInput
                placeholder={"Shipping charges Rs. 200"}
                obj={{ ...register("Shipping charges Rs. 200") }}
                errorMsg={"COD is required"}
                formKey={"Shipping charges Rs. 200"}
                disabled
                errors={errors}
              />
              <div>
                <label htmlFor="" className="text-2xl font-bold mt-4">Payment Method</label>
              </div>
              <div className="">
                <select
                  className="border mt-2 w-full border-purple-600 lg:w-2/3 mx-auto px-3 py-2.5 rounded-md"
                  {...register("COD")}
                >
                  <option value="COD">COD</option>
                </select>
              </div>
              <div className="flex flex-col mt-4 bg-gray-100 rounded py-3 UpperamountSection">
                  <div className="flex justify-between px-4">
                    <div className="flex justify-between items-baseline">
                      <p className="font-semibold">Subtotal</p>
                      <p>
                        <BiCircle
                          className="text-black mx-1"
                          color="#000"
                          size={8}
                        />{" "}
                      </p>
                      <p>
                        {cartItems.reduce(
                          (sum, product) => sum + product.quantity,
                          0
                        )}{" "}
                        Items
                      </p>
                    </div>
                    <p className="font-normal"> Rs. {totalAmount}</p>
                  </div>
                  <div className="flex justify-between px-4">
                    <p className="font-normal">Shipping</p>
                    <p>Rs. 200</p>
                  </div>
                  <div className="flex justify-between px-4 font-bold text-lg">
                    <p className="font-semibold">Total</p>
                    <p>PKR Rs. {totalAmountWithSipping}</p>
                  </div>
                </div>
              <button
                type="submit"
                className="learn-btn w-full lg:w-2/3 p-2.5 mt-4 rounded transition-all"
              >
                Complete order
              </button>
              
             
            </form>
          </div>

          <div className="w-full  lg:w-1/3 flex flex-col  rounded">
            <div>
              {cartItems.map((product, index) => (
                <div
                  key={product.id || `cart-item-${index}`}
                  className="flex justify-stretch 
                  border my-2 p-3 rounded"
                >
                  <div className="w-1/6">
                    <Badge count={product.quantity}>
                      <img className="rounded object-cover" src={product.img} />
                    </Badge>
                  </div>
                  <div className="flex   justify-evenly ">
                    <div className="flex flex-col pl-5">
                      <div className="flex  mb-2">
                        <p className="font-bold">{product.title}</p>
                        <p className="text-sm tracking-widest ml-1">
                          {" "}
                          {`(${product.category})`}
                        </p>
                      </div>

                      <p className="font-normal  mb-2">{product.ML}</p>
                    </div>
                  </div>
                  <div className="ml-12 ">
                    <p className="font-normal  mb-2">Rs: {product.SalePrice}/-</p>
                  </div>
                  <div></div>
                </div>
              ))}
              <div>
               

             
                <div className="flex flex-col mt-4 bg-gray-100 rounded py-3 amountSection">
                  <div className="flex justify-between px-4">
                    <div className="flex justify-between items-baseline">
                      <p className="font-semibold">Subtotal</p>
                      <p>
                        <BiCircle
                          className="text-black mx-1"
                          color="#000"
                          size={8}
                        />{" "}
                      </p>
                      <p>
                        {cartItems.reduce(
                          (sum, product) => sum + product.quantity,
                          0
                        )}{" "}
                        Items
                      </p>
                    </div>
                    <p className="font-normal"> Rs. {totalAmount}</p>
                  </div>
                  <div className="flex justify-between px-4">
                    <p className="font-normal">Shipping</p>
                    <p>Rs. 200</p>
                  </div>
                  <div className="px-4 mt-3 mb-2">

                    <hr/> 
                  </div>
                  <div className="flex justify-between px-4 font-bold text-lg">
                    <p className="font-semibold">Total</p>
                    <p>PKR Rs. {totalAmountWithSipping}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
}

export default Checkout;

const CustomInput = ({
  formKey,
  obj,
  placeholder,
  errors,
  errorMsg,
  type,
  disabled,
  className,
  value,
}) => {
  return (
    <div className="flex flex-col ">
      <input
        className={
          className
            ? className
            : "border mt-2 w-full  h-10 border-purple-600 lg:w-2/3  px-3 py-4 rounded-md"
        }
        placeholder={placeholder}
        disabled={disabled}
        type={type ? type : "text"}
        {...obj}
        value={value}
      />
      {errors[formKey] && (
        <span className="text-sm mb-1 text-red-500">{errorMsg}</span>
      )}
    </div>
  );
};
