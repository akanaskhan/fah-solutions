import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";

export default function Footer() {
  const scrollToTop = () => {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
  };

  const navigate = useNavigate();
  const logoImage = "https://thumbs.dreamstime.com/b/fah-letter-logo-design-polygon-shape-cube-hexagon-vector-template-white-black-colors-monogram-business-real-estate-256342446.jpg"
  return (

    <footer className="footer secondbackgroundColor textColor py-6  px-0 mx-0 items-center mt-0 border border-blue-950">
      <div className="container ">

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center ">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={logoImage}
            alt="FAH Solutions Logo"
            className="w-12 cursor-pointer textColor backgroundColor mix-blend-multiply "
            onClick={() => {
              navigate("/");
              scrollToTop();
            }}
          />
          <span className="ml-3 text-lg font-semibold">FAH Solutions</span>
        </div>

        {/* Navigation Links */}
        <nav className=" items-center">
          <ul className="flex flex-col md:flex-row gap-4 text-center items-center">
            <li className="items-center">
              <Link
                to="/"
                className=" nav-line items-center"
                onClick={scrollToTop}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/assignment "
                className="nav-line"
                onClick={scrollToTop}
              >
                Assignment
              </Link>
            </li>
            <li>
              <Link
                to="/project"
                className="nav-line"
                onClick={scrollToTop}
              >
                Project
              </Link>
            </li>
            <li>
              <Link
                to="/guesspapers"
                className="nav-line"
                onClick={scrollToTop}
              >
                Guess Papers
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer Info */}
        <div className=" text-center md:text-right">
          <p className="text-sm">
            &copy; 2024 FAH Solutions. All Rights Reserved.
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
}
