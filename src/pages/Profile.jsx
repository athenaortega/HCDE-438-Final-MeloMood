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
    photoURL: "", // new field
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saved, setSaved] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData(data);
          setPreviewPhoto(data.photoURL || "");
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

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
        setFormData((prev) => ({
          ...prev,
          photoURL: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
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
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Profile</h2>

      <div style={styles.card}>
        <div style={styles.imageSection}>
          <label htmlFor="photo-upload" style={styles.imageLabel}>
            {previewPhoto ? (
              <img src={previewPhoto} alt="Profile" style={styles.profileImage} />
            ) : (
              <div style={styles.placeholderImage}>Upload Photo</div>
            )}
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: "none" }}
          />
        </div>

        <form onSubmit={handleSave} style={styles.form}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            style={styles.input}
          />

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short bio..."
            rows={3}
            style={styles.textarea}
          />

          <input
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            placeholder="Favorite art styles?"
            style={styles.input}
          />

          <input
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="Twitter (optional)"
            style={styles.input}
          />

          <input
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="Instagram (optional)"
            style={styles.input}
          />

          <button type="submit" style={styles.button}>Save Profile</button>
          {saved && <p style={{ color: "green" }}>Profile saved!</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "2rem auto",
    padding: "2rem",
    background: "#fffaf6",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "1.5rem",
    fontWeight: "600",
    color: "#4b3f35",
  },
  card: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
  },
  imageSection: {
    flex: "1 1 150px",
    display: "flex",
    justifyContent: "center",
  },
  imageLabel: {
    cursor: "pointer",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #ccc",
  },
  placeholderImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background: "#f0e6dd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    color: "#999",
    textAlign: "center",
    padding: "0.5rem",
  },
  form: {
    flex: "2 1 300px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#a47148",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Profile;
