import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/signup/', {
                username,
                email,
                password
            });
            alert('Signup successful');
            navigate('/login');
        } catch (error) {
            if (error.response) {
                console.log('Error response:', error.response.data);
                alert('Signup failed: ' + (error.response.data.message || error.response.data.error));
            } else if (error.request) {
                console.log('No response received:', error.request);
                alert('Signup failed: No response from server.');
            } else {
                console.log('Error message:', error.message);
                alert('Signup failed: ' + error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input
                type='text'
                placeholder='Enter your username'
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type='email'
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type='password'
                placeholder='Enter your password'
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type='submit'>Signup</button>
        </form>
    );
}

export default Signup;
