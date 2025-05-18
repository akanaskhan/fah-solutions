import { useNavigate, useParams, Link } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CartContext } from "../context/CartContext";
import { Spin } from "antd";
import { Button, Image } from "antd";
import NotFound from "../components/notfound";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItemToCart, lessQuantityFromCart, isItemAdded, buyNow } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const products = async () => {
      try {
        const docRef = doc(db, "products", id);
        const productInfo = await getDoc(docRef);
        if (productInfo.exists()) {
          setProduct(productInfo.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    
    
    products();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spin className="w-28 h-28" />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 w-full  mx-auto flex flex-wrap lg:flex-row">
         <div className="lg:w-1/2  w-full h-full ">

          <Image
            alt={product.title}
            style={{width: "100%"}}
            className="lg:w-1/2 md:w-full md:h-full lg:h-full w-full  h-64 object-cover object-center rounded"
            src={product?.img}
            />
            </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product?.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product?.title}
            </h1>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product?.ProductCategory}
            </h2>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 text-yellow-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 text-yellow-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 text-yellow-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 text-yellow-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-4 h-4 text-yellow-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 pb-0 border-l-2 border-gray-200 space-x-2s">
              <a className="" href="https://www.facebook.com/officialsmscents" target="_blank">
                    <i
                      className="fa-brands fa-facebook text-xl  "
                  
                    />
                  </a>
                <a className="text-gray-500 " href="https://api.whatsapp.com/send/?phone=923021953486" target="_blank" >
                <i
                      className="fa-brands fa-whatsapp  text-gray-500 text-xl mx-2 "
                   
                    />
                </a>
                <a className="text-gray-500" href="https://www.instagram.com/officialsmscents" target="_blank">
                <i className="fa-brands fa-instagram  text-xl text-gray-500"  />
                  
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{product?.desc}</p>
            <div className=" mt-6  pb-2 border-b-2 border-gray-100 mb-3">
             
              <div className="flex ml-6 items-center">
                <span className="mr-3">ML</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                   
                      <option>{product?.ML}</option>
                   
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            <div className="flex gap-2 mt-3">

             <del className="text-gray-600"> <p className="title-font font-medium text-2xl text-gray-700">
                Rs. {product?.price}
              </p></del>
              <p className="title-font font-medium text-2xl text-gray-900">
                Rs. {product?.SalePrice}
              </p>
            </div>
            </div>
            <div className="">

              <button
                className="learn-btn lg:px-3 p-2 w-full  rounded transition-all sticky bottom-1"
                onClick={() => addItemToCart(product)}
              >
                {isItemAdded(id)
                  ? `Added in your cart


`
                  : `Add to Cart`}{
                  }
              </button>
              <Link to="/checkout">
                <button
                  className="learn-btn lg:px-3 p-2 my-3 w-full  rounded transition-all"
                  onClick={() => buyNow(product)}
                >
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
