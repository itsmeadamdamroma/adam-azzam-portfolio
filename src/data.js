// Dati portfolio Adam Azzam — progetti RomArte (contenuti da romartestudio.com).
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

/* Lavori RomArte: stesse sezioni Project, ogni card linka la pagina statica dedicata (work/<slug>/)
   Testi e dati da romartestudio.com (client, services, year, overview) */
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
      'Taking the experience of eating pizza to the next level. Gone are the days when this space was merely a disused, overlooked venue: we recognised its untapped potential and completely reimagined the interior with a unique brand identity, bespoke furniture and a vibrant color palette.',
    overview:
      'We completely refreshed the look and feel of the space with a sleek, modern style: tailored lighting systems, acoustic solutions and modular architectural elements ensure seamless functionality, comfort and aesthetic coherence. A comprehensive integration of smart lighting and acoustic systems adapts the ambiance in real time, while a bespoke spatial layout ensures optimal flow and interaction.',
    quote: { text: 'Working with a team that truly understood our vision made all the difference. The result is an environment that exceeds our expectations — design, ambiance and functionality merge effortlessly.', author: 'Marco Califano', role: 'Owner, KLU Pizza Club' },
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
    subtitle: 'Smart Housing — RomArte studio',
    year: '2024',
    client: 'Could be YOU!',
    services: ['Adaptive Modular Design', 'Precision Engineering', 'Smart Integration', 'Sustainable Innovation'],
    tags: ['Modular Design', 'Smart Integration', 'Sustainability'],
    description:
      "A future-focused take on Smart Housing. Imagine a space that's instantly ready for you — elegant, functional and thoughtfully designed: high-end, pre-designed modules that blend luxury and efficiency without compromising on style.",
    overview:
      'Signature off-the-shelf modules redefine modular living: fast and hassle-free installation, customizable to your needs, sustainable and high-quality design, perfect for residential and commercial spaces. Design continuity is preserved — signature aesthetics, materials and architectural language refined with a bolder, more immersive, contemporary feel.',
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
  
]

export const VIDEOS = [
  {
    slug: 'video-render',
    title: 'Video Render Reel',
    subtitle: 'Photorealistic animation showreel',
    poster: '',
    src: 'assets/video/video-render.mp4',
  },
  {
    slug: 'video-thesis',
    title: 'Video Thesis',
    subtitle: 'Thesis project walkthrough',
    poster: '',
    src: 'assets/video/video-thesis.mp4',
  },
]
