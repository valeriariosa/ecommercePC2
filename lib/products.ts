export type ProductCategory = 'Decor' | 'Lighting' | 'Textiles' | 'Tableware'

export type Product = {
  id: string
  name: string
  category: ProductCategory
  price: number
  image: string
  alt: string
  description: string
  material: string
  badge?: string
}

export const products: Product[] = [
  {
    id: 'forma-vase',
    name: 'Forma Vase',
    category: 'Decor',
    price: 68,
    image: '/images/vase.png',
    alt: 'Hand-thrown sculptural ivory ceramic vase',
    description: 'A quietly sculptural silhouette, shaped by hand and finished in a soft chalk glaze.',
    material: 'Stoneware · handmade',
    badge: 'Bestseller',
  },
  {
    id: 'sol-table-lamp',
    name: 'Sol Table Lamp',
    category: 'Lighting',
    price: 248,
    image: '/images/lamp.png',
    alt: 'Brushed brass table lamp with a rounded dome shade',
    description: 'A warm pool of light for slow evenings, in brushed brass with a considered profile.',
    material: 'Brushed brass · 28 cm',
    badge: 'New',
  },
  {
    id: 'everyday-linen-throw',
    name: 'Everyday Linen Throw',
    category: 'Textiles',
    price: 118,
    image: '/images/linen.png',
    alt: 'Natural flax linen throw with a softly fringed edge',
    description: 'Relaxed, breathable linen that softens with every wash and every season.',
    material: 'European flax linen',
  },
  {
    id: 'amber-tumbler-set',
    name: 'Amber Tumbler Set',
    category: 'Tableware',
    price: 48,
    image: '/images/glassware.png',
    alt: 'Pair of amber ribbed handblown glass tumblers',
    description: 'Two handblown tumblers that catch the light at breakfast and dinner alike.',
    material: 'Handblown glass · set of 2',
    badge: 'Set of 2',
  },
  {
    id: 'walnut-catchall',
    name: 'Walnut Catchall',
    category: 'Decor',
    price: 58,
    image: '/images/tray.png',
    alt: 'Low rounded walnut catchall tray with natural wood grain',
    description: 'A small landing place for the everyday essentials, carved from solid walnut.',
    material: 'Solid American walnut',
  },
  {
    id: 'daily-espresso-pair',
    name: 'Daily Espresso Pair',
    category: 'Tableware',
    price: 42,
    image: '/images/cups.png',
    alt: 'Two oatmeal speckled stoneware espresso cups',
    description: 'Hand-finished cups with a comfortable little handle and a speckled glaze.',
    material: 'Speckled stoneware · set of 2',
    badge: 'Set of 2',
  },
  {
    id: 'tide-vessel',
    name: 'Tide Vessel',
    category: 'Decor',
    price: 86,
    image: '/images/vase.png',
    alt: 'Rounded hand-finished ceramic vessel in an ivory glaze',
    description: 'A generous, organic vessel made for a branch, a few stems, or nothing at all.',
    material: 'Hand-finished ceramic',
  },
  {
    id: 'arc-task-light',
    name: 'Arc Task Light',
    category: 'Lighting',
    price: 198,
    image: '/images/lamp.png',
    alt: 'Minimal brass task light in a warm sunlit interior',
    description: 'Thoughtful directional light with a timeless brushed-metal finish.',
    material: 'Brushed brass · dimmable',
  },
]
