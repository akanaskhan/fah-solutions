import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";

export default function ProjectSection(){
  const ProjectImage =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
 
  
  return(
        <>
        <div>
        <section className="text-gray-600 body-font " id="project">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-semibold textColor">
                Projects
              </h1>
              <p className="mb-8 leading-relaxed text-left">
                We specialize in providing creative and high-quality projects
                that showcase innovation and attention to detail. From academic
                projects to professional-grade solutions, our offerings are
                tailored to your specific requirements. Whether it's
                research-based, technical, or design-focused, our expertly
                crafted projects help you stand out and achieve your goals.
              </p>
              <Link to=
                {
                  auth.currentUser ? '/detail-form'
                  : '/login'
                }
              >
              <div className="flex justify-center">
                <button className="inline-flex text-white backgroundColor  border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Create Projects
                </button>
              </div>
              </Link>
            </div>
            <div className="lg:max-w-2xl lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={ProjectImage}
              />
            </div>
          </div>
        </section>
      </div>
        </>
    )
}