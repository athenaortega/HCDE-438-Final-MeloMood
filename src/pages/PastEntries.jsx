import React from "react";

export default function PastEntries({ entries }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Your Past Entries</h2>
      {entries.length === 0 ? (
        <p>No entries saved yet.</p>
      ) : (
        entries.map((entry, idx) => (
          <div className="card mb-3" key={idx}>
            <div className="card-body">
              <h5 className="card-title">{entry.artwork?.title}</h5>
              <p className="card-text">{entry.text}</p>
              <small className="text-muted">{entry.prompt}</small>
              {entry.artwork?.image && (
                <div className="mt-2">
                  <img src={entry.artwork.image} alt="Artwork" style={{ maxWidth: "150px" }} />
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

