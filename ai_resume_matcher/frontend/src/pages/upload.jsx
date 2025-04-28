import { useState } from "react";
import axios from "axios";

function ResumeUpload(){
    const [file,setFile] = useState(null)
    const [profile,setProfile] = useState(null)


    const handleFileChange= (e) => {
        setFile(e.target.files[0])
    }
    const handleUpload = async(e) =>{
        if (!file){
            alert('please upload your file ')
            return
        }
        const formData = new FormData
        formData.append('resume',file)

        try{
            const response = await axios.post('http://localhost:8000/upload-resume/',formData,{
                headers :{
                   'Content-Type': 'multipart/form-data',
                }
            })
            setProfile(response.data)
            alert('Resume uploaded and profile created!');
        }catch(error){
          console.log(error)
          alert('field to uploads')
        }

    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Upload Resume</h1>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="mb-4 w-full"
            />
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
            >
                Upload
            </button>

            {profile && (
                <div className="mt-8 text-left">
                    <h2 className="text-xl font-semibold mb-2">Extracted Profile:</h2>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Skills:</strong> {profile.skills}</p>
                    <p><strong>Education:</strong> {profile.education}</p>
                    <p><strong>Experience:</strong> {profile.experience}</p>
                </div>
            )}
        </div>
    </div>
    )
}
export default ResumeUpload