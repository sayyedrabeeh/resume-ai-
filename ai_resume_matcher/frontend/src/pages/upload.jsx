import { useState } from "react";
import axios from "axios";

function ResumeUpload() {
    const [file, setFile] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");
    
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
    
    const handleUpload = async (e) => {
        if (!file) {
            setError("Please upload your resume file");
            return;
        }
        
        setLoading(true);
        setError("");
        
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await axios.post('http://localhost:8000/upload-resume/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setProfile(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error uploading resume:", error);
            setError(error.response?.data?.error || "Failed to upload resume. Please try again.");
            setLoading(false);
        }
    };
    
    const ProfileSection = ({ title, content }) => {
        if (!content || content.includes("not found")) return null;
        
        return (
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-line">
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
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
                <span className="text-lg">{icon}</span>
                <span>{title}</span>
            </a>
        );
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Resume Parser</h1>
                        <p className="text-gray-600">Upload your resume and let us extract the information for you</p>
                    </div>
                    
                   
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Upload Your Resume (PDF format)
                            </label>
                            <div className="flex items-center">
                                <label className="flex-1">
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg px-6 py-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="mt-2 text-sm text-gray-600">
                                            {fileName ? (
                                                <span className="text-blue-600 font-medium">{fileName}</span>
                                            ) : (
                                                <span>Drag and drop a file here or click to select</span>
                                            )}
                                        </div>
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
                                <p className="mt-2 text-sm text-red-600">{error}</p>
                            )}
                        </div>
                        
                        <button
                            onClick={handleUpload}
                            disabled={loading || !file}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${loading || !file 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : "Extract Resume Information"}
                        </button>
                    </div>
                    
                    
                    {profile && (
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">Extracted Profile Information</h2>
                            
                            
                            <div className="mb-8">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                                        <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                                            {profile.email && (
                                                <a href={`mailto:${profile.email}`} className="text-blue-600 hover:text-blue-800">
                                                    {profile.email}
                                                </a>
                                            )}
                                            {profile.phone && (
                                                <span className="text-gray-600">{profile.phone}</span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                                        <ProfileLink 
                                            title="LinkedIn" 
                                            link={profile.linkedin}
                                            icon="🔗" 
                                        />
                                        <ProfileLink 
                                            title="GitHub" 
                                            link={profile.github}
                                            icon="💻" 
                                        />
                                        <ProfileLink 
                                            title="Website" 
                                            link={profile.website}
                                            icon="🌐" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <ProfileSection title="Summary" content={profile.summery} />
                            <ProfileSection title="Skills" content={profile.skills} />
                            <ProfileSection title="Experience" content={profile.expirence} />
                            <ProfileSection title="Projects" content={profile.projects} />
                            <ProfileSection title="Education" content={profile.education} />
                            <ProfileSection title="Certifications" content={profile.certifications} />
                            <ProfileSection title="Achievements" content={profile.achievements} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResumeUpload;