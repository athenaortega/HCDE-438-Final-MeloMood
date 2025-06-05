import React, { useEffect } from "react";

const clientId = "b6f5582637644f3090794c8e795d03cd";


const redirectUri = window.location.origin; 

const Callback = () => {
  useEffect(() => {
    const getToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const codeVerifier = localStorage.getItem("code_verifier");

      if (!code || !codeVerifier) {
        console.error("Missing code or code verifier");
        alert("Something went wrong with Spotify login.");
        return;
      }

      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
          }),
        });

        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          window.location.href = "/home"; // go to actual app
        } else {
          console.error("Failed to get access token:", data);
          alert("Failed to authenticate with Spotify.");
        }
      } catch (error) {
        console.error("Error fetching token from Spotify", error);
        alert("Network error during Spotify auth.");
      }
    };

    getToken();
  }, []);

  return <p>Authenticating with Spotify...</p>;
};

export default Callback;
