import './App.css'
import { ProfileHeader } from './components/ProfileHeader';
import { useSpotifyAuthContext } from './contexts/SpotifyAuthProvider';
import { useThemeContext } from './contexts/ThemeContextProvider'

function App() {

  const [currentTheme, toggleTheme, setToSystem] = useThemeContext();
  const {redirectToAuthCodeFlow} = useSpotifyAuthContext()

  return (
    <>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      <button onClick={setToSystem}>
        Set to system theme
      </button>
      <button onClick={redirectToAuthCodeFlow}>
        Sign in with Spotify
      </button>

      <ProfileHeader/>
    </>
  )
}

export default App
