import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LeadForm({ onSubmitted }) {
  const [fields, setFields] = useState({ firstName: '', company: '', email: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState(false)

  function validate() {
    const e = {}
    if (!fields.firstName.trim()) e.firstName = 'Required'
    if (!fields.company.trim()) e.company = 'Required'
    if (!fields.email.trim()) {
      e.email = 'Required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = 'Enter a valid email'
    }
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    setServerError(false)

    try {
      const res = await fetch('https://formspree.io/f/xvzddrnp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          firstName: fields.firstName,
          company: fields.company,
          email: fields.email,
          notes: fields.notes,
        }),
      })
      if (res.ok) {
        setSubmitted(true)
        onSubmitted()
      } else {
        setServerError(true)
      }
    } catch {
      setServerError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (field) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 ${
      errors[field] ? 'border-red-400/60' : 'border-white/10 focus:border-blue-500/50'
    }`

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center py-8"
      >
        <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-400/30 flex items-center justify-center mx-auto mb-4">
          <svg className="text-green-400" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">You're all set</h3>
        <p className="text-slate-400 text-sm">We'll be in touch shortly. Scroll down to book your discovery call.</p>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      noValidate
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="First name"
            value={fields.firstName}
            onChange={e => { setFields(f => ({ ...f, firstName: e.target.value })); setErrors(er => ({ ...er, firstName: '' })) }}
            className={inputClass('firstName')}
          />
          <AnimatePresence>
            {errors.firstName && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1 ml-1">{errors.firstName}</motion.p>
            )}
          </AnimatePresence>
        </div>
        <div>
          <input
            type="text"
            placeholder="Company name"
            value={fields.company}
            onChange={e => { setFields(f => ({ ...f, company: e.target.value })); setErrors(er => ({ ...er, company: '' })) }}
            className={inputClass('company')}
          />
          <AnimatePresence>
            {errors.company && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1 ml-1">{errors.company}</motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <input
          type="email"
          placeholder="Work email"
          value={fields.email}
          onChange={e => { setFields(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })) }}
          className={inputClass('email')}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1 ml-1">{errors.email}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <textarea
          placeholder="Anything else you want us to know? (optional)"
          value={fields.notes}
          onChange={e => setFields(f => ({ ...f, notes: e.target.value }))}
          rows={3}
          className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 resize-none"
        />
      </div>

      {serverError && (
        <p className="text-red-400 text-sm text-center">Something went wrong — please try again or email us directly.</p>
      )}

      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={!submitting ? { scale: 1.01 } : {}}
        whileTap={!submitting ? { scale: 0.99 } : {}}
        className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-xl transition-colors duration-200 text-sm shadow-lg shadow-blue-500/20"
      >
        {submitting ? 'Sending...' : 'Send my details'}
      </motion.button>

      <p className="text-slate-500 text-xs text-center">No spam. No pitch calls. Just a conversation.</p>
    </motion.form>
  )
}
