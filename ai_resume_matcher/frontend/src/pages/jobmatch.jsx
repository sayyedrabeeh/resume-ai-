import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const jobMatch = () =>{
    const [jobDsc ,setJobDsc] = useState('')
    const [matchResult,setMatchResult] = useState('')
    const [error,setError] = useState('')
    const handlesubmit = async()=>{
        try{
        const response = await axiosInstance.post("/match/match-job-description/",{
            job_description: jobDsc
          })
          setMatchResult(response.data);
          setError("");
        }catch(err){
            setError("Error matching job description.");
            console.log(err)

        }
    }

    return(
        <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Paste Job Description</h2>
      <textarea
        value={jobDsc}
        onChange={(e) => setJobDsc(e.target.value)}
        className="w-full p-4 border rounded mb-4 h-40"
        placeholder="Paste job description here..."
      />
      <button onClick={handlesubmit} className="bg-blue-600 text-white py-2 px-4 rounded">
        Match
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {matchResult && (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <h3 className="text-xl font-semibold">Match Score: {matchResult.match_percentage}%</h3>
          <ul className="list-disc pl-5 mt-2">
            {matchResult.reasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
          
        </div>
        
      )}
      {matchResult.missing_skills?.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-lg">Missing Skills:</h4>
          <ul className="list-disc pl-5">
            {matchResult.missing_skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
      
      {matchResult.suggestions?.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-lg">Suggestions:</h4>
          <ul className="list-disc pl-5">
            {matchResult.suggestions.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
    
}

export default jobMatch