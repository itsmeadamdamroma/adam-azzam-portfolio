// Dati portfolio — testi dal CV PDF, immagini estratte dai PDF progetti (assets copiati in public/assets).
export const PROFILE = {
  name: 'Adam Azzam',
  role: 'Interior Designer — 3D Visualizer',
  tagline: 'I design spaces people remember.',
  summary:
    'Interior Designer with 3+ years of experience coordinating with key stakeholders to implement cost-effective design projects for both housing and commercial spaces. Proficient in extensive research on new styles, designs and techniques, executing interiors in compliance with the client\'s budget and taste. Adept at negotiating for effective pricing and managing cross-selling of new and expensive designs to drive profitability.',
  location: 'Rome · Utrecht · Dubai',
  email: 'adam_azzam@aol.com',
  phones: ['+31 684 155 240', '+39 388 955 5249'],
  instagram: 'https://www.instagram.com/arturaroma/',
  instagramHandle: '@arturaroma',
}

export const SKILLS = [
  'Budget Preparation', 'Project Conceptualization', 'Research', 'Layout',
  'Architecture', 'Construction-Space Planning', 'Adobe Suite', 'UI Designing',
]

export const SOFTWARE = [
  'Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'AutoCAD', 'Rhinoceros',
  '3Ds Max (VRay, Corona, Octane)', 'Unity Game Engine', 'Unreal Engine', 'Sketching',
]

export const LANGUAGES = [
  ['Italian', 'Native'], ['Arabic', 'Fluent'], ['English', 'Fluent'], ['Spanish', 'Basic'],
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
  },
  {
    role: 'Art Director',
    company: 'Artura', place: 'Rome, Italy / Netherlands', period: 'SEP \'21 - PRESENT',
    bullets: [
      'Develop concepts and supporting materials for 360° healthcare advertising',
      'Responsible for managing workload and timeline',
      'Manage design, typography and overall visual identity in online and offline spaces',
      'Strong knowledge of Adobe Creative Suite — hybrid designer: print and digital',
    ],
  },
  {
    role: 'Interior Designer — 3D Visualizer',
    company: 'IED — Istituto Europeo di Design', place: 'Rome, Italy', period: 'JUL \'23 - DEC \'24',
    bullets: [
      'Furniture selection and documentation of specifications',
      'Ongoing product research informing new and relevant designs',
      'Space Planning and Designing; Hand Drafting and Rendering',
      'Materials Sourcing — fabric, paint, finishes, flooring, lighting',
    ],
  },
  {
    role: 'Interior Designer — 3D Visualizer',
    company: 'Antonio Gerardi Architects', place: 'Rome, Italy', period: 'SEP \'21 - DEC \'21',
    bullets: [
      'Furniture selection and specification documentation',
      'Product research for new and relevant designs',
      'Space planning, hand drafting and rendering',
    ],
  },
  {
    role: 'Interior Designer — 3D Visualizer',
    company: 'Bespoke Modular Solutions', place: 'Dubai, UAE', period: 'DEC \'20 - SEP \'21',
    bullets: [
      "Programmed client's needs from schematic design to construction phase and installation",
      'Created professional presentations to communicate design intent and direction',
      'Maintained showroom appearance and merchandise on all displays',
      'Assisted the marketing specialist in showroom events, planning and on-site logistics',
    ],
  },
  {
    role: 'Interior Designer — Showroom Coordinator',
    company: 'Bespoke Modular Solutions', place: 'Dubai, UAE', period: 'DEC \'20 - SEP \'21',
    bullets: [
      'Presented layout designs in Internal Design Review meetings',
      'Developed system schematics, breaker layout and 3D visualization',
      'Collaborated on the development of a commercial Pavilion for Expo 2021',
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
  },
]

export const EDUCATION = [
  {
    school: 'IED — Istituto Europeo di Design', place: 'Rome, Italy', period: 'SEP \'21',
    title: 'Interior Design — Museum Designer',
    note: "Founded in 1966, IED is the world's largest private network of institutions teaching fashion, design, communication and visual arts.",
  },
]

import { IMAGES } from './images.js'

const kluImgs = IMAGES.klu
const thesisImgs = IMAGES.thesis
const kpcImgs = IMAGES.kpc

