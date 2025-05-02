import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ResumeBuilder = () =>{
    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", summary: "",
        skills: [""], experience: [{ title: "", company: "", duration: "", description: "" }],
        education: [{ degree: "", institution: "", year: "" }]
      });
}