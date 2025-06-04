import React, { useEffect } from "react";


const Callback = () => {
  useEffect(() => {
    const getToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const codeVerifier = localStorage.getItem("code_verifier");

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: "b6f5582637644f3090794c8e795d03cd",
          grant_type: "authorization_code",
          code,
          redirect_uri: "https://hcde-438-final-melomood.web.app/",
          code_verifier: codeVerifier,
        }),
      });

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      window.location.href = "/";
    };

    getToken();
  }, []);

  return <p>Authenticating with Spotify...</p>;
};


export default Callback;
