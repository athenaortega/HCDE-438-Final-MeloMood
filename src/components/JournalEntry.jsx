import React, { useState } from "react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseDetails";

export default function JournalEntry({ user, track, prompt, onEntrySaved }) {
  const [entryText, setEntryText] = useState("");


  const handleSubmit = async () => {
    if (!entryText) return alert("Please write your journal entry");

    const entry = {
      userId: user.uid,
      track,
      prompt,
      text: entryText,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "journalEntries"), entry);
      onEntrySaved(entry);
      setEntryText("");
      alert("Entry saved!");
    } catch (e) {
      console.error("Error saving entry: ", e);
      alert("Error saving entry");
    }
  };

  return (
    <div>
      <h3>Your Journal Entry</h3>
      <textarea
        rows="6"
        value={entryText}
        onChange={(e) => setEntryText(e.target.value)}
        placeholder="Write your reflection here..."
      />
      <button onClick={handleSubmit}>Save Entry</button>
    </div>
  );
}
