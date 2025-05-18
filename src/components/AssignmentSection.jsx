import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";

export default function AssignmentSection(){
    const AssignmentImage =
    "https://plus.unsplash.com/premium_photo-1669904022334-e40da006a0a3?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
 
    
    return(
        <>
         <div>
                <section className="textColor body-font secondbackgroundColor " id="assignment">
                  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-2xl lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                      <img
                        className="object-cover object-center rounded"
                        alt="hero"
                        src={AssignmentImage}
                      />
                    </div>
                    <div className="lg:flex md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-semibold ">
                        Assignments
                      </h1>
                      <p className="mb-8 leading-relaxed text-left">
                        Our platform offers meticulously crafted assignments tailored to
                        meet your academic requirements. Whether you need help with
                        research, writing, or formatting, we deliver well-structured and
                        plagiarism-free content that aligns with your syllabus and
                        instructions. Simplify your workload with our reliable
                        assignment solutions, designed to help you achieve top grades
                        effortlessly.
                      </p>
                      <Link to=
                {
                  auth.currentUser ? '/detail-form'
                  : '/login'
                }
              >
                      <div className=" ">
                      <button className="inline-flex secondtextColor backgroundColor   border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                          Create Assignments
                        </button>
                      </div>
                        </Link>
                      
                    </div>
                  </div>
                </section>
              </div>
        </>
    )
}