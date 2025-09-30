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
        
        
        <div className="flex items-center gap-3">
        <img 
            src="/logo.jpg"   
            alt="ResuMatch Logo" 
            className="w-10 h-10 object-contain"
        />
        <h1 className="text-2xl font-bold font-heading text-white">
            Resu<span className="text-[#FFD6FF]">Match</span>
        </h1>
        </div>


        {/* Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-white hover:text-[#FFD6FF] font-semibold transition">
            Home
          </Link>

          {/* Auth Section */}
          {loading ? (
            <div className="animate-pulse flex items-center gap-3">
              <div className="h-8 w-20 bg-white/20 rounded-full"></div>
              <div className="h-8 w-20 bg-white/20 rounded-full"></div>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/me"
                className="text-white hover:text-[#FFD6FF] font-semibold transition"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("access_token");
                  navigate("/login");
                }}
                className="text-white hover:text-[#FFD6FF] font-semibold transition"
              >
                Sign Out
              </button>
              <a
                href="https://github.com/sayyedrabeeh/resume-ai-"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-500 text-white px-4 py-2 rounded-full hover:bg-white/20 transition"
              >
                GitHub →
              </a>
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
