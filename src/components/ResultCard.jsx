import { motion } from 'framer-motion'

const results = {
  workflow: {
    title: 'AI Workflow Automation',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8m-8 4h4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 14l2 2-2 2M15 16h5" />
      </svg>
    ),
    description:
      "Based on what you've told us, your biggest time-drain is around enquiries, follow-ups, and client communication. That's exactly what AI Workflow Automation handles.",
    includes: [
      'Automated enquiry responses in your tone, sent within seconds',
      'Client update workflows that run without anyone having to remember',
      'Follow-up sequences that close the loop — without chasing',
    ],
  },
  voice: {
    title: 'AI Voice Assistant',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    description:
      "Your phone line is costing you time and probably leads. An AI Voice Assistant answers every call, filters the noise, and makes sure the right people get through.",
    includes: [
      'Natural-sounding AI that answers calls 24/7 — even out of hours',
      'Smart screening — spam filtered, genuine callers handled properly',
      'Full transcripts logged to your system after every call',
    ],
  },
  custom: {
    title: 'Custom AI Build',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    description:
      "Your business is at a growth point where standard tools won't cut it. A Custom AI Build gives you something built specifically for the way your operation runs.",
    includes: [
      'Discovery workshop to map your exact workflow and automation opportunities',
      'Built from scratch on your tools, your tone, and your processes',
      'Handover with full documentation — your team stays in control',
    ],
  },
}

function getRecommendation(answers) {
  const [pain, , frustration] = answers
  if (pain === 'calls') return 'voice'
  if (frustration === 'growth') return 'custom'
  if (pain === 'enquiries' || pain === 'clients' || pain === 'admin') return 'workflow'
  if (frustration === 'leads') return 'workflow'
  if (frustration === 'humans') return 'workflow'
  if (frustration === 'phone') return 'voice'
  return 'workflow'
}

export default function ResultCard({ answers, onContinue }) {
  const key = getRecommendation(answers)
  const result = results[key]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div className="text-center mb-6">
        <p className="text-slate-400 text-sm mb-2 uppercase tracking-widest text-xs font-semibold">Your recommendation</p>
        <div className="inline-flex items-center gap-3 bg-blue-500/15 border border-blue-400/30 px-5 py-3 rounded-2xl">
          <span className="text-blue-400">{result.icon}</span>
          <span className="text-white font-semibold text-lg">{result.title}</span>
        </div>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed text-center mb-6 max-w-md mx-auto">
        {result.description}
      </p>

      <div className="bg-white/5 rounded-xl border border-white/10 p-5 mb-7">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-3">What this includes</p>
        <ul className="space-y-2.5">
          {result.includes.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
              <svg className="mt-0.5 shrink-0 text-blue-400" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        onClick={onContinue}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-blue-500 hover:bg-blue-400 text-white font-medium py-3.5 rounded-xl transition-colors duration-200 text-sm shadow-lg shadow-blue-500/20"
      >
        This sounds right — let's talk
        <svg className="inline ml-2" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.button>
    </motion.div>
  )
}
