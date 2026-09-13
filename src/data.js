// Dati portfolio Adam Azzam — progetti RomArte (contenuti da romartestudio.com).
// i18n: default EN nel dato, varianti IT nei campi *_it / it:{} — pick()/pickP() scelgono.
export const pick = (o, f, lang) => (lang === 'it' && o[f + '_it'] != null ? o[f + '_it'] : o[f])
export const pickP = (p, f, lang) => (lang === 'it' && p.it && p.it[f] != null ? p.it[f] : p[f])

export const PROFILE = {
  name: 'Adam Azzam',
  role: 'Interior Designer — 3D Visualizer',
  tagline: 'I design spaces people remember.',
  summary:
    "Interior Designer with 3+ years of experience coordinating with key stakeholders to implement cost-effective design projects for both housing and commercial spaces. Proficient in extensive research on new styles, designs and techniques, executing interiors in compliance with the client's budget and taste. Adept at negotiating for effective pricing and managing cross-selling of new and expensive designs to drive profitability.",
  role_it: 'Interior Designer — 3D Visualizer',
  tagline_it: 'Progetto spazi che le persone ricordano.',
  summary_it:
    "Interior Designer con oltre 3 anni di esperienza nel coordinamento con gli stakeholder chiave per realizzare progetti di design convenienti in ambito residenziale e commerciale. Competente nella ricerca approfondita su nuovi stili, design e tecniche, realizzando interni in linea con budget e gusti del cliente. Abile nella negoziazione dei prezzi e nella vendita incrociata di design nuovi e di pregio per incrementare la redditività.",
  location: 'Rome · Utrecht · Dubai',
  email: 'adamazzamroma2@gmail.com',
  instagram: 'https://www.instagram.com/romarte.design/',
  instagramHandle: '@romarte.design',
}

export const SKILLS = [
  'Budget Preparation', 'Project Conceptualization', 'Research', 'Layout',
  'Architecture', 'Construction-Space Planning', 'Adobe Suite', 'UI Designing',
]

export const SKILLS_IT = [
  'Preventivazione', 'Concept di progetto', 'Ricerca', 'Layout',
  'Architettura', 'Pianificazione spazi', 'Adobe Suite', 'UI Design',
]

export const SOFTWARE = [
  'Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'AutoCAD', 'Rhinoceros',
  '3Ds Max (VRay, Corona, Octane)', 'Unity Game Engine', 'Unreal Engine', 'Sketching',
]

export const LANGUAGES = [
  ['Italian', 'Native'], ['Arabic', 'Fluent'], ['English', 'Fluent'], ['Spanish', 'Basic'],
]

export const LANGUAGES_IT = [
  ['Italiano', 'Madrelingua'], ['Arabo', 'Fluente'], ['Inglese', 'Fluente'], ['Spagnolo', 'Base'],
]