export const PROJECTS = [
  {
    slug: 'kpc',
    title: 'KLU Pizza Club',
    subtitle: 'Restaurant interior — concept to render',
    year: 'Rome',
    tags: ['Interior Design', '3D Visualization', 'Materials Research'],
    description:
      'Developed the full concept project of the interior: layout, materials research and sourced products, delivered with photorealistic 3D visualization. Extensive research on styles, finishes and furniture ensured client satisfaction within budget.',
    images: kpcImgs,
  },
  {
    slug: 'portfolio',
    title: 'Selected Works',
    subtitle: 'Portfolio completo — residential & commercial',
    year: 'Rome · Dubai',
    tags: ['Interior Design', '3D Visualization', 'Art Direction'],
    description:
      'Complete portfolio: residential, commercial and exhibition projects from schematic design to photorealistic rendering. Space planning, furniture selection, materials sourcing and client presentations across every project phase.',
    images: kluImgs,
  },
  {
    slug: 'thesis',
    title: 'Thesis Project',
    subtitle: 'Museum design — IED final project',
    year: 'IED Rome',
    tags: ['Museum Design', 'Space Planning', 'Hand Drafting'],
    description:
      'Final thesis project at Istituto Europeo di Design: museum interior with space planning, furniture selection and documentation of specifications. Combines hand drafting and rendering with materials sourcing across fabric, paint, finishes, flooring and lighting.',
    images: thesisImgs,
  },
]

/* Lavori RomArte: stesse sezioni Project, ma ogni card linka la pagina statica dedicata (work/<slug>/) */
export const ROMARTE_PROJECTS = [
  {
    slug: 'klu',
    workSlug: 'klu',
    title: 'Klu Pizza Club',
    subtitle: 'Restaurant — RomArte studio',
    year: 'Rome',
    tags: ['Interior Design', 'Space Planning', 'Furnishings'],
    description:
      'Taking the experience of eating pizza to the next level: interior design, space planning, finishes and custom furnishings for the KLU Pizza Club brand.',
    images: [
      'assets/Uploads/SunglassStyleHero.webp',
      'assets/Uploads/2022-10/Home01.webp',
      'assets/Uploads/2022-10/Home02.webp',
      'assets/Uploads/2022-10/Home03.webp',
      'assets/Uploads/2022-10/Home04.webp',
      'assets/Uploads/2022-10/Product.jpg',
      'assets/Uploads/2022-10/Stores.jpg',
      'assets/Uploads/2022-10/Break1-v2.jpg',
    ],
  },
  {
    slug: 'modularspace',
    workSlug: 'modularspace',
    title: 'Modular House',
    subtitle: 'Architectural space — RomArte studio',
    year: 'Smart Housing',
    tags: ['Modular Design', 'Smart Integration', 'Sustainability'],
    description:
      'A future-focused take on smart housing: adaptive modular design, precision engineering and smart integration with sustainable innovation at the core.',
    images: [
      'assets/Uploads/Cumulo9Hero.png',
      'assets/Uploads/2022-10/Cumulo9Banner.png',
      'assets/Uploads/2022-10/Break1c.jpg',
      'assets/Uploads/2022-10/C9Transact.jpg',
      'assets/Uploads/2022-10/Contact.jpg',
      'assets/Uploads/2022-10/LoginC9Campaign.png',
      'assets/Uploads/2022-10/IconSet.png',
    ],
  },
  {
    slug: 'zadfoodpark',
    workSlug: 'zadfoodpark',
    title: 'ZAD Food Park',
    subtitle: 'Experiential design — RomArte studio',
    year: 'Arada',
    tags: ['Experiential Design', 'Modular Layouts', 'Environmental Graphics'],
    description:
      'The pursuit of a seamless and immersive dining experience: experiential spatial design, adaptive modular layouts and branded environmental graphics.',
    images: [
      'assets/Uploads/FortisHero.webp',
      'assets/Uploads/2022-10/FortisBanner.webp',
      'assets/Uploads/2022-10/Home1f.webp',
      'assets/Uploads/2022-10/Aboutf.webp',
      'assets/Uploads/2022-10/InnerPages.png',
      'assets/Uploads/2022-10/Break1f.webp',
    ],
  },
  {
    slug: 'aquafinaexpo',
    workSlug: 'aquafinaexpo',
    title: "The Drop Pavilion EXPO '21",
    subtitle: 'Exterior design — RomArte studio',
    year: 'Pepsi&Co',
    tags: ['Exterior Design', 'Exhibit System', 'Visitor Experience'],
    description:
      'One pavilion, multiple experiences: adaptive exhibit system and immersive visitor experience for the Aquafina pavilion at EXPO 2021.',
    images: [
      'assets/Uploads/KaingaOraHero.jpg',
      'assets/Uploads/2022-10/KaingaOraBanner.jpg',
      'assets/Uploads/2022-10/Image1.1.png',
      'assets/Uploads/2022-10/Break1-1.jpg',
      'assets/Uploads/2022-10/Booking.jpg',
      'assets/Uploads/2022-10/Break2-v3.jpg',
      'assets/Uploads/2022-10/Poster1.jpg',
      'assets/Uploads/2022-10/Poster2.jpg',
    ],
  },
  {
    slug: 'nomad',
    workSlug: 'nomad',
    title: 'NOMAD',
    subtitle: 'Outdoor hotel — RomArte studio',
    year: 'SHUROOQ',
    tags: ['Spatial Design', 'Modular Interiors', 'Hospitality'],
    description:
      "Bringing Shurooq's vision of sustainable, mobile luxury to life: experiential spatial design, adaptive modular interiors and smart space optimization.",
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
    slug: 'cruz-jimenez',
    workSlug: 'cruz-jimenez',
    title: 'Cruz Jimenez',
    subtitle: 'Digital experience — RomArte studio',
    year: 'Cruz Jimenez',
    tags: ['UX & UI', 'Modular CMS', 'Animation'],
    description:
      'A masterpiece of art and innovation: UX & UI design, modular CMS, API integration and animation for the Cruz Jimenez artistic platform.',
    images: [
      'assets/Uploads/CruzJimenezHero.jpg',
      'assets/Uploads/2022-10/Image1cruz.jpg',
      'assets/Uploads/2022-10/Image2cruz.jpg',
      'assets/Uploads/2022-10/Painting.jpg',
      'assets/Uploads/2022-10/Image3cruz.jpg',
      'assets/Uploads/2022-10/Image4cruz.png',
    ],
  },
]

