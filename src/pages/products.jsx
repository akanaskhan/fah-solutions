import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState, createContext, useContext } from "react";
import { db } from "../utils/firebase";
// import { categories } from "../../utils/categories";
import { Button, Spin } from "antd";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; 
import ScrollAnimation from "react-animate-on-scroll";
import { CartContext } from "../context/CartContext";
dayjs.extend(relativeTime);

function AllProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getProducts();
  }, []);
  const { cartItems, addItemToCart, isItemAdded } = useContext(CartContext);
  // console.log("cartItems:==> ", cartItems);

  const getProducts = async () => {
    try {
      const prodCollection = collection(db, "products");
      const q = query(prodCollection, orderBy("createdAt", "desc"));
      const docs = await getDocs(q);
      const arr = [];
      docs.forEach((product) =>
        arr.push({ ...product.data(), id: product.id })
      );
      setProducts([...arr]);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };
  return (
    <>
      {loader ? (
        <div
          className="flex h-screen
  justify-center items-center"
        >
          <Spin className="w-28 h-28" />{" "}
        </div>
      ) : (
        <div className="container mx-auto">
          <div>
            <div className="flex justify-center my-4 text-center items-center">
              <h1 className="text-4xl font-black text-black underline">All Perfumes</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-8 " >
              {products?.map((data) => (
                <div
                  className="border rounded-md overflow-hidden"
                  key={data?.id}
                  onClick={scrollToTop}
                >
                  {loader ? (
                    <div className="flex h-screen justify-center items-center">
                      <Spin className="" />{" "}
                    </div>
                  ) : (
                    <Link to={`/products/${data?.id}`} key={data.id}>
                      <div className="">
                        <div className="image-box rounded">
                          <img src={data?.img} className="hover-img" />
                        </div>
                      </div>
                    </Link>
                  )}
                  <div className=" bg-white z-50">
                    <div className="p-2">
                      <h1 className="text-xl font-semibold seach-category">{data?.title}</h1>
                      <h1 className="">{data?.category}</h1>
                      <div className="flex gap-2  mb-2 text-lg">
                     
                        <h1 className="font-bold my-2"><del>Rs. {data?.price}</del></h1>
                        
                        <h1 className="font-bold my-2">Rs. {data?.SalePrice}</h1>

                       
                      </div>
                      <button
                        className="learn-btn transition-all px-3 rounded w-full py-2 "
                        onClick={() => addItemToCart(data)}
                      >
                        {isItemAdded(data.id)
                          ? `Added in your cart`
                          : `Add to Cart`}
                      </button>
                    </div>
                   
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AllProducts;
