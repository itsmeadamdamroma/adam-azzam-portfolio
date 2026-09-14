// Pagina dettaglio progetto stile RomArte (full-bleed hero, layout pulito, animazioni GSAP)
// Mobile-ready: nav bar flessibile integrata (back a sinistra, lang-switch + hamburger a destra)
import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ROMARTE_PROJECTS, pickP } from './data'
import { UI, useLang, tr } from './i18n'
import { LangSwitch, MobileMenu } from './App'

gsap.registerPlugin(ScrollTrigger)

const ROMARTE_WORK = {
  klu: {
    intro:
      'Taking the experience of eating pizza to the next level. Gone are the days when this space was merely a disused, overlooked venue: I recognised its untapped potential and completely reimagined the interior with a unique brand identity, bespoke furniture and a vibrant color palette.',
    intro_it:
      "Portare l'esperienza della pizza a un livello superiore. Sono finiti i tempi in cui questo spazio era solo un locale dismesso e trascurato: ho riconosciuto il suo potenziale e ho completamente reimmaginato gli interni con un'identità distintiva, arredi su misura e una palette cromatica vibrante.",
    work: [
      'I completely refreshed the look and feel of the space with a sleek, modern style: tailored lighting systems, acoustic solutions and modular architectural elements ensure seamless functionality, comfort and aesthetic coherence. A comprehensive integration of smart lighting and acoustic systems adapts the ambiance in real time, while a bespoke spatial layout ensures optimal flow and interaction.',
      'To build a distinctive atmosphere, I used contrasting textures and materials: dark metals, warm wood accents and custom-designed banquette seating, paired with bold graphics and focused lighting to create intimate dining zones within an open floor plan.',
      'Every touchpoint was crafted to merge Italian culinary heritage with contemporary urban dining — from the custom bar counter to the acoustic wall panels that balance energy and conversation.',
    ],
    work_it: [
      "Ho rinnovato completamente l'aspetto dello spazio con uno stile moderno e ricercato: impianti di illuminazione su misura, soluzioni acustiche ed elementi architettonici modulari garantiscono funzionalità, comfort e coerenza estetica. L'integrazione di illuminazione smart e sistemi fonoassorbenti adatta l'atmosfera in tempo reale, mentre un layout personalizzato assicura fluidità e fruibilità ottimali.",
      "Per costruire un'atmosfera distintiva, ho combinato texture e finiture a contrasto: metalli bruniti, essenze lignee calde e sedute su misura, affiancati da dettagli grafici e illuminazione d'accento per creare aree conviviali intime all'interno di uno spazio aperto.",
      "Ogni dettaglio è stato progettato per unire l'eccellenza della tradizione gastronomica italiana a un'estetica metropolitana contemporanea — dal bancone bar su disegno ai pannelli acustici a parete che valorizzano l'esperienza dei clienti.",
    ],
  },
  modularspace: {
    intro:
      'A high-end architectural concept reimagined. The project represents a complete creative evolution of modular living, blending sleek architectural geometry with tailored interior functionality.',
    intro_it:
      "Un concept architettonico di alto livello reinterpretato: il progetto rappresenta l'evoluzione completa dell'abitare modulare, fondendo geometrie architettoniche lineari e massima funzionalità degli interni su misura.",
    work: [
      'To maintain design continuity, I embraced the core elements of the original concept — preserving its signature aesthetics, materials, and architectural language — while refining the space with a bolder, more immersive, and contemporary feel. The result is a seamless evolution that enhances both form and function, elevating the experience while staying true to the essence of the design.',
      'The new Modular House design showcases striking visual enhancements, delivering a more engaging user experience enhanced by smooth, well-balanced transitions.',
    ],
    work_it: [
      "Per garantire continuità al progetto, ho sviluppato il concept originale preservandone il linguaggio architettonico e la matericità, ridefinendo al contempo gli spazi con un approccio contemporaneo e immersivo. Il risultato è un'evoluzione armoniosa che valorizza forma e funzione, elevando l'esperienza abitativa.",
      "Il nuovo design della Casa Modulare unisce soluzioni visive d'impatto a una distribuzione fluida e bilanciata degli ambienti interni ed esterni.",
    ],
    features: ['Fast & Hassle-Free Installation', 'Customizable to Your Needs', 'Sustainable & High-Quality Design', 'Perfect for Residential & Commercial Spaces'],
    features_it: ['Installazione rapida ed efficiente', 'Personalizzabile su misura', 'Design sostenibile e materiali di pregio', 'Ideale per spazi residenziali e commerciali'],
  },
  zadfoodpark: {
    intro:
      'Zad Food Truck Park is a thoughtfully designed outdoor dining destination, seamlessly blending nature with modern hospitality to create a vibrant culinary and social experience.',
    intro_it:
      "Zad Food Truck Park è una destinazione gastronomica all'aperto progettata con cura, che fonde natura e ospitalità contemporanea per creare un'esperienza sociale e culinaria vivace.",
    work: [
      'The newly designed Zad Food Truck Park offers a seamless and engaging dining experience, thoughtfully crafted with a functional layout, immersive spatial design, and a fluid customer journey. Every element from seating arrangements to ambient lighting enhances accessibility, comfort, and social interaction.',
      'Built on a foundation of adaptive reuse and modular design, shipping containers were transformed into vibrant, fully functional dining spaces. Each food truck and dining space was strategically positioned to optimize customer flow, accessibility, and ambiance.',
      'An additional design feature I implemented was the integration of adaptable lighting and spatial zoning, which enhances wayfinding, ambiance, and customer flow throughout the park — a dynamic layout that evolves with seasonal events, foot traffic patterns, and operational needs.',
    ],
    work_it: [
      "Il progetto di Zad Food Truck Park offre un'esperienza gastronomica coinvolgente, articolata attraverso un layout funzionale, design spaziale immersivo e percorsi fluidi. Dalla disposizione delle sedute all'illuminazione d'atmosfera, ogni elemento valorizza accessibilità, comfort e convivialità.",
      "Partendo dai principi del riuso adattivo e del design modulare, ho trasformato container navali in moduli di ristorazione dinamici e completi. Ciascuna postazione e area ristoro è stata posizionata strategicamente per ottimizzare i flussi dei visitatori, la fruibilità e il panorama circostante.",
      "Ho curato inoltre l'integrazione di un'illuminazione scenografica adattiva e la zonizzazione dello spazio, migliorando l'orientamento e l'atmosfera del parco: un layout dinamico capace di evolversi con eventi stagionali e variazioni di affluenza.",
    ],
  },
  aquafinaexpo: {
    intro:
      'At Expo 2021 Dubai, the Acqua Fina Pavilion was designed to inspire, educate, and showcase innovative solutions for water conservation and sustainability. PepsiCo required a dynamic solution that could seamlessly transform exhibition spaces into immersive, interactive installations.',
    intro_it:
      "All'Expo 2021 Dubai, il Padiglione Acqua Fina è stato ideato per ispirare e mostrare soluzioni innovative per la sostenibilità e la conservazione dell'acqua. PepsiCo richiedeva una soluzione dinamica capace di trasformare gli spazi espositivi in installazioni immersive e interattive.",
    work: [
      'Collaborating on the Water Pavilion’s vision, my solution featured a dynamic modular design system with a suite of immersive digital elements — multiple interactive experiences unified under a cohesive architectural and storytelling approach.',
      'Recycled Materials with Environmental Impact: a standout feature of the pavilion is its use of recycled materials — such as ropes crafted from reclaimed plastic — which not only set a new design standard but also convey a powerful environmental message.',
      'Technology and Interactivity at the Core: the pavilion leverages advanced digital technologies — real-time interactions, striking lighting effects, and dynamic movements weave a visual narrative that captivates and engages the audience.',
    ],
    work_it: [
      "Contribuendo alla visione del Padiglione dell'Acqua, ho sviluppato un sistema progettuale modulare e dinamico integrato con elementi digitali immersivi — molteplici esperienze interattive unite da un approccio architettonico e narrativo coerente.",
      "Materiali riciclati e impatto ambientale: elemento distintivo del padiglione è l'utilizzo di materiali riciclati — come cordami prodotti da plastica recuperata — che coniugano un'estetica ricercata a un forte messaggio ecologico.",
      "Tecnologia e interattività: il padiglione integra tecnologie digitali avanzate con interazioni in tempo reale, giochi di luce e movimenti cinetici, dando vita a una narrazione visiva che cattura il visitatore.",
    ],
  },
  nomad: {
    intro:
      'Nomad by Shurooq is redefining luxury travel in Sharjah, offering an exclusive, mobile resort experience immersed in nature. The Nomad concept delivers a seamless blend of mobility, comfort, and sustainability.',
    intro_it:
      "Nomad by Shurooq ridefinisce il viaggio di lusso a Sharjah, offrendo un'esperienza resort esclusiva e mobile a contatto con la natura, coniugando mobilità, massimo comfort e sostenibilità.",
    work: [
      'I tailored Nomad by Shurooq to seamlessly blend mobility, luxury, and sustainability. Through adaptive interiors, eco-conscious materials, and smart design, I created an immersive hospitality experience that harmonizes comfort with nature.',
      'At the core of Nomad is a meticulously designed, high-performance modular infrastructure that seamlessly adapts to diverse landscapes. Each Airstream trailer is crafted with sustainable materials, smart climate control and energy-efficient systems, ensuring an eco-conscious yet luxurious experience.',
      'Built on luxury hospitality and eco-tourism expertise, Nomad features a flexible framework that seamlessly adapts to changing landscapes while ensuring top-tier comfort and sustainability — thoughtfully crafted interiors and eco-conscious materials offer an immersive guest experience.',
    ],
    work_it: [
      "Ho sviluppato gli interni di Nomad per coniugare mobilità, lusso e sostenibilità. Attraverso spazi adattivi, materiali eco-compatibili e soluzioni su misura, ho dato forma a un'esperienza di accoglienza che armonizza comfort di alto livello e natura.",
      "Al centro del progetto vi è un'infrastruttura modulare ad alte prestazioni capace di adattarsi a diversi contesti paesaggistici. Ciascun trailer Airstream è concepito con materiali sostenibili, climatizzazione smart e impianti a basso consumo.",
      "Unendo ospitalità di lusso ed eco-turismo, ho definito un layout flessibile che risponde all'ambiente circostante offrendo un soggiorno esclusivo e immersivo.",
    ],
  },
  thesis: {
    intro:
      'Final thesis project at Istituto Europeo di Design: a museum interior conceived as a single coherent exhibition environment, developed from concept to specification.',
    intro_it:
      "Progetto di tesi finale presso l'Istituto Europeo di Design: un percorso museale concepito come ambiente espositivo coerente, sviluppato dal concept alla specifica tecnica esecutiva.",
    work: [
      'Space planning came first — I drew the full floor layout of the museum by hand, defining circulation, sightlines and the relationship between the exhibition halls and the visitor journey.',
      'From the plan, I resolved every space in 3D: photorealistic renders of the galleries, bespoke display pedestals and lighting, produced in 3ds Max with VRay/Corona to communicate the authentic atmosphere and materiality of the project.',
      'Finally, the specification: I curated the furniture selection and full documentation of finishes, paired with a materials board sourced across fabric, paint, finishes, flooring and lighting — grounding the design in buildable, real-world solutions.',
    ],
    work_it: [
      "La pianificazione degli spazi è stata la prima fase: ho disegnato a mano l'intero layout del museo, definendo circolazione, assi visivi e la sequenza delle sale lungo l'itinerario del visitatore.",
      "Dalla planimetria ho sviluppato ogni ambiente in 3D: render fotorealistici delle gallerie, basamenti su misura e studio illuminotecnico, modellati e renderizzati con 3ds Max e motori VRay/Corona per restituire l'atmosfera e la resa materica esatta del progetto.",
      "Infine, la specifica tecnica: ho curato la selezione arredi e il capitolato delle finiture, corredati da un abaco materiali (tessuti, pitture, finiture, pavimentazioni e corpi illuminanti) per ancorare il progetto a soluzioni costruttive reali.",
    ],
    features: ['Hand-drafted space planning', 'Photorealistic 3D rendering', 'Furniture & finishes specification', 'Sourced materials board'],
    features_it: ['Pianificazione spazi con disegno a mano', 'Rendering 3D fotorealistico', 'Specifica arredi e finiture', 'Tavola campionatura materiali'],
  },
}

