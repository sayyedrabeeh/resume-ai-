
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import axiosInstance from "../api/axiosInstance";

function ResumeUpload() {
    const [file, setFile] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.type === "application/pdf") {
                setFile(selectedFile);
                setFileName(selectedFile.name);
                setError("");
            } else {
                setError("Please upload a PDF file");
                setFile(null);
                setFileName("");
            }
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please upload your resume file");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const token = localStorage.getItem('access_token');
            
            if (!token) {
                throw new Error('You are not logged in. Please log in to upload a resume.');
            }

            const response = await axiosInstance.post('/upload-resume/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`   
                }
            });
            setProfile(response.data.profile);
        } catch (error) {
            console.error("Error uploading resume:", error);
            if (error.response?.status === 401) {
                setError("Authentication failed. Please log in again.");
            } else {
                setError(error.response?.data?.error || error.message || "Failed to upload resume. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const ProfileSection = ({ title, content }) => {
        if (!content || content.includes("not found")) return null;
        return (
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-1.5 h-5 bg-blue-600 rounded mr-2"></div>
                    {title}
                </h3>
                <div className="bg-gray-50 p-5 rounded-lg text-gray-700 whitespace-pre-line border-l-2 border-blue-200">
                    {content}
                </div>
            </div>
        );
    };

    const ProfileLink = ({ title, link, icon }) => {
        if (!link) return null;
        return (
            <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-700 hover:text-red-900 bg-blue-50 px-3 py-1.5 rounded-full transition-colors"
            >
                <span className="text-lg">{icon}</span>
                <span className="font-medium">{title}</span>
            </a>
        );
    };

    return (
        <div className="min-h-screen  bg-gradient-to-l from-[#E83D95] to-black">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-white font-heading">Resume Parser</h1>
                            <p className="text-white/60 font-semibold font-body mt-1">Upload your resume and we'll extract the key information</p>
                        </div>
                        <Link 
                            to="/"
                            className="text-white/80 hover:text-white/50 flex items-center gap-1 font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            Back to Dashboard
                        </Link>
                    </div>

                    <div className="bg-black/50 rounded-xl shadow-md p-8 mb-10 border border-black/80">
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-white/70 mb-4">Upload Your Resume</h2>
                            <div className="flex items-center">
                                <label className="flex-1">
                                    <div className={`border-2 border-dashed rounded-lg px-6 py-10 text-center cursor-pointer transition-all ${fileName ? ' border-[#FF77FF]/50 ' : 'border-gray-300 hover:border-[#FF77FF]/50   '}`}>
                                        {fileName ? (
                                            <div className="flex flex-col items-center">
                                                <svg className="h-12 w-12 text-[#FF77FF]/50 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <span className="mt-2 text-[#FF77FF]/50 font-medium">{fileName}</span>
                                                <span className="text-sm text-[#FF77FF]/50  mt-1">Click to change file</span>
                                            </div>
                                        ) : (
                                            <>
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="mt-4">
                                                    <span className="text-sm font-medium text-[#FF77FF]/50 ">Click to select a file</span>
                                                    <p className="text-xs text-gray-500 mt-1">or drag and drop your PDF here</p>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-2">PDF files only (Max 10MB)</p>
                                            </>
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="application/pdf" 
                                        onChange={handleFileChange} 
                                        className="hidden" 
                                    />
                                </label>
                            </div>
                            {error && (
                                <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-start">
                                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={loading || !file}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-sm transition-all ${loading || !file 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-[#FF77FF]/50 hover:bg-[#FF77FF] hover:shadow'}`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing your resume...
                                </span>
                            ) : "Extract Resume Information"}
                        </button>
                    </div>

                    {profile && (
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-10">
                            <div className="bg-blue-600 px-8 py-5 text-white">
                                <h2 className="text-xl font-bold">Extracted Profile Information</h2>
                                <p className="text-blue-100 text-sm mt-1">The following information was extracted from your resume</p>
                            </div>
                            
                            <div className="p-8">
                                <div className="mb-8 pb-6 border-b border-gray-200">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                                            <div className="flex flex-col sm:flex-row sm:gap-6 mt-2">
                                                {profile.email && (
                                                    <a href={`mailto:${profile.email}`} className="text-blue-700 hover:text-blue-900 flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                        </svg>
                                                        {profile.email}
                                                    </a>
                                                )}
                                                {profile.phone && (
                                                    <span className="text-gray-700 flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                                        </svg>
                                                        {profile.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <ProfileLink title="LinkedIn" link={profile.linkedin} icon="🔗" />
                                            <ProfileLink title="GitHub" link={profile.github} icon="💻" />
                                            <ProfileLink title="Website" link={profile.website} icon="🌐" />
                                        </div>
                                    </div>
                                </div>
                                
                                <ProfileSection title="Professional Summary" content={profile.summery} />
                                <ProfileSection title="Technical Skills" content={profile.skills} />
                                <ProfileSection title="Work Experience" content={profile.expirence} />
                                <ProfileSection title="Projects" content={profile.projects} />
                                <ProfileSection title="Education" content={profile.education} />
                                <ProfileSection title="Certifications" content={profile.certifications} />
                                <ProfileSection title="Achievements" content={profile.achievements} />
                                
                                <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={() => setProfile(null)}
                                        className="text-gray-600 hover:text-gray-800 font-medium"
                                    >
                                        Upload Another Resume
                                    </button>
                                    <Link 
                                        to="/profiles"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition duration-200 shadow-sm hover:shadow"
                                    >
                                        View All Profiles
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {!profile && (
                        <div className="text-center mt-8">
                            <Link 
                                to="/profiles"
                                className="inline-flex items-center gap-2 text-[#FF77FF]  hover:text-[#FF77FF]/50 font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                                View Previously Uploaded Profiles
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResumeUpload;

