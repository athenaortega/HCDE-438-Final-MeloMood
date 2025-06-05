import React, { useState } from "react";
import { db } from "../firebase/firebaseDetails";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function JournalEntry({ user, artwork, prompt, onEntrySaved }) {
  const [entryText, setEntryText] = useState("");

  const handleSubmit = async () => {
    if (!entryText.trim()) {
      alert("Please write something in your journal.");
      return;
    }

    const entry = {
      userId: user.uid,
      artwork: {
        id: artwork.objectID,
        title: artwork.title,
        artist: artwork.artistDisplayName,
        image: artwork.primaryImageSmall,
      },
      prompt,
      text: entryText,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "journalEntries"), entry);
      setEntryText("");
      onEntrySaved(entry);
      alert("Entry saved successfully!");
    } catch (error) {
      console.error("Error saving journal entry:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h3>{artwork.title}</h3>
        {artwork.artistDisplayName && <p><strong>Artist:</strong> {artwork.artistDisplayName}</p>}
        {artwork.primaryImageSmall && (
          <img
            src={artwork.primaryImageSmall}
            alt={artwork.title}
            style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px" }}
          />
        )}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h4>Reflection Prompt:</h4>
        <p>{prompt}</p>
      </div>

      <textarea
        rows="6"
        value={entryText}
        onChange={(e) => setEntryText(e.target.value)}
        placeholder="Write your thoughts here..."
        style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid #ccc" }}
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        Save Journal Entry
      </button>
    </div>
  );
}
