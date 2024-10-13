import { createContext, useContext, useEffect, useState } from "react";

export const spotifyAuthScaffold = {
  access_token: "",
  token_type: "",
  expires_in: "",
  refresh_token: "",
  scope: "",
};

export const SpotifyAuthContext = createContext(spotifyAuthScaffold);

export function useSpotifyAuthContext() {
  return useContext(SpotifyAuthContext);
}

const clientid = "d39452b7003a4b35b932c634bcc68851";

export function SpotifyAuthProvider({ children }) {
  // code required for spotify sign in
  let [userAuthCode, setUserAuthCode] = useState("");
  // user access token
  let [userAuthData, setUserAuthData] = useState(spotifyAuthScaffold);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    setUserAuthCode(code);
  }, []);

  useEffect(() => {
    async function getAuthData() {
      const authData = await getAuthTokens(clientid, userAuthCode);
      setUserAuthData(authData);
      window.history.replace(null, "Spotify Statsboards", "/");
    }
    if (userAuthCode) {
      getAuthData();
    }
  }, [userAuthCode]);

  async function getAuthTokens(clientid, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientid);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/spotifycallback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const authTokens = await result.json();
    return authTokens;
  }

  return (
    <SpotifyAuthContext.Provider value={{ userAuthData }}>
      {children}
    </SpotifyAuthContext.Provider>
  );
}
