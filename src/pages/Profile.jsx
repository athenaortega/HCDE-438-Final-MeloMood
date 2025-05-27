import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/firebaseDetails";

function Profile() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    genres: "",
    twitter: "",
    instagram: "",
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {

    if (!currentUser) return;

    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {

          setFormData({
            name: "",
            bio: "",
            genres: "",
            twitter: "",
            instagram: "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
      setLoadingProfile(false);
    };

    fetchProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentUser) return; 

    try {
      await setDoc(doc(db, "users", currentUser.uid), formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

 
  if (!currentUser) return <p>Please log in to view your profile.</p>;
  if (loadingProfile) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      <form onSubmit={handleSave} className="profile-form">
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Bio:
          <textarea
            name="bio"
            rows="3"
            value={formData.bio}
            onChange={handleChange}
          />
        </label>

        <label>
          Favorite Genres:
          <input
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            placeholder="e.g. Lo-fi, Indie Rock, Jazz"
          />
        </label>

        <label>
          Twitter (optional):
          <input
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="https://twitter.com/yourhandle"
          />
        </label>

        <label>
          Instagram (optional):
          <input
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="https://instagram.com/yourhandle"
          />
        </label>

        <button type="submit">Save Profile</button>
        {saved && <p style={{ color: "green" }}>Profile saved!</p>}
      </form>
    </div>
  );
}

export default Profile;
