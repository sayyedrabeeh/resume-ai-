import { useEffect,useRef,useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaBriefcase, FaUser, FaFileAlt, FaQuestionCircle } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi"; 



const steps = [
  { id: 1, title: "Upload Resume", desc: "Upload your existing resume in PDF format." },
  { id: 2, title: "Parse & Manage", desc: "ResuMatch extracts structured data and manages multiple profiles." },
  { id: 3, title: "Paste Job Description", desc: "Provide the job description of the role you want to apply for." },
  { id: 4, title: "Get Match Score", desc: "See match percentage and color-coded indicators for quick assessment." },
  { id: 5, title: "Analyze Gaps", desc: "Identify missing skills and receive actionable suggestions." },
  { id: 6, title: "Improve Profile", desc: "Optimize resume summary, skills, and experience with feedback." },
  { id: 7, title: "Practice Interview", desc: "Use AI chatbot with 100+ HR questions and get instant feedback." },
  { id: 8, title: "Generate Resume", desc: "Build a professional, ATS-friendly resume with custom templates." },
  { id: 9, title: "Search Jobs", desc: "Find real-time job openings and sort them by match score." },
  { id: 10, title: "Apply Instantly", desc: "Click on direct application links to apply to matched jobs." },
];


function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null)
   const [positions, setPositions] = useState([]);

  
  useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const cardWidth = 224;  
  const cardHeight = 96;  

  setPositions(
    steps.map(() => ({
      top: Math.random() * (containerHeight - cardHeight),
      left: Math.random() * (containerWidth - cardWidth),
    }))
  );
}, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
   
  
    const scrollY = useMotionValue(0)
    
    
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY
        const docHieght = document.body.scrollHeight - window.innerHeight
        const progress = docHieght ? scrollTop / docHieght : 0
        scrollY.set(progress)
      }
        window.addEventListener('scroll', handleScroll)
        return () => removeEventListener('scroll',handleScroll)
      
    },[scrollY])
    
  

  return (
    // <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 ">
    //   <div className="container mx-auto px-4">
    //     <div className="mx-auto">
    //       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
    //         <div className="bg-blue-600 p-8 text-center">
    //           <h1 className="text-3xl font-bold text-white mb-2">Welcome to ResumeMatch</h1>
    //           <p className="text-blue-100">Your professional career companion</p>
    //         </div>
            
    //         <div className="p-8">
    //           <div className="text-center mb-10">
    //             <div className="inline-block p-4 rounded-full bg-blue-100 mb-4">
    //               <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
    //               </svg>
    //             </div>
                 
    //             <p className="text-gray-600">What would you like to do today?</p>
    //           </div>
              
    //            

    //              
    //            

    //             <Link
    //               to="/ResumeBuilder"
    //               className="block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg shadow transition duration-300 flex items-center"
    //             >
    //               <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h2"></path>
    //               </svg>
    //               <div>
    //                 <span className="block">Resume Builder </span>
    //                 <span className="block text-sm text-purple-200">Build a simlpe Resume With Resume builder  </span>
    //               </div>
    //             </Link>

    //             <Link
    //                   to="/HR"
    //                   className="block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition duration-300 flex items-center"
    //                 >
    //                   <svg
    //                     className="w-6 h-6 mr-3 text-white"
    //                     fill="none"
    //                     stroke="currentColor"
    //                     strokeWidth="2"
    //                     viewBox="0 0 24 24"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       d="M5.121 17.804A5.002 5.002 0 0110 15h4a5.002 5.002 0 014.879 2.804M15 11a3 3 0 10-6 0 3 3 0 006 0z"
    //                     />
    //                   </svg>
    //                   <div>
    //                     <span className="block text-base">HR Interview Practice</span>
    //                     <span className="block text-sm text-blue-100">Practice with 100+ HR Questions</span>
    //                   </div>
    //                 </Link>
                    

    //             <Link
    //               to="/me"
    //               className="block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg shadow transition duration-300 flex items-center"
    //             >
    //              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9.953 9.953 0 0112 15c2.21 0 4.245.713 5.879 1.904M15 10a3 3 0 11-6 0 3 3 0 016 0zM12 2a10 10 0 100 20 10 10 0 000-20z" />
    //               </svg>
                  
    //               <div>
    //                 <span className="block">Me</span>
    //                 <span className="block text-sm text-gray-300">MY Profile</span>
    //               </div>
    //             </Link>
    //           </div>
              
    //           <div className="mt-12 pt-8 border-t border-gray-200 text-center">
    //             <button
    //               onClick={() => {
    //                 localStorage.removeItem("access_token");
    //                 navigate("/login");
    //               }}
    //               className="text-red-600 hover:text-red-800 font-medium transition duration-300"
    //             >
    //               Sign Out
    //             </button>
    //           </div>
    //         </div>
    //       </div>
          
    //       <div className="mt-8 text-center text-gray-500 text-sm">
    //         <p>&copy; {new Date().getFullYear()} ResumeMatch. All rights reserved.</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-gray z-50">
        <motion.div
          className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500"
          style={{ scaleX: scrollY }}
          transformOrigin="0% 50%" />
        
      </div>

        <Navbar/>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-l from-[#E83D95] to-black py-16 flex items-center px-6 md:px-20   ">
        <div className=" flex-1  space-y-6 z-10">
          <div className="flex-1 z-20 space-y-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl font-heading animate-fadeIn">
        Resu
        <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#FFD6FF] to-[#FF77FF]">
          Match
        </span>
      </h1>

      <p className="text-white/95 md:text-xl max-w-xl leading-relaxed font-body font-medium animate-fadeIn delay-200">
        ResuMatch is a <span className="font-semibold text-[#FFD6FF]"> platform</span> that connects <span className="font-semibold text-[#FFD6FF]">job seekers</span> with their ideal positions.
      </p>
      <p className="text-white/90 md:text-lg max-w-xl leading-relaxed font-body animate-fadeIn delay-400">
        Using <span className="font-semibold text-[#FF77FF]">advanced text analysis</span> and skill extraction algorithms, it evaluates resumes and compares them to job descriptions.
      </p>
      <p className="text-white/90 md:text-lg max-w-xl leading-relaxed font-body animate-fadeIn delay-600">
        It then provides <span className="font-semibold text-[#FFD6FF]">actionable insights</span> to boost your chances of landing interviews.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4 flex-wrap mt-4 animate-fadeIn delay-800">
        <button className="bg-[#FFD6FF] text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#FF77FF] transition duration-300 font-body">
          Get Started
        </button>
        <button className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition duration-300 font-body">
          Learn More
        </button>
      </div>
    </div>


          
        </div>

        
        {/* right-side logo */}

        <div className="flex-1 relative z-10 justify-center items-center flex">
          <div className=" absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#FFD6FF]/40 blur-3xl animate-plus"></div>
            <img src="logo.jpg" alt="logo" className="w-64 h-64 md:w-80 md:h-80 object-contain animate-float drop-shadow-2xl relative z-20 " />
            <div className=" absolute top-10 left-20 w-24 h-24 rounded-full bg-[#FF77FF]/30 blur-2xl animate-spin-slow"></div>
            <div className="absolute bottom-20 right-10  w-32 h-32 rounded-full bg-[#FF3399]/30 blur-2xl animate-spin-slow "></div>
          </div>
          <div className="absolute inset-0  bg-gradient-to-r from-transparent via-black/50 to-transparent z-0"></div>
        
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/100 z-10 pointer-events-none"></div>

     
      </div>
 
            
      {/* SECOND SECTION */}
      
      
      <div className="min-h-screen relative overflow-hidden bg-black flex flex-col md:flex-row items-start   py-32  px-6 md:px-20 ">
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/20 to-black z-10 pointer-events-none"></div>

        <div className="flex-1 space-y-8 z-10">

          <h1 className="text-white text-4xl font-bold">
            Resume Analysis and Management
          </h1>

          <ul className="text-white/90 list-disc pl-6 space-y-3 text-lg md:text-xl">
              <li><span className="font-semibold text-[#E83D95]" >Smart PDF Parsing:</span> Extract structured data from PDF resumes</li>
              <li><span className="font-semibold text-[#E83D95]" >Multiple Profile Support:</span> Manage different versions of your professional profile</li>
              <li><span className="font-semibold text-[#E83D95]" >Social Profile Detection:</span> Automatically extracts LinkedIn, GitHub, and personal website URLs</li>
              <li><span className="font-semibold text-[#E83D95]" >Visual Resume Dashboard:</span> View all your parsed resume data in a clean, organized interface</li>

          </ul>
          

          <div className="flex justify-center mt-8">
            <Link to={'/upload'} className="bg-[#FFD6FF]/70 text-black py-3 px-6 rounded-full shadow-lg hover:bg-[#FF77FF] transition">
              <span className="font-semibold">Upload Your Resume</span>
            </Link>
          </div>


        </div>
          {/* image */}

          <div className="flex-1 relative mt-16 md:mt-0  md:ml-16 z-10  flex justify-center">

            <img src="/images/resume.jpg"
                 alt="resume"
                 className="w-96 h-auto md:w-[28rem] md:h-[28rem] rounded-xl shadow-2xl object-content animate-float"
            />
          </div>
      <div className="absolute inset-0 z-0"
       style={{
         backgroundImage: `
           repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(246, 59, 246, 0.2) 20px),
           repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(246, 59, 171, 0.2) 20px)
         `
       }}
      ></div>
      </div>

      {/* THIRD SECTION  */}
 
      <div className="min-h-screen bg-black flex flex-col items-center py-16 px-6 md:px-20">

        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white">
          ResuMatch Steps 
        </h2>

        <p className="text-white/70 mb-12 text-center max-w-2xl ">
            Drag each step anywhere within this section to explore your resume optimization journey.
        </p>

        <div className="relative w-full h-[60vh] border border-white/20  rounded-lg bg-black/80 flex items-center justify-center  overflow-hidden " ref={containerRef}>
          {containerRef.current && positions.length === steps.length && steps.map((step, index) => (
            <motion.div
              key={step.id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.3}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * 0.2,
                type: 'spring',
                stiffness: 120,
                damping: 15
              }}
              className="absolute bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-lg p-6 w-56  shadow-lg cursor-grab text-white"
              style={positions[index]}>
                <div className="w-10 h-10 rounded-full bg-black/50 flex items-center  justify-center font-bold text-lg mb-3">
                  {step.id}
                </div>
              <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
              <p className=" text-white/80 text-sm ">{ step.desc}</p>

              </motion.div>
            
          ) )}

        </div>

      </div>
     
      {/* FORTH SECTION */}

      <div className="min-h-screen  bg-gradient-to-l from-[#3f0e27] to-black py-16 flex items-center flex-col px-6 md:px-20   ">
        <div className="flex flex-col md:flex-row md:space-x-8 mb-8 w-full max-w-[1200px]">
          <Link
            to="/job-matches"
            className="relative block w-full md:w-[500px] h-[200px] 
                      bg-gradient-to-r from-green-400/30 to-green-700/30 
                      backdrop-blur-md border border-green-400/30 
                      rounded-2xl shadow-lg transition-transform transform 
                      hover:-translate-y-2 hover:shadow-2xl flex items-center mr-8 p-6 group">
            <FaBriefcase className="w-16 h-16 mr-8 text-green-400 flex-shrink-0" />
            <div className="flex-1">
              <span className="block text-3xl font-extrabold tracking-wide text-white">
                View Matching Jobs
              </span>
              <span className="block text-sm text-green-200 mt-3 font-medium">
                Find positions that match your profile
              </span>
            </div>
            <FiArrowRight className="w-6 h-6 text-green-400 ml-4 transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
        <Link
            to="/profiles"
            className="relative block w-full md:w-[500px] h-[200px] 
                      bg-gradient-to-r from-blue-400/30 to-blue-700/30 
                      backdrop-blur-md border border-blue-400/30 
                      rounded-2xl shadow-lg transition-transform transform 
                      hover:-translate-y-2 hover:shadow-2xl flex items-center p-6 group">
            <FaUser className="w-16 h-16 mr-8 text-blue-400 flex-shrink-0" />
            <div className="flex-1">
              <span className="block text-3xl font-extrabold tracking-wide text-white">
                Manage Profiles
              </span>
              <span className="block text-sm text-blue-200 mt-3 font-medium">
                Select and update your profile
              </span>
            </div>
            <FiArrowRight className="w-6 h-6 text-blue-400 ml-4 transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
     </div>
  <div className="flex flex-col md:flex-row md:space-x-8 w-full max-w-[1200px]">
        
</div>

        
        

      
      </div>



    </>
  );
}

export default Home;