import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user/me/");
        setUser(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
         
        <h1 className="text-2xl font-bold font-heading text-white">
          Resu<span className="text-[#FFD6FF]">Match</span>
        </h1>

         
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-white hover:text-[#FFD6FF] font-semibold">
            Home
          </Link>

          <Link to="/upload" className="text-white hover:text-[#FFD6FF] font-semibold">
            Upload
          </Link>

          <Link to="/job-matches" className="text-white hover:text-[#FFD6FF] font-semibold">
            Jobs
          </Link>

          <Link to="/profiles" className="text-white hover:text-[#FFD6FF] font-semibold">
            Profiles
          </Link>

          <Link to="/ResumeBuilder" className="text-white hover:text-[#FFD6FF] font-semibold">
            Resume Builder
          </Link>

          <Link to="/HR" className="text-white hover:text-[#FFD6FF] font-semibold">
            Interview Practice
          </Link>

         
          {loading ? (
            <div className="animate-pulse flex items-center gap-3">
              <div className="h-8 w-20 bg-white/20 rounded-full"></div>
              <div className="h-8 w-20 bg-white/20 rounded-full"></div>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/me"
                className="bg-[#E83D95] text-white px-5 py-2 rounded-full shadow-lg hover:bg-[#FF77FF] transition"
              >
                {user.username}
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("access_token");
                  navigate("/login");
                }}
                className="border border-white text-white px-4 py-2 rounded-full hover:bg-white/20 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#E83D95] text-white px-5 py-2 rounded-full shadow-lg hover:bg-[#FF77FF] transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
