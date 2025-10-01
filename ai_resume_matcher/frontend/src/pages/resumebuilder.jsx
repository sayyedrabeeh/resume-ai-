import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    portfolio: "",
    leetcode: "",
    summary: "",
    skills: {
      languages: "",
      librariesFrameworks: "",
      microservices: "",
      toolsPlatforms: "",
      designPrototyping: "",
      concepts: ""
    },
    projects: [
      {
        name: "",
        description: "",
        technologies: "",
        liveLink: "",
        githubLink: "",
        points: [""]
      }
    ],
    miniProjects: [
      {
        name: "",
        technologies: "",
        description: "",
        githubLink: "",
        liveLink: ""
      }
    ],
    experience: [
      {
        title: "",
        company: "",
        duration: "",
        location: "",
        points: [""]
      }
    ],
    education: [
      {
        degree: "",
        institution: "",
        location: "",
        duration: ""
      }
    ]
  });

  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

   
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSkillChange = (skillType, value) => {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [skillType]: value
      }
    });
  };

   
  const handleArrayChange = (section, index, field, value) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  
  const handlePointChange = (section, itemIndex, pointIndex, value) => {
    const updatedSection = [...formData[section]];
    updatedSection[itemIndex].points[pointIndex] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

   
  const addItem = (section) => {
    let newItem;
    
    switch(section) {
      case "projects":
        newItem = {
          name: "",
          description: "",
          technologies: "",
          liveLink: "",
          githubLink: "",
          points: [""]
        };
        break;
      case "miniProjects":
        newItem = {
          name: "",
          technologies: "",
          description: "",
          githubLink: "",
          liveLink: ""
        };
        break;
      case "experience":
        newItem = {
          title: "",
          company: "",
          duration: "",
          location: "",
          points: [""]
        };
        break;
      case "education":
        newItem = {
          degree: "",
          institution: "",
          location: "",
          duration: ""
        };
        break;
      default:
        newItem = "";
    }
    
    setFormData({ ...formData, [section]: [...formData[section], newItem] });
  };

 
  const removeItem = (section, index) => {
    const updatedSection = [...formData[section]];
    updatedSection.splice(index, 1);
    setFormData({ ...formData, [section]: updatedSection });
  };

   
  const addPoint = (section, itemIndex) => {
    const updatedSection = [...formData[section]];
    updatedSection[itemIndex].points.push("");
    setFormData({ ...formData, [section]: updatedSection });
  };

   
  const removePoint = (section, itemIndex, pointIndex) => {
    const updatedSection = [...formData[section]];
    updatedSection[itemIndex].points.splice(pointIndex, 1);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/resumes/generate-resume/", formData, {
        responseType: 'blob',
      });
      console.log(response.data)
       
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setPreviewUrl(url);
      
       
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "professional_resume.pdf");
      document.body.appendChild(link);
      link.click();
      
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert("Error generating resume. Please try again.");
      console.error(err);
    }
  };

  
  const TabNav = () => (
    <div className="flex mb-6 border-b overflow-x-auto">
      {["personal", "skills", "projects", "mini-projects", "experience", "education"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === tab
              ? "border-b-2 border-[#FF77FF]/50  text-[#FF77FF]/50 "
              : "text-[#FF77FF]/50  hover:text-[#FF77FF]"
          }`}
        >
          {tab === "mini-projects" ? "Mini Projects" : tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-l from-[#E83D95] to-black min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-black/50 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-black/30 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-heading font-bold">Professional Resume Builder</h1>
          <p className="text-blue-100">Create a polished, professional resume in minutes</p>
        </div>

        <div className="p-6">
          <TabNav />

          
          {activeTab === "personal" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#FF77FF]/50">Personal Information</h2>
              <p className="text-white/90 text-sm">Tell us about yourself so employers can contact you.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Professional Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="MERN Stack Developer"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Website/Portfolio</label>
                  <input
                    type="url"
                    name="portfolio"
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">GitHub</label>
                  <input
                    type="url"
                    name="github"
                    placeholder="https://github.com/username"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">LeetCode</label>
                  <input
                    type="url"
                    name="leetcode"
                    placeholder="https://leetcode.com/username"
                    value={formData.leetcode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Professional Summary</label>
                <textarea
                  name="summary"
                  placeholder="Write a brief overview of your professional background, key strengths, and career goals..."
                  value={formData.summary}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-white/70">Keep your summary concise and impactful - 3-5 sentences is ideal.</p>
              </div>
            </div>
          )}

           
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-[#FF77FF]/50 ">Technical Skills</h2>
                <p className="text-white/70 text-sm">Categorize your skills by type for better organization.</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Languages</label>
                  <input
                    type="text"
                    placeholder="JavaScript, TypeScript, Python, C#, MongoDB, MySQL, HTML, (S)CSS"
                    value={formData.skills.languages}
                    onChange={(e) => handleSkillChange("languages", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-white/70">Separate with commas</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Libraries & Frameworks</label>
                  <input
                    type="text"
                    placeholder="Node.js, Express, React, NextJS, TailwindCSS, Ionic, Electron"
                    value={formData.skills.librariesFrameworks}
                    onChange={(e) => handleSkillChange("librariesFrameworks", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-white/70">Separate with commas</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Microservices</label>
                  <input
                    type="text"
                    placeholder="Docker, Kubernetes, Apache Kafka, NATS, Redis, Helm"
                    value={formData.skills.microservices}
                    onChange={(e) => handleSkillChange("microservices", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-white/70">Separate with commas</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Tools & Platforms</label>
                  <input
                    type="text"
                    placeholder="Git, Jest, Github Actions, Netlify, Render, Vercel, AWS, Firebase"
                    value={formData.skills.toolsPlatforms}
                    onChange={(e) => handleSkillChange("toolsPlatforms", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-white/70">Separate with commas</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Design & Prototyping</label>
                  <input
                    type="text"
                    placeholder="Figma, Illustrator, Photoshop, Blender"
                    value={formData.skills.designPrototyping}
                    onChange={(e) => handleSkillChange("designPrototyping", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-white/70">Separate with commas</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Concepts</label>
                  <input
                    type="text"
                    placeholder="Clean Architecture, MVC Architecture, SOLID Principles, Agile Methodologies"
                    value={formData.skills.concepts}
                    onChange={(e) => handleSkillChange("concepts", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-white/70">Separate with commas</p>
                </div>
              </div>
            </div>
          )}

          
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-[#FF77FF]/50 ">Major Projects</h2>
                  <p className="text-white/70 text-sm">Highlight your most significant projects with detailed descriptions.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => addItem("projects")}
                  className="flex items-center text-[#FF77FF]/50  hover:text-[#FF77FF]"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Project
                </button>
              </div>
              
              {formData.projects.map((project, projectIndex) => (
                <div key={projectIndex} className="p-5 border border-black/50 rounded-lg bg-black/40">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-lg text-white/70">Project {projectIndex + 1}</h3>
                    {formData.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem("projects", projectIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Project Name</label>
                      <input
                        type="text"
                        placeholder="BitWarriors: Competitive Coding Platform"
                        value={project.name}
                        onChange={(e) => handleArrayChange("projects", projectIndex, "name", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Technologies</label>
                      <input
                        type="text"
                        placeholder="Next.js, React.js, Node, Docker, Kubernetes, Apache Kafka"
                        value={project.technologies}
                        onChange={(e) => handleArrayChange("projects", projectIndex, "technologies", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Live Link (Optional)</label>
                      <input
                        type="url"
                        placeholder="https://project-demo.com"
                        value={project.liveLink}
                        onChange={(e) => handleArrayChange("projects", projectIndex, "liveLink", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">GitHub Link (Optional)</label>
                      <input
                        type="url"
                        placeholder="https://github.com/username/project"
                        value={project.githubLink}
                        onChange={(e) => handleArrayChange("projects", projectIndex, "githubLink", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white/70 mb-1">Brief Description</label>
                    <textarea
                      placeholder="A brief one-liner describing the project..."
                      value={project.description}
                      onChange={(e) => handleArrayChange("projects", projectIndex, "description", e.target.value)}
                      rows={2}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-white/70">Key Points</label>
                      <button 
                        type="button"
                        onClick={() => addPoint("projects", projectIndex)}
                        className="text-xs text-[#FF77FF]/50 hover:text-[#FF77FF]/ flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Point
                      </button>
                    </div>
                    
                    {project.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          placeholder="Led the development of an AI-powered competitive coding platform..."
                          value={point}
                          onChange={(e) => handlePointChange("projects", projectIndex, pointIndex, e.target.value)}
                          className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                        {project.points.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePoint("projects", projectIndex, pointIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

           
          {activeTab === "mini-projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-[#FF77FF]/50 ">Mini Projects</h2>
                  <p className="text-white/70 text-sm">Include smaller projects or side projects with brief descriptions.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => addItem("miniProjects")}
                  className="flex items-center text-[#FF77FF]/50  hover:text-[#FF77FF]"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Mini Project
                </button>
              </div>
              
              {formData.miniProjects.map((project, projectIndex) => (
                <div key={projectIndex} className="p-5 border border-black/50 rounded-lg bg-black/40">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-lg text-white/70">Mini Project {projectIndex + 1}</h3>
                    {formData.miniProjects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem("miniProjects", projectIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Project Name</label>
                      <input
                        type="text"
                        placeholder="BitBin"
                        value={project.name}
                        onChange={(e) => handleArrayChange("miniProjects", projectIndex, "name", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Technologies</label>
                      <input
                        type="text"
                        placeholder="MongoDB, Express, Node, EJS"
                        value={project.technologies}
                        onChange={(e) => handleArrayChange("miniProjects", projectIndex, "technologies", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Live Link (Optional)</label>
                      <input
                        type="url"
                        placeholder="https://project-demo.com"
                        value={project.liveLink}
                        onChange={(e) => handleArrayChange("miniProjects", projectIndex, "liveLink", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">GitHub Link (Optional)</label>
                      <input
                        type="url"
                        placeholder="https://github.com/username/project"
                        value={project.githubLink}
                        onChange={(e) => handleArrayChange("miniProjects", projectIndex, "githubLink", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white/70 mb-1">Brief Description</label>
                    <textarea
                      placeholder="A modern pastebin alternative with syntax highlighting and expiration support"
                      value={project.description}
                      onChange={(e) => handleArrayChange("miniProjects", projectIndex, "description", e.target.value)}
                      rows={2}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-[#FF77FF]/50 ">Work Experience</h2>
                  <p className="text-white/70 text-sm">Add your professional experience, starting with the most recent.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => addItem("experience")}
                  className="flex items-center text-[#FF77FF]/50  hover:text-[#FF77FF]"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Position
                </button>
              </div>
              
              {formData.experience.map((exp, expIndex) => (
                <div key={expIndex} className="p-5 border border-black/50 rounded-lg bg-black/40">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-lg text-white/70">Position {expIndex + 1}</h3>
                    {formData.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem("experience", expIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Job Title</label>
                      <input
                        type="text"
                        placeholder="Senior MERN Stack Developer"
                        value={exp.title}
                        onChange={(e) => handleArrayChange("experience", expIndex, "title", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Company</label>
                      <input
                        type="text"
                        placeholder="Tech Innovations Inc."
                        value={exp.company}
                        onChange={(e) => handleArrayChange("experience", expIndex, "company", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Duration</label>
                      <input
                        type="text"
                        placeholder="Jan 2022 - Present"
                        value={exp.duration}
                        onChange={(e) => handleArrayChange("experience", expIndex, "duration", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="New York, NY (Remote)"
                        value={exp.location}
                        onChange={(e) => handleArrayChange("experience", expIndex, "location", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Key Responsibilities & Achievements</label>
                      <button 
                        type="button"
                        onClick={() => addPoint("experience", expIndex)}
                        className="text-xs text-[#FF77FF]/50  hover:text-[#FF77FF] flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Point
                      </button>
                    </div>
                    
                    {exp.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          placeholder="Led a team of 5 developers to rebuild the company's flagship product..."
                          value={point}
                          onChange={(e) => handlePointChange("experience", expIndex, pointIndex, e.target.value)}
                          className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                        {exp.points.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePoint("experience", expIndex, pointIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

         
          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-[#FF77FF]/50 ">Education</h2>
                  <p className="text-white/70 text-sm">Add your educational background, starting with the most recent.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => addItem("education")}
                  className="flex items-center text-[#FF77FF]/50  hover:text-[#FF77FF]"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Education
                </button>
              </div>
              
              {formData.education.map((edu, eduIndex) => (
                <div key={eduIndex} className="p-5 border border-black/50 rounded-lg bg-black/40">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-lg text-white/70">Education {eduIndex + 1}</h3>
                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem("education", eduIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Degree / Program</label>
                      <input
                        type="text"
                        placeholder="Bachelor of Science in Computer Science"
                        value={edu.degree}
                        onChange={(e) => handleArrayChange("education", eduIndex, "degree", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Institution</label>
                      <input
                        type="text"
                        placeholder="Massachusetts Institute of Technology"
                        value={edu.institution}
                        onChange={(e) => handleArrayChange("education", eduIndex, "institution", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="Cambridge, MA"
                        value={edu.location}
                        onChange={(e) => handleArrayChange("education", eduIndex, "location", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Duration</label>
                      <input
                        type="text"
                        placeholder="2016 - 2020"
                        value={edu.duration}
                        onChange={(e) => handleArrayChange("education", eduIndex, "duration", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

         
          <div className="mt-8 flex flex-col items-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full sm:w-auto bg-[#FF77FF]/50  text-white font-medium py-3 px-6 rounded-md hover:bg-[#FF77FF] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating Resume...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Generate & Download Resume
                </>
              )}
            </button>
            
            <p className="text-sm text-white/70 mt-2">
              Creates a professional Microsoft Word (.docx) document
            </p>
          </div>
        </div>
      </div>
      
     
      <div className="max-w-4xl mx-auto text-center mt-8 text-white/70 text-sm">
        &copy; {new Date().getFullYear()} ResuMatch. All rights reserved.
      </div>
    </div>
  );
};

export default ResumeBuilder;

