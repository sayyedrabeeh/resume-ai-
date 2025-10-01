import { useEffect,useRef,useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaBriefcase, FaUser, FaFileAlt, FaQuestionCircle,FaStar,FaGithub   } from "react-icons/fa";
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

   <div className="min-h-screen bg-gradient-to-l from-[#1a0510] to-black py-20 flex items-center flex-col px-6 md:px-20 relative">
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
  <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-14 text-center relative z-10">
    Explore Our Features
  </h2>
  <div className="flex flex-col md:flex-row md:space-x-6 mb-6 w-full max-w-[1100px] relative z-10">
    <Link
      to="/job-matches"
      className="relative block w-full md:w-1/2 h-[200px] 
                bg-gradient-to-r from-green-900/70 to-green-950/70 
                backdrop-blur-xl border border-green-700/40 
                rounded-2xl shadow-xl transition-transform transform 
                hover:-translate-y-2 hover:shadow-green-700/30 flex items-center p-6 group">
      <FaBriefcase className="w-16 h-16 mr-8 text-green-500 flex-shrink-0" />
      <div className="flex-1">
        <span className="block text-3xl font-extrabold tracking-wide text-white">
          View Matching Jobs
        </span>
        <span className="block text-sm text-green-300 mt-3 font-medium">
          Find positions that match your profile
        </span>
      </div>
      <FiArrowRight className="w-6 h-6 text-green-500 ml-4 transition-transform duration-300 group-hover:translate-x-2" />
    </Link>

    <Link
      to="/profiles"
      className="relative block w-full md:w-1/2 h-[200px] 
                bg-gradient-to-r from-blue-900/70 to-blue-950/70 
                backdrop-blur-xl border border-blue-700/40 
                rounded-2xl shadow-xl transition-transform transform 
                hover:-translate-y-2 hover:shadow-blue-700/30 flex items-center p-6 group mt-6 md:mt-0">
      <FaUser className="w-16 h-16 mr-8 text-blue-500 flex-shrink-0" />
      <div className="flex-1">
        <span className="block text-3xl font-extrabold tracking-wide text-white">
          Manage Profiles
        </span>
        <span className="block text-sm text-blue-300 mt-3 font-medium">
          Select and update your profile
        </span>
      </div>
      <FiArrowRight className="w-6 h-6 text-blue-500 ml-4 transition-transform duration-300 group-hover:translate-x-2" />
    </Link>
  </div>
  <div className="flex flex-col md:flex-row md:space-x-6 w-full max-w-[1100px] relative z-10">
    <Link
      to="/ResumeBuilder"
      className="relative block w-full md:w-1/3 h-[200px] 
                bg-gradient-to-r from-yellow-900/70 to-yellow-950/70 
                backdrop-blur-xl border border-yellow-700/40 
                rounded-2xl shadow-xl transition-transform transform 
                hover:-translate-y-2 hover:shadow-yellow-700/30 flex items-center p-6 group mb-6 md:mb-0">
      <FaFileAlt className="w-16 h-16 mr-8 text-yellow-500 flex-shrink-0" />
      <div className="flex-1">
        <span className="block text-3xl font-extrabold tracking-wide text-white">
          Resume Builder
        </span>
        <span className="block text-sm text-yellow-300 mt-3 font-medium">
          Create ATS-friendly resumes quickly
        </span>
      </div>
      <FiArrowRight className="w-6 h-6 text-yellow-500 ml-4 transition-transform duration-300 group-hover:translate-x-2" />
    </Link>

    <Link
      to="/HR"
      className="relative block w-full md:w-1/3 h-[200px] 
                bg-gradient-to-r from-red-900/70 to-red-950/70 
                backdrop-blur-xl border border-red-700/40 
                rounded-2xl shadow-xl transition-transform transform 
                hover:-translate-y-2 hover:shadow-red-700/30 flex items-center p-6 group mb-6 md:mb-0">
      <FaQuestionCircle className="w-16 h-16 mr-8 text-red-500 flex-shrink-0" />
      <div className="flex-1">
        <span className="block text-3xl font-extrabold tracking-wide text-white">
          HR Interview Questions
        </span>
        <span className="block text-sm text-red-300 mt-3 font-medium">
          Practice common HR questions and ace your interviews
        </span>
      </div>
      <FiArrowRight className="w-6 h-6 text-red-500 ml-4 transition-transform duration-300 group-hover:translate-x-2" />
    </Link>

    <a
      href="https://github.com/sayyedrabeeh/resume-ai-"
      className="relative block w-full md:w-1/3 h-[200px] 
                bg-gradient-to-r from-pink-900/70 to-pink-950/70 
                backdrop-blur-xl border border-pink-700/40 
                rounded-2xl shadow-xl transition-transform transform 
                hover:-translate-y-2 hover:shadow-pink-700/30 flex items-center p-6 group">
      <FaGithub className="w-16 h-16 mr-8 text-pink-500 flex-shrink-0" />
      <div className="flex-1">
        <span className="block text-3xl font-extrabold tracking-wide text-white">
          ⭐ Star on GitHub
        </span>
        <span className="block text-sm text-pink-300 mt-3 font-medium">
          Support the project and share with others
        </span>
      </div>
      <FiArrowRight className="w-6 h-6 text-pink-500 ml-4 transition-transform duration-300 group-hover:translate-x-2" />
    </a>
  </div>
</div>




    </>
  );
}

export default Home;