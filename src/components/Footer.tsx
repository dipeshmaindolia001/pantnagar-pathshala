import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌱</span>
              <h3 className="text-xl font-extrabold font-heading tracking-tight text-white">
                Pantnagar Pathshala
              </h3>
            </div>
            <p className="text-primary-300 text-sm font-body leading-relaxed">
              Your Complete Companion for Pantnagar Entrance Exam Preparation.
              Learn • Practice • Crack Pantnagar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary-400 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm font-body">
              <li><Link href="/" className="text-primary-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/resources" className="text-primary-300 hover:text-white transition-colors">Free Resources</Link></li>
              <li><Link href="/dashboard" className="text-primary-300 hover:text-white transition-colors">Mock Tests</Link></li>
              <li><Link href="/mentorship" className="text-primary-300 hover:text-white transition-colors">Mentorship</Link></li>
            </ul>
          </div>

          {/* YouTube */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary-400 mb-3">
              YouTube Channel
            </h4>
            <p className="text-primary-300 text-sm font-body mb-3">
              Watch free lectures, PYQs, and strategy videos on YouTube.
            </p>
            <a
              href="https://www.youtube.com/playlist?list=PLDQGHsh1YpibGfSn4EzT2X5QUR_sDSDWj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch on YouTube
            </a>
          </div>
        </div>

        <div className="border-t border-primary-800 pt-6 text-center">
          <p className="text-primary-400 text-xs font-body">
            © 2025 Pantnagar Pathshala. All rights reserved. Made with ❤️ for Pantnagar University aspirants.
          </p>
        </div>
      </div>
    </footer>
  );
}
