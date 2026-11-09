'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'
import type { Product } from '@/lib/products'

type CartLine = { product: Product; quantity: number }

type CartDialogProps = {
  isOpen: boolean
  lines: CartLine[]
  onClose: () => void
  onRemove: (id: string) => void
  onQuantityChange: (id: string, change: number) => void
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)

export function CartDialog({ isOpen, lines, onClose, onRemove, onQuantityChange }: CartDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      className="cart-dialog"
      aria-labelledby="cart-title"
      onClose={onClose}
    >
      <div className="cart-panel">
        <div className="cart-heading">
          <div>
            <p className="eyebrow">Your edit</p>
            <h2 id="cart-title">The bag<span>.</span></h2>
          </div>
          <button type="button" className="icon-button" onClick={() => dialogRef.current?.close()} aria-label="Close bag">
            <X aria-hidden="true" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-mark" aria-hidden="true">+</span>
            <p>Your bag is taking a little breather.</p>
            <button type="button" className="text-link" onClick={() => dialogRef.current?.close()}>
              Keep exploring
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-lines">
              {lines.map(({ product, quantity }) => (
                <li className="cart-line" key={product.id}>
                  <div className="cart-line-image">
                    <Image src={product.image} alt="" fill sizes="76px" />
                  </div>
                  <div className="cart-line-info">
                    <span className="cart-line-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <span>{formatPrice(product.price)}</span>
                    <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                      <button type="button" onClick={() => onQuantityChange(product.id, -1)} aria-label={`Decrease ${product.name} quantity`}>
                        <Minus aria-hidden="true" />
                      </button>
                      <span aria-live="polite">{quantity}</span>
                      <button type="button" onClick={() => onQuantityChange(product.id, 1)} aria-label={`Increase ${product.name} quantity`}>
                        <Plus aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <button type="button" className="remove-line" onClick={() => onRemove(product.id)} aria-label={`Remove ${product.name}`}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{formatPrice(total)}</strong></div>
              <p>Shipping and taxes calculated at checkout.</p>
              <button type="button" className="button button-dark" disabled>
                Checkout unavailable in demo
              </button>
              <p className="demo-note">This demo bag is temporary. No order or payment will be placed.</p>
            </div>
          </>
        )}
      </div>
    </dialog>
  )
}
