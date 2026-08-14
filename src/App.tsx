import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import './styles/globals.css'

function App() {
  return (
    <>
      {/* Skip to main content for keyboard / screen reader users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />
      <Home />
      <Footer />
    </>
  )
}

export default App