export const EXPERIENCE = [
  {
    role: 'Interior Designer — 3D Visualizer',
    company: 'KLU Pizza Club', place: 'Rome, Italy', period: 'Rome',
    bullets: [
      'Developed the full concept project of the interior: layout, materials research and sourced products',
      'Delivered photorealistic 3D visualization of the restaurant space',
      'Extensive research on styles, finishes and furniture within client budget and taste',
    ],
    bullets_it: [
      'Sviluppo del concept completo degli interni: layout, ricerca materiali e selezione prodotti',
      'Visualizzazione 3D fotorealistica dello spazio ristorante',
      'Ricerca approfondita su stili, finiture e arredi nel rispetto di budget e gusti del cliente',
    ],
  },
  {
    role: 'Art Director',
    company: 'Artura', place: 'Rome, Italy / Netherlands', period: "SEP '21 - PRESENT",
    bullets: [
      'Develop concepts and supporting materials for 360° healthcare advertising',
      'Responsible for managing workload and timeline',
      'Manage design, typography and overall visual identity in online and offline spaces',
      'Strong knowledge of Adobe Creative Suite — hybrid designer: print and digital',
    ],
    bullets_it: [
      'Sviluppo di concept e materiali di supporto per pubblicità sanitaria 360°',
      'Gestione del carico di lavoro e delle tempistiche',
      'Gestione di design, tipografia e identità visiva online e offline',
      'Conoscenza approfondita di Adobe Creative Suite — designer ibrido: stampa e digitale',
    ],
  },
  {
    role: 'Interior Designer — 3D Visualizer',
    company: 'IED — Istituto Europeo di Design', place: 'Rome, Italy', period: "JUL '23 - DEC '24",
    bullets: [
      'Furniture selection and documentation of specifications',
      'Ongoing product research informing new and relevant designs',
      'Space Planning and Designing; Hand Drafting and Rendering',
      'Materials Sourcing — fabric, paint, finishes, flooring, lighting',
    ],
    bullets_it: [
      'Selezione arredi e documentazione delle specifiche',
      'Ricerca continua di prodotto per design nuovi e rilevanti',
      'Pianificazione e progettazione degli spazi; disegno a mano e rendering',
      'Approvvigionamento materiali — tessuti, pitture, finiture, pavimenti, illuminazione',
    ],
  },
  {
    role: 'Interior Designer — 3D Visualizer',
    company: 'Antonio Gerardi Architects', place: 'Rome, Italy', period: "SEP '21 - DEC '21",
    bullets: [
      'Furniture selection and specification documentation',
      'Product research for new and relevant designs',
      'Space planning, hand drafting and rendering',
    ],
    bullets_it: [
      'Selezione arredi e documentazione delle specifiche',
      'Ricerca di prodotto per design nuovi e rilevanti',
      'Pianificazione degli spazi, disegno a mano e rendering',
    ],
  },
  {
    role: 'Interior Designer — 3D Visualizer',
    company: 'Bespoke Modular Solutions', place: 'Dubai, UAE', period: "DEC '20 - SEP '21",
    bullets: [
      "Programmed client's needs from schematic design to construction phase and installation",
      'Created professional presentations to communicate design intent and direction',
      'Maintained showroom appearance and merchandise on all displays',
      'Assisted the marketing specialist in showroom events, planning and on-site logistics',
    ],
    bullets_it: [
      'Analisi delle esigenze del cliente dal progetto schematico alla costruzione e installazione',
      'Realizzazione di presentazioni professionali per comunicare intenti e direzione del design',
      "Cura dell'aspetto dello showroom e del merchandising su tutte le esposizioni",
      'Supporto allo specialista marketing in eventi, pianificazione e logistica in showroom',
    ],
  },
  {
    role: 'Interior Designer — Showroom Coordinator',
    company: 'Bespoke Modular Solutions', place: 'Dubai, UAE', period: "DEC '20 - SEP '21",
    bullets: [
      'Presented layout designs in Internal Design Review meetings',
      'Developed system schematics, breaker layout and 3D visualization',
      'Collaborated on the development of a commercial Pavilion for Expo 2021',
    ],
    bullets_it: [
      'Presentazione dei layout nelle riunioni interne di Design Review',
      'Sviluppo di schemi di sistema, layout elettrico e visualizzazione 3D',
      'Collaborazione allo sviluppo di un Padiglione commerciale per Expo 2021',
    ],
  },
  {
    role: 'Freelance Interior Designer',
    company: "Ciccio's Food Monteverde", place: 'Rome, Italy', period: "MAY '08 - DEC '20",
    bullets: [
      'Developed the concept project: interior, breaker layout and 3D visualization',
      'Extensive research on materials and sourced products to ensure client satisfaction',
      'Worked on graphic design projects',
    ],
    bullets_it: [
      'Sviluppo del concept: interni, layout elettrico e visualizzazione 3D',
      'Ricerca approfondita di materiali e selezione prodotti per la soddisfazione del cliente',
      'Progetti di graphic design',
    ],
  },
]

export const EDUCATION = [
  {
    school: 'IED — Istituto Europeo di Design', place: 'Rome, Italy', period: "SEP '21",
    title: 'Interior Design — Museum Designer',
    note: "Founded in 1966, IED is the world's largest private network of institutions teaching fashion, design, communication and visual arts.",
    note_it: "Fondata nel 1966, l'IED è la più grande rete al mondo di istituti privati di moda, design, comunicazione e arti visive.",
  },
]

/* Lavori RomArte: stesse sezioni Project, ogni card linka la pagina statica dedicata (work/<slug>/)
   Testi e dati da romartestudio.com (client, services, year, overview) — varianti IT in it:{} */
