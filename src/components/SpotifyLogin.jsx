import React, { useState, useEffect } from "react";
import EntryList from "../components/EntryList";
import JournalEntry from "../components/JournalEntry";
import Prompt from "../components/Prompt";
import TrackSelector from "../components/TrackSelector";
import SpotifyLogin from "../components/SpotifyLogin";

export default function NewEntry({ user, onAddEntry }) {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [entries, setEntries] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAccessToken(token);
  }, []);

  const generatePrompt = () => {
    const prompts = [
      "How does this song provide you with peace and calm?",
      "What memories does this song bring up?",
      "How do the lyrics resonate with your current feelings?",
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(randomPrompt);
  };

  useEffect(() => {
    if (selectedTrack) generatePrompt();
  }, [selectedTrack]);

  const handleEntrySaved = (entry) => {
    onAddEntry(entry);
  };

  if (!accessToken) {
    return (
      <div className="home">
        <h1>Music Journaling</h1>
        <p>Please log in with Spotify to select a track and journal.</p>
        <SpotifyLogin />
      </div>
    );
  }

  return (
    <div className="home">
      <h1>Music Journaling</h1>
      <TrackSelector onSelectTrack={setSelectedTrack} />
      {selectedTrack && <Prompt prompt={prompt} />}
      {selectedTrack && (
        <JournalEntry
          user={user}
          track={selectedTrack}
          prompt={prompt}
          onEntrySaved={handleEntrySaved}
        />
      )}
    </div>
  );
}
