import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [profiles, setProfile] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      setError("Your session has expired. Please log in again.");
      setLoading(false);
      return;
    }

    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/profiles/");
      console.log('response',response.data)
      setProfile(response.data);
    } catch (error) {
      setError("Failed to fetch profiles.");
    } finally {
      setLoading(false);   
    }
  };

  const handleChooseProfile = async (profileId) => {
    try {
      await axiosInstance.post("/set-current-profile/", {
        profile_id: profileId,
      });
      const selected = profiles.find((p) => p.id === parseInt(profileId));
      setCurrentProfile(selected);
    } catch (error) {
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
        value={currentProfile?.id || ""}
      >
        <option value="" disabled>-- Select Profile --</option>
        {profiles.map((profile) => (
          <option key={profile.id} value={profile.id}>{profile.name}</option>
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
