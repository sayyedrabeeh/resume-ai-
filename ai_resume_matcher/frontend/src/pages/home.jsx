import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 p-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome to ResumeMatch</h1>
              <p className="text-blue-100">Your professional career companion</p>
            </div>
            
            <div className="p-8">
              <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-blue-100 mb-4">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                 
                <p className="text-gray-600">What would you like to do today?</p>
              </div>
              
              <div className="space-y-4">
                <Link
                  to="/upload"
                  className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow transition duration-300 flex items-center"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"></path>
                  </svg>
                  <div>
                    <span className="block">Upload Your Resume</span>
                    <span className="block text-sm text-blue-200">Parse and extract your skills and experience</span>
                  </div>
                </Link>

                <Link
                  to="/job-matches"
                  className="block bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg shadow transition duration-300 flex items-center"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <span className="block">View Matching Jobs</span>
                    <span className="block text-sm text-green-200">Find positions that match your profile</span>
                  </div>
                </Link>
                
                <Link
                  to="/profiles"
                  className="block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg shadow transition duration-300 flex items-center"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                  </svg>
                  <div>
                    <span className="block">Manage Profiles</span>
                    <span className="block text-sm text-indigo-200">Select and update your profile</span>
                  </div>
                </Link>

                <Link
                  to="/ResumeBuilder"
                  className="block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg shadow transition duration-300 flex items-center"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h2"></path>
                  </svg>
                  <div>
                    <span className="block">Resume Builder </span>
                    <span className="block text-sm text-purple-200">Build a simlpe Resume With Resume builder  </span>
                  </div>
                </Link>

                <Link
                      to="/HR"
                      className="block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transition duration-300 flex items-center"
                    >
                      <svg
                        className="w-6 h-6 mr-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.121 17.804A5.002 5.002 0 0110 15h4a5.002 5.002 0 014.879 2.804M15 11a3 3 0 10-6 0 3 3 0 006 0z"
                        />
                      </svg>
                      <div>
                        <span className="block text-base">HR Interview Practice</span>
                        <span className="block text-sm text-blue-100">Practice with 100+ HR Questions</span>
                      </div>
                    </Link>
                    

                <Link
                  to="/me"
                  className="block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg shadow transition duration-300 flex items-center"
                >
                 <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9.953 9.953 0 0112 15c2.21 0 4.245.713 5.879 1.904M15 10a3 3 0 11-6 0 3 3 0 016 0zM12 2a10 10 0 100 20 10 10 0 000-20z" />
                  </svg>
                  
                  <div>
                    <span className="block">Me</span>
                    <span className="block text-sm text-gray-300">MY Profile</span>
                  </div>
                </Link>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <button
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    navigate("/login");
                  }}
                  className="text-red-600 hover:text-red-800 font-medium transition duration-300"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} ResumeMatch. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;