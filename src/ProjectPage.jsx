import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ROMARTE_PROJECTS, pickP } from './data.js'
import { useLang, UI } from './i18n.js'

gsap.registerPlugin(ScrollTrigger)

/* Pagina progetto RomArte: impaginazione 1:1 con romartestudio.com (hero → details →
   overview → the work → testimonial → gallery) ma stile Adam Azzam (dark + gold).
   Le "work paragraphs" sono i paragrafi reali estratti dalle pagine statiche. */
export const ROMARTE_WORK = {
  klu: {
    intro: 'Gone are the days when this space was merely a disused, overlooked venue. At RomArte, I recognised the untapped potential of this space and completely reimagined its interior with a unique brand identity, bespoke furniture and a vibrant color palette.',
    work: [
      'I completely refreshed the look and feel of the space to bring it to the forefront of the current spirit, with a sleek, modern style.',
      'From a technical standpoint, the advanced customization of spatial design enables a highly optimized user experience. I implemented tailored lighting systems, acoustic solutions, and modular architectural elements to ensure seamless functionality, comfort, and aesthetic coherence throughout the space.',
      'And lastly, a comprehensive integration of smart lighting and acoustic systems enables KLU Pizza Club to enhance the guest experience by adapting ambiance in real time, while a bespoke spatial layout ensures optimal flow and interaction within the space.',
    ],
    quoteExtra: 'As with any great space, KLU continues to evolve, and I\u2019m excited about the possibilities ahead. Seeing how guests engage with and appreciate the atmosphere confirms that the investment in thoughtful design was truly invaluable.',
  },
  modularspace: {
    intro: 'Imagine a space that\u2019s instantly ready for you \u2014 elegant, functional, and thoughtfully designed. The Signature Off-the-Shelf Modules redefine modular living, offering high-end, pre-designed spaces that blend luxury and efficiency without compromising on style.',
    work: [
      'To maintain design continuity, I embraced the core elements of the original concept \u2014 preserving its signature aesthetics, materials, and architectural language \u2014 while refining the space with a bolder, more immersive, and contemporary feel. The result is a seamless evolution that enhances both form and function, elevating the experience while staying true to the essence of the design.',
      'The new Modular House design showcases striking visual enhancements, delivering a more engaging user experience enhanced by smooth, well-balanced transitions.',
    ],
    features: ['Fast & Hassle-Free Installation', 'Customizable to Your Needs', 'Sustainable & High-Quality Design', 'Perfect for Residential & Commercial Spaces'],
  },
  zadfoodpark: {
    intro: 'Zad Food Truck Park is a thoughtfully designed outdoor dining destination, seamlessly blending nature with modern hospitality to create a vibrant culinary and social experience.',
    work: [
      'The newly designed Zad Food Truck Park offers a seamless and engaging dining experience, thoughtfully crafted with a functional layout, immersive spatial design, and a fluid customer journey. Every element from seating arrangements to ambient lighting enhances accessibility, comfort, and social interaction.',
      'Built on a foundation of adaptive reuse and modular design, shipping containers were transformed into vibrant, fully functional dining spaces. Each food truck and dining space was strategically positioned to optimize customer flow, accessibility, and ambiance.',
      'An additional design feature I implemented was the integration of adaptable lighting and spatial zoning, which enhances wayfinding, ambiance, and customer flow throughout the park \u2014 a dynamic layout that evolves with seasonal events, foot traffic patterns, and operational needs.',
    ],
  },
  aquafinaexpo: {
    intro: 'At Expo 2021 Dubai, the Acqua Fina Pavilion was designed to inspire, educate, and showcase innovative solutions for water conservation and sustainability. Pepsi&Co required a dynamic solution that could seamlessly transform exhibition spaces into immersive, interactive installations.',
    work: [
      'Collaborating closely with the creative team behind the Water Pavilion\u2019s vision, my solution featured a dynamic modular design system with a suite of immersive digital elements \u2014 multiple interactive experiences unified under a cohesive architectural and storytelling approach.',
      'Recycled Materials with Environmental Impact: a standout feature of the pavilion is its use of recycled materials \u2014 such as ropes crafted from reclaimed plastic \u2014 which not only set a new design standard but also convey a powerful environmental message.',
      'Technology and Interactivity at the Core: the pavilion leverages advanced digital technologies \u2014 real-time interactions, striking lighting effects, and dynamic movements weave a visual narrative that captivates and engages the audience.',
    ],
  },
  nomad: {
    intro: 'Nomad by Shurooq is redefining luxury travel in Sharjah, offering an exclusive, mobile resort experience immersed in nature. The Nomad concept delivers a seamless blend of mobility, comfort, and sustainability.',
    work: [
      'I tailored Nomad by Shurooq to seamlessly blend mobility, luxury, and sustainability. Through adaptive interiors, eco-conscious materials, and smart design, I created an immersive hospitality experience that harmonizes comfort with nature.',
      'At the core of Nomad is a meticulously designed, high-performance modular infrastructure that seamlessly adapts to diverse landscapes. Each Airstream trailer is crafted with sustainable materials, smart climate control and energy-efficient systems, ensuring an eco-conscious yet luxurious experience.',
      'Built on luxury hospitality and eco-tourism expertise, Nomad features a flexible framework that seamlessly adapts to changing landscapes while ensuring top-tier comfort and sustainability — thoughtfully crafted interiors and eco-conscious materials offer an immersive guest experience.',
          ],
        },
        thesis: {
          intro: 'Final thesis project at Istituto Europeo di Design: a museum interior conceived as a single coherent exhibition environment, developed from concept to specification.',
          work: [
            'Space planning came first — the full floor layout of the museum was drawn by hand, defining circulation, sightlines and the relationship between the exhibition halls and the visitor journey.',
            'From the plan, every space was resolved in 3D: photorealistic renders of the galleries, bespoke furniture and lighting, produced in 3ds Max with VRay/Corona to communicate the atmosphere and materiality of the project.',
            'Finally, the specification: furniture selection and a full documentation of finishes, paired with a materials board sourced across fabric, paint, finishes, flooring and lighting — grounding the design in products that actually exist and can be built.',
          ],
          features: ['Hand-drafted space planning', 'Photorealistic 3D rendering', 'Furniture & finishes specification', 'Sourced materials board'],
        },
      }

