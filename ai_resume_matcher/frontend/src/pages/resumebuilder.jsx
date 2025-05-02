import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ResumeBuilder = () =>{
    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", summary: "",
        skills: [""], experience: [{ title: "", company: "", duration: "", description: "" }],
        education: [{ degree: "", institution: "", year: "" }]
      });
}

const handleChange =(e)=>{
    setFormData({...FormData,[e.target.name]:e.target.value})

}
const handleSubmit = async()=>{
    try{
    const response = await axiosInstance.post("/resumes/generate-resume/", formData,{
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.docx");
      document.body.appendChild(link);
      link.click();
    } catch(err){
        alert("Error generating resume.");
    }

return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Build Your Resume</h2>
      
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="mb-2 w-full border p-2" />
      <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="mb-2 w-full border p-2" />
      <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="mb-2 w-full border p-2" />
      <textarea name="summary" placeholder="Summary" value={formData.summary} onChange={handleChange} className="mb-2 w-full border p-2" />

 
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Download Resume
      </button>
    </div>
  );
}
export default ResumeBuilder