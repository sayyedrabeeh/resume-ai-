import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/home';
import ResumeUpload from './pages/upload';
import Profile from './pages/profile';
import JobMatcher from './pages/jobmatch';  
import JobMatche from './pages/jobs';
import PublicRoute from './components/PublicRoute';

function App() {
 
  return (
    <>
        <BrowserRouter>
        <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="/profiles" element={<Profile />} />
        <Route path="/job-matcher" element={<JobMatcher />} />
        <Route path="/job-matches" element={<JobMatche />} />

        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
