import React from "react";
import { Button } from "antd";
import intro from "../assets/images/intro.jpg";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";

function Intro() {
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  const introImage =
    "https://plus.unsplash.com/premium_photo-1722772807224-e5789160acd0?q=80&w=1606&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
 return (
    <div className="">
      <div className="main ">
        <section className="text-gray-600 body-font ">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center ">
            <div className="lg:flex lg:flex-col md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-10 md:mb-0  ">
              <h1 className="  text-3xl md:text-4xl lg:text-5xl xl:text-5xl mb-2 font-bold textColor">
                FAH Solutions
              </h1>
              <p className="mb-1 leading-relaxed text-left font-semibold textColor text-lg">
                Welcome to Your Academic Companion
              </p>
              <p className="mb-8 leading-relaxed text-left">
                We provide expertly crafted assignments, innovative projects,
                and reliable guess papers tailored to your educational needs.
                Whether you're a student seeking support or a professional
                looking for custom academic solutions, our platform ensures
                quality, accuracy, and timely delivery. Enhance your learning
                journey with our trusted resources.
              </p>
                <Link to=
                {
                  auth.currentUser ? '/detail-form'
                  : '/login'
                }
              >
              <div className=" ">
                <button className="inline-flex text-white backgroundColor border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Get started
                </button>
              </div>
                </Link>
            </div>
            <div className="lg:max-w-2xl  lg:w-full md:w-1/2 w-full">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={introImage}
              />
            </div>
          </div>
        </section>
      </div>

     
    
      
    </div>
  );
}

export default Intro;
