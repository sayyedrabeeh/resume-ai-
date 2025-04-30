import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/home';
import ResumeUpload from './pages/upload';
import Profile from './pages/profile';
import JobMatcher from './pages/jobmatch';  


function App() {
 
  return (
    <>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="/profiles" element={<Profile />} />
        <Route path="/job-matcher" element={<JobMatcher />} />

        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
