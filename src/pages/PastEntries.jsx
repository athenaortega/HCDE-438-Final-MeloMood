import React from "react";
import EntryList from "../components/EntryList";

export default function PastEntries({ entries }) {
  return (
    <div className="past-entries">
      <h1>Your Past Entries</h1>
      {entries.length === 0 ? (
        <p>No entries saved yet.</p>
      ) : (
        <EntryList entries={entries} />
      )}
    </div>
  );
}

