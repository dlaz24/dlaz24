export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2.5">
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4 L28 28 H4 Z" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinejoin="round"/>
              <circle cx="16" cy="12" r="2.5" fill="#3B82F6"/>
            </svg>
            <div>
              <p className="text-white font-semibold leading-none">Ascend AI Consultancy</p>
              <p className="text-slate-500 text-xs mt-0.5">AI that works the way your business does.</p>
            </div>
          </div>

          <a
            href="mailto:lazarddani@gmail.com"
            className="text-slate-400 hover:text-white transition-colors duration-150"
          >
            lazarddani@gmail.com
          </a>

          <p className="text-slate-500 text-xs">&copy; 2026 Ascend AI Consultancy</p>
        </div>
      </div>
    </footer>
  )
}
