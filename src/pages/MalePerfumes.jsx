import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../utils/firebase";
import { Spin, Button, Badge } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CartContext } from "../context/CartContext";
dayjs.extend(relativeTime);

function MalePerfumes() {
  const [malePerfumes, setMalePerfumes] = useState([]);
  const [loader, setLoader] = useState(true);
  const { addItemToCart, isItemAdded } = useContext(CartContext);

  useEffect(() => {
    fetchCategoryProducts("Men's Perfume", setMalePerfumes);
  }, []);

  // Function to fetch products by category
  const fetchCategoryProducts = async (category, setProducts) => {
    try {
      const prodCollection = collection(db, "products");
      const q = query(
        prodCollection,
        where("category", "==", category)
      );
      const docs = await getDocs(q);
      const arr = docs.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      setProducts(arr);
      setLoader(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoader(false);
    }
  };
  

  const renderProducts = (products) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-8">
      {products?.map((data) => (
            <Badge.Ribbon text="Sale" color="red" key={data?.id} className="">


        <div className="border rounded-md overflow-hidden sale-ribbon shadow" key={data?.id}>
          <Link to={`/products/${data?.id}`}>
            <div className="image-box rounded">
              <img src={data?.img} alt={data?.title} className="hover-img" />
            </div>
          </Link>
          <div className="bg-white z-50 p-2">
            <h1 className="text-xl font-semibold">{data?.title}</h1>
            <h1 className="text-gray-600 hide-text">{data?.ProductCategory}</h1>
            <div className="flex gap-2  text-lg mb-auto">
                     
                     <h1 className="font-bold my-2 text-gray-600"><del>Rs. {data?.price}</del></h1>
                     
                     <h1 className="font-bold my-2">Rs. {data?.SalePrice}</h1>

                    
                   
            </div>
            <button
              className="learn-btn transition-all px-3 rounded w-full py-2"
              onClick={() => addItemToCart(data)}
              >
              {isItemAdded(data.id) ? "Added in your cart" : "Add to Cart"}
            </button>
          </div>
        </div>
              </Badge.Ribbon>
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
        <div>
          <div className="flex justify-center my-6 lg:my-10 text-center items-center">
            <h1 className="text-3xl lg:text-4xl font-black underline">Men's Perfumes</h1>
          </div>

        
          {malePerfumes.length ? (
            renderProducts(malePerfumes)
          ) : (
            <div className="text-xl text-center">

            <p>No men's perfumes available.</p>
            </div>
          )}

          
        </div>
      )}
    </div>
  );
}

export default MalePerfumes;
