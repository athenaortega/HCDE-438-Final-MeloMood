export default function EntryList({ entries }) {
    return (
      <div>
        <h3>Your Journal Entries</h3>
        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          <ul>
            {entries.map((entry, i) => (
              <li key={i}>
                <strong>Track:</strong> {entry.track.name || "Unknown"}<br />
                <strong>Prompt:</strong> {entry.prompt}<br />
                <strong>Entry:</strong> {entry.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  