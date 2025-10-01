import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profiles, setProfile] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      setError("Your session has expired. Please log in again.");
      setLoading(false);
      return;
    }

    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/profiles/");
      console.log('response', response.data);
      setProfile(response.data);
    } catch (error) {
      setError("Failed to fetch profiles.");
    } finally {
      setLoading(false);
    }
  };

  const handleChooseProfile = async (profileId) => {
    try {
      await axiosInstance.post("/set-current-profile/", {
        profile_id: profileId,
      });
      const selected = profiles.find((p) => p.id === parseInt(profileId));
      setCurrentProfile(selected);
    } catch (error) {
      setError("Failed to set current profile.");
    }
  };

  const ProfileSection = ({ title, content }) => {
    if (!content) return null;
    return (
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</h4>
        <div className="text-gray-700">{content}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#E83D95] to-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-heading text-white/70">Profile Management</h1>
              <p className="text-white/60 font-semibold mt-1">Select and manage your professional profiles</p>
            </div>
            <Link 
              to="/"
              className="text-white/70 hover:text-white/50 flex items-center gap-1 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Dashboard
            </Link>
          </div>

          {/* Main Content */}
          {loading ? (
            <div className="bg-black/50 rounded-xl shadow-md p-12 flex justify-center items-center">
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg font-medium text-gray-700">Loading profiles...</span>
              </div>
            </div>
          ) : error ? (
            <div className="bg-black/50 rounded-xl shadow-md p-8 border-l-4 border-red-500">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Error</h3>
                  <p className="text-gray-600 mt-1">{error}</p>
                  <Link to="/login" className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-800">
                    Go to Login
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-black/50 rounded-xl shadow-md overflow-hidden mb-8 border border-gray-100">
                <div className="bg-black/50 px-8 py-5 text-[#FF77FF]/50">
                  <h2 className="text-xl text-[#FF77FF]/50 font-bold">Profile Selection</h2>
                  <p className="text-blue-100 text-sm mt-1">Choose which profile to use for job matching</p>
                </div>
                
                <div className="p-8">
                  {profiles.length === 0 ? (
                    <div className="text-center py-8">
                      <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                      </svg>
                      <h3 className="mt-4 text-lg font-medium text-white/70">No profiles available</h3>
                      <p className="mt-1 text-white/70">Upload a resume to create your first profile</p>
                      <Link 
                        to="/upload" 
                        className="mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF77FF]/50 hover:bg-[#FF77FF]"
                      >
                        Upload Resume
                      </Link>
                    </div>
                  ) : (
                    <>
                      <label className="block text-sm font-medium text-white/70 mb-2">Select a profile</label>
                      <div className="flex items-center">
                        <div className="relative flex-grow">
                          <select
                            className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring--[#FF77FF]/50 focus:border--[#FF77FF]/50 rounded-lg shadow-sm"
                            onChange={(e) => handleChooseProfile(e.target.value)}
                            value={currentProfile?.id || ""}
                          >
                            <option value="" disabled>-- Select Profile --</option>
                            {profiles.map((profile) => (
                              <option key={profile.id} value={profile.id}>{profile.name}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <Link 
                          to="/upload" 
                          className="ml-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          Add New
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {currentProfile && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-100">
                  <div className="bg-indigo-600 px-8 py-5 text-white">
                    <h2 className="text-xl font-bold">{currentProfile.name}'s Profile</h2>
                    <p className="text-indigo-100 text-sm mt-1">Currently selected profile</p>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
                      <div className="bg-indigo-100 rounded-full p-3 mr-4">
                        <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="flex gap-4 items-center">
                          <h3 className="text-xl font-bold text-gray-800">{currentProfile.name}</h3>
                          {currentProfile.email && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Active</span>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-8 mt-2">
                          {currentProfile.email && (
                            <a href={`mailto:${currentProfile.email}`} className="text-blue-600 hover:text-blue-800 flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                              </svg>
                              {currentProfile.email}
                            </a>
                          )}
                          {currentProfile.phone && (
                            <span className="text-gray-600 flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                              </svg>
                              {currentProfile.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                      <div className="col-span-2">
                        <ProfileSection title="Professional Summary" content={currentProfile.summery} />
                      </div>
                      <ProfileSection title="Skills" content={currentProfile.skills} />
                      <ProfileSection title="Education" content={currentProfile.education} />
                      <div className="col-span-2">
                        <ProfileSection title="Experience" content={currentProfile.expirence} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <Link 
                  to="/upload"
                  className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 font-medium transition duration-150"
                >
                  Upload New Resume
                </Link>
                
                {currentProfile && (
                   <Link 
                     to="/job-matcher"
                     className="px-5 py-2.5 bg--[#FF77FF]/50 hover:bg--[#FF77FF] text-white font-medium rounded-lg shadow hover:shadow-md transition duration-150 flex items-center"
                   >
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                     </svg>
                     Go to Job Matcher
                   </Link>
                 )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;