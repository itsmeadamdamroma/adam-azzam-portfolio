import { useEffect, useRef, useState, useCallback } from 'react'
import { WORK_PROJECTS } from './workProjects.js'

/*
 Pagine work RomArte — layout IDENTICO al sito originale (Netlify RomArte).
 Blocchi tipizzati in src/workProjects.js:
  center    → colonna 8 centrata (kicker size-7 + testo size-5/6)
  banner    → immagine col-10 aspect-ratio originale (padding-top %)
  stack     → col-10 immagini impilate (padding-top % ciascuna)
  overlays  → imageBorder + secondImage sovrapposti (position absolute right)
  twelve    → full width (col-12)
  full      → full-image-width 100vh parallax
  twocols   → 2 colonne 50/50, seconda con marginTop200
  l5r6/h4p  → split testo col-5 + col-6 offset
  h2p       → titolo size-2 multiline (|) + copy col-8
  mobiles   → 3 telefoni con doubleBorder (col-10)
  video     → video full
  testimonial → logo + linea + quote + persona
 Stile: variabili esistenti dark/gold. Nessuna dipendenza nuova.
*/

function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.wr-reveal:not(.in)')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

/* Immagine background con aspect-ratio originale (padding-top %) + lightbox */
function BgImg({ slug, file, pt, onOpen, eager }) {
  const src = `assets/work/${slug}/${file}`
  return (
    <div
      className={`wr-img ${eager ? '' : 'wr-reveal'}`}
      style={{ paddingTop: `${pt}%`, backgroundImage: `url(${src})` }}
      onClick={onOpen}
      role="img"
      aria-label={`${slug} ${file}`}
    />
  )
}

