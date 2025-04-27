import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login/', {
                username,
                password
            });
            alert('Login successful');
      
        } catch (error) {
            console.log('Error response:', error.response.data);
            alert('Login failed: ' + (error.response.data.message || error.response.data.error));
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type='text'
                placeholder='Enter your username'
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type='password'
                placeholder='Enter your password'
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type='submit'>Login</button>
        </form>
    );
}

export default Login;
