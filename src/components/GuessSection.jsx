import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";

export default function GuessSection(){
   
  const GuessImage =
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return(
        <>
        <div>
                <section className="secondtextColor body-font thirdbackgroundColor" id="guess-paper">
                  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-2xl lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                      <img
                        className="object-cover object-center rounded"
                        alt="hero"
                        src={GuessImage}
                      />
                    </div>
                    <div className="lg:flex md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-semibold ">
                        Guess Paper
                      </h1>
                      <p className="mb-8 leading-relaxed text-left">
                        Prepare effectively for your exams with our expertly designed
                        guess papers. Crafted based on the latest syllabus and exam
                        trends, our guess papers provide valuable insights into
                        important topics and potential questions. Save time and boost
                        your confidence with accurate, reliable, and exam-focused
                        material.
                      </p>
                      <Link to=
                {
                  auth.currentUser ? '/detail-form'
                  : '/login'
                }
              >
                      <div className="flex justify-center">
                        <button className="inline-flex textColor secondbackgroundColor  border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                          Get Guess Paper
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