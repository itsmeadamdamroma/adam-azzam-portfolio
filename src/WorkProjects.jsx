import { useEffect, useRef, useState, useCallback } from 'react'
import { WORK_PROJECTS } from './workProjects.js'

/*
 Pagine work RomArte: stessa struttura/ordine/testi delle pagine originali
 (hero, dettagli client/services/year, sequenza immagini+copie, next work).
 Stile: usa le variabili esistenti del sito (dark + gold). Nessuna dipendenza nuova.
*/
function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.wr-reveal:not(.in)')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

/* Immagine cliccabile con lightbox condiviso */
function LbImg({ src, alt, eager, onOpen }) {
  return (
    <figure className={`wr-img ${eager ? '' : 'wr-reveal'}`}>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onClick={() => onOpen(src)} />
    </figure>
  )
}

export function WorkProjectPage({ slug }) {
  const idx = Math.max(0, WORK_PROJECTS.findIndex((p) => p.slug === slug))
  const p = WORK_PROJECTS[idx]
  const next = WORK_PROJECTS[(idx + 1) % WORK_PROJECTS.length]
  const [lightbox, setLightbox] = useState(-1)
  const heroRef = useRef(null)

  useEffect(() => { window.scrollTo(0, 0); document.title = `RomArte | ${p.title || slug}` }, [slug])

  useReveal(slug)

  const onKey = useCallback((e) => {
    if (lightbox < 0) return
    if (e.key === 'Escape') setLightbox(-1)
    if (e.key === 'ArrowRight') setLightbox((i) => i + 1)
    if (e.key === 'ArrowLeft') setLightbox((i) => Math.max(0, i - 1))
  }, [lightbox])
  useEffect(() => {
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onKey])

  const srcOf = (f) => `assets/work/${p.slug}/${f}`
  const imgs = p.seq.filter((it) => it.img || it.video).map((it) => ({ kind: it.img ? 'img' : 'video', src: srcOf(it.img || it.video) }))

  return (
    <div className={`wr wr-${p.slug}`}>
      <a className="wr-back" href="#/work">← Back to Work</a>

      {/* Hero come originale: immagine full + titolo grande */}
      <header className="wr-hero" ref={heroRef}>
        <div className="wr-hero-media"><img src={p.hero} alt={p.title} /></div>
        <div className="wr-hero-shade" />
        <div className="wr-hero-inner">
          <span className="wr-kicker">RomArte</span>
          <h1 className="wr-title"><span className="hero-line"><span>{(p.title || slug).toUpperCase()}</span></span></h1>
        </div>
      </header>

      {/* Dettagli Client/Services/Year come originale */}
      <section className="wr-details wr-reveal">
        {p.details.map((d) => (
          <div key={d.label} className="wr-detail">
            <span className="wr-label">{d.label}</span>
            {d.items.map((it, i) => <p key={i}>{it}</p>)}
          </div>
        ))}
        {p.link && <a className="wr-link" href="#/work">{p.link} ↗</a>}
      </section>

      {/* Sequenza originale: testi e immagini nell'ordine del file romarte */}
      <section className="wr-seq">
        {p.seq.map((it, i) => {
          if (it.img) {
            const wide = it.sec === 'website-images-twelve-column' || it.sec === 'full-image-width'
            const trio = it.sec === 'website-mobile-images'
            return (
              <div key={i} className={`${trio ? 'wr-trio' : 'wr-imgrow'} ${wide ? 'wr-wide' : 'wr-narrow'} ${i < 2 ? '' : 'wr-reveal'}`}>
                <LbImg src={srcOf(it.img)} alt={`${p.title} ${it.img}`} eager={i < 2} onOpen={() => setLightbox(imgs.findIndex((x) => x.kind === 'img' && x.src === srcOf(it.img)))} />
              </div>
            )
          }
          if (it.video) {
            return (
              <div key={i} className="wr-imgrow wr-wide wr-reveal">
                <figure className="wr-img">
                  <video src={srcOf(it.video)} controls playsInline preload="metadata" />
                </figure>
              </div>
            )
          }
          const size = it.size
          if (size === 5 && it.sec === 'leftH5rightCopy') return <h3 key={i} className="wr-h5 wr-reveal">{it.txt}</h3>
          if (size === 5) return <h3 key={i} className="wr-h5 wr-reveal">{it.txt}</h3>
          if (size === 4) return <h4 key={i} className="wr-h4 wr-reveal">{it.txt}</h4>
          if (size === 2) return <h2 key={i} className="wr-h2 wr-reveal">{it.txt}</h2>
          if (size === 7) return <p key={i} className="wr-person wr-reveal">{it.txt}</p>
          return <p key={i} className={`wr-copy ${it.sec === 'leftH5rightCopy' ? 'wr-copy-aside' : ''} wr-reveal`}>{it.txt}</p>
        })}
      </section>

      {/* testimonial: immagine persona + nome già in seq (sven/andy/debbie/scott) */}

      <nav className="wr-next">
        <a href={`#/work/${next.slug}`}><span>Next Work</span><strong>{(next.title || next.slug).toUpperCase()} →</strong></a>
      </nav>

      {lightbox >= 0 && imgs[lightbox] && imgs[lightbox].kind === 'img' && (
        <div className="lightbox" onClick={() => setLightbox(-1)}>
          <img src={imgs[lightbox].src} alt="" />
          <button className="lb-close" aria-label="Close">×</button>
          <div className="lb-count">{lightbox + 1} / {imgs.filter((x) => x.kind === 'img').length}</div>
        </div>
      )}
    </div>
  )
}

/* Griglia WORK (come romarte work/index.html: 2 colonne sfalsate, immagine quadrata, titolo + caption) */
export function WorkIndex() {
  const meta = {
    'klu': ['KLU Pizza Club', 'Restaurant'],
    'modularspace': ['Modular House', 'Architectural space'],
    'zadfoodpark': ['Zad food truck park', 'Commercial'],
    'aquafinaexpo': ['The Drop pavilion EXPO \'21', 'Exterior Design'],
    'nomad': ['Nomad', 'Outdoor Hotel'],
    'cruz-jimenez': ['Cruz Jimenez', 'Artist website'],
  }
  const items = WORK_PROJECTS.map((p) => ({
    slug: p.slug, hero: p.hero,
    title: (meta[p.slug] && meta[p.slug][0]) || p.title || p.slug,
    caption: (meta[p.slug] && meta[p.slug][1]) || '',
  }))
  const left = items.filter((_, i) => i % 2 === 0)
  const right = items.filter((_, i) => i % 2 === 1)

  useEffect(() => { document.title = 'RomArte | Work' }, [])
  useReveal('work')

  const Card = ({ it }) => (
    <a className="wr-card wr-reveal" href={`#/work/${it.slug}`}>
      <div className="wr-card-img"><span style={{ backgroundImage: `url(${it.hero})` }} /></div>
      <div className="wr-card-cap">
        <span className="wr-card-title">{it.title}</span>
        <span className="wr-card-sub">{it.caption}</span>
      </div>
    </a>
  )

  return (
    <section className="wr-index" id="work">
      <div className="wr-index-head"><span className="wr-index-title">work</span></div>
      <div className="wr-grid">
        <div className="wr-col">{left.map((it) => <Card key={it.slug} it={it} />)}</div>
        <div className="wr-col wr-col-offset">{right.map((it) => <Card key={it.slug} it={it} />)}</div>
      </div>
    </section>
  )
}
