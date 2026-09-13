import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { PROFILE, SKILLS, SKILLS_IT, SOFTWARE, LANGUAGES, LANGUAGES_IT, EXPERIENCE, EDUCATION, ROMARTE_PROJECTS, VIDEOS, pick, pickP } from './data.js'
import { useLang, setLang, tr, UI } from './i18n.js'
import ProjectPage from './ProjectPage.jsx'
import FluidCursor from './FluidCursor.jsx'

gsap.registerPlugin(ScrollTrigger)

/* ---------- Smooth scroll (Lenis) + GSAP tick ---------- */
function useSmoothScroll() {
  useEffect(() => {
    // ponytail: Lenis smooth-wheel è solo desktop — su touch combatte il momentum nativo
    // e fa sembrare lo scroll verticale bloccato. Su mobile scroll nativo.
    if (window.matchMedia('(pointer: coarse)').matches) return
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
  }, [scopeRef])
}

/* ---------- Preloader ---------- */
function Preloader({ onDone }) {
  const ref = useRef(null)
  useEffect(() => {
    const tl = gsap.timeline({ onComplete: onDone })
    tl.to('.pre-count', { textContent: 100, duration: 1.6, snap: { textContent: 1 }, ease: 'power2.inOut' })
      .to('.pre-inner', { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '+=0.2')
      .set(ref.current, { display: 'none' })
    return () => tl.kill()
  }, [onDone])
  return (
    <div ref={ref} className="preloader">
      <div className="pre-inner">
        <span className="pre-count">0</span>
        <span className="pre-name">ADAM AZZAM</span>
      </div>
    </div>
  )
}

/* ---------- Custom cursor ---------- */
function Cursor() {
  const dot = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const move = (e) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.16, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return <div ref={dot} className="cursor-dot" aria-hidden="true" />
}

/* ---------- Lang switch ---------- */
function LangSwitch() {
  const [lang] = useLang()
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      <span className={`lang-pill ${lang === 'it' ? 'it' : 'en'}`} aria-hidden="true" />
      <button className={lang === 'it' ? 'on' : ''} onClick={() => setLang('it')}>IT</button>
      <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
    </div>
  )
}

