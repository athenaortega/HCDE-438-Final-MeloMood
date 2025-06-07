//This component focuses on obtaining the artwork from the Met Museum collection via their API.
//The functionality includes randomly selecting an artwork that the user must journal with.
import React, { useEffect, useState } from "react";

export default function ArtFetcher({ onArtSelected }) {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomArt = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects");
      const data = await res.json();
      const randomId = data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];

      const artRes = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`);
      const artData = await artRes.json();

      if (artData.primaryImageSmall) {
        setArtwork(artData);
        onArtSelected(artData);
      } else {
        fetchRandomArt(); 
      }
    } catch (err) {
      console.error("Failed to fetch art:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomArt();
  }, []);

  return (
    <div>
      <h2>Today's Artwork</h2>
      {loading ? <p>Loading artwork...</p> : artwork && (
        <div>
          <img src={artwork.primaryImageSmall} alt={artwork.title} style={{ maxWidth: "100%" }} />
          <p><strong>{artwork.title}</strong> by {artwork.artistDisplayName || "Unknown Artist"}</p>
          <button onClick={fetchRandomArt}>Show Another Artwork</button>
        </div>
      )}
    </div>
  );
}
