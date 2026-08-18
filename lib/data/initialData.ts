import { Product, FragranceNote } from '@/lib/types';

export const FRAGRANCE_NOTES: FragranceNote[] = [
  // TOP NOTES
  { id: 'note-1', name: 'Calabrian Bergamot', type: 'TOP', description: 'Crisp, cold-pressed radiant citrus from Reggio Calabria' },
  { id: 'note-2', name: 'Pink Peppercorn', type: 'TOP', description: 'Vibrant, spicy, and effervescent opening essence' },
  { id: 'note-3', name: 'Cardamom Pods', type: 'TOP', description: 'Warm, aromatic Guatemalan green cardamom' },
  { id: 'note-4', name: 'French Lavender', type: 'TOP', description: 'Wild organic high-altitude Provençal lavender' },
  { id: 'note-5', name: 'Mandarin Zest', type: 'TOP', description: 'Sun-drenched Sicilian red mandarin oil' },
  { id: 'note-6', name: 'Bitter Almond', type: 'TOP', description: 'Intriguing, creamy marzipan and roasted almond' },

  // HEART NOTES
  { id: 'note-7', name: 'Damask Rose Absolute', type: 'HEART', description: 'Hand-harvested May rose petals from Grasse' },
  { id: 'note-8', name: 'Sambac Jasmine', type: 'HEART', description: 'Night-blooming, narcotic royal jasmine absolute' },
  { id: 'note-9', name: 'Florentine Orris Root', type: 'HEART', description: 'Aged 3-year noble Tuscan iris butter' },
  { id: 'note-10', name: 'Cinnamon Bark', type: 'HEART', description: 'Sensual Ceylon cinnamon bark extraction' },
  { id: 'note-11', name: 'Black Orchid', type: 'HEART', description: 'Velvety, dark, rare botanical complexity' },
  { id: 'note-12', name: 'Smoked Birch Tar', type: 'HEART', description: 'Dry, leathery, and sophisticated woody resonance' },

  // BASE NOTES
  { id: 'note-13', name: 'Cambodian Oud', type: 'BASE', description: '25-year aged wild Agarwood resin with honeyed smoke' },
  { id: 'note-14', name: 'Golden Amber Resin', type: 'BASE', description: 'Glowing warmth, balsamic benzoin, and lasting sillage' },
  { id: 'note-15', name: 'Bourbon Vanilla Bean', type: 'BASE', description: 'Dark, smoky Madagascar vanilla CO2 extract' },
  { id: 'note-16', name: 'Mysore Sandalwood', type: 'BASE', description: 'Sacred, velvety vintage Indian Santalum Album' },
  { id: 'note-17', name: 'Cashmere White Musk', type: 'BASE', description: 'Silk skin accord with 16h+ clean longevity' },
  { id: 'note-18', name: 'Smoked Tobacco Leaf', type: 'BASE', description: 'Aromatic cured Cuban tobacco and dark coumarin' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    legacyId: 1,
    name: 'Santal Impérial',
    slug: 'santal-imperial',
    description: 'An ode to nocturnal grandeur. Santal Impérial captures the hypnotic mystery of sacred vintage Mysore sandalwood bathed in warm golden amber and spiked with spicy Calabrian bergamot. A bespoke signature macerated for 180 days in French oak casks.',
    shortDescription: 'Vintage Mysore sandalwood, golden amber & cold-pressed bergamot.',
    brand: 'Aura Sovereign Haute Parfumerie',
    price: 8500,
    compareAtPrice: 10200,
    stock: 35,
    sku: 'ALD-SAN-001',
    status: 'ACTIVE',
    featured: true,
    is3DSupported: true,
    fragranceFamily: 'Woody Amber',
    intensity: 'Extrait de Parfum (30% Concentration)',
    gender: 'Unisex',
    volume: '100ml',
    bottleColor: '#C6A15B',
    createdAt: new Date().toISOString(),
    images: [
      { id: 'img-1', productId: 'prod-1', imageUrl: '/Perfume/generated/hero_santal.jpg', altText: 'Santal Impérial crystal flacon', sortOrder: 0, isPrimary: true },
      { id: 'img-2', productId: 'prod-1', imageUrl: '/Perfume/generated/atelier_craft.jpg', altText: 'Santal Impérial distillation atelier', sortOrder: 1, isPrimary: false },
    ],
    variants: [
      { id: 'var-1', productId: 'prod-1', size: '50ml', price: 5200, sku: 'ALD-SAN-50', stock: 20 },
      { id: 'var-2', productId: 'prod-1', size: '100ml', price: 8500, sku: 'ALD-SAN-100', stock: 15 },
      { id: 'var-3', productId: 'prod-1', size: '200ml Flacon d’Art', price: 14500, sku: 'ALD-SAN-200', stock: 5 },
    ],
    notes: [
      { note: FRAGRANCE_NOTES[0] }, // Bergamot
      { note: FRAGRANCE_NOTES[1] }, // Pink Pepper
      { note: FRAGRANCE_NOTES[6] }, // Damask Rose
      { note: FRAGRANCE_NOTES[12] }, // Oud
      { note: FRAGRANCE_NOTES[15] }, // Mysore Sandalwood
      { note: FRAGRANCE_NOTES[13] }, // Amber
    ],
  },
  {
    id: 'prod-2',
    legacyId: 2,
    name: 'Oud Nocturne',
    slug: 'oud-nocturne',
    description: 'Born under the midnight canopy of an ancient cedar grove. Oud Nocturne blends rare 25-year aged Cambodian agarwood with smoked cured tobacco leaves and delicate damask rose. Mystical, deep, and impossibly seductive on skin.',
    shortDescription: 'Aged Cambodian oud, dark rose petals & aromatic cured tobacco.',
    brand: 'Aura Sovereign Haute Parfumerie',
    price: 11200,
    compareAtPrice: 13500,
    stock: 24,
    sku: 'ALD-OUD-002',
    status: 'ACTIVE',
    featured: true,
    is3DSupported: true,
    fragranceFamily: 'Smoky Resinous Oud',
    intensity: 'Pure Parfum Extrait',
    gender: 'Unisex',
    volume: '100ml',
    bottleColor: '#181716',
    createdAt: new Date().toISOString(),
    images: [
      { id: 'img-3', productId: 'prod-2', imageUrl: '/Perfume/generated/oud_nocturne.jpg', altText: 'Oud Nocturne smoked glass flacon', sortOrder: 0, isPrimary: true },
      { id: 'img-4', productId: 'prod-2', imageUrl: '/Perfume/generated/atelier_craft.jpg', altText: 'Oud Nocturne extraction laboratory', sortOrder: 1, isPrimary: false },
    ],
    variants: [
      { id: 'var-4', productId: 'prod-2', size: '50ml', price: 6800, sku: 'ALD-OUD-50', stock: 12 },
      { id: 'var-5', productId: 'prod-2', size: '100ml', price: 11200, sku: 'ALD-OUD-100', stock: 12 },
    ],
    notes: [
      { note: FRAGRANCE_NOTES[2] }, // Cardamom
      { note: FRAGRANCE_NOTES[10] }, // Black Orchid
      { note: FRAGRANCE_NOTES[12] }, // Cambodian Oud
      { note: FRAGRANCE_NOTES[17] }, // Smoked Tobacco
    ],
  },
  {
    id: 'prod-3',
    legacyId: 3,
    name: 'Rose Éthérée',
    slug: 'rose-etheree',
    description: 'A modern reinvention of royal French floralcy. Rose Éthérée pairs dawn-harvested Grasse Centifolia rose petals with crystalline pink peppercorn and a cashmere base of white musk and bourbon vanilla. Sensual, luminous, and timeless.',
    shortDescription: 'Grasse Centifolia rose, sparkling pink pepper & soft cashmere musk.',
    brand: 'Aura Sovereign Haute Parfumerie',
    price: 7400,
    compareAtPrice: 8900,
    stock: 40,
    sku: 'ALD-ROS-003',
    status: 'ACTIVE',
    featured: true,
    is3DSupported: true,
    fragranceFamily: 'Floral Cashmere',
    intensity: 'Extrait de Parfum',
    gender: 'Feminine / Unisex',
    volume: '100ml',
    bottleColor: '#E29578',
    createdAt: new Date().toISOString(),
    images: [
      { id: 'img-5', productId: 'prod-3', imageUrl: '/Perfume/generated/rose_etheree.jpg', altText: 'Rose Éthérée faceted crystal flacon', sortOrder: 0, isPrimary: true },
      { id: 'img-6', productId: 'prod-3', imageUrl: '/Perfume/generated/atelier_craft.jpg', altText: 'Rose Éthérée petal extraction', sortOrder: 1, isPrimary: false },
    ],
    variants: [
      { id: 'var-6', productId: 'prod-3', size: '50ml', price: 4600, sku: 'ALD-ROS-50', stock: 25 },
      { id: 'var-7', productId: 'prod-3', size: '100ml', price: 7400, sku: 'ALD-ROS-100', stock: 15 },
    ],
    notes: [
      { note: FRAGRANCE_NOTES[1] }, // Pink Pepper
      { note: FRAGRANCE_NOTES[6] }, // Damask Rose
      { note: FRAGRANCE_NOTES[8] }, // Orris Root
      { note: FRAGRANCE_NOTES[14] }, // Bourbon Vanilla
      { note: FRAGRANCE_NOTES[16] }, // White Musk
    ],
  },
  {
    id: 'prod-4',
    legacyId: 4,
    name: 'Bleu Céleste',
    slug: 'bleu-celeste',
    description: 'An aquatic masterpiece capturing the azure Mediterranean breeze meeting coastal cedar cliffs. Crisp marine ozone, cold-pressed bergamot zest, and grey ambergris create an exhilarating, sovereign aura.',
    shortDescription: 'Mediterranean marine ozone, crisp bergamot & grey ambergris.',
    brand: 'Aura Sovereign Haute Parfumerie',
    price: 6900,
    compareAtPrice: 8200,
    stock: 50,
    sku: 'ALD-BLE-004',
    status: 'ACTIVE',
    featured: true,
    is3DSupported: true,
    fragranceFamily: 'Aquatic Mineral Wood',
    intensity: 'Eau de Parfum Intense',
    gender: 'Masculine / Unisex',
    volume: '100ml',
    bottleColor: '#2B6CB0',
    createdAt: new Date().toISOString(),
    images: [
      { id: 'img-7', productId: 'prod-4', imageUrl: '/Perfume/generated/bleu_celeste.jpg', altText: 'Bleu Céleste sapphire crystal bottle', sortOrder: 0, isPrimary: true },
      { id: 'img-8', productId: 'prod-4', imageUrl: '/Perfume/generated/atelier_craft.jpg', altText: 'Bleu Céleste atelier essences', sortOrder: 1, isPrimary: false },
    ],
    variants: [
      { id: 'var-8', productId: 'prod-4', size: '50ml', price: 4200, sku: 'ALD-BLE-50', stock: 30 },
      { id: 'var-9', productId: 'prod-4', size: '100ml', price: 6900, sku: 'ALD-BLE-100', stock: 20 },
    ],
    notes: [
      { note: FRAGRANCE_NOTES[0] }, // Bergamot
      { note: FRAGRANCE_NOTES[3] }, // Lavender
      { note: FRAGRANCE_NOTES[11] }, // Smoked Birch
      { note: FRAGRANCE_NOTES[16] }, // White Musk
    ],
  },
  {
    id: 'prod-5',
    legacyId: 5,
    name: 'Ambre Doré',
    slug: 'ambre-dore',
    description: 'Pure liquid warmth. Ambre Doré envelops the wearer in rich Siam benzoin tears, spiced Ceylon cinnamon bark, and smoky Madagascar vanilla bourbon. A radiant armor of luxury.',
    shortDescription: 'Golden Siam benzoin resin, cinnamon bark & Madagascar vanilla.',
    brand: 'Aura Sovereign Haute Parfumerie',
    price: 9800,
    compareAtPrice: 11900,
    stock: 18,
    sku: 'ALD-AMB-005',
    status: 'ACTIVE',
    featured: false,
    is3DSupported: true,
    fragranceFamily: 'Gourmand Amber',
    intensity: 'Extrait de Parfum (32%)',
    gender: 'Unisex',
    volume: '100ml',
    bottleColor: '#D97706',
    createdAt: new Date().toISOString(),
    images: [
      { id: 'img-9', productId: 'prod-5', imageUrl: '/Perfume/generated/hero_santal.jpg', altText: 'Ambre Doré gold flacon', sortOrder: 0, isPrimary: true },
    ],
    variants: [
      { id: 'var-10', productId: 'prod-5', size: '100ml', price: 9800, sku: 'ALD-AMB-100', stock: 18 },
    ],
    notes: [
      { note: FRAGRANCE_NOTES[2] }, // Cardamom
      { note: FRAGRANCE_NOTES[9] }, // Cinnamon
      { note: FRAGRANCE_NOTES[13] }, // Amber Resin
      { note: FRAGRANCE_NOTES[14] }, // Bourbon Vanilla
    ],
  },
  {
    id: 'prod-6',
    legacyId: 6,
    name: 'Cuir Majestueux',
    slug: 'cuir-majestueux',
    description: 'An authoritative symphony of fine aged saddle leather, smoked birch tar, and rare Florentine orris root. Refined, aristocratic, and unforgettable on skin.',
    shortDescription: 'Tuscan saddle leather, smoked birch tar & noble Florentine iris.',
    brand: 'Aura Sovereign Haute Parfumerie',
    price: 10500,
    compareAtPrice: 12800,
    stock: 22,
    sku: 'ALD-CUI-006',
    status: 'ACTIVE',
    featured: false,
    is3DSupported: true,
    fragranceFamily: 'Leathery Woods',
    intensity: 'Extrait de Parfum',
    gender: 'Unisex',
    volume: '100ml',
    bottleColor: '#4A3525',
    createdAt: new Date().toISOString(),
    images: [
      { id: 'img-10', productId: 'prod-6', imageUrl: '/Perfume/generated/oud_nocturne.jpg', altText: 'Cuir Majestueux bronze flacon', sortOrder: 0, isPrimary: true },
    ],
    variants: [
      { id: 'var-11', productId: 'prod-6', size: '100ml', price: 10500, sku: 'ALD-CUI-100', stock: 22 },
    ],
    notes: [
      { note: FRAGRANCE_NOTES[1] }, // Pink Pepper
      { note: FRAGRANCE_NOTES[8] }, // Orris Root
      { note: FRAGRANCE_NOTES[11] }, // Smoked Birch
      { note: FRAGRANCE_NOTES[17] }, // Smoked Tobacco
    ],
  },
];
