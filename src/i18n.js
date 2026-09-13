// i18n minimale: IT default, switch EN persistito in localStorage.
// ponytail: niente lib i18n — store modulare condiviso (10 righe) + dizionario UI piatto.
import { useEffect, useState } from 'react'

const KEY = 'aa-lang'

let current = (() => { try { return localStorage.getItem(KEY) || 'it' } catch { return 'it' } })()
const subs = new Set()

export function setLang(l) {
  if (l === current) return
  current = l
  try { localStorage.setItem(KEY, l) } catch {}
  try { document.documentElement.lang = l } catch {}
  subs.forEach((s) => s(l))
}

export function useLang() {
  const [lang, set] = useState(current)
  useEffect(() => {
    subs.add(set)
    document.documentElement.lang = current
    return () => { subs.delete(set) }
  }, [])
  return [lang, setLang]
}

// helper: variante testo it/en
export const tr = (lang, it, en) => (lang === 'en' ? en : it)

// ---- UI strings (nav, sezioni, bottoni) ----
export const UI = {
  it: {
    home: 'home', about: 'chi sono', work: 'progetti', contact: 'contatti',
    viewWork: 'Vedi i progetti', back: '← Indietro',
    client: 'Cliente', services: 'Servizi', year: 'Anno',
    overview: 'Panoramica', theConcept: 'Il concept',
    video: 'Video', walkthrough: 'Walkthrough',
    theWork: 'Il progetto', whatWeDid: 'Cosa abbiamo fatto',
    testimonial: 'Testimonianza', whatTheySaid: 'Cosa hanno detto',
    gallery: 'Gallery', renders: 'render',
    experience: 'Esperienza', skills: 'Competenze', software: 'Software', languages: 'Lingue',
    allWork: 'Tutti i progetti', prev: '← Precedente', next: 'Prossimo →',
    backToTop: 'Torna su ↑', viewProject: 'Vedi il progetto',
    phone: 'Telefono',
  },
  en: {
    home: 'home', about: 'about', work: 'work', contact: 'contact',
    viewWork: 'View Work', back: '← Back',
    client: 'Client', services: 'Services', year: 'Year',
    overview: 'Overview', theConcept: 'The concept',
    video: 'Video', walkthrough: 'Walkthrough',
    theWork: 'The work', whatWeDid: 'What I did',
    testimonial: 'Testimonial', whatTheySaid: 'What they said',
    gallery: 'Gallery', renders: 'renders',
    experience: 'Experience', skills: 'Key Skills', software: 'Software', languages: 'Languages',
    allWork: 'All Work', prev: '← Previous', next: 'Next →',
    backToTop: 'Back to top ↑', viewProject: 'View project',
    phone: 'Phone',
  },
}
