import { useSpotifyProfileData } from "../contexts/SpotifyProfileProvider";

export function ProfileHeader() {
  let {profileData} = useSpotifyProfileData();

  if (profileData.id) {
    return (
      <div id="profileHeader">
        {profileData.images.length > 0 && <img src={profileData.images[1].url} className="userImg"/>}
        <h1>Spotify Stats for {profileData.display_name}</h1>
      </div>
    );
  } else {
    return (
      <div id="profileHeader">
        <p>Please sign in to see your profile data</p>
      </div>
    );
  }
}
