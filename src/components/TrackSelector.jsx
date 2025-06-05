import React, { useState } from "react";

export default function TrackSelector({ onSelectTrack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tracks, setTracks] = useState([]);

  const searchTracks = async () => {

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