export const VIDEOS = [
  {
    slug: 'video-render',
    title: 'Video Render Reel',
    subtitle: 'Photorealistic animation showreel',
    poster: 'assets/img/video-render-poster.jpg',
    src: 'assets/video/video-render.mp4',
  },
  {
    slug: 'video-thesis',
    title: 'Video Thesis',
    subtitle: 'Thesis project walkthrough',
    poster: 'assets/img/video-thesis-poster.jpg',
    src: 'assets/video/video-thesis.mp4',
  },
]

// Testi CV specifici per ogni pagina progetto
export const PROJECT_CV_TEXT = {
  kpc: {
    role: 'Interior Designer — 3D Visualizer',
    company: 'KLU Pizza Club', place: 'Rome, Italy',
    bullets: [
      'Developed the concept project of the interior: layout, materials research and sourced products to ensure client satisfaction',
      'Delivered photorealistic 3D visualization of the restaurant interior',
      'Conducted extensive research on materials, styles, finishes and furniture',
      'Executed the interior design in compliance with the client\'s budget and taste',
    ],
  },
  portfolio: {
    role: 'Interior Designer — 3D Visualizer',
    company: 'Bespoke Modular Solutions', place: 'Dubai, UAE',
    bullets: [
      "Programmed client's needs from schematic design to the construction phase and installation",
      'Created professional presentations to creatively communicate design intent and direction',
      'Maintained showroom appearance and merchandise on all displays',
      'Assisted the marketing specialist in ongoing showroom events, with planning and on-site logistics',
      'Presented the layout designs in the Internal Design Review meetings',
      'Developed system schematic, breaker layout and 3D visualization',
      'Collaborated on the development of a commercial Pavilion for Expo 2021',
    ],
  },
  thesis: {
    role: 'Interior Design — Museum Designer',
    company: 'IED — Istituto Europeo di Design', place: 'Rome, Italy',
    bullets: [
      'Participated in furniture selection and documentation of specifications',
      'Conducted ongoing product research as a means of informing new and relevant designs',
      'Space Planning and Designing; Hand Drafting and Rendering',
      'Materials Sourcing — fabric, paint, finishes, flooring, lighting',
      "Founded in 1966, IED is the world's largest private network of institutions teaching fashion, design, communication and visual arts",
    ],
  },
}

// Video correlati per slug progetto (ProjectPage)
export const VIDEOS_FOR = {
  kpc: [VIDEOS[0]],
  portfolio: [VIDEOS[0], VIDEOS[1]],
  thesis: [VIDEOS[1]],
}
