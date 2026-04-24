import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CalendlyEmbed() {
  const containerRef = useRef(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10"
    >
      <div className="text-center mb-6">
        <h3 className="text-white font-semibold text-xl mb-2">Book your discovery call</h3>
        <p className="text-slate-400 text-sm max-w-sm mx-auto">
          30 minutes. No pitch. Just a conversation about what AI could do for your business.
        </p>
      </div>

      <div
        ref={containerRef}
        className="calendly-inline-widget rounded-2xl overflow-hidden border border-white/10"
        data-url="https://calendly.com/ai_consult/30min"
        style={{ minWidth: '280px', height: '660px' }}
      />
    </motion.div>
  )
}
