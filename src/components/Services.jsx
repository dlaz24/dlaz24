import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const services = [
  {
    id: 'workflow',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8m-8 4h4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 14l2 2-2 2M15 16h5" />
      </svg>
    ),
    title: 'AI Workflow Automation',
    stat: 'Saves 2-3 hrs per person per day',
    description:
      'Replace manual, repetitive processes with AI workflows that run in the background. Enquiry responses, client updates, scheduling, follow-ups — handled automatically, in your voice.',
    expanded: [
      'Custom-trained on your tone, templates, and business context',
      'Connects to your existing tools — CRM, email, calendar, Slack',
      'Full audit trail — you see every action the AI takes',
      'Gradual rollout so your team stays in control throughout',
    ],
  },
  {
    id: 'voice',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'AI Voice Assistant',
    stat: 'Handles calls 24/7 — zero missed leads',
    description:
      'An AI that answers your phone before your team has to. Screens spam, routes genuine callers, takes messages out of hours, and logs everything — so nothing falls through the cracks.',
    expanded: [
      'Natural-sounding voice trained to represent your brand',
      'Smart routing — urgent calls escalated immediately',
      'Out-of-hours coverage with full message transcripts',
      'Integrates with your CRM and calendar for instant booking',
    ],
  },
  {
    id: 'custom',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Custom AI Builds',
    stat: 'Built around your exact workflow, not a template',
    description:
      'Something more specific? We scope, build, and deploy custom AI solutions tailored to your operation. If it is repetitive and predictable, we can automate it.',
    expanded: [
      'Discovery workshop to map exactly what to automate',
      'Built on proven AI infrastructure — no experimental tech',
      'Handover with documentation so your team understands it',
      'Ongoing support and iteration as your business grows',
    ],
  },
]

function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      <div className="p-7 flex flex-col gap-4 flex-1">
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
          {service.icon}
        </div>

        <div>
          <h3 className="text-[#1A1A2E] font-semibold text-lg mb-1">{service.title}</h3>
          <p className="text-blue-500 text-xs font-medium uppercase tracking-wide">{service.stat}</p>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden space-y-2 mt-1"
            >
              {service.expanded.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <svg className="mt-0.5 shrink-0 text-blue-400" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {point}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="px-7 pb-6">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1.5 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-150"
        >
          {open ? 'Show less' : 'Learn more'}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="services" className="bg-[#F7F5F0] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="text-blue-500 text-xs font-semibold uppercase tracking-widest">What We Build</span>
          <h2 className="text-3xl md:text-4xl font-light text-[#1A1A2E] mt-3 mb-4">
            AI that fits into your business,<br className="hidden sm:block" /> not the other way around.
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Every build starts with understanding how your business actually works — then we automate the parts that slow it down.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
