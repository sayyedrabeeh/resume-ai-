import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const JobMatcher = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedJob, setExpandedJob] = useState(null);
  const [expandedReasons, setExpandedReasons] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get('jobs/matching-jobs/');
        setJobs(res.data.matches || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Unable to load matching jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const truncateDescription = (description, maxLines) => {
    if (!description) return "";
    const lines = description.split("\n");
    if (lines.length <= maxLines) {
      return description;
    }
    return lines.slice(0, maxLines).join("\n") + " ...";
  };

  const toggleDescription = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const toggleReasons = (jobId) => {
    setExpandedReasons(expandedReasons === jobId ? null : jobId);
  };
  
  const getScoreClass = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return { text: "Excellent Match", color: "bg-green-500" };
    if (score >= 60) return { text: "Good Match", color: "bg-yellow-500" };
    return { text: "Fair Match", color: "bg-red-500" };
  };

  return (
    <div className="bg-gradient-to-l from-[#E83D95] to-black min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <div className="bg-black/50 rounded-xl shadow-md p-6 border-l-4 border-[#FF77FF]/50">
            <h1 className="text-3xl font-bold text-white/70 font-heading">Job Matches</h1>
            <p className="text-white/50 font-semibold mt-1">
              {jobs.length > 0 ? `Found ${jobs.length} opportunities matching your profile` : 'Opportunities matching your professional profile'}
            </p>
          </div>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            <div className="flex">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              {error}
            </div>
          </div>
        )}

        {loading ? (
          <div className="bg-black/50 rounded-xl shadow-md p-12 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#FF77FF]/50 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white/70 font-medium">Finding your matching jobs...</p>
            <p className="mt-2 text-white/50 text-sm">Searching across multiple job platforms...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-black/50 rounded-xl shadow-md p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
              <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white/70 mb-2">No matching jobs found</h2>
            <p className="text-white/50">We couldn't find any jobs that match your profile at this time. Try updating your skills or check back later.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job, idx) => {
              const badge = getScoreBadge(job.score);
              return (
                <div key={job.id || idx} className="bg-black/50 rounded-xl shadow-md overflow-hidden border border-black/70 hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                 
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-xl font-bold text-[#FF77FF]/70">{job.title || 'Untitled Position'}</h2>
                          <span className="text-xs px-2 py-1 rounded-full bg-purple-900/30 text-purple-300">
                            {job.source || 'Unknown'}
                          </span>
                        </div>
                        <div className="flex items-center text-[#FF77FF]/50 text-sm flex-wrap gap-2">
                          {job.company && <span>{job.company}</span>}
                          {job.company && job.employment_type && <span className="mx-1">•</span>}
                          {job.employment_type && <span>{job.employment_type}</span>}
                        </div>
                      </div>
                      
                      <div className="ml-4 flex-shrink-0 flex flex-col items-end gap-2">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreClass(job.score)}`}>
                          {job.score}% Match
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full text-white ${badge.color}`}>
                          {badge.text}
                        </div>
                      </div>
                    </div>
                    
                    
                    {job.logo && (
                      <div className="mb-4 p-2 bg-white/5 inline-block rounded-lg">
                        <img 
                          src={job.logo} 
                          alt={`${job.company} Logo`} 
                          className="h-12 object-contain" 
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    )}
                    
              
                    {job.reasons && job.reasons.length > 0 && (
                      <div className="mb-4 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                        <button 
                          onClick={() => toggleReasons(job.id)}
                          className="flex items-center justify-between w-full text-left"
                        >
                          <h3 className="font-semibold text-blue-300 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                            </svg>
                            Why This Match?
                          </h3>
                          <svg 
                            className={`w-5 h-5 text-blue-300 transition-transform ${expandedReasons === job.id ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>
                        
                        {expandedReasons === job.id && (
                          <div className="mt-3 space-y-2">
                            {job.reasons.map((reason, i) => (
                              <div key={i} className="text-sm text-blue-200 flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                <span>{reason}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    
                    {job.suggestions && job.suggestions.length > 0 && (
                      <div className="mb-4 bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                        <h3 className="font-semibold text-amber-300 mb-2 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          Application Tips
                        </h3>
                        <div className="space-y-1.5">
                          {job.suggestions.slice(0, 3).map((suggestion, i) => (
                            <div key={i} className="text-sm text-amber-200 flex items-start gap-2">
                              <span className="text-amber-400 mt-0.5">→</span>
                              <span>{suggestion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                   
                    <div className="bg-black/50 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-white/70 mb-2">Job Description</h3>
                      <div className="prose prose-sm max-w-none text-white/60">
                        <p className="whitespace-pre-line">
                          {expandedJob === job.id 
                            ? (job.description || 'No description available') 
                            : truncateDescription(job.description || 'No description available', 4)}
                        </p>
                      </div>
                      
                      {job.description && job.description.split("\n").length > 4 && (
                        <button 
                          className="mt-3 text-[#FF77FF]/70 font-medium flex items-center hover:text-[#FF77FF] transition-colors"
                          onClick={() => toggleDescription(job.id)}
                        >
                          {expandedJob === job.id ? (
                            <>
                              <span>Read Less</span>
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                              </svg>
                            </>
                          ) : (
                            <>
                              <span>Read More</span>
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    
                    
                    {((job.apply_options && job.apply_options.length > 0) || 
                      (job.apply_links && job.apply_links.length > 0) || 
                      job.url) && (
                      <div>
                        <h3 className="font-semibold text-[#FF77FF]/70 mb-3">Apply Now</h3>
                        <div className="flex flex-wrap gap-2">
                          {(job.apply_options || job.apply_links || []).map((option, index) => (
                            <a
                              key={index}
                              href={option.apply_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 bg-[#FF77FF]/50 text-white rounded-md hover:bg-[#FF77FF] transition-colors font-medium"
                            >
                              <span>{option.publisher}</span>
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                              </svg>
                            </a>
                          ))}
                          {job.url && !(job.apply_options?.length > 0 || job.apply_links?.length > 0) && (
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 bg-[#FF77FF]/50 text-white rounded-md hover:bg-[#FF77FF] transition-colors font-medium"
                            >
                              <span>Apply on {job.source}</span>
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatcher;