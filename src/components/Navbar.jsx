import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Badge, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth, db } from "../utils/firebase";
import { getAuth, signOut } from "firebase/auth";
import { CgShoppingCart } from "react-icons/cg";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../context/CartContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { data } from "autoprefixer";
import logo from "../assets/images/logo.svg";
import { ConfigProvider, Flex, Popover } from "antd";
function NavBar() {
  const [expanded, setExpanded] = useState(false); // State to track toggle status
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  const toggleIcon = (setState) => {
    setState((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { cartItems } = useContext(CartContext);
  const addProduct = () => {
    if (user.isLogin) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const auth = getAuth();
  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        message.success("Log Out successful.");
      })
      .catch((error) => {
        console.log("signout error", error);
      });
  };

  const gotoLogin = () => {
    navigate("/login");
  };

  const content = (
    <div className="flex flex-col">
      {auth.currentUser ? (
        <>
          <Link
            to="/user-orders"
            className="bg-white p-2 px-3 text-lg dropdown-Btn border border-gray-900"
          >
            <button>Your Orders</button>
          </Link>
          <button
            className="bg-white p-2 px-3 text-lg dropdown-Btn mt-2 border border-gray-900"
            onClick={HandleSignOut}
          >
            Log Out
          </button>
        </>
      ) : (
        <Link to="/login">
          <button className="bg-white p-2 px-3 text-lg dropdown-Btn border border-gray-900">
            Login
          </button>
        </Link>
      )}
    </div>
  );
  const [hover, setHover] = useState();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const prodCollection = collection(db, "products");
      const q = query(prodCollection, orderBy("createdAt", "desc"));
      const docs = await getDocs(q);
      const arr = [];
      docs.forEach((product) =>
        arr.push({ ...product.data(), id: product.id })
      );
      setProducts(arr);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };
  const showProducts = products.filter((data) =>
    data.title.toLowerCase().includes(search.toLowerCase())
  );
  const handleProductClick = (data) => {
    setShowDropdown(false); // Collapse dropdown
    navigate(`/products/${data.id}`); // Navigate to detail page
  };
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };
  const handleToggle = () => {
    // Check if the screen width is below large (e.g., 1024px for large screens)
    if (window.innerWidth < 1024) {
      toggleIcon(setIsOpen4);
      setExpanded(expanded ? false : true);

      // Scroll to top for Safari, Chrome, Firefox, IE, and Opera
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    }
  };

  document.addEventListener("click", () => {
    setShowDropdown(false);
  });
  return (
    <div className="m-0  z-10 secondbackgroundColor textColor  ">
      <div className="container ">
        <Navbar expand="lg" className="      " expanded={expanded}>
          <button
            className="d-lg-none p-0 m-0 border-none outline-none focus:outline-0 focus:border-none"
            type="button"
            onClick={() => setExpanded(expanded ? false : true)} // Toggle state
            aria-controls="basic-navbar-nav"
            aria-expanded={expanded}
            style={{ padding: "0", margin: "0px" }}
          >
            <div
              id="nav-icon4"
              className={isOpen4 ? "open" : ""}
              onClick={() => toggleIcon(setIsOpen4)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <Navbar.Brand
            className="mx-auto textColor  w-12 md:w-18 lg:w-16"
            href="/"
          >
            <h1 className="text-2xl font-black">FAH</h1>
            {/* <img className="textColor" src={logo} alt="Logo" /> */}
          </Navbar.Brand>

          <div className="d-lg-none">
            {auth.currentUser ? (
              <Button
                className=" border-none m-0 px-2  secondtextColor backgroundColor rounded-full"
                onClick={HandleSignOut}
              >
                Log Out
              </Button>
            ) : (
              <Link to="/login" className="">
                <Button className="bg-transparent border-none m-0 px-0 text-lg textColor">
                  <i className="fa-solid fa-user  text-md  cursor-pointer  z-50" />
                </Button>
              </Link>
            )}
            {/* <Link to='/login'>
                  <Button className="bg-transparent border-none m-0 px-0 text-lg ">
                    <i className="fa-solid fa-user textColor text-md  cursor-pointer  z-50" />
                    
                  </Button>
                </Link> */}
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto ml-0 lg:ml-10 xl:ml-10 items-center">
              <div
                href=""
                className="textColor nav-line nav-link"
                onClick={handleToggle}
              >
                <Link to="/">
                  <div className="">Home</div>
                </Link>
              </div>
              <div
             
                className="textColor  nav-line nav-link cursor-pointer"
                onClick={handleToggle}
              >
                <Link to="assignments">
                <div className="">Assignments</div>
                </Link>
              </div>
              <div
          
                className="textColor  nav-line nav-link"
                onClick={handleToggle}
              >
                <Link to="projects">
                <div className="">Projects</div>
                </Link>
              </div>
              <div
               
                className="textColor  nav-line nav-link"
                onClick={handleToggle}
              >
                <Link to="guess-papers">
                <div className="">Guess Papers</div>
                </Link>
              </div>
            </Nav>
          </Navbar.Collapse>

          <div className="d-sm-none d-lg-block sm-icon ms-auto ">
            <div className="flex items-center bg-blue-900 hover:bg-[#003161] border border-blue-950  rounded-full p-2 px-3">
              {auth.currentUser ? (
                <Button
                  className="bg-transparent border-none m-0 px-0 text-lg secondtextColor"
                  onClick={HandleSignOut}
                >
                  Log Out
                </Button>
              ) : (
                <Link to="/login">
                  <Button className="bg-transparent border-none m-0 px-0 text-lg secondtextColor">
                    <i className="fa-solid fa-user  text-md  cursor-pointer  z-50" />
                    Login/SignUp
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBar;
