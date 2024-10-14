import { createContext, useContext, useEffect, useState } from "react";
import { useSpotifyAuthContext } from "./SpotifyAuthProvider";

export const defaultProfileData = {
  userId: "",
  email: "",
  uri: "",
  link: "",
  profileImage: "",
};

export const SpotifyProfileContext = createContext(defaultProfileData);

export function useSpotifyProfileData() {
  return useContext(SpotifyProfileContext);
}

export function SpotifyProfileProvider({ children }) {
  let [profileData, setProfileData] = useState(defaultProfileData);

  let { userAuthData } = useSpotifyAuthContext();

  async function fetchProfileData(accessToken) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await result.json();
  }

  useEffect(() => {
    if (userAuthData && userAuthData.access_token) {
      fetchProfileData(userAuthData.access_token).then((profileData) => {
        setProfileData(profileData);
      });
    }
  }, [userAuthData]);

  return (
    <SpotifyProfileContext.Provider value={profileData}>{children}</SpotifyProfileContext.Provider>
  );
}
