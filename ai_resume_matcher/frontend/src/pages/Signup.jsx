import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMsg("Passwords don't match");
            return;
        }
        setIsLoading(true);
        setErrorMsg('');
        try {
            await axios.post('http://localhost:8000/signup/', {
                username,
                email,
                password
            });
            navigate('/login', { 
                state: { message: 'Account created successfully! Please log in.' }
            });
        } catch (error) {
            console.error('Signup error:', error);
            setErrorMsg(error.response?.data?.error || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-[#E83D95] to-black">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold font-heading  text-[#FF77FF]/50 mb-2">ResumeMatch</h1>
                    <p className="text-white/90">Create your account</p>
                </div>
                
                <form onSubmit={handleSignup} className="bg-black/50 p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-[#FF77FF]/50">Sign Up</h2>
                    
                    {errorMsg && (
                        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                            <p>{errorMsg}</p>
                        </div>
                    )}
                    
                    <div className="mb-5">
                        <label htmlFor="username" className="block text-white/80 text-sm font-medium mb-2">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                            <input
                                id="username"
                                type="text"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                    
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                    
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-white/80 text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-white/80 text-sm font-medium mb-2">Confirm Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-[#FF77FF]/50 text-white py-3 px-4 rounded-lg font-medium transition duration-200 ${
                            isLoading ? 'bg-[#FF77FF]/50 cursor-not-allowed' : 'hover:bg-[#FF77FF]'
                        }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating account...
                            </span>
                        ) : 'Create Account'}
                    </button>
                    
                    <div className="text-center mt-6">
                        <p className="text-white/70">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#FF77FF]/50 hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
                
                <div className="text-center mt-8">
                    <p className="text-sm text-white/70">
                        © {new Date().getFullYear()} ResumeMatch. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
