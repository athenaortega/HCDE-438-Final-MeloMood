import React, { useState } from "react";

export default function TrackSelector({ onSelectTrack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tracks, setTracks] = useState([]);

  // Placeholder for Spotify search function
  const searchTracks = async () => {
    // Call Spotify API here and update tracks state
    // For demo, use dummy data:
    setTracks([
      { id: "1", name: "Song A", artist: "Artist A" },
      { id: "2", name: "Song B", artist: "Artist B" },
    ]);
  };

  return (
    <div>
      <input
        placeholder="Search for a track"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={searchTracks}>Search</button>

      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            <button onClick={() => onSelectTrack(track)}>
              {track.name} - {track.artist}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