export const ROMARTE_PROJECTS = [
  {
    slug: 'klu',
    workSlug: 'klu',
    title: 'Klu Pizza Club',
    subtitle: 'Interior & design — RomArte studio',
    year: '2023',
    client: 'KLU Pizza Club',
    services: ['Interior & design', 'Space Planning', 'Finishes', 'Customise Furnishings', 'Lighting Design'],
    tags: ['Interior Design', 'Space Planning', 'Lighting Design'],
    description:
      'Taking the experience of eating pizza to the next level. Gone are the days when this space was merely a disused, overlooked venue: I recognised its untapped potential and completely reimagined the interior with a unique brand identity, bespoke furniture and a vibrant color palette.',
    overview:
      'I completely refreshed the look and feel of the space with a sleek, modern style: tailored lighting systems, acoustic solutions and modular architectural elements ensure seamless functionality, comfort and aesthetic coherence. A comprehensive integration of smart lighting and acoustic systems adapts the ambiance in real time, while a bespoke spatial layout ensures optimal flow and interaction.',
    quote: { text: 'Working with a team that truly understood our vision made all the difference. The result is an environment that exceeds our expectations — design, ambiance and functionality merge effortlessly.', author: 'Marco Califano', role: 'Owner, KLU Pizza Club' },
    it: {
      subtitle: 'Interni & design — RomArte studio',
      services: ['Interni & design', 'Pianificazione spazi', 'Finiture', 'Arredi su misura', 'Lighting design'],
      tags: ['Design interni', 'Pianificazione spazi', 'Lighting design'],
      description:
        "Portare l'esperienza della pizza a un livello superiore. Sono finiti i tempi in cui questo spazio era solo un locale dismesso e trascurato: ho riconosciuto il potenziale e ho completamente reimmaginato gli interni con un'identità di marca unica, arredi su misura e una palette colori vibrante.",
      overview:
        "Abbiamo rinnovato completamente l'aspetto dello spazio con uno stile sleek e moderno: impianti di illuminazione su misura, soluzioni acustiche ed elementi architettonici modulari garantiscono funzionalità, comfort e coerenza estetica. Un'integrazione completa di illuminazione smart e sistemi acustici adatta l'atmosfera in tempo reale, mentre un layout su misura assicura flusso e interazione ottimali.",
    },
    images: [
      'assets/Uploads/SunglassStyleHero.webp',
      'assets/Uploads/2022-10/Home01.webp',
      'assets/Uploads/2022-10/Home02.webp',
      'assets/Uploads/2022-10/Home03.webp',
      'assets/Uploads/2022-10/Home04.webp',
      'assets/Uploads/2022-10/Product.webp',
      'assets/Uploads/2022-10/Stores.webp',
      'assets/Uploads/2022-10/Break1-v2.webp',
    ],
  },
  {
    slug: 'modularspace',
    workSlug: 'modularspace',
    title: 'Modular House',
    subtitle: 'Smart Housing — RomArte studio',
    year: '2024',
    client: 'Could be YOU!',
    services: ['Adaptive Modular Design', 'Precision Engineering', 'Smart Integration', 'Sustainable Innovation'],
    tags: ['Modular Design', 'Smart Integration', 'Sustainability'],
    description:
      "A future-focused take on Smart Housing. Imagine a space that's instantly ready for you — elegant, functional and thoughtfully designed: high-end, pre-designed modules that blend luxury and efficiency without compromising on style.",
    overview:
      'Signature off-the-shelf modules redefine modular living: fast and hassle-free installation, customizable to your needs, sustainable and high-quality design, perfect for residential and commercial spaces. Design continuity is preserved — signature aesthetics, materials and architectural language refined with a bolder, more immersive, contemporary feel.',
    it: {
      subtitle: 'Smart Housing — RomArte studio',
      services: ['Design modulare adattivo', 'Ingegneria di precisione', 'Integrazione smart', 'Innovazione sostenibile'],
      tags: ['Design modulare', 'Integrazione smart', 'Sostenibilità'],
      description:
        "Un'interpretazione futuribile dello Smart Housing. Immagina uno spazio immediatamente pronto per te — elegante, funzionale e pensato nei dettagli: moduli predefiniti di alto livello che uniscono lusso ed efficienza senza rinunce di stile.",
      overview:
        "I moduli signature pronti alla consegna ridefiniscono l'abitare modulare: installazione rapida e senza complicazioni, personalizzabile secondo le tue esigenze, design sostenibile e di alta qualità, perfetto per spazi residenziali e commerciali. La continuità del design è preservata — estetica, materiali e linguaggio architettonico signature raffinati con un feeling più audace e contemporaneo.",
    },
    images: [
      'assets/Uploads/Cumulo9Hero.webp',
      'assets/Uploads/2022-10/Cumulo9Banner.webp',
      'assets/Uploads/2022-10/Break1c.webp',
      'assets/Uploads/2022-10/C9Transact.webp',
      'assets/Uploads/2022-10/Contact.webp',
      'assets/Uploads/2022-10/LoginC9Campaign.webp',
      'assets/Uploads/2022-10/IconSet.webp',
    ],
  },
  {
    slug: 'zadfoodpark',
    workSlug: 'zadfoodpark',
    title: 'ZAD Food Park',
    subtitle: 'Experiential spatial design — RomArte studio',
    year: '2020',
    client: 'Arada',
    services: ['Experiential Spatial Design', 'Adaptive Modular Layouts', 'Branded Environmental Graphics', 'Sustainable Material Integration'],
    tags: ['Experiential Design', 'Modular Layouts', 'Environmental Graphics'],
    description:
      'The pursuit of a seamless and immersive dining experience. Zad Food Truck Park is an outdoor dining destination seamlessly blending nature with modern hospitality to create a vibrant culinary and social experience.',
    overview:
      'Built on adaptive reuse and modular design: shipping containers transformed into vibrant, fully functional dining spaces. Each food truck and dining space is strategically positioned to optimize customer flow, accessibility and ambiance, with adaptable lighting and spatial zoning enhancing wayfinding — a layout that evolves with seasonal events and foot traffic.',
    quote: { text: 'RomArte transformed Zad Food Truck Park into a vibrant space that enhances both functionality and community engagement. Their expertise and attention to detail made the process effortless.', author: 'Ahmed Al Mansoori', role: 'Project Manager, Arada' },
    it: {
      subtitle: 'Design spaziale esperienziale — RomArte studio',
      services: ['Design spaziale esperienziale', 'Layout modulari adattivi', 'Grafica ambientale di brand', 'Integrazione materiali sostenibili'],
      tags: ['Design esperienziale', 'Layout modulari', 'Grafica ambientale'],
      description:
        "La ricerca di un'esperienza gastronomica fluida e immersiva. Zad Food Truck Park è una destinazione all'aperto che fonde natura e hospitality moderna in un'esperienza culinaria e sociale vibrante.",
      overview:
        "Costruito sul riuso adattivo e sul design modulare: container navali trasformati in vivaci spazi ristorazione pienamente funzionali. Ogni food truck e area dining è posizionato strategicamente per ottimizzare flusso dei visitatori, accessibilità e atmosfera, con illuminazione adattabile e zonizzazione spaziale che migliorano l'orientamento — un layout che evolve con eventi stagionali e flussi di pubblico.",
    },
    images: [
      'assets/Uploads/FortisHero.webp',
      'assets/Uploads/2022-10/FortisBanner.webp',
      'assets/Uploads/2022-10/Home1f.webp',
      'assets/Uploads/2022-10/Aboutf.webp',
      'assets/Uploads/2022-10/InnerPages.webp',
      'assets/Uploads/2022-10/Break1f.webp',
    ],
  },
  {
    slug: 'aquafinaexpo',
    workSlug: 'aquafinaexpo',
    title: "The Drop Pavilion EXPO '21",
    subtitle: 'Exhibit system — RomArte studio',
    year: '2020',
    client: 'Pepsi&Co',
    services: ['Adaptive Exhibit System', 'Immersive Visitor Experience', 'Rendering & modeling design'],
    tags: ['Exhibit System', 'Visitor Experience', 'Recycled Materials'],
    description:
      "One pavilion, multiple experiences. At Expo 2021 Dubai, the Acqua Fina Pavilion was designed to inspire, educate and showcase innovative solutions for water conservation and sustainability.",
    overview:
      'Not just water, not just a pavilion: a dynamic modular design system with a suite of immersive digital elements, unified under a cohesive architectural and storytelling approach. A standout feature is the use of recycled materials — such as ropes crafted from reclaimed plastic — while real-time interactions, striking lighting effects and dynamic movements weave a visual narrative that captivates the audience.',
    quote: { text: 'The RomArte team consistently delivers effective solutions and innovative ideas, turning the seemingly impossible into reality, even under tight deadlines.', author: 'Rob Jonson', role: 'Senior Marketing Manager' },
    it: {
      subtitle: 'Sistema espositivo — RomArte studio',
      services: ['Sistema espositivo adattivo', 'Esperienza visitatore immersiva', 'Rendering e modellazione'],
      tags: ['Sistema espositivo', 'Esperienza visitatore', 'Materiali riciclati'],
      description:
        "Un padiglione, molteplici esperienze. A Expo 2021 Dubai, il padiglione Acqua Fina è stato concepito per ispirare, educare e mostrare soluzioni innovative per la conservazione dell'acqua e la sostenibilità.",
      overview:
        "Non solo acqua, non solo un padiglione: un sistema di design modulare dinamico con una suite di elementi digitali immersivi, uniti da un approccio architettonico e narrativo coerente. Tra gli elementi di spicco, l'uso di materiali riciclati — come corde realizzate con plastica recuperata — mentre interazioni in tempo reale, effetti luminosi e movimenti dinamici intrecciano una narrazione visiva che cattura il pubblico.",
    },
    images: [
      'assets/Uploads/KaingaOraHero.webp',
      'assets/Uploads/2022-10/KaingaOraBanner.webp',
      'assets/Uploads/2022-10/Image1.1.webp',
      'assets/Uploads/2022-10/Break1-1.webp',
      'assets/Uploads/2022-10/Booking.webp',
      'assets/Uploads/2022-10/Break2-v3.webp',
      'assets/Uploads/2022-10/Poster1.webp',
      'assets/Uploads/2022-10/Poster2.webp',
    ],
  },
  {
    slug: 'nomad',
    workSlug: 'nomad',
    title: 'NOMAD',
    subtitle: 'Mobile luxury resort — RomArte studio',
    year: '2022',
    client: 'SHUROOQ',
    services: ['Experiential Spatial Design', 'Adaptive Modular Interiors', 'Sustainable Material Integration', 'Climatic & Seasonal Adaptability'],
    tags: ['Spatial Design', 'Modular Interiors', 'Hospitality'],
    description:
      "Bringing Shurooq's vision of sustainable, mobile luxury to life. Nomad by Shurooq is redefining luxury travel in Sharjah: an exclusive, mobile resort experience immersed in nature, from deserts to coastlines.",
    overview:
      'A meticulously designed, high-performance modular infrastructure that adapts to diverse landscapes: each Airstream trailer is crafted with sustainable materials, smart climate control and energy-efficient systems. The flexible, modular interior system allows seamless space adaptation, seasonal reconfiguration and guest personalization — a dynamic living experience that evolves with its surroundings.',
    quote: { text: 'None have demonstrated the same passion, vision and innovative approach as RomArte. They understood our goals as if they were their own.', author: 'Omar Al Fahim', role: 'Senior Architect, Shurooq Sharjah Development' },
    it: {
      subtitle: 'Resort mobile di lusso — RomArte studio',
      services: ['Design spaziale esperienziale', 'Interni modulari adattivi', 'Integrazione materiali sostenibili', 'Adattabilità climatica e stagionale'],
      tags: ['Design spaziale', 'Interni modulari', 'Hospitality'],
      description:
        "Dare vita alla visione di Shurooq di lusso mobile e sostenibile. Nomad by Shurooq sta ridefinendo il viaggio di lusso a Sharjah: un'esperienza resort esclusiva e mobile immersa nella natura, dai deserti alle coste.",
      overview:
        "Un'infrastruttura modulare meticolosamente progettata e ad alte prestazioni che si adatta a paesaggi diversi: ogni trailer Airstream è realizzato con materiali sostenibili, clima smart e sistemi a basso consumo. Il sistema interno modulare e flessibile consente adattamento degli spazi, riconfigurazione stagionale e personalizzazione per l'ospite — un'esperienza abitativa dinamica che evolve con l'ambiente.",
    },
    images: [
      'assets/Uploads/NBRHero.webp',
      'assets/Uploads/2022-10/NBRBanner.webp',
      'assets/Uploads/2022-10/Home1nbr.webp',
      'assets/Uploads/2022-10/Home2nbr.webp',
      'assets/Uploads/2022-10/Home3nbr.webp',
      'assets/Uploads/2022-10/Home4nbr.webp',
      'assets/Uploads/2022-10/Article.webp',
      'assets/Uploads/2022-10/Subscribe.webp',
    ],
  },
  {
    slug: 'thesis',
    workSlug: 'thesis',
    title: 'Il Museo dei Musei',
    subtitle: 'A space, infinite stories',
    year: '2024',
    client: 'Musei Capitolini — in collaboration',
    services: ['Museum Design', 'Space Planning', 'Technical Drawing', '3D Rendering', 'Materials Specification'],
    tags: ['Museum Design', 'Interior Design', '3D Rendering'],
    description:
      "Final thesis at IED: the redevelopment of the Palazzo dei Conservatori inside the Capitoline Museums. Guided by the myth of Ariadne's Thread, a single red itinerary connects five rooms — Horti Lamiani, Horti Vettiani-Tauriani-Maecenatiani, the Wall of the Temple of Jupiter Capitoline and the Exedra of Marcus Aurelius — developed from plan to photorealistic render.",
    overview:
      "One of the world's oldest collections — the Capitoline bronzes donated by Sixtus IV in 1471 — becomes the thread of a museum itinerary. The project reimagines the Palazzo dei Conservatori as a narrative track: Ariadne's Thread, the red path that led Theseus out of the labyrinth, runs from the Horti Lamiani to the Exedra of Marcus Aurelius, binding five rooms, their territorial colour and a wall-sticker storytelling system into one continuous story.",
    video: {
      title: 'Video Thesis',
      subtitle: 'Thesis project walkthrough',
      poster: 'assets/img/video-thesis-poster.jpg',
      src: 'assets/video/video-thesis.mp4',
    },
    it: {
      subtitle: 'Uno spazio, storie infinite',
      services: ['Museum design', 'Pianificazione spazi', 'Disegno tecnico', 'Rendering 3D', 'Specifica materiali'],
      tags: ['Museum design', 'Interior design', 'Rendering 3D'],
      description:
        "Tesi finale allo IED: la riqualificazione di Palazzo dei Conservatori all'interno dei Musei Capitolini. Guidati dal mito del Filo di Arianna, un unico percorso rosso collega cinque sale — Horti Lamiani, Horti Vettiani-Tauriani-Maecenatiani, il Muro del Tempio di Giove Capitolino e l'Essedra di Marco Aurelio — sviluppate dalla planimetria al render fotorealistico.",
      overview:
        "Una delle collezioni più antiche al mondo — i bronzi capitolini donati da Sisto IV nel 1471 — diventa il filo di un percorso museale. Il progetto reimmagina Palazzo dei Conservatori come un percorso narrativo: il Filo di Arianna, il sentiero rosso che condusse Teseo fuori dal labirinto, corre dagli Horti Lamiani all'Essedra di Marco Aurelio, legando cinque sale, il loro colore territoriale e un sistema di storytelling adesivo in un'unica storia continua.",
      video: {
        title: 'Video Thesis',
        subtitle: 'Walkthrough del progetto di tesi',
        poster: 'assets/img/video-thesis-poster.jpg',
        src: 'assets/video/video-thesis.mp4',
      },
    },
    images: [
      // renders
      'assets/img/thesis-marcus-aurelius-exedra-render.webp',
      'assets/img/thesis-exhibition-space-render.webp',
      'assets/img/thesis-exedra-sculptures-render.webp',
      'assets/img/thesis-horti-lamiani-room-render.webp',
      'assets/img/thesis-goddess-room-render.webp',
      'assets/img/thesis-herms-and-bull-render.webp',
      'assets/img/thesis-centaur-head-render.webp',
      'assets/img/thesis-triton-relief-render.webp',
      'assets/img/thesis-dionysus-torso-render.webp',
      'assets/img/thesis-faustina-major-bust-render.webp',
      'assets/img/thesis-roman-soldier-statue-render.webp',
      'assets/img/thesis-female-statue-niche-render.webp',
      'assets/img/thesis-eros-relief-render.webp',
      'assets/img/thesis-caryatid-herm-render.webp',
      'assets/img/thesis-domitian-portrait-render.webp',
      'assets/img/thesis-hercules-bust-render.webp',
      // technical drawings
      'assets/img/thesis-horti-lamiani-plan-1-250.webp',
      'assets/img/thesis-horti-vettiani-plan-1-250.webp',
      'assets/img/thesis-exedra-marco-aurelio-plan-1-250.webp',
      'assets/img/thesis-wall-exhibition-panel-1-500.webp',
      'assets/img/thesis-base-detail-3-1-300.webp',
    ],
  },
]

export const VIDEOS = [
  {
    slug: 'video-render',
    title: 'Video Render Reel',
    subtitle: 'Photorealistic animation showreel',
    poster: '',
    src: 'assets/video/video-render.mp4',
    it: { subtitle: 'Showreel di animazioni fotorealistiche' },
  },
  {
    slug: 'video-thesis',
    title: 'Video Thesis',
    subtitle: 'Thesis project walkthrough',
    poster: 'assets/img/video-thesis-poster.jpg',
    src: 'assets/video/video-thesis.mp4',
    it: { subtitle: 'Walkthrough del progetto di tesi' },
  },
]
