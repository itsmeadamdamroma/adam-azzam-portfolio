import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { PROFILE, SKILLS, SOFTWARE, LANGUAGES, EXPERIENCE, EDUCATION, PROJECTS, VIDEOS } from './data.js'
import ProjectPage from './ProjectPage.jsx'
import FluidCursor from './FluidCursor.jsx'

gsap.registerPlugin(ScrollTrigger)

/* ---------- Smooth scroll (Lenis) + GSAP tick ---------- */
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.0, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy() }
  }, [])
}

/* ---------- Reveal helper ---------- */
function useReveal(scopeRef) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        })
      })
      gsap.utils.toArray('[data-reveal-stagger]').forEach((container) => {
        gsap.fromTo(container.children, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: container, start: 'top 85%', once: true },
        })
      })
    }, scopeRef)
    return () => ctx.revert()
  }, [])
}

/* ---------- Custom cursor ---------- */
function Cursor() {
  const dot = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const xTo = gsap.quickTo(dot.current, 'x', { duration: 0.35, ease: 'power3' })
    const yTo = gsap.quickTo(dot.current, 'y', { duration: 0.35, ease: 'power3' })
    const move = (e) => { xTo(e.clientX); yTo(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return <div ref={dot} className="cursor-dot" aria-hidden="true" />
}

/* ---------- Preloader ---------- */
function Preloader({ onDone }) {
  const ref = useRef(null)
  const num = useRef(null)
  useEffect(() => {
    const counter = { v: 0 }
    const tl = gsap.timeline({ onComplete: () => onDone() })
    tl.to(counter, { v: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, '0') } })
      .to(ref.current.querySelector('.pl-bar'), { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0)
      .to(ref.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', delay: 0.25 })
  }, [])
  return (
    <div ref={ref} className="preloader">
      <div className="pl-name">Adam Azzam</div>
      <div ref={num} className="pl-num">000</div>
      <div className="pl-track"><div className="pl-bar" /></div>
    </div>
  )
}

/* ---------- Hero ---------- */
function Hero({ ready }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })
      tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.hero-line span', { yPercent: 110, duration: 1.15, stagger: 0.09, ease: 'power4.out' }, 0.1)
        .from('.hero-meta > *', { y: 20, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 0.7)
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, 1.1)
      gsap.to('.hero-bg', {
        yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-title', {
        yPercent: -30, opacity: 0.25, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [ready])
  return (
    <section ref={ref} className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <img src={PROJECTS[0].images[0]} alt="" loading="eager" />
        <div className="hero-bg-shade" />
      </div>
      <div className="hero-inner">
        <p className="hero-eyebrow">{PROFILE.role}</p>
        <h1 className="hero-title">
          <span className="hero-line"><span>ADAM</span></span>
          <span className="hero-line"><span>AZZAM</span></span>
        </h1>
        <div className="hero-meta">
          <p className="hero-tagline">{PROFILE.tagline}</p>
          <p className="hero-loc">{PROFILE.location}</p>
          <div className="hero-cta">
            <a className="btn-solid" href="#work">View Work</a>
          </div>
        </div>
      </div>
      <div className="hero-scroll"><span /></div>
    </section>
  )
}

/* ---------- Marquee ---------- */
function Marquee() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.mq-track', { xPercent: -50, ease: 'none', duration: 26, repeat: -1 })
    }, ref)
    return () => ctx.revert()
  }, [])
  const items = ['Interior Design', '3D Visualization', 'Space Planning', 'Materials Research', 'Museum Design', 'Art Direction']
  return (
    <div ref={ref} className="marquee" aria-hidden="true">
      <div className="mq-track">
        {[...items, ...items].map((t, i) => <span key={i}>{t}<i>✦</i></span>)}
      </div>
    </div>
  )
}