const HERO_BG = { klu: 'assets/Uploads/SunglassStyleHero.webp', modularspace: 'assets/Uploads/Cumulo9Hero.webp', zadfoodpark: 'assets/Uploads/FortisHero.webp', aquafinaexpo: 'assets/Uploads/KaingaOraHero.webp', nomad: 'assets/Uploads/NBRHero.webp', thesis: 'assets/img/video-thesis-poster.jpg' }

export default function ProjectPage({ slug }) {
  const idx = Math.max(0, ROMARTE_PROJECTS.findIndex((p) => p.slug === slug))
  const p = ROMARTE_PROJECTS[idx] || ROMARTE_PROJECTS[0]
  const prev = ROMARTE_PROJECTS[(idx - 1 + ROMARTE_PROJECTS.length) % ROMARTE_PROJECTS.length]
  const next = ROMARTE_PROJECTS[(idx + 1) % ROMARTE_PROJECTS.length]
  const W = ROMARTE_WORK[p.slug] || {}
  const root = useRef(null)
  const heroImg = useRef(null)
  const [lightbox, setLightbox] = useState(-1)
  const [lang] = useLang()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  const u = UI[lang]

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.from('.pp-back', { y: -14, opacity: 0, duration: 0.5, ease: 'power3.out' })
        .from('.pp-hero img', { scale: 1.12, duration: 1.4, ease: 'power3.out' }, 0)
        .from('.pp-title span', { yPercent: 110, duration: 1, stagger: 0.08, ease: 'power4.out' }, 0.15)
        .from('.pp-meta > *', { y: 20, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' }, 0.5)
        .from('.pp-detail', { y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'all' }, 0.55)
        .from('.pp-sec', { y: 44, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out', clearProps: 'all' }, 0.6)
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

  const gallery = p.images.filter((s) => !HERO_BG[p.slug] || s !== HERO_BG[p.slug])

  return (
    <div ref={root} className={`pp pp-${p.slug}`}>
      <a className="pp-back" href="#top">{u.back}</a>
      <nav className="pp-nav-top">
        <div className="nav-links">
          <a href="#top">{u.home}</a>
          <a href="#top">{u.about}</a>
          <a href="#top">{u.work}</a>
          <a href="#contact">{u.contact}</a>
        </div>
        <div className="nav-right">
          <div className="lang-switch" role="group" aria-label="Language">
            <span className={`lang-pill ${lang === 'it' ? 'it' : 'en'}`} aria-hidden="true" />
            <button className={lang === 'it' ? 'on' : ''} onClick={() => setLang('it')}>IT</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
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
            <a href="#top" onClick={() => setOpen(false)}>{u.home}</a>
            <a href="#top" onClick={() => setOpen(false)}>{u.about}</a>
            <a href="#top" onClick={() => setOpen(false)}>{u.work}</a>
            <a href="#contact" onClick={() => setOpen(false)}>{u.contact}</a>
          </div>
        )}
      </nav>

      {/* Hero — full-bleed immagine + titolo, come RomArte */}
      <header className="pp-hero">
        <div className="pp-hero-media"><img ref={heroImg} src={HERO_BG[p.slug] || p.images[0]} alt={p.title} /></div>
        <div className="pp-hero-shade" />
        <div className="pp-hero-inner">
          <span className="pp-num">0{idx + 1} / 0{ROMARTE_PROJECTS.length}</span>
          <h1 className="pp-title"><span className="hero-line"><span>{p.title.toUpperCase()}</span></span></h1>
          <div className="pp-meta">
            <p className="pp-sub">{p.subtitle}</p>
            <p className="pp-year">{p.year}</p>
          </div>
        </div>
      </header>

      {/* Details — Client / Services / Year + CTA, griglia 4/6/2 come RomArte */}
      <section className="pp-details">
        <div className="pp-detail pp-d-client"><span>{u.client}</span><strong>{p.client}</strong></div>
        <div className="pp-detail pp-d-services"><span>{u.services}</span><strong>{pickP(p, 'services', lang).join(' · ')}</strong></div>
        <div className="pp-detail pp-d-year"><span>{u.year}</span><strong>{p.year}</strong></div>
      </section>

      {/* Overview */}
      <section className="pp-sec pp-desc">
        <div className="section-head"><span>{u.overview}</span><h2>{u.theConcept}</h2></div>
        <p>{W.intro || pickP(p, 'description', lang)}</p>
      </section>

      {/* Video — walkthrough del progetto */}
      {p.video && (
        <section className="pp-sec pp-video">
          <div className="section-head"><span>{u.video}</span><h2>{u.walkthrough}</h2></div>
          <figure className="video-card">
            <video controls preload="metadata" poster={pickP(p, 'video', lang).poster} src={pickP(p, 'video', lang).src} />
            <figcaption><strong>{pickP(p, 'video', lang).title}</strong><span>{pickP(p, 'video', lang).subtitle}</span></figcaption>
          </figure>
        </section>
      )}

      {/* The work — paragrafi reali RomArte */}
      <section className="pp-sec pp-work">
        <div className="section-head"><span>{u.theWork}</span><h2>{u.whatWeDid}</h2></div>
        {(W.work || []).map((t, i) => <p key={i}>{t}</p>)}
        {W.features && (
          <ul className="pp-features">
            {W.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        )}
      </section>

      {/* Testimonial — citazione reale del cliente */}
      {p.quote && (
        <section className="pp-sec pp-testimonial">
          <div className="section-head"><span>{u.testimonial}</span><h2>{u.whatTheySaid}</h2></div>
          <blockquote>{p.quote.text}</blockquote>
          {W.quoteExtra && <p className="pp-quote-extra">{W.quoteExtra}</p>}
          <figcaption>{p.quote.author} — {p.quote.role}</figcaption>
        </section>
      )}

      {/* Gallery — full-bleed come RomArte, lightbox */}
      <section className="pp-sec pp-gallery">
        <div className="section-head"><span>{u.gallery}</span><h2>{gallery.length} {u.renders}</h2></div>
        <div className="pp-grid">
          {gallery.map((src, i) => (
            <figure key={src} className={`pp-cell ${i % 5 === 0 ? 'pp-wide' : ''}`} onClick={() => setLightbox(i)}>
              <img src={src} alt={`${p.title} render ${i + 1}`} loading={i < 3 ? 'eager' : 'lazy'} />
              <figcaption>{String(i + 1).padStart(2, '0')}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Next project */}
      <nav className="pp-nav">
        <a href={`#/project/${prev.slug}`} className="pp-nav-item">
          <span>{u.prev}</span><strong>{prev.title}</strong>
        </a>
        <a href="#top" className="pp-nav-item pp-nav-all"><span>{u.allWork}</span></a>
        <a href={`#/project/${next.slug}`} className="pp-nav-item pp-nav-right">
          <span>{u.next}</span><strong>{next.title}</strong>
        </a>
      </nav>

      <footer className="footer pp-footer">
        <span>© {new Date().getFullYear()} Adam Azzam</span>
        {p.slug === 'klu' && (
          <a href="https://drive.google.com/file/d/1_GVayjeRgyuxNQLIyt2g_1S8419QhKge/view?usp=drivesdk" target="_blank" rel="noreferrer">
            {tr(lang, 'Approfondisci il progetto (PDF) ↗', 'Read the full case study (PDF) ↗')}
          </a>
        )}
        {p.slug === 'thesis' && (
          <a href="https://drive.google.com/file/d/1j5OXc9UJBTb7aySL-kfszLQYb3-y-B4C/view?usp=drivesdk" target="_blank" rel="noreferrer">
            {tr(lang, 'Leggi la tesi completa (PDF) ↗', 'Read the full thesis (PDF) ↗')}
          </a>
        )}
        <a href="#top">{u.backToTop}</a>
      </footer>

      {lightbox >= 0 && (
        <div className="lightbox" onClick={() => setLightbox(-1)}>
          <img src={gallery[lightbox]} alt="" />
          <button className="lb-close" aria-label="Close">×</button>
          <div className="lb-count">{lightbox + 1} / {gallery.length}</div>
        </div>
      )}
    </div>
  )
}
