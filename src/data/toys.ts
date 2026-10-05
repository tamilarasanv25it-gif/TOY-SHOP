import { ToyProduct, ToyCategory, AgeGroup } from '../types/toy';

export const HERO_IMAGE = '/src/assets/images/hero_toy_workshop_1791181030579.jpg';

export const TOY_PRODUCTS: ToyProduct[] = [
  {
    id: 'toy-wooden-train',
    title: 'Bavarian Beechwood Magnetic Railway',
    subtitle: '18-piece heirloom train set with magnetic linkages & station arch',
    price: 68,
    originalPrice: 82,
    category: 'Wooden & Montessori',
    ageGroup: '3-5 Years',
    image: '/src/assets/images/toy_wooden_train_1791181043617.jpg',
    fallbackGradient: 'from-amber-100 to-stone-200',
    rating: 4.9,
    reviewCount: 142,
    badge: 'Artisanal Bestseller',
    inStock: true,
    stockCount: 14,
    description: 'Turned by master woodcrafters from certified Bavarian solid beechwood, this heirloom magnetic train glides smoothly across hardwood and wool rugs. Features organic beeswax oil finish and countersunk rare-earth safety magnets.',
    developmentalSkills: ['Fine Motor Coordination', 'Cause & Effect Reasoning', 'Spatial Pathfinding'],
    materials: 'FSC Certified Solid Beechwood, Organic Beeswax Polish, Enclosed Neodymium Magnets',
    dimensions: 'Locomotive: 12cm × 6cm; Track length: 180cm total',
    safetyCertifications: ['EN71 European Safety Standard', 'ASTM F963-23 Certified', 'Non-Toxic Plant Polish'],
    soundType: 'train',
    soundLabel: 'Hear Train Chug & Whistle',
    featured: true,
    reviews: [
      {
        id: 'r1',
        author: 'Eleanor Vance',
        rating: 5,
        date: 'October 1, 2026',
        title: 'Generational craftsmanship',
        comment: 'The weight of each carriage feels substantive and velvety smooth. My 4-year-old twins build infinite loops and the magnets never lose their snap.',
        verified: true
      },
      {
        id: 'r2',
        author: 'Marcus Lindqvist',
        rating: 5,
        date: 'September 18, 2026',
        title: 'Unbelievable woodwork',
        comment: 'No cheap plastics, no squeaking wheels. Smells faintly of natural beeswax. One of the finest children toys I have ever purchased.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-stem-telescope',
    title: 'Kepler Brass & Walnut Tabletop Refractor',
    subtitle: '30x optical achromatic telescope with planetary dial and brass tripod',
    price: 115,
    originalPrice: 130,
    category: 'STEM & Science',
    ageGroup: '6-8 Years',
    image: '/src/assets/images/toy_stem_telescope_1791181054087.jpg',
    fallbackGradient: 'from-sky-100 to-stone-200',
    rating: 4.95,
    reviewCount: 98,
    badge: 'STEM Award Winner',
    inStock: true,
    stockCount: 8,
    description: 'Designed in collaboration with observatory educators, this working refractor telescope features coated optical glass lenses and an engraved walnut barrel. Perfect for lunar craters, bird watching, and introducing astronomical navigation.',
    developmentalSkills: ['Optical Physics Discovery', 'Patience & Fine Focus', 'Astronomical Observation'],
    materials: 'Hand-lathed American Walnut, Brushed Marine Brass, Optical Crown Glass',
    dimensions: 'Barrel: 38cm; Tripod height: 28cm to 45cm adjustable',
    safetyCertifications: ['Lead-Free Optical Glass', 'ISO 9001 Optics', 'CPSIA Compliant'],
    soundType: 'chime',
    soundLabel: 'Listen to Focusing Mechanism',
    featured: true,
    reviews: [
      {
        id: 'r3',
        author: 'Dr. Julian Foster',
        rating: 5,
        date: 'September 24, 2026',
        title: 'Remarkable optical clarity',
        comment: 'We spent the weekend studying lunar mare and shadows with our 7-year-old. The brass gears are so satisfying to adjust.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-heirloom-bear',
    title: 'The Cotswold Heirloom Linen Bear',
    subtitle: 'Hand-stitched organic linen & merino wool teddy with knitted moss scarf',
    price: 54,
    category: 'Plush Companions',
    ageGroup: '0-2 Years',
    image: '/src/assets/images/toy_heirloom_bear_1791181065914.jpg',
    fallbackGradient: 'from-orange-100 to-stone-200',
    rating: 4.88,
    reviewCount: 215,
    badge: 'Heritage Classic',
    inStock: true,
    stockCount: 19,
    description: 'Lovingly hand-stitched from unbleached Belgian linen and stuffed with organic sheep wool batting. Embroidered safety eyes ensure infant suitability from birth. Comes wrapped in tissue with a certificate of origin.',
    developmentalSkills: ['Tactile Sensory Comfort', 'Emotional Bonding', 'Imaginative Play'],
    materials: '100% Belgian Flax Linen, Organic Merino Wool Fill, Cotton Embroidery Thread',
    dimensions: '32cm seated height, 180g weight',
    safetyCertifications: ['OEKO-TEX Class 1 (Infant)', 'Zero Microplastics', 'Hypoallergenic'],
    soundType: 'rattle',
    soundLabel: 'Soft Organic Bell Sound',
    featured: true,
    reviews: [
      {
        id: 'r4',
        author: 'Siobhan Kelly',
        rating: 5,
        date: 'October 2, 2026',
        title: 'Beloved bedtime companion',
        comment: 'So soft yet structured, no shedding synthetic fur. The little knitted scarf is just the sweetest touch.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-music-carousel',
    title: 'Nocturne Clockwork Music Box & Carousel',
    subtitle: 'Swiss-movement mechanical wind-up music box playing Clair de Lune',
    price: 88,
    category: 'Mechanical & Music',
    ageGroup: '3-5 Years',
    image: '/src/assets/images/hero_toy_workshop_1791181030579.jpg',
    fallbackGradient: 'from-amber-200 to-emerald-100',
    rating: 4.92,
    reviewCount: 76,
    badge: 'Limited Craft',
    inStock: true,
    stockCount: 5,
    description: 'An 18-note mechanical clockwork chime housed inside hand-turned linden wood with a slowly revolving carousel of carved songbirds. No batteries, pure mechanical acoustic wonder that soothes children into restful slumber.',
    developmentalSkills: ['Acoustic Appreciation', 'Mechanical Understanding', 'Bedtime Rituals'],
    materials: 'Sankyo 18-Note Movement, European Linden Wood, Brass Winding Key',
    dimensions: '16cm diameter × 21cm height',
    safetyCertifications: ['EN71-1 Compliant', 'Non-Toxic Lacquer', 'Enclosed Movement'],
    soundType: 'musicbox',
    soundLabel: 'Listen to Clair de Lune Chime',
    featured: true,
    reviews: [
      {
        id: 'r5',
        author: 'Camille Dupuis',
        rating: 5,
        date: 'August 29, 2026',
        title: 'Pure magic at dusk',
        comment: 'The acoustic tone is crystalline and gentle, not metallic like modern electronic toys. A true keepsake.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-architectural-blocks',
    title: 'Gothic Arch Architectural Building Blocks',
    subtitle: '54-piece untreated cedar & cherry architectural stacking columns',
    price: 74,
    category: 'Wooden & Montessori',
    ageGroup: '6-8 Years',
    image: '/src/assets/images/toy_wooden_train_1791181043617.jpg',
    fallbackGradient: 'from-stone-200 to-amber-100',
    rating: 4.87,
    reviewCount: 64,
    badge: 'Open-Ended Play',
    inStock: true,
    stockCount: 12,
    description: 'Inspired by classical Romanesque and Gothic architecture, these 54 mathematically proportioned building blocks allow aspiring engineers to build load-bearing barrel vaults, colosseums, and cathedral spires.',
    developmentalSkills: ['Structural Engineering', 'Equilibrium & Balance', 'Creative Geometry'],
    materials: 'Western Red Cedar, Black Cherry Wood, Unlacquered Sanded Finish',
    dimensions: 'Wooden box: 36cm × 26cm × 8cm; 54 blocks total',
    safetyCertifications: ['100% Solid Natural Wood', 'Zero Chemical Finishes', 'ASTM F963'],
    soundType: 'rattle',
    soundLabel: 'Natural Cedar Block Tap',
    featured: false,
    reviews: [
      {
        id: 'r6',
        author: 'Henrik M.',
        rating: 5,
        date: 'September 12, 2026',
        title: 'Endless architectural creativity',
        comment: 'Our living room floor is constantly filled with aqueducts and castles. Solid, aromatic cedar with precision cut edges.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-solar-rover',
    title: 'Galileo Solar Automaton & Gear Kit',
    subtitle: 'Kinetic solar-powered buggy with transparent gearbox and photovoltaic sail',
    price: 48,
    category: 'STEM & Science',
    ageGroup: '9+ Years',
    image: '/src/assets/images/toy_stem_telescope_1791181054087.jpg',
    fallbackGradient: 'from-amber-100 to-sky-100',
    rating: 4.79,
    reviewCount: 88,
    badge: 'Clean Energy',
    inStock: true,
    stockCount: 22,
    description: 'A hands-on engineering set that teaches solar energy conversion and planetary gear ratios. The monocrystalline panel powers an ultra-efficient micro-motor that propels the vehicle across smooth surfaces under direct sunlight or desk lamps.',
    developmentalSkills: ['Renewable Energy Physics', 'Mechanical Kinematics', 'Step-by-Step Assembly'],
    materials: 'Laser-Cut Birch Plywood, High-Efficiency Silicon Solar Cell, Brass Axles',
    dimensions: 'Assembled rover: 18cm × 14cm × 9cm',
    safetyCertifications: ['Low Voltage Safe', 'CE Certified', 'RoHS Compliant'],
    soundType: 'robot',
    soundLabel: 'Listen to Gear Mechanism',
    featured: false,
    reviews: [
      {
        id: 'r7',
        author: 'Naomi Chen',
        rating: 5,
        date: 'September 5, 2026',
        title: 'Our 10yo assembled it solo',
        comment: 'The clear blueprint manual was fantastic. The moment sunlight hit the panel and the wheels spun, her face lit up.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-botanical-watercolor',
    title: 'Artisan Mineral Pigment & Walnut Easel',
    subtitle: '12 handmade earth watercolor pans in brass tin with squirrel-hair brush',
    price: 42,
    category: 'Creative Arts',
    ageGroup: '6-8 Years',
    image: '/src/assets/images/toy_heirloom_bear_1791181065914.jpg',
    fallbackGradient: 'from-rose-100 to-amber-100',
    rating: 4.91,
    reviewCount: 52,
    badge: 'Earth Pigments',
    inStock: true,
    stockCount: 16,
    description: 'Formulated with authentic natural earth minerals, gum arabic, and wild clover honey. Yields luminous, non-chalky watercolor washes for nature journaling, leaf rubbings, and botanical sketches.',
    developmentalSkills: ['Color Blending Theory', 'Hand Dexterity', 'Expressive Creativity'],
    materials: 'Natural Earth Pigments, Pure Gum Arabic, French Brass Palette Case',
    dimensions: 'Palette: 14cm × 7cm × 2cm; 12 half-pans',
    safetyCertifications: ['AP Non-Toxic Seal', 'ACM Institute Certified', 'Heavy Metal Free'],
    soundType: 'chime',
    soundLabel: 'Artisan Palette Click',
    featured: false,
    reviews: [
      {
        id: 'r8',
        author: 'Arlo & Clara',
        rating: 5,
        date: 'September 20, 2026',
        title: 'Colors like real wildflowers',
        comment: 'Rich, buttery pigments. Much better than the plastic synthetic sets at regular stores.',
        verified: true
      }
    ]
  },
  {
    id: 'toy-waldorf-silks',
    title: 'Waldorf Seasonal Play Silks Set',
    subtitle: '4 hand-dyed mulberry silk squares for fort building & costume play',
    price: 52,
    category: 'Plush Companions',
    ageGroup: '0-2 Years',
    image: '/src/assets/images/hero_toy_workshop_1791181030579.jpg',
    fallbackGradient: 'from-emerald-100 to-sky-100',
    rating: 4.96,
    reviewCount: 163,
    badge: 'Sensory Wonder',
    inStock: true,
    stockCount: 18,
    description: 'Four generous 90cm × 90cm squares of pure grade-A mulberry silk dyed with plant extracts (madder root, weld, indigo, and walnut). Transform into capes, rivers, doll wraps, or peak-a-boo canopy forts.',
    developmentalSkills: ['Sensory Exploration', 'Dramatic Role Play', 'Tactile Spatial Freedom'],
    materials: '100% Mulberry Silk (8mm Habotai), Botanical Plant Dyes',
    dimensions: '90cm × 90cm each (Set of 4)',
    safetyCertifications: ['Chemical Dye Free', 'OEKO-TEX 100', 'ASTM Tested'],
    soundType: 'rattle',
    soundLabel: 'Silken Flutter Audio',
    featured: false,
    reviews: [
      {
        id: 'r9',
        author: 'Hannah Davies',
        rating: 5,
        date: 'October 3, 2026',
        title: 'The most versatile toy we own',
        comment: 'Used as an ocean for toy boats, a witch cape, and a fort roof. They float through the air like clouds.',
        verified: true
      }
    ]
  }
];

export const CATEGORIES: ToyCategory[] = [
  'All',
  'Wooden & Montessori',
  'STEM & Science',
  'Plush Companions',
  'Creative Arts',
  'Mechanical & Music'
];

export const AGE_GROUPS: AgeGroup[] = [
  'All',
  '0-2 Years',
  '3-5 Years',
  '6-8 Years',
  '9+ Years'
];