/* ---------- Hero ---------- */
function Hero({ ready }) {
  const ref = useRef(null)
  const [lang] = useLang()
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: ready ? 0 : 0.2 })
      tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0)
        .from('.hero-line span', { yPercent: 110, duration: 1, stagger: 0.09, ease: 'power4.out' }, 0.1)
        .from('.hero-meta > *', { y: 24, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out' }, 0.45)
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, 1)
    }, ref)
    return () => ctx.revert()
  }, [ready])
  return (
    <section ref={ref} className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <img src={ROMARTE_PROJECTS[0].images[0]} alt="" loading="eager" />
        <div className="hero-bg-shade" />
      </div>
      <div className="hero-inner">
        <p className="hero-eyebrow">{pick(PROFILE, 'role', lang)}</p>
        <h1 className="hero-title">
          <span className="hero-line"><span>ADAM</span></span>
          <span className="hero-line"><span>AZZAM</span></span>
        </h1>
        <div className="hero-meta">
          <p className="hero-tagline">{pick(PROFILE, 'tagline', lang)}</p>
          <p className="hero-loc">{PROFILE.location}</p>
          <div className="hero-cta">
            <a className="btn-solid" href="#work">{tr(lang, 'Vedi i progetti', 'View Work')}</a>
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
  const [lang] = useLang()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.mq-track', { xPercent: -50, ease: 'none', duration: 26, repeat: -1 })
    }, ref)
    return () => ctx.revert()
  }, [])
  const items = tr(lang,
    ['Interior Design', '3D Visualization', 'Space Planning', 'Materials Research', 'Museum Design', 'Art Direction'],
    ['Interior Design', '3D Visualization', 'Space Planning', 'Materials Research', 'Museum Design', 'Art Direction'])
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
  const [lang] = useLang()
  const u = UI[lang]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bigRef.current.children, {
        y: 44, opacity: 0, stagger: 0.05, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: bigRef.current, start: 'top 80%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [lang])
  const summary = pick(PROFILE, 'summary', lang)
  const words = summary.split(' ')
  const skills = lang === 'it' ? SKILLS_IT : SKILLS
  const langs = lang === 'it' ? LANGUAGES_IT : LANGUAGES
  return (
    <section ref={ref} className="about" id="about">
      <div className="section-head" data-reveal><span>01</span><h2>{u.about === 'about' ? 'About' : 'Chi sono'}</h2></div>
      <p ref={bigRef} className="about-big" key={lang}>
        {words.map((w, i) => (
          <span key={i}>
            <span className="aw">{w}</span>{' '}
          </span>
        ))}
      </p>
      <div className="about-grid">
        <div className="col" data-reveal>
          <h3>{u.skills}</h3>
          <ul className="chips" data-reveal-stagger>
            {skills.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div className="col" data-reveal>
          <h3>{u.software}</h3>
          <ul className="chips" data-reveal-stagger>
            {SOFTWARE.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div className="col" data-reveal>
          <h3>{u.languages}</h3>
          <ul className="langs">
            {langs.map(([l, lv]) => <li key={l}><span>{l}</span><em>{lv}</em></li>)}
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
  const [lang] = useLang()
  const u = UI[lang]

  useEffect(() => {
    const track = trackRef.current
    const viewport = ref.current?.querySelector('.proj-viewport')
    const mm = gsap.matchMedia()

    // Desktop (mouse/trackpad): pin + scrub orizzontale.
    mm.add('(pointer: fine) and (min-width: 769px)', () => {
      // function-based: ricalcolato a ogni refresh (invalidateOnRefresh) — fix foto bloccate a metà
      const getTotal = () => track.scrollWidth - window.innerWidth
      // ponytail: end fisso a 2 viewport-width — prima il pin durava scrollWidth (~400vw × 5 progetti) e la home sembrava bloccata
      gsap.to(track, {
        x: () => -getTotal(), ease: 'none',
        scrollTrigger: {
          trigger: ref.current, start: 'top top', end: () => '+=' + window.innerWidth * 2,
          scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.min(p.images.length - 1, Math.floor(self.progress * p.images.length))),
        },
      })
    })

    // Mobile/touch: swipe orizzontale nativo (CSS overflow-x) → aggiorna il contatore.
    const onScroll = () => {
      if (!viewport) return
      const card = viewport.scrollLeft / Math.max(1, track.scrollWidth - viewport.clientWidth)
      setActive(Math.min(p.images.length - 1, Math.round(card * (p.images.length - 1))))
    }
    viewport?.addEventListener('scroll', onScroll, { passive: true })

    return () => { mm.revert(); viewport?.removeEventListener('scroll', onScroll) }
  }, [p.images.length])

  // le immagini cambiano scrollWidth quando caricano → refresh
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 800)
    return () => { window.removeEventListener('load', refresh); clearTimeout(t) }
  }, [])

  const cardHref = `#/project/${p.slug}`

  return (
    <section ref={ref} className={`project project-${p.slug}`} id={index === 0 ? 'work' : undefined}>
      <div className="proj-head">
        <div>
          <span className="proj-num">0{index + 1}</span>
          <h2>{p.title}</h2>
          <p className="proj-sub">{pickP(p, 'subtitle', lang)} — {p.year}</p>
        </div>
        <div className="proj-tags">{pickP(p, 'tags', lang).map((t) => <em key={t}>{t}</em>)}</div>
      </div>
      <div className="proj-meta">
        {p.client && <div><span>{u.client}</span><strong>{p.client}</strong></div>}
        {p.services && <div><span>{u.services}</span><strong>{pickP(p, 'services', lang).join(' · ')}</strong></div>}
      </div>
      <p className="proj-desc">{pickP(p, 'description', lang)}</p>
      {p.overview && <p className="proj-desc proj-overview">{pickP(p, 'overview', lang)}</p>}
      <div className="proj-counter">{String(active + 1).padStart(2, '0')} / {String(p.images.length).padStart(2, '0')}</div>
      <div className="proj-viewport">
        <div ref={trackRef} className="proj-track">
          {p.images.slice(0, 8).map((src, i) => (
            <a key={src} className="proj-card" href={cardHref}>
              <img src={src} alt={`${p.title} — render ${i + 1}`} loading="eager" decoding="async" />
              <figcaption>{String(i + 1).padStart(2, '0')} — {u.viewProject}</figcaption>
            </a>
          ))}
        </div>
      </div>
      {p.video && (
        <figure className="video-card proj-video">
          <video controls preload="metadata" poster={pickP(p, 'video', lang).poster} src={pickP(p, 'video', lang).src} />
          <figcaption><strong>{pickP(p, 'video', lang).title}</strong><span>{pickP(p, 'video', lang).subtitle}</span></figcaption>
        </figure>
      )}
      {p.quote && (
        <figure className="proj-quote">
          <blockquote>{p.quote.text}</blockquote>
          <figcaption>{p.quote.author} — {p.quote.role}</figcaption>
        </figure>
      )}
    </section>
  )
}

