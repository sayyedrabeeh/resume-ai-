import { useState, useEffect } from "react";
import api from '../api/axiosConfig';

const JobMatche = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get('jobs/matching-jobs/');
                console.log('res', res);
                setJobs(res.data.matches); // Assuming matches is the array of jobs
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Jobs Matching Your Profile (70%+)</h1>
            {loading ? (
                <p>Loading...</p>
            ) : jobs.length === 0 ? (
                <p>No matching jobs found.</p>
            ) : (
                <div className="space-y-4">
                    {jobs.map((job, idx) => (
                        <div key={idx} className="p-4 border rounded-xl shadow-sm bg-white">
                            {/* Job Title */}
                            <h2 className="text-xl font-semibold">{job.job_title}</h2>
                            {/* Job Company */}
                            <p className="text-sm text-gray-600">{job.employer_name} — {job.job_employment_type}</p>
                            {/* Job Description */}
                            <p className="text-gray-800 mt-2">{job.job_description}</p>
                            {/* Match Score */}
                            <p className="text-green-600 font-medium mt-1">Match Score: {job.score}%</p>

                            {/* Apply Links */}
                            <div className="mt-4">
                                <h3 className="font-semibold">Apply Now:</h3>
                                {job.apply_options.map((option, index) => (
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

                            {/* Employer Logo */}
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
