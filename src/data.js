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
  cv: './cv/Adam-Azzam-CV.pdf',
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

// Immagini: generate da extract_assets.py (hash-named, tutte usate — niente curation manuale).
const kluImgs = Object.keys(
  import.meta.glob('../../public/assets/img/klu-*.jpg', { eager: true, as: 'url' })
).sort()
const thesisImgs = Object.keys(
  import.meta.glob('../../public/assets/img/thesis-*.jpg', { eager: true, as: 'url' })
).sort()
const expoImgs = Object.keys(
  import.meta.glob('../../public/assets/img/expo-*.jpg', { eager: true, as: 'url' })
).sort()

export const PROJECTS = [
  {
    slug: 'klu',
    title: 'KLU Pizza Club',
    subtitle: 'Restaurant interior — concept to render',
    year: 'Rome',
    tags: ['Interior Design', '3D Visualization', 'Materials Research'],
    description:
      'Developed the full concept project of the interior: layout, materials research and sourced products, delivered with photorealistic 3D visualization. Extensive research on styles, finishes and furniture ensured client satisfaction within budget.',
    images: kluImgs,
    cv: 'https://drive.google.com/file/d/1nY5KeG5Rk-dryuthbTcv_HJFGndC85yF/view?usp=drive_link',
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
    cv: 'https://drive.google.com/file/d/1j5OXc9UJBTb7aySL-kfszLQYb3-y-B4C/view?usp=drive_link',
  },
  {
    slug: 'expo',
    title: 'Expo 2021 Pavilion',
    subtitle: 'Commercial pavilion — collaborative project',
    year: 'Dubai',
    tags: ['Commercial', 'Schematic Design', '3D Visualization'],
    description:
      'Collaborated on the development of a commercial Pavilion for Expo 2021: from system schematic and breaker layout to full 3D visualization, presenting layout designs in Internal Design Review meetings.',
    images: expoImgs,
    cv: 'https://drive.google.com/file/d/1_GVayjeRgyuxNQLIyt2g_1S8419QhKge/view?usp=drive_link',
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
