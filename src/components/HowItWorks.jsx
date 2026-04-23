import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    description: 'One session to map your workflows and identify what AI can handle — and what it should leave alone.',
  },
  {
    number: '02',
    title: 'Build',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description: 'We build and train the AI on your business, your tone, and your tools. No templates, no shortcuts.',
  },
  {
    number: '03',
    title: 'Test',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: 'You review everything before it goes live. Nothing runs without your sign-off — every scenario, every edge case.',
  },
  {
    number: '04',
    title: 'Launch',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description: 'Your system goes live. We monitor for 30 days and tune as needed — so it gets sharper, not stale.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="bg-[#0F172A] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-light text-white mt-3 mb-4">
            From first conversation to live system — in weeks, not months.
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            A structured process that keeps you in control at every step.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center relative"
    >
      <div className="relative mb-5">
        <div className="w-[104px] h-[104px] rounded-full bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1">
          <div className="text-blue-400">{step.icon}</div>
          <span className="text-blue-400/50 text-xs font-mono">{step.number}</span>
        </div>
      </div>
      <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed px-2">{step.description}</p>
    </motion.div>
  )
}
