import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Image } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BsArrowUpRightCircle } from "react-icons/bs";

function Cart() {
  const { cartItems, removeItemFromCart, addItemToCart, lessQuantityFromCart } =
    useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, obj) => total + obj.quantity * obj.SalePrice,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, obj) => total + obj.quantity,
    0
  );

  return (
    <div className="container-sm mx-auto mb-5 mt-4">
      <div className="text-center">
        <h1 className="font-semibold text-2xl  md:text-3xl lg:text-3xl xl:text-3xl  underline">Your Cart</h1>
      </div>

      <div className="flex  gap-3 lg:gap-5 mb-5 mt-3 ">
        <div className="flex-grow flex flex-col rounded border p-2.5 md:p-3  lg:p-4 xl:p-4 justify-center items-center     text-center shadow">
          <h1 className="">Total Qty</h1>
          <h1 className="font-semibold font-mono mt-2 text-md md:text-xl lg:text-3xl xl:text-3xl text-center">
            {totalQuantity}
          </h1>
        </div>
        <div className="flex-grow flex flex-col rounded border p-2.5 md:p-3  lg:p-4 xl:p-4 justify-center items-center  text-center shadow">
          <h1>Total Amount</h1>
          <h1 className="font-semibold font-mono mt-2 text-md md:text-xl lg:text-3xl xl:text-3xl text-center">
            Rs {Math.round(totalAmount)}/-
          </h1>
        </div>

        <Link
          to="/checkout"
          className="flex-grow flex  bg-gray-100 rounded  border p-2.5 md:p-3  lg:p-4 xl:p-4 justify-center items-center scale-100  hover:bg-black hover:text-white transition-all text-center shadow"
        >
          <div className="text-center flex">
            <h1 className="">Checkout
            </h1>
               <BsArrowUpRightCircle className=" p-0 ml-1"></BsArrowUpRightCircle>
            {/* <h1 className="flex items-center">to proceed  <BsArrowUpRightCircle className=" p-0 ml-1"></BsArrowUpRightCircle></h1> */}
          </div>
        </Link>
      </div>

      {cartItems.map((data, index) => (
        <div
          key={data?.id || `cart-item-${index}`} // Use index as a fallback
          className="flex items-center border my-2 p-3 rounded shadow text-md"
        >
          <div className= "max-w-full h-fit lg:w-3/6">

          <Image className="rounded h-96 " src={data?.img}  />
          </div>

          <div className="flex flex-col pl-5">
            <h1 className="font-semibold  mb-1">
              {data?.title} {`(${data?.category})`}
            </h1>
            <p className="  line-clamp-1 lg:line-clamp-2 xl:line-clamp-2  w-full lg:w-2/4  mb-2">{data.desc}</p>
            <h1 className=" font-bold mb-2">Price : {data?.SalePrice}/-</h1>
            
          </div>
          <div className="text-center items-center flex flex-col">
          <h1 className="  mb-2">Quantity:</h1>
            <div className="flex gap-3 items-center">
              <Button
                onClick={() => addItemToCart(data)}
                icon={<PlusOutlined />}
                className="border border-black text-black"
              ></Button>

              <h1 className="">{data.quantity}</h1>
              <Button
                danger
                className="border border-black text-black"
                icon={<MinusOutlined />}
                onClick={() => lessQuantityFromCart(data?.id)}
                disabled={data?.quantity === 1}
              ></Button>
            </div>

            <Button
              onClick={() => removeItemFromCart(data?.id)}
              danger
              className="w-28 my-3"
            >
              Remove item{" "}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
