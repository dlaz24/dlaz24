import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  exit: { opacity: 0, x: -30, transition: { duration: 0.25, ease: 'easeIn' } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function QualifierStep({ question, options, selected, onSelect }) {
  return (
    <motion.div
      key={question}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h3
        variants={itemVariants}
        className="text-white text-xl md:text-2xl font-light mb-8 text-center"
      >
        {question}
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = selected === opt.value
          return (
            <motion.button
              key={opt.value}
              variants={itemVariants}
              onClick={() => onSelect(opt.value)}
              whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer group ${
                isSelected
                  ? 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/10'
                  : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/8'
              }`}
            >
              <div
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  isSelected ? 'border-blue-400 bg-blue-400' : 'border-white/30 group-hover:border-white/50'
                }`}
              >
                {isSelected && (
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium leading-snug transition-colors duration-200 ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  {opt.label}
                </p>
                {opt.sublabel && (
                  <p className="text-slate-500 text-xs mt-0.5">{opt.sublabel}</p>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
