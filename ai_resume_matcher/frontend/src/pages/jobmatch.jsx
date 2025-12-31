
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const JobMatcher = () => {
  const [jobDsc, setJobDsc] = useState("");
  const [matchResult, setMatchResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!jobDsc.trim()) {
      setError("Please enter a job description");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const response = await axiosInstance.post("/match/match-job-description/", {
        job_description: jobDsc,
      });
      setMatchResult(response.data);
      setError("");
    } catch (err) {
      setError("Error matching job description. Please try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl   p-6 bg-gradient-to-l from-[#E83D95] to-black rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white/70 mb-6">Job Description Matcher</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-white/70 mb-2">
          Paste Job Description
        </label>
        <textarea
          value={jobDsc}
          onChange={(e) => setJobDsc(e.target.value)}
          className="w-full p-4 border border-white/70 bg-black/50 rounded-md mb-4 h-48 focus:ring-black/50 focus:border-black/50"
          placeholder="Paste job description here..."
        />
        
        {jobDsc.trim() && (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full md:w-auto px-6 py-3 rounded-md text-white/80 font-medium ${
                  isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } transition-colors duration-200 flex items-center justify-center`}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Processing</span>
                    <span className="animate-pulse">...</span>
                  </>
                ) : (
                  "Match Job Description"
                )}
              </button>
            )}
            
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {matchResult && (
        <div className="space-y-6">
          <div className="p-6 border border-white/70 rounded-lg bg-black/50">
            <div className="flex items-center mb-4">
              <div className="text-xl font-bold text-white/50">Match Score:</div>
              <div className="ml-2 text-xl font-bold">
                <span className={`${
                  matchResult.match_percentage >= 80
                    ? "text-green-600"
                    : matchResult.match_percentage >= 60
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}>
                  {matchResult.match_percentage}%
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-lg text-white/50 mb-2">Match Reasons:</h3>
            <ul className="space-y-2 text-gray-700">
              {matchResult.reasons && matchResult.reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="inline-block w-4 h-4 mr-2 mt-1 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {matchResult.missing_skills && matchResult.missing_skills.length > 0 && (
            <div className="p-6 border border-white/90 rounded-lg bg-white/90">
              <h3 className="font-semibold text-lg text-white/80 mb-2">Missing Skills:</h3>
              <ul className="space-y-2 text-gray-700">
                {matchResult.missing_skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-block w-4 h-4 mr-2 mt-1 bg-red-500 rounded-full flex-shrink-0"></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {matchResult.suggestions && matchResult.suggestions.length > 0 && (
            <div className="p-6 border border-white/70 rounded-lg bg-white/80">
              <h3 className="font-semibold text-lg text-white/50 mb-2">Improvement Suggestions:</h3>
              <ul className="space-y-2 text-gray-700">
                {matchResult.suggestions.map((tip, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-block w-4 h-4 mr-2 mt-1 bg-black/50 rounded-full flex-shrink-0"></span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobMatcher;

