'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Search, ShoppingBag } from 'lucide-react'
import { products, type Product, type ProductCategory } from '@/lib/products'
import { searchProducts } from '@/lib/search'
import { CartDialog } from '@/components/cart-dialog'
import { ContactForm } from '@/components/contact-form'
import { ProductCard } from '@/components/product-card'

type CartLine = { product: Product; quantity: number }
type SortOption = 'featured' | 'price-low' | 'price-high'

const categories: Array<'All objects' | ProductCategory> = [
  'All objects',
  'Decor',
  'Lighting',
  'Textiles',
  'Tableware',
]

const formatCount = (count: number) => String(count).padStart(2, '0')

export function Storefront() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('All objects')
  const [sort, setSort] = useState<SortOption>('featured')
  const [bag, setBag] = useState<CartLine[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const bagCount = bag.reduce((total, line) => total + line.quantity, 0)

  const visibleProducts = useMemo(() => {
    const matches = searchProducts(products, query).filter(
      (product) => category === 'All objects' || product.category === category,
    )

    if (sort === 'price-low') return [...matches].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') return [...matches].sort((a, b) => b.price - a.price)
    return matches
  }, [category, query, sort])

  function addToBag(product: Product) {
    setBag((current) => {
      const existing = current.find((line) => line.product.id === product.id)
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
        )
      }
      return [...current, { product, quantity: 1 }]
    })
  }

  function changeQuantity(id: string, change: number) {
    setBag((current) =>
      current
        .map((line) => line.product.id === id ? { ...line, quantity: line.quantity + change } : line)
        .filter((line) => line.quantity > 0),
    )
  }

  return (
    <>
      <div className="announcement-bar">
        <span>Thoughtful things, made to stay.</span>
        <span className="announcement-right">A considered home, one piece at a time <span aria-hidden="true">↗</span></span>
      </div>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Form and Field home">FORM<span>&</span>FIELD</a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#shop">Shop all</a>
          <a href="#story">Our point of view</a>
          <a href="#contact">Say hello</a>
        </nav>
        <button type="button" className="bag-button" onClick={() => setIsCartOpen(true)} aria-label={`Open shopping bag, ${bagCount} items`}>
          <ShoppingBag aria-hidden="true" />
          <span>Bag</span>
          <span className="bag-count" aria-live="polite">{formatCount(bagCount)}</span>
        </button>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> Objects for the lived-in home</p>
            <h1 id="hero-heading">A little more<br />meaning in the<br /><em>everyday.</em></h1>
            <p className="hero-description">Useful, beautiful things made with care. Collected slowly, chosen to stay.</p>
            <a className="button button-dark hero-button" href="#shop">Explore the collection <ArrowUpRight aria-hidden="true" /></a>
            <div className="hero-footnote"><span>01 — 08</span><span>Objects with a point of view</span></div>
          </div>
          <div className="hero-visual">
            <Image
              src="/images/vase.png"
              alt="Sculptural ivory ceramic vase in soft afternoon light"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 48vw"
              className="hero-image"
            />
            <div className="hero-image-caption">
              <span>Form, found.</span>
              <span>01 / 08</span>
            </div>
            <div className="hero-stamp" aria-hidden="true"><span>MADE</span><span>TO</span><span>MATTER</span><span className="stamp-dot">·</span></div>
          </div>
        </section>

        <section className="shop-section" id="shop" aria-labelledby="shop-heading">
          <div className="section-kicker"><span>01 / The collection</span><span>Considered, never complicated</span></div>
          <div className="shop-heading-row">
            <div>
              <p className="eyebrow">The good things</p>
              <h2 id="shop-heading">Objects to keep<span>.</span></h2>
            </div>
            <p className="shop-intro">A small collection of everyday pieces that feel right, work hard, and get better with time.</p>
          </div>

          <div className="catalog-tools">
            <div className="search-field">
              <Search aria-hidden="true" />
              <label className="sr-only" htmlFor="product-search">Search products</label>
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the collection"
                autoComplete="off"
              />
              <span className="search-hint">LOCAL SEARCH</span>
            </div>
            <label className="sort-field">
              <span>Sort by</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} aria-label="Sort products">
                <option value="featured">Relevance</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>

          <div className="catalog-filter-row">
            <div className="category-filters" role="group" aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`filter-chip${category === item ? ' is-active' : ''}`}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="result-count" aria-live="polite">{formatCount(visibleProducts.length)} pieces</span>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard product={product} onAdd={addToBag} key={product.id} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p className="eyebrow">Nothing found just yet</p>
              <h3>Try a different word.</h3>
              <p>Search by object, material, or category.</p>
              <button type="button" className="text-link" onClick={() => { setQuery(''); setCategory('All objects') }}>
                Clear search and filters
              </button>
            </div>
          )}
        </section>

        <section className="story-section" id="story" aria-labelledby="story-heading">
          <div className="story-mark" aria-hidden="true">F<span>&</span>F</div>
          <div className="story-copy">
            <p className="eyebrow">A slower kind of good</p>
            <h2 id="story-heading">Buy less.<br /><em>Feel more.</em></h2>
            <p>We believe the things around us should earn their place. That means honest materials, useful forms, and a little bit of delight in the details.</p>
            <a className="text-link" href="#contact">Get to know us <ArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className="story-note"><span>SMALL-BATCH FINDS</span><ArrowDown aria-hidden="true" /><span>MADE FOR EVERY DAY</span></div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="contact-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> A note goes a long way</p>
            <h2 id="contact-heading">We&apos;re all<br />ears<span>.</span></h2>
            <p>Need a little help choosing? Curious about a piece? Leave us a note and we&apos;ll be here to help.</p>
            <span className="contact-aside">GOOD CONVERSATIONS START HERE.</span>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#top">FORM<span>&</span>FIELD</a>
        <p>Useful things. Beautifully considered.</p>
        <div className="footer-right"><span>DEMO STORE · CHECKOUT DISABLED</span><a href="#top">Back to top ↑</a></div>
      </footer>

      <CartDialog
        isOpen={isCartOpen}
        lines={bag}
        onClose={() => setIsCartOpen(false)}
        onRemove={(id) => setBag((current) => current.filter((line) => line.product.id !== id))}
        onQuantityChange={changeQuantity}
      />
    </>
  )
}
