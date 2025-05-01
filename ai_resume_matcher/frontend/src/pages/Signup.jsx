import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance";

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const csrfToken = document.cookie.split(';').find(c => c.trim().startsWith('csrftoken=')).split('=')[1];
            const response = await axiosInstance.post('http://localhost:8000/signup/', {
                username,
                email,
                password
            }, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
            alert('Signup successful! Please log in.');
            navigate('/login');
        } catch (error) {
            console.log('Error response:', error.response?.data);
            alert('Signup failed: ' + (error.response?.data?.error || 'Unknown error'));
        }
    };
    
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                >
                    Signup
                </button>
                <p className="text-sm text-center mt-4">
                    Already have an account? <a href="/login" className="text-green-500 hover:underline">Login</a>
                </p>
            </form>
        </div>
    );
}

export default Signup;
