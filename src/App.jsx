import "./App.css";
import { ProfileHeader } from "./components/ProfileHeader";
import { TopTracks } from "./components/TopTracks";
import { useSpotifyAuthContext } from "./contexts/SpotifyAuthProvider";
import { useThemeContext } from "./contexts/ThemeContextProvider";

function App() {
  const [currentTheme, toggleTheme, setToSystem] = useThemeContext();
  const { redirectToAuthCodeFlow } = useSpotifyAuthContext();

  return (
    <>
      <ProfileHeader />
      <TopTracks />
      <div className="buttonContainer">
        <button onClick={toggleTheme}>Toggle Theme</button>
        <button onClick={setToSystem}>Set to system theme</button>
        <button onClick={redirectToAuthCodeFlow}>Sign in with Spotify</button>
      </div>
    </>
  );
}

export default App;
