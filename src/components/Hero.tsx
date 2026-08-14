import { useCallback, useEffect, useRef } from 'react'
import trajectoryImg from '../assets/trajectory-transparent.png'
import './Hero.css'

// ---------------------------------------------------------------------------
// Particle animation — canvas-based, follows a figure-8 Lissajous-like path
// that visually matches the trajectory image geometry.
// The image (1024×768) has:
//   left lobe  centre ≈ (35%, 45%) of image
//   right lobe centre ≈ (65%, 42%) of image
//   neck crossing    ≈ (50%, 50%)
// We parameterise a two-lobe Lissajous: x = A·sin(t), y = B·sin(2t+φ)
// and layer gentle spiraling to mimic the chaotic wrapping.
// ---------------------------------------------------------------------------
function useParticleCanvas(containerRef: React.RefObject<HTMLDivElement | null>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Honour prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    // Create and mount canvas
    const canvas = document.createElement('canvas')
    canvas.className = 'hero__particle-canvas'
    canvas.setAttribute('aria-hidden', 'true')
    container.appendChild(canvas)
    canvasRef.current = canvas

    const ctx = canvas.getContext('2d')!

    // Resize canvas to match container
    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width  = rect.width
      canvas.height = rect.height
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    // -----------------------------------------------------------------------
    // Path: Two-lobe Lissajous matching the image geometry.
    //
    // The image fills the container; the trajectory occupies roughly:
    //   x: [15%, 85%] of container width
    //   y: [25%, 75%] of container height
    // Centre of the figure at (50%, 49%).
    //
    // Parametric:
    //   px = cx + Ax · sin(t + phase)          — horizontal sweep
    //   py = cy + Ay · sin(2t + phase + φ)     — vertical figure-8
    //
    // To add the chaotic "spiral" feel we add a slowly varying offset.
    // -----------------------------------------------------------------------
    const TWO_PI = Math.PI * 2

    // Returns the particle screen position for a given "time" t (in seconds)
    const getPos = (t: number): [number, number] => {
      const w = canvas.width
      const h = canvas.height

      // Layout constants (relative to container, matching where the image sits)
      const cx = w * 0.50
      const cy = h * 0.49
      const Ax = w * 0.34   // half-width of the figure-8
      const Ay = h * 0.22   // half-height

      // Phase offset that slowly drifts — gives the spiral-within-lobe feel
      const drift = Math.sin(t * 0.04) * 0.18

      const speed = t * 1.1  // radians per second
      const px = cx + Ax * Math.sin(speed + drift)
      const py = cy + Ay * Math.sin(2 * speed + drift + Math.PI * 0.05)

      return [px, py]
    }

    let startTime: number | null = null

    const draw = (ts: number) => {
      if (!startTime) startTime = ts
      const elapsed = (ts - startTime) / 1000  // seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const [px, py] = getPos(elapsed)

      // Outer soft glow
      const glow = ctx.createRadialGradient(px, py, 0, px, py, 18)
      glow.addColorStop(0,   'rgba(220, 80, 180, 0.35)')
      glow.addColorStop(0.4, 'rgba(160, 50, 200, 0.12)')
      glow.addColorStop(1,   'rgba(0, 0, 0, 0)')
      ctx.beginPath()
      ctx.arc(px, py, 18, 0, TWO_PI)
      ctx.fillStyle = glow
      ctx.fill()

      // Inner bright core
      const core = ctx.createRadialGradient(px, py, 0, px, py, 4)
      core.addColorStop(0,   'rgba(255, 200, 240, 1)')
      core.addColorStop(0.5, 'rgba(220,  80, 180, 0.9)')
      core.addColorStop(1,   'rgba(160,  40, 200, 0)')
      ctx.beginPath()
      ctx.arc(px, py, 4, 0, TWO_PI)
      ctx.fillStyle = core
      ctx.fill()

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      canvas.remove()
    }
  }, [containerRef])
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Hero() {
  const visualRef = useRef<HTMLDivElement>(null)
  useParticleCanvas(visualRef)

  const scrollToResearch = useCallback(() => {
    const el = document.querySelector('#research')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__container container">

        {/* ── LEFT: text content ── */}
        <div className="hero__content">
          <p className="hero__eyebrow label">
            INDEPENDENT RESEARCH · 2026
          </p>

          <h1 className="hero__headline">
            Questions<br />
            <span className="hero__headline-serif">
              worth exploring.
            </span>
          </h1>

          <p className="hero__body">
            Independent research, computational projects, and ideas
            driven by curiosity across science and technology.
          </p>

          <button
            className="hero__cta"
            onClick={scrollToResearch}
            type="button"
          >
            View research
            <span className="hero__cta-arrow" aria-hidden="true">↗</span>
          </button>
        </div>

        {/* ── RIGHT: trajectory image + particle canvas ── */}
        <div className="hero__visual" ref={visualRef} aria-hidden="true">
          <img
            src={trajectoryImg}
            alt=""
            className="hero__trajectory"
            draggable={false}
          />
          {/* Canvas injected by useParticleCanvas hook */}
        </div>

      </div>
    </section>
  )
}