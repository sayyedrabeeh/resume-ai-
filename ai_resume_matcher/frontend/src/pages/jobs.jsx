import { useState, useEffect } from "react";
import api from '../api/axiosConfig';
import axiosInstance from "../api/axiosInstance";

const JobMatche = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axiosInstance.get('jobs/matching-jobs/');
                console.log('res', res);
                setJobs(res.data.matches);  
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const truncateDescription = (description, maxLines) => {
        const lines = description.split("\n");
        if (lines.length <= maxLines) {
            return description;  
        }
        return lines.slice(0, maxLines).join("\n") + " ..."; 
    };

    const [expandedJob, setExpandedJob] = useState(null);  

    const toggleDescription = (jobId) => {
        setExpandedJob(expandedJob === jobId ? null : jobId);  
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Jobs Matching Your Profile with matching score </h1>
            {loading ? (
                <p>Loading...</p>
            ) : jobs.length === 0 ? (
                <p>No matching jobs found.</p>
            ) : (
                <div className="space-y-4">
                  
                    {jobs.map((job, idx) => (
                        <div key={idx} className="p-4 border rounded-xl shadow-sm bg-white">
                            <h2 className="text-xl font-semibold">{job.job_title}</h2>
                            <p className="text-sm text-gray-600">{job.employer_name} — {job.job_employment_type}</p>
                            
                           
                            <p className="text-gray-800 mt-2">
                                {expandedJob === job.job_id ? job.job_description : truncateDescription(job.job_description, 4)}
                            </p>

                             
                            <button 
                                className="text-blue-500 mt-2"
                                onClick={() => toggleDescription(job.job_id)}
                            >
                                {expandedJob === job.job_id ? "Read Less" : "Read More"}
                            </button>

                            <p className="text-green-600 font-medium mt-1">Match Score: {job.score}%</p>

                            
                            <div className="mt-4">
                                <h3 className="font-semibold">Apply Now:</h3>
                                {job.apply_options && job.apply_options.map((option, index) => (
                                    <a
                                        key={index}
                                        href={option.apply_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline mt-2 inline-block"
                                    >
                                        {option.publisher}
                                    </a>
                                ))}
                            </div>

                            
                            {job.employer_logo && (
                                <div className="mt-4">
                                    <img src={job.employer_logo} alt={`${job.employer_name} Logo`} className="w-20 h-20 object-contain" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobMatche;
