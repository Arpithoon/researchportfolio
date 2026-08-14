import Hero from '../components/Hero'
import Research from '../components/Research'
import About from '../components/About'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main id="main-content" aria-label="Main content">
      <Hero />
      <Research />
      <About />
      <Contact />
    </main>
  )
}
