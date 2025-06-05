import React, { useState, useEffect } from "react";
import JournalEntry from "../components/JournalEntry";

export default function NewEntry({ user, onAddEntry }) {
  const [artwork, setArtwork] = useState(null);
  const [prompt, setPrompt] = useState("");

  const generatePrompt = () => {
    const prompts = [
      "What emotions does this artwork bring up for you?",
      "How do the colors or textures reflect something in your life?",
      "What story do you imagine behind this piece?",
    ];
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const fetchRandomArtwork = async () => {
    try {
      // Step 1: Search for object IDs that include images
      const searchRes = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=painting"
      );
      const searchData = await searchRes.json();

      if (searchData.total === 0) return;

      // Step 2: Choose a random object ID from results
      const randomId =
        searchData.objectIDs[Math.floor(Math.random() * searchData.objectIDs.length)];

      // Step 3: Fetch object data using that ID
      const objectRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`
      );
      const objectData = await objectRes.json();

      setArtwork(objectData);
      setPrompt(generatePrompt());
    } catch (error) {
      console.error("Failed to fetch artwork:", error);
    }
  };

  useEffect(() => {
    fetchRandomArtwork();
  }, []);

  const handleEntrySaved = (entry) => {
    onAddEntry(entry);
    fetchRandomArtwork(); // Load a new piece for next entry
  };

  if (!artwork) return <p>Loading artwork...</p>;

  return (
    <div className="new-entry">
      <h1>Art-Based Journaling</h1>
      <JournalEntry
        user={user}
        artwork={artwork}
        prompt={prompt}
        onEntrySaved={handleEntrySaved}
      />
    </div>
  );
}