export function WorkProjectPage({ slug }) {
  const idx = Math.max(0, WORK_PROJECTS.findIndex((p) => p.slug === slug))
  const p = WORK_PROJECTS[idx]
  const next = WORK_PROJECTS[(idx + 1) % WORK_PROJECTS.length]
  const [lightbox, setLightbox] = useState(-1)
  const heroRef = useRef(null)
  const heroImg = useRef(null)

  useEffect(() => { window.scrollTo(0, 0); document.title = `RomArte | ${p.title || slug}` }, [slug])
  useReveal(slug)

  const onKey = useCallback((e) => {
    if (lightbox < 0) return
    if (e.key === 'Escape') setLightbox(-1)
    if (e.key === 'ArrowRight') setLightbox((i) => Math.min(imgsCount - 1, i + 1))
    if (e.key === 'ArrowLeft') setLightbox((i) => Math.max(0, i - 1))
  }, [lightbox])
  useEffect(() => {
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onKey])

  const srcOf = (f) => `assets/work/${p.slug}/${f}`
  const imgFiles = []
  for (const b of p.blocks) {
    if (b.t === 'banner' || b.t === 'twelve' || b.t === 'full') imgFiles.push(b.img)
    if (b.t === 'stack') b.imgs.forEach(([f]) => imgFiles.push(f))
    if (b.t === 'overlays') b.imgs.forEach(([f]) => imgFiles.push(f))
    if (b.t === 'twocols') b.imgs.forEach(([f]) => imgFiles.push(f))
    if (b.t === 'mobiles') b.imgs.forEach((f) => imgFiles.push(f))
    if (b.t === 'testimonial' && b.img) imgFiles.push(b.img)
  }
  const imgsCount = imgFiles.length
  const openLb = (file) => setLightbox(imgFiles.indexOf(file))

  const renderBlock = (b, i) => {
    switch (b.t) {
      case 'center':
        return (
          <div key={i} className="wr-center wr-reveal">
            <div className="wr-center-in">
              {b.kicker && <span className="wr-kicker2">{b.kicker}</span>}
              {b.size === 5 ? <h3 className="wr-t5">{b.txt}</h3> : <p className="wr-t6">{b.txt}</p>}
            </div>
          </div>
        )
      case 'banner':
        return <div key={i} className="wr-banner"><BgImg slug={slug} file={b.img} pt={b.pt} onOpen={() => openLb(b.img)} eager={i < 2} /></div>
      case 'stack':
        return (
          <div key={i} className="wr-stack">
            {b.imgs.map(([f, pt], j) => <BgImg key={j} slug={slug} file={f} pt={pt} onOpen={() => openLb(f)} eager={i < 2 && j === 0} />)}
          </div>
        )
      case 'overlays':
        return (
          <div key={i} className="wr-overlays wr-reveal">
            <div className="wr-overlays-border">
              <BgImg slug={slug} file={b.imgs[0][0]} pt={b.imgs[0][1]} onOpen={() => openLb(b.imgs[0][0])} />
            </div>
            <div className="wr-overlays-second">
              <BgImg slug={slug} file={b.imgs[1][0]} pt={b.imgs[1][1]} onOpen={() => openLb(b.imgs[1][0])} />
            </div>
          </div>
        )
      case 'twelve':
        return (
          <div key={i} className="wr-twelve wr-reveal">
            <BgImg slug={slug} file={b.img} pt={100} onOpen={() => openLb(b.img)} />
          </div>
        )
      case 'full':
        return (
          <div key={i} className="wr-full">
            <div className="wr-full-img" style={{ backgroundImage: `url(${srcOf(b.img)})` }} onClick={() => openLb(b.img)} />
          </div>
        )
      case 'twocols':
        return (
          <div key={i} className="wr-twocols">
            {b.imgs.map(([f, pt], j) => (
              <div key={j} className={`wr-twocols-col ${j === 1 ? 'wr-mt200' : ''}`}>
                <BgImg slug={slug} file={f} pt={pt} onOpen={() => openLb(f)} />
              </div>
            ))}
          </div>
        )
      case 'l5r6':
        return (
          <div key={i} className="wr-split wr-reveal">
            <div className="wr-split-h"><h3 className="wr-t5">{b.h5}</h3></div>
            <div className="wr-split-p">
              {b.p.split('|').map((t, j) => <p key={j} className="wr-t6">{t}</p>)}
            </div>
          </div>
        )
      case 'h4p':
        return (
          <div key={i} className="wr-split wr-reveal">
            <div className="wr-split-h"><h4 className="wr-t4">{b.h4}</h4></div>
            <div className="wr-split-p">
              {b.p.split('|').map((t, j) => <p key={j} className="wr-t6">{t}</p>)}
            </div>
          </div>
        )
      case 'h2p':
        return (
          <div key={i} className="wr-h2block wr-reveal">
            <h2 className="wr-h2">
              {b.h2.split('|').map((l, j) => <span key={j} className="wr-h2-line">{l}<br /></span>)}
            </h2>
            <p className="wr-t6 wr-h2-p">{b.p}</p>
          </div>
        )
      case 'mobiles':
        return (
          <div key={i} className="wr-mobiles">
            {b.imgs.map((f, j) => (
              <div key={j} className={`wr-phone ${j === 1 ? 'wr-d1' : j === 2 ? 'wr-d2' : ''} wr-reveal`}>
                <div className="wr-phone-border">
                  <BgImg slug={slug} file={f} pt={210} onOpen={() => openLb(f)} />
                </div>
              </div>
            ))}
          </div>
        )
      case 'video':
        return (
          <div key={i} className="wr-banner wr-reveal">
            <video className="wr-video" src={srcOf(b.img)} controls playsInline preload="metadata" />
          </div>
        )
      case 'testimonial':
        return (
          <div key={i} className="wr-testimonial wr-reveal">
            <img className="wr-t-logo" src={srcOf(b.logo)} alt="client logo" />
            <div className="wr-t-line" />
            <p className="wr-t6 wr-t-quote">{b.quote1}</p>
            {b.quote2 && <p className="wr-t6 wr-t-quote">{b.quote2}</p>}
            {b.quote3 && <p className="wr-t6 wr-t-quote">{b.quote3}</p>}
            <div className="wr-t-person">
              <img className="wr-t-avatar" src={srcOf(b.img)} alt={b.name} />
              <div>
                <span className="wr-t-name">{b.name}</span>
                <span className="wr-t-role">{b.role}</span>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`wr wr-${slug}`}>
      <a className="wr-back" href="#/work">← Back to Work</a>

      {/* HERO full-screen parallax come originale */}
      <header className="wr-hero">
        <div className="wr-hero-media"><img ref={heroImg} src={p.hero} alt={p.title} /></div>
        <div className="wr-hero-shade" />
        <div className="wr-hero-inner">
          <span className="wr-kicker">RomArte</span>
          <h1 className="wr-title">{(p.title || slug).toUpperCase()}</h1>
        </div>
      </header>

      {/* Dettagli Client/Services/Year — 3 colonne come originale */}
      <section className="wr-details">
        <div className="wr-details-in">
          <div className="wr-detail">
            <span className="wr-label">Client</span>
            {p.details.find((d) => d.label === 'Client').items.map((it, i) => <p key={i}>{it}</p>)}
          </div>
          <div className="wr-detail">
            <span className="wr-label">Services</span>
            {p.details.find((d) => d.label === 'Services').items.map((it, i) => <p key={i}>{it}</p>)}
          </div>
          <div className="wr-detail">
            <span className="wr-label">Year</span>
            {p.details.find((d) => d.label === 'Year').items.map((it, i) => <p key={i}>{it}</p>)}
          </div>
          {p.link && <a className="wr-link" href={p.link} target="_blank" rel="noreferrer">{p.linkLabel} ↗</a>}
        </div>
      </section>

      {/* Overview — col-8 centrata come originale */}
      <div className="wr-center wr-overview">
        <div className="wr-center-in">
          <span className="wr-kicker2">overview</span>
          <h3 className="wr-t5">{p.overview}</h3>
        </div>
      </div>

      {/* Blocchi in ordine originale */}
      <section className="wr-seq">
        {p.blocks.filter((b) => b.t !== 'center' || !b.kicker).map(renderBlock)}
      </section>

      {/* Next Work */}
      <nav className="wr-next">
        <a href={`#/work/${next.slug}`}><span>Next Work</span><strong>{(next.title || next.slug).toUpperCase()} →</strong></a>
      </nav>

      {lightbox >= 0 && imgFiles[lightbox] && (
        <div className="lightbox" onClick={() => setLightbox(-1)}>
          <img src={`assets/work/${slug}/${imgFiles[lightbox]}`} alt="" />
          <button className="lb-close" aria-label="Close">×</button>
          <div className="lb-count">{lightbox + 1} / {imgsCount}</div>
        </div>
      )}
    </div>
  )
}

/* Griglia WORK — come romarte: 2 colonne sfalsate, quadrata, titolo+caption */
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
