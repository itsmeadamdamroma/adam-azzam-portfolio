import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS, PROJECT_CV_TEXT, VIDEOS_FOR } from './data.js'

gsap.registerPlugin(ScrollTrigger)

/* Pagina progetto dedicata: tutte le immagini scaricate in griglia completa + lightbox. */
export default function ProjectPage({ slug, onBack }) {
  const idx = Math.max(0, PROJECTS.findIndex((p) => p.slug === slug))
  const p = PROJECTS[idx]
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(idx + 1) % PROJECTS.length]
  const root = useRef(null)
  const heroImg = useRef(null)
  const CV = PROJECT_CV_TEXT[p.slug]
  const [lightbox, setLightbox] = useState(-1)

  /* Reset scroll al cambio progetto */
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  /* Animazioni entrata */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.from('.pp-back', { y: -14, opacity: 0, duration: 0.5, ease: 'power3.out' })
        .from('.pp-hero img', { scale: 1.12, duration: 1.4, ease: 'power3.out' }, 0)
        .from('.pp-title span', { yPercent: 110, duration: 1, stagger: 0.08, ease: 'power4.out' }, 0.15)
        .from('.pp-meta > *', { y: 20, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' }, 0.5)
        .from('.pp-grid figure', { y: 44, opacity: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out', clearProps: 'all' }, 0.6)
      gsap.to(heroImg.current, {
        yPercent: 14, ease: 'none',
        scrollTrigger: { trigger: '.pp-hero', start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [slug])

  const onKey = useCallback((e) => {
    if (lightbox < 0) return
    if (e.key === 'Escape') setLightbox(-1)
    if (e.key === 'ArrowRight') setLightbox((i) => Math.min(p.images.length - 1, i + 1))
    if (e.key === 'ArrowLeft') setLightbox((i) => Math.max(0, i - 1))
  }, [lightbox, p.images.length])
  useEffect(() => {
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onKey])

  return (
    <div ref={root} className={`pp pp-${p.slug}`}>
      <a className="pp-back" href="#work">← Back to Work</a>

      {/* Hero */}
      <header className="pp-hero">
        <div className="pp-hero-media"><img ref={heroImg} src={p.images[0]} alt={p.title} /></div>
        <div className="pp-hero-shade" />
        <div className="pp-hero-inner">
          <span className="pp-num">0{idx + 1} / 0{PROJECTS.length}</span>
          <h1 className="pp-title">
            <span className="hero-line"><span>{p.title.toUpperCase()}</span></span>
          </h1>
          <div className="pp-meta">
            <p className="pp-sub">{p.subtitle}</p>
            <p className="pp-year">{p.year}</p>
            <div className="pp-tags">{p.tags.map((t) => <em key={t}>{t}</em>)}</div>
          </div>
        </div>
      </header>

      {/* Descrizione */}
      <section className="pp-desc">
        <div className="section-head"><span>Project</span><h2>Overview</h2></div>
        <p>{p.description}</p>
        {CV && (
          <div className="pp-cv">
            <div className="pp-cv-role">
              <strong>{CV.role}</strong>
              <span>{CV.company} — {CV.place}</span>
            </div>
            <ul className="pp-cv-bullets">
              {CV.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        )}
      </section>

      {/* Griglia completa: TUTTE le immagini scaricate */}
      <section className="pp-gallery">
        <div className="section-head"><span>Gallery</span><h2>{p.images.length} Renders</h2></div>
        <div className="pp-grid">
          {p.images.map((src, i) => (
            <figure key={src} className={`pp-cell ${i % 7 === 0 ? 'pp-wide' : ''}`} onClick={() => setLightbox(i)}>
              <img src={src} alt={`${p.title} render ${i + 1}`} loading={i < 3 ? 'eager' : 'lazy'} />
              <figcaption>{String(i + 1).padStart(2, '0')}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {VIDEOS_FOR[p.slug] && (
        <section className="pp-videos">
          <div className="section-head"><span>Motion</span><h2>Videos</h2></div>
          <div className="video-grid">
            {VIDEOS_FOR[p.slug].map((v) => (
              <figure key={v.slug} className="video-card">
                <video controls preload="none" poster={v.poster} src={v.src} />
                <figcaption><strong>{v.title}</strong><span>{v.subtitle}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Navigazione progetti */}
      <nav className="pp-nav">
        <a href={`#/project/${prev.slug}`} className="pp-nav-item">
          <span>← Previous</span><strong>{prev.title}</strong>
        </a>
        <a href="#work" className="pp-nav-item pp-nav-all"><span>All Work</span></a>
        <a href={`#/project/${next.slug}`} className="pp-nav-item pp-nav-right">
          <span>Next →</span><strong>{next.title}</strong>
        </a>
      </nav>

      {lightbox >= 0 && (
        <div className="lightbox" onClick={() => setLightbox(-1)}>
          <img src={p.images[lightbox]} alt="" />
          <button className="lb-close" aria-label="Close">×</button>
          <div className="lb-count">{lightbox + 1} / {p.images.length}</div>
        </div>
      )}
    </div>
  )
}
