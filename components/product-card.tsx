'use client'

import Image from 'next/image'
import { ArrowUpRight, Plus } from 'lucide-react'
import type { Product } from '@/lib/products'

type ProductCardProps = {
  product: Product
  onAdd: (product: Product) => void
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="product-image"
        />
        {product.badge ? <span className="product-badge">{product.badge}</span> : null}
        <button
          type="button"
          className="quick-add"
          onClick={() => onAdd(product)}
          aria-label={`Add ${product.name} to bag`}
        >
          <Plus aria-hidden="true" />
        </button>
      </div>
      <div className="product-copy">
        <div>
          <p className="product-category">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <span className="product-price">{formatPrice(product.price)}</span>
      </div>
      <p className="product-material">{product.material}</p>
      <button type="button" className="product-link" onClick={() => onAdd(product)}>
        Add to bag <ArrowUpRight aria-hidden="true" />
      </button>
    </article>
  )
}