/* ---------- Videos ---------- */
function Videos() {
  const ref = useRef(null)
  const [lang] = useLang()
  return (
    <section ref={ref} className="videos" id="videos">
      <div className="section-head" data-reveal><span>04</span><h2>{tr(lang, 'Motion', 'Motion')}</h2></div>
      <div className="video-grid" data-reveal-stagger>
        {VIDEOS.map((v) => (
          <figure key={v.slug} className="video-card">
            <video controls preload="none" poster={v.poster} src={v.src} />
            <figcaption>
              <strong>{v.title}</strong>
              <span>{pickP(v, 'subtitle', lang)}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ---------- Experience / Education ---------- */
function Experience() {
  const [lang] = useLang()
  const u = UI[lang]
  return (
    <section className="exp" id="experience">
      <div className="section-head" data-reveal><span>05</span><h2>{u.experience}</h2></div>
      <div className="exp-list">
        {EXPERIENCE.map((e, i) => (
          <article key={i} className="exp-item" data-reveal>
            <div className="exp-left">
              <span className="exp-period">{e.period}</span>
            </div>
            <div className="exp-mid">
              <h3>{pick(e, 'role', lang)}</h3>
              <p className="exp-co">{e.company} · {e.place}</p>
            </div>
            <ul className="exp-bullets">
              {pick(e, 'bullets', lang).map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </article>
        ))}
      </div>
      {EDUCATION.map((ed, i) => (
        <article key={i} className="exp-item edu" data-reveal>
          <div className="exp-left"><span className="exp-period">{ed.period}</span></div>
          <div className="exp-mid">
            <h3>{pick(ed, 'title', lang)}</h3>
            <p className="exp-co">{ed.school} · {ed.place}</p>
          </div>
          <p className="exp-note">{pick(ed, 'note', lang)}</p>
        </article>
      ))}
    </section>
  )
}

/* ---------- Contact ---------- */
function Contact() {
  const ref = useRef(null)
  const [lang] = useLang()
  const u = UI[lang]
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
      <div className="section-head" data-reveal><span>06</span><h2>{u.contact === 'contact' ? 'Contact' : 'Contatti'}</h2></div>
      <h2 className="contact-big">
        <span className="hero-line"><span>{tr(lang, "CREIAMO INSIEME", "LET'S CREATE")}</span></span>
        <span className="hero-line"><span>{tr(lang, 'INSIEME', 'TOGETHER')}</span></span>
      </h2>
      <div className="contact-grid">
        <a href={`mailto:${PROFILE.email}`} className="contact-item" data-reveal>
          <span>Email</span><strong>{PROFILE.email}</strong>
        </a>
        <div className="contact-item" data-reveal>
          <span>{u.phone}</span>
          <a href="https://wa.me/393513838701" target="_blank" rel="noreferrer"><strong>+39 351 383 8701 (WhatsApp) ↗</strong></a>
        </div>
        <a href={PROFILE.instagram} target="_blank" rel="noreferrer" className="contact-item" data-reveal>
          <span>Instagram</span><strong>{PROFILE.instagramHandle} ↗</strong>
        </a>
      </div>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Adam Azzam</span>
        <a href="#top">{u.backToTop}</a>
      </footer>
    </section>
  )
}

/* ---------- Nav ---------- */
function Nav({ ready }) {
  const [solid, setSolid] = useState(false)
  const [lang] = useLang()
  const [open, setOpen] = useState(false)
  const u = UI[lang]
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  const links = (
    <>
      <a href="#top" onClick={() => setOpen(false)}>{u.home}</a>
      <a href="#about" onClick={() => setOpen(false)}>{u.about}</a>
      <a href="#work" onClick={() => setOpen(false)}>{u.work}</a>
      <a href="#contact" onClick={() => setOpen(false)}>{u.contact}</a>
    </>
  )
  return (
    <nav className={`nav ${solid ? 'solid' : ''} ${ready ? 'in' : ''}`}>
      <a href="#top" className="nav-logo" onClick={() => setOpen(false)}>AA</a>
      <div className="nav-links">{links}</div>
      <div className="nav-right">
        <LangSwitch />
        <button
          className={`hamburger ${open ? 'open' : ''}`}
          aria-label="Menu" aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          {links}
        </div>
      )}
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
    // anche #/work/<slug> mostra la pagina progetto in-app (stesso tema), niente redirect alle statiche
    const slug = route.slug || null
    return slug ? <ProjectPage slug={slug} /> : <ProjectPage slug={ROMARTE_PROJECTS[0].slug} />
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
        {ROMARTE_PROJECTS.map((p, i) => <Project key={p.slug} p={p} index={i} />)}
        <Videos />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
