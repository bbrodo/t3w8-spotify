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

const clientId = "d39452b7003a4b35b932c634bcc68851";

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
      const authData = await getAuthTokens(clientId, userAuthCode);
      setUserAuthData(authData);
      window.history.replaceState(null, "Spotify Statsboards", "/");
    }
    if (userAuthCode) {
      getAuthData();
    }
  }, [userAuthCode]);

  async function getAuthTokens(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
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

  async function redirectToAuthCodeFlow() {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/spotifycallback");
    params.append("scope", "user-read-private user-read-email user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

  return (
    <SpotifyAuthContext.Provider value={{ userAuthData, redirectToAuthCodeFlow }}>
      {children}
    </SpotifyAuthContext.Provider>
  );
}
