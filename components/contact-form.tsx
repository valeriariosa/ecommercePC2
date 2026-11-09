'use client'

import { useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Your name
        <input name="name" autoComplete="name" placeholder="Name" required />
      </label>
      <label>
        Email address
        <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </label>
      <label className="message-field">
        What&apos;s on your mind?
        <textarea name="message" rows={4} placeholder="Tell us a little about it…" required />
      </label>
      <div className="contact-submit-row">
        <button className="button button-dark" type="submit">
          Send a note <ArrowUpRight aria-hidden="true" />
        </button>
        <span className="form-demo-note">Demo only — messages aren&apos;t sent or stored.</span>
      </div>
      {submitted ? (
        <p className="form-feedback" role="status">
          Thanks for trying the form. Connect an email integration to enable message delivery.
        </p>
      ) : null}
    </form>
  )
}
