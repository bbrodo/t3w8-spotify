import './App.css'
import { useThemeContext } from './contexts/ThemeContextProvider'

function App() {

  const [currentTheme, toggleTheme, setToSystem] = useThemeContext();

  return (
    <>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      <button onClick={setToSystem}>
        Set to system theme
      </button>
    </>
  )
}

export default App
