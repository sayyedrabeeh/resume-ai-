import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [profiles, setProfile] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");   
  const token = localStorage.getItem('access_token');  
  const backendUrl = 'http://localhost:8000';
  console.log('Token from localStorage:', token);
  
  useEffect(() => {
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }
  
    const decoded = jwtDecode(token); ;
    if (decoded.exp * 1000 < Date.now()) {
      setError('Your session has expired. Please log in again.');
      setLoading(false);
      return;
    }
  
    fetchProfile();
    fetchCurrentProfile();
  }, [token]);
  
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${backendUrl}/profiles/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched profiles:", response.data);
      setProfile(response.data);
    } catch (error) {
      console.log("Profile fetch error:", error.response?.data || error);
      setError("Failed to fetch profiles. Please check your token.");
    }
  };

  const fetchCurrentProfile = async () => {
    try {
      const response = await axios.get(`${backendUrl}/current-profiles/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched current profile:", response.data);
      setCurrentProfile(response.data);
    } catch (error) {
      console.log("Current profile fetch error:", error.response?.data || error);
      setError("Failed to fetch the current profile. Please check your token.");
    } finally {
      setLoading(false);
    }
  };

  const handleChooseProfile = async (profileId) => {
    try {
      await axios.post(`${backendUrl}/set-current-profile/`, 
        { profile_id: profileId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      fetchCurrentProfile();
    } catch (error) {
      console.log("Set current profile error:", error.response?.data || error);
      setError("Failed to set current profile.");
    }
  };

  
  if (loading) return <p>Loading...</p>;
 
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Choose Profile</h2>

      <select
        className="border p-2 mb-6 rounded"
        onChange={(e) => handleChooseProfile(e.target.value)}
        value={currentProfile?.id || ''}
      >
        <option value="" disabled>
          -- Select Profile --
        </option>
        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.name}
          </option>
        ))}
      </select>

      {currentProfile ? (
        <div className="border p-4 rounded bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">{currentProfile.name}</h3>
          <p><strong>Email:</strong> {currentProfile.email}</p>
          <p><strong>Phone:</strong> {currentProfile.phone}</p>
          <p><strong>Summary:</strong> {currentProfile.summary}</p>
          <p><strong>Skills:</strong> {currentProfile.skills}</p>
          <p><strong>Education:</strong> {currentProfile.education}</p>
          <p><strong>Experience:</strong> {currentProfile.experience}</p>
        </div>
      ) : (
        <p className="text-gray-500">No profile selected.</p>
      )}
    </div>
  );
};

export default Profile;
