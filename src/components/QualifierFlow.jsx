import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import QualifierStep from './QualifierStep'
import ResultCard from './ResultCard'
import LeadForm from './LeadForm'
import CalendlyEmbed from './CalendlyEmbed'

const steps = [
  {
    question: 'Which area costs you the most time?',
    options: [
      { value: 'enquiries', label: 'Responding to enquiries and leads', sublabel: 'Manually replying to every new contact' },
      { value: 'clients', label: 'Updating clients and chasing progress', sublabel: 'Keeping everyone in the loop takes forever' },
      { value: 'calls', label: 'Managing calls and filtering interruptions', sublabel: 'The phone never stops — and half of it is noise' },
      { value: 'admin', label: 'Scheduling, confirmations and admin', sublabel: 'Back-and-forth booking and reminders' },
      { value: 'other', label: 'Something else', sublabel: 'Tell us more in the next step' },
    ],
  },
  {
    question: 'What does your business look like?',
    options: [
      { value: 'small', label: 'Small team', sublabel: '1-10 people' },
      { value: 'growing', label: 'Growing business', sublabel: '10-50 people' },
      { value: 'established', label: 'Established company', sublabel: '50+ people' },
    ],
  },
  {
    question: "What's your biggest frustration right now?",
    options: [
      { value: 'leads', label: "We're losing leads because we can't respond fast enough", sublabel: 'Speed matters and we keep missing the window' },
      { value: 'humans', label: "My team spends too much time on things that don't need a human", sublabel: 'Valuable people doing low-value work' },
      { value: 'phone', label: "Our phone line is a mess — spam, missed calls, no system", sublabel: 'No visibility, no process, constant interruptions' },
      { value: 'growth', label: "We're growing but our processes haven't kept up", sublabel: 'What worked at 5 people breaks at 20' },
    ],
  },
]

const TOTAL_STEPS = steps.length

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-400 text-xs font-medium">Step {current} of {total}</span>
        <span className="text-blue-400 text-xs font-medium">{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export default function QualifierFlow() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)
  const [direction, setDirection] = useState(1)

  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' })

  function handleSelect(value) {
    setSelected(value)
  }

  function handleNext() {
    if (!selected) return
    const newAnswers = [...answers, selected]
    setDirection(1)

    if (step < TOTAL_STEPS - 1) {
      setAnswers(newAnswers)
      setSelected(null)
      setStep(s => s + 1)
    } else {
      setAnswers(newAnswers)
      setShowResult(true)
    }
  }

  function handleBack() {
    if (step === 0) return
    setDirection(-1)
    setSelected(answers[step - 1] || null)
    setAnswers(a => a.slice(0, -1))
    setStep(s => s - 1)
  }

  function handleRestart() {
    setStep(0)
    setAnswers([])
    setSelected(null)
    setShowResult(false)
    setShowForm(false)
    setShowCalendly(false)
    setDirection(1)
  }

  const slideVariants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60, transition: { duration: 0.25, ease: 'easeIn' } }),
  }

  return (
    <section id="qualifier" className="bg-[#0A1628] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 24 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">Find Your Fit</span>
          <h2 className="text-3xl md:text-4xl font-light text-white mt-3 mb-4">
            Tell us about your business.
            <br className="hidden sm:block" />
            <span className="text-slate-400">We'll tell you what we'd build.</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            Three quick questions — then a recommendation tailored to where your business actually loses time.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-[#0F1F3D] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-blue-950/50">
            <AnimatePresence mode="wait" custom={direction}>
              {!showResult && !showForm && !showCalendly && (
                <motion.div
                  key={`step-${step}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <ProgressBar current={step + 1} total={TOTAL_STEPS} />
                  <QualifierStep
                    question={steps[step].question}
                    options={steps[step].options}
                    selected={selected}
                    onSelect={handleSelect}
                  />

                  <div className="flex items-center justify-between mt-8">
                    {step > 0 ? (
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm font-medium transition-colors duration-150"
                      >
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Back
                      </button>
                    ) : <div />}

                    <motion.button
                      onClick={handleNext}
                      disabled={!selected}
                      whileHover={selected ? { scale: 1.02 } : {}}
                      whileTap={selected ? { scale: 0.98 } : {}}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-blue-500/20"
                    >
                      {step < TOTAL_STEPS - 1 ? 'Next' : 'See my recommendation'}
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {showResult && !showForm && !showCalendly && (
                <motion.div
                  key="result"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <ResultCard answers={answers} onContinue={() => setShowForm(true)} />
                  <div className="mt-5 text-center">
                    <button
                      onClick={handleRestart}
                      className="text-slate-500 hover:text-slate-400 text-xs transition-colors"
                    >
                      Start again
                    </button>
                  </div>
                </motion.div>
              )}

              {showForm && !showCalendly && (
                <motion.div
                  key="form"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="mb-6 text-center">
                    <h3 className="text-white font-semibold text-xl mb-1">Leave your details</h3>
                    <p className="text-slate-400 text-sm">We'll reach out within one business day.</p>
                  </div>
                  <LeadForm onSubmitted={() => setShowCalendly(true)} />
                </motion.div>
              )}

              {showCalendly && (
                <motion.div
                  key="calendly"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <CalendlyEmbed />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
