import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { User, Mail, Calendar, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";


function Me() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/user/me/');
        console.log(response.data);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="mt-4 text-lg font-medium text-gray-700">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="p-8 text-center bg-white rounded-lg shadow-lg">
          <p className="text-xl font-semibold text-gray-800">User not found or not logged in.</p>
          <p className="mt-2 text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8">
          <h1 className="text-2xl font-bold text-white">Your Profile</h1>
        </div>
        
        <div className="flex flex-col md:flex-row">
          <div className="p-6 flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
              <img 
                src="/p.avif" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-md text-sm font-medium text-center">
              Account Active
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center">
                  <User className="text-blue-600 w-5 h-5 mr-3" />
                  <span className="text-gray-500 font-medium w-28">Username:</span>
                  <span className="font-semibold text-gray-800">{user.username}</span>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center">
                  <Mail className="text-blue-600 w-5 h-5 mr-3" />
                  <span className="text-gray-500 font-medium w-28">Email:</span>
                  <span className="font-semibold text-gray-800">{user.email}</span>
                </div>
              </div>
              
              <div className="pb-2">
                <div className="flex items-center">
                  <Calendar className="text-blue-600 w-5 h-5 mr-3" />
                  <span className="text-gray-500 font-medium w-28">Date Joined:</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(user.date_joined).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-200">
            <Link to="/home">
               <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-3">
                 View home
               </button>
             </Link>
             
             <Link to="/profiles">
               <button className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors mr-3">
                 My Activities
               </button>
             </Link>
             
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Me;