/* ---------- About ---------- */
function About() {
  const ref = useRef(null)
  const bigRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bigRef.current.children, {
        y: 44, opacity: 0, stagger: 0.05, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: bigRef.current, start: 'top 80%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  const words = PROFILE.summary.split(' ')
  return (
    <section ref={ref} className="about" id="about">
      <div className="section-head" data-reveal><span>01</span><h2>About</h2></div>
      <p ref={bigRef} className="about-big">
        {words.map((w, i) => <span key={i} className="aw">{w} </span>)}
      </p>
      <div className="about-grid">
        <div className="col" data-reveal>
          <h3>Key Skills</h3>
          <ul className="chips" data-reveal-stagger>
            {SKILLS.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div className="col" data-reveal>
          <h3>Software</h3>
          <ul className="chips" data-reveal-stagger>
            {SOFTWARE.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div className="col" data-reveal>
          <h3>Languages</h3>
          <ul className="langs">
            {LANGUAGES.map(([l, lv]) => <li key={l}><span>{l}</span><em>{lv}</em></li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- Project gallery (horizontal scroll per project) ---------- */
function Project({ p, index }) {
  const ref = useRef(null)
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    const ctx = gsap.context(() => {
      const total = track.scrollWidth - window.innerWidth
      if (total <= 0) return
      gsap.to(track, {
        x: -total, ease: 'none',
        scrollTrigger: {
          trigger: ref.current, start: 'top top', end: () => `+=${total}`,
          scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.min(p.images.length - 1, Math.floor(self.progress * p.images.length))),
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [p.images.length])

  return (
    <section ref={ref} className={`project project-${p.slug}`} id={index === 0 ? 'work' : undefined}>
      <div className="proj-head">
        <div>
          <span className="proj-num">0{index + 1}</span>
          <h2>{p.title}</h2>
          <p className="proj-sub">{p.subtitle} — {p.year}</p>
        </div>
        <div className="proj-tags">{p.tags.map((t) => <em key={t}>{t}</em>)}</div>
      </div>
      <p className="proj-desc">{p.description}</p>
      <div className="proj-counter">{String(active + 1).padStart(2, '0')} / {String(p.images.length).padStart(2, '0')}</div>
      <div className="proj-viewport">
        <div ref={trackRef} className="proj-track">
          {p.images.slice(0, 8).map((src, i) => (
            <a key={src} className="proj-card" href={`#/project/${p.slug}`}>
              <img src={src} alt={`${p.title} — render ${i + 1}`} loading={i < 2 ? 'eager' : 'lazy'} />
              <figcaption>{String(i + 1).padStart(2, '0')} — View project</figcaption>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Videos ---------- */
function Videos() {
  const ref = useRef(null)
  return (
    <section ref={ref} className="videos" id="videos">
      <div className="section-head" data-reveal><span>04</span><h2>Motion</h2></div>
      <div className="video-grid" data-reveal-stagger>
        {VIDEOS.map((v) => (
          <figure key={v.slug} className="video-card">
            <video controls preload="none" poster={v.poster} src={v.src} />
            <figcaption>
              <strong>{v.title}</strong>
              <span>{v.subtitle}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ---------- Experience / Education ---------- */
function Experience() {
  return (
    <section className="exp" id="experience">
      <div className="section-head" data-reveal><span>05</span><h2>Experience</h2></div>
      <div className="exp-list">
        {EXPERIENCE.map((e, i) => (
          <article key={i} className="exp-item" data-reveal>
            <div className="exp-left">
              <span className="exp-period">{e.period}</span>
            </div>
            <div className="exp-mid">
              <h3>{e.role}</h3>
              <p className="exp-co">{e.company} · {e.place}</p>
            </div>
            <ul className="exp-bullets">
              {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </article>
        ))}
      </div>
      {EDUCATION.map((ed, i) => (
        <article key={i} className="exp-item edu" data-reveal>
          <div className="exp-left"><span className="exp-period">{ed.period}</span></div>
          <div className="exp-mid">
            <h3>{ed.title}</h3>
            <p className="exp-co">{ed.school} · {ed.place}</p>
          </div>
          <p className="exp-note">{ed.note}</p>
        </article>
      ))}
    </section>
  )
}

/* ---------- Contact ---------- */
function Contact() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-big span', {
        yPercent: 110, duration: 1, stagger: 0.07, ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={ref} className="contact" id="contact">
      <div className="section-head" data-reveal><span>06</span><h2>Contact</h2></div>
      <h2 className="contact-big">
        <span className="hero-line"><span>LET'S CREATE</span></span>
        <span className="hero-line"><span>TOGETHER</span></span>
      </h2>
      <div className="contact-grid">
        <a href={`mailto:${PROFILE.email}`} className="contact-item" data-reveal>
          <span>Email</span><strong>{PROFILE.email}</strong>
        </a>
        <div className="contact-item" data-reveal>
          <span>Phone</span>
          <strong>{PROFILE.phones.join(' · ')}</strong>
        </div>
        <a href={PROFILE.instagram} target="_blank" rel="noreferrer" className="contact-item" data-reveal>
          <span>Instagram</span><strong>{PROFILE.instagramHandle} ↗</strong>
        </a>
      </div>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Adam Azzam</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  )
}

/* ---------- Nav ---------- */
function Nav({ ready }) {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${solid ? 'solid' : ''} ${ready ? 'in' : ''}`}>
      <a href="#top" className="nav-logo">AA</a>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#/work">RomArte</a>
        <a href="#videos">Motion</a>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  )
}

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  const m = hash.match(/^#\/project\/([a-z0-9-]+)/)
  if (m) return { view: 'project', slug: m[1] }
  const w = hash.match(/^#\/work\/([a-z0-9-]+)/)
  if (w) return { view: 'work', slug: w[1] }
  if (hash.startsWith('#/work')) return { view: 'work', slug: null }
  return { view: 'home', slug: null }
}

export default function App() {
  const [ready, setReady] = useState(false)
  const route = useHashRoute()
  useSmoothScroll()
  if (route.view === 'project') {
    return <ProjectPage slug={route.slug} />
  }
  if (route.view === 'work') {
    return <GoStatic page={route.slug ? `work/${route.slug}/index.html` : 'work/index.html'} />
  }
  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <FluidCursor />
      <Nav ready={ready} />
      <main className={ready ? 'main in' : 'main'}>
        <Hero ready={ready} />
        <Marquee />
        {PROJECTS.map((p, i) => <Project key={p.slug} p={p} index={i} />)}
        <Videos />
        <About />
        <Experience />
        <Contact />
        <WorkTeaser />
      </main>
    </>
  )
}

/* Le pagine Work sono le pagine statiche originali del sito RomArte (identiche 1:1) */
function GoStatic({ page }) {
  useEffect(() => {
    window.location.replace(new URL(page, document.baseURI).href)
  }, [page])
  return null
}

/* Teaser: link alla sezione Work RomArte (6 progetti) */
function WorkTeaser() {
  return (
    <section className="work-teaser" id="romarte-work">
      <div className="section-head" data-reveal><span>07</span><h2>RomArte Work</h2></div>
      <p className="teaser-copy" data-reveal>Selected work created with the RomArte studio — interiors, pavilions and digital experiences.</p>
      <a className="btn-solid teaser-btn" href="#/work" data-reveal>Open Work ↗</a>
    </section>
  )
}