const HERO_BG = {
  klu: 'assets/Uploads/SunglassStyleHero.webp',
  modularspace: 'assets/Uploads/Cumulo9Hero.webp',
  zadfoodpark: 'assets/Uploads/FortisHero.webp',
  aquafinaexpo: 'assets/Uploads/KaingaOraHero.webp',
  nomad: 'assets/Uploads/NBRHero.webp',
  thesis: 'assets/img/video-thesis-poster.jpg',
}

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

  const introText = (lang === 'it' && W.intro_it) ? W.intro_it : (W.intro || pickP(p, 'description', lang))
  const workParagraphs = (lang === 'it' && W.work_it) ? W.work_it : (W.work || [pickP(p, 'overview', lang)])
  const featuresList = (lang === 'it' && W.features_it) ? W.features_it : (W.features || null)

  return (
    <div ref={root} className={`pp pp-${p.slug}`}>
      {/* Header bar integrata: back a sinistra, nav al centro (desktop), lang-switch + hamburger a destra */}
      <header className="pp-nav-top">
        <a className="pp-back" href="#work">
          {u.back}
        </a>
        <div className="nav-links">
          <a href="#/">{u.home}</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); window.location.hash = "#/"; setTimeout(() => { const el = document.getElementById("about"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 120); }}>{u.about}</a>
          <a href="#work" onClick={(e) => { e.preventDefault(); window.location.hash = "#/"; setTimeout(() => { const el = document.getElementById("work"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 120); }}>{u.work}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); window.location.hash = "#/"; setTimeout(() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 120); }}>{u.contact}</a>
        </div>
        <div className="nav-right">
          <LangSwitch />
          <button
            className={`hamburger ${open ? "open" : ""}`}
            aria-label="Menu" aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />

      {/* Hero — full-bleed immagine + titolo */}
      <header className="pp-hero">
        <div className="pp-hero-media"><img ref={heroImg} src={HERO_BG[p.slug] || p.images[0]} alt={p.title} /></div>
        <div className="pp-hero-shade" />
        <div className="pp-hero-inner">
          <span className="pp-num">0{idx + 1} / 0{ROMARTE_PROJECTS.length}</span>
          <h1 className="pp-title"><span className="hero-line"><span>{p.title.toUpperCase()}</span></span></h1>
          <div className="pp-meta">
            <p className="pp-sub">{pickP(p, 'subtitle', lang)}</p>
            <p className="pp-year">{p.year}</p>
          </div>
        </div>
      </header>

      {/* Details — Client / Services / Year */}
      <section className="pp-details">
        <div className="pp-detail pp-d-client"><span>{u.client}</span><strong>{p.client}</strong></div>
        <div className="pp-detail pp-d-services"><span>{u.services}</span><strong>{pickP(p, 'services', lang).join(' · ')}</strong></div>
        <div className="pp-detail pp-d-year"><span>{u.year}</span><strong>{p.year}</strong></div>
      </section>

      {/* Overview */}
      <section className="pp-sec pp-desc">
        <div className="section-head"><span>{u.overview}</span><h2>{u.theConcept}</h2></div>
        <p>{introText}</p>
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

      {/* The work — contenuti bilingui in prima persona */}
      <section className="pp-sec pp-work">
        <div className="section-head"><span>{u.theWork}</span><h2>{u.whatWeDid}</h2></div>
        {workParagraphs.map((t, i) => <p key={i}>{t}</p>)}
        {featuresList && (
          <ul className="pp-features">
            {featuresList.map((f) => <li key={f}>{f}</li>)}
          </ul>
        )}
      </section>

      {/* Testimonial — citazione */}
      {p.quote && (
        <section className="pp-sec pp-testimonial">
          <div className="section-head"><span>{u.testimonial}</span><h2>{u.whatTheySaid}</h2></div>
          <blockquote>{p.quote.text}</blockquote>
          {W.quoteExtra && <p className="pp-quote-extra">{W.quoteExtra}</p>}
          <figcaption>{p.quote.author} — {p.quote.role}</figcaption>
        </section>
      )}

      {/* Gallery — full-bleed, lightbox */}
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

      {/* Deep-dive PDF Document for Klu and Thesis */}
      {(p.slug === 'klu' || p.slug === 'thesis') && (
        <section className="pp-sec pp-deepdive">
          <div className="pp-deepdive-card">
            <div className="pp-deepdive-info">
              <span className="pp-deepdive-tag">{tr(lang, 'DOCUMENTAZIONE COMPLETA', 'FULL DOCUMENTATION')}</span>
              <h3>
                {p.slug === 'klu'
                  ? tr(lang, 'Vuoi approfondire il progetto Klu Pizza Club?', 'Want to explore the full Klu Pizza Club project?')
                  : tr(lang, 'Vuoi leggere la tesi completa sui Musei Capitolini?', 'Want to read the complete Capitoline Museums thesis?')}
              </h3>
              <p>
                {p.slug === 'klu'
                  ? tr(lang, "Scarica o consulta il documento PDF con l'analisi dettagliata, layout, concept e specifiche.", 'Download or view the complete PDF presentation with detailed analysis, layouts, concept, and specifications.')
                  : tr(lang, 'Consulta la pubblicazione accademica completa (PDF) con tavole tecniche, planimetrie e tavole materiche.', 'Explore the full academic publication (PDF) including technical drawings, floor plans, and material specifications.')}
              </p>
            </div>
            <a
              href={
                p.slug === 'klu'
                  ? 'https://drive.google.com/file/d/1_GVayjeRgyuxNQLIyt2g_1S8419QhKge/view?usp=drive_link'
                  : 'https://drive.google.com/file/d/1j5OXc9UJBTb7aySL-kfszLQYb3-y-B4C/view?usp=drive_link'
              }
              target="_blank"
              rel="noreferrer"
              className="pp-deepdive-btn"
            >
              <span>
                {p.slug === 'klu'
                  ? tr(lang, 'Approfondisci il progetto (PDF) ↗', 'Read the full case study (PDF) ↗')
                  : tr(lang, 'Leggi la tesi completa (PDF) ↗', 'Read the full thesis (PDF) ↗')}
              </span>
            </a>
          </div>
        </section>
      )}

      {/* Next project */}
      <nav className="pp-nav">
        <a href={`#/project/${prev.slug}`} className="pp-nav-item">
          <span>{u.prev}</span><strong>{prev.title}</strong>
        </a>
        <a href="#work" className="pp-nav-item pp-nav-all"><span>{u.allWork}</span></a>
        <a href={`#/project/${next.slug}`} className="pp-nav-item pp-nav-right">
          <span>{u.next}</span><strong>{next.title}</strong>
        </a>
      </nav>

      <footer className="footer pp-footer">
        <span>© {new Date().getFullYear()} Adam Azzam</span>
        {p.slug === 'klu' && (
          <a href="https://drive.google.com/file/d/1_GVayjeRgyuxNQLIyt2g_1S8419QhKge/view?usp=drive_link" target="_blank" rel="noreferrer">
            {tr(lang, 'Approfondisci il progetto (PDF) ↗', 'Read the full case study (PDF) ↗')}
          </a>
        )}
        {p.slug === 'thesis' && (
          <a href="https://drive.google.com/file/d/1j5OXc9UJBTb7aySL-kfszLQYb3-y-B4C/view?usp=drive_link" target="_blank" rel="noreferrer">
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
