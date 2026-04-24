import { motion } from 'framer-motion'

export default function CalendlyEmbed() {
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

      <div className="rounded-2xl overflow-hidden border border-white/10">
        <iframe
          src="https://calendly.com/ai_consult/30min?embed_type=Inline&hide_event_type_details=0&hide_gdpr_banner=1"
          width="100%"
          height="660"
          frameBorder="0"
          title="Book a discovery call"
        />
      </div>
    </motion.div>
  )
}
