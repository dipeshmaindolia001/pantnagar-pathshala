import Link from "next/link";
import Image from "next/image";

/* ─── Static data ─────────────────────────────────────────────────── */

const stats = [
  { value: "500+", label: "Students Helped", icon: "🎓" },
  { value: "1000+", label: "Mock Tests Attempted", icon: "📝" },
  { value: "50+", label: "Free Resources", icon: "📚" },
  { value: "95%", label: "Positive Feedback", icon: "⭐" },
];

const journey = [
  { icon: "🎬", step: "Learn", desc: "Video lectures, PYQs & exam strategies" },
  { icon: "📝", step: "Practice", desc: "Full-length mock tests & subject quizzes" },
  { icon: "📊", step: "Improve", desc: "Analyze mistakes & strengthen weak areas" },
  { icon: "🏆", step: "Succeed", desc: "Get into your dream college at Pantnagar" },
];

const freeVideos = [
  {
    id: "PLDQGHsh1YpibGfSn4EzT2X5QUR_sDSDWj",
    type: "playlist",
    title: "Previous Year Questions Playlist",
    desc: "Complete PYQ discussion playlist — all years covered",
    url: "https://www.youtube.com/playlist?list=PLDQGHsh1YpibGfSn4EzT2X5QUR_sDSDWj",
    thumb: "https://i.ytimg.com/vi/VG2XlJpoeJs/hqdefault.jpg",
    tag: "PYQ Series",
    color: "from-red-600 to-red-800",
  },
  {
    id: "VG2XlJpoeJs",
    type: "video",
    title: "Physics Most Important Questions",
    desc: "Most expected physics questions for Pantnagar exam",
    url: "https://youtu.be/VG2XlJpoeJs?si=UIK-WU6nHBIG-utl",
    thumb: "https://i.ytimg.com/vi/VG2XlJpoeJs/hqdefault.jpg",
    tag: "Physics",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "rjL-ZeuV6-M",
    type: "video",
    title: "100 Mental Aptitude Questions",
    desc: "Important aptitude practice questions for exam",
    url: "https://youtu.be/rjL-ZeuV6-M?si=q12L2O8-jkDv93dI",
    thumb: "https://i.ytimg.com/vi/rjL-ZeuV6-M/hqdefault.jpg",
    tag: "Aptitude",
    color: "from-purple-600 to-purple-800",
  },
  {
    id: "mUYMT7Xunyk",
    type: "video",
    title: "Preparation Strategy & Exam Guidance",
    desc: "Preparation strategy and complete exam guidance",
    url: "https://youtu.be/mUYMT7Xunyk?si=8Ui4OMxF2VTATNzz",
    thumb: "https://i.ytimg.com/vi/mUYMT7Xunyk/hqdefault.jpg",
    tag: "Strategy",
    color: "from-green-600 to-green-800",
  },
];

const testimonials = [
  "Screenshot 2026-06-08 204157.png",
  "Screenshot 2026-06-08 204742.png",
  "Screenshot 2026-06-08 204849.png",
  "Screenshot 2026-06-08 205014.png",
  "Screenshot 2026-06-08 205039.png",
  "Screenshot 2026-06-08 205209.png",
  "Screenshot 2026-06-08 205246.png",
  "Screenshot 2026-06-08 205321.png",
  "Screenshot 2026-06-08 205406.png",
  "Screenshot 2026-06-08 205417.png",
  "Screenshot 2026-06-08 205438.png",
  "Screenshot 2026-06-08 205524.png",
  "Screenshot 2026-06-08 205542.png",
  "Screenshot 2026-06-08 205553.png",
  "Screenshot 2026-06-08 205609.png",
];

const roadmap = [
  { step: 1, title: "Watch Free Videos", desc: "Start with PYQ playlist & strategy video on YouTube", icon: "🎬", color: "bg-red-100 text-red-700 border-red-200" },
  { step: 2, title: "Practice PYQs", desc: "Solve previous year questions to understand exam pattern", icon: "📖", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { step: 3, title: "Attempt Mock Tests", desc: "Take full-length timed mock tests to build exam stamina", icon: "📝", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { step: 4, title: "Take Mentorship", desc: "Get personalized guidance from our expert mentors", icon: "🎯", color: "bg-saffron-100 text-saffron-700 border-saffron-200" },
  { step: 5, title: "Crack Pantnagar!", desc: "Walk into the exam hall with full confidence and score big", icon: "🏆", color: "bg-green-100 text-green-700 border-green-200" },
];

/* ─── Page ─────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-green-950 via-primary-900 to-emerald-800 text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Background blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-saffron-500 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-400 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary-300 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-500/20 border border-saffron-400/30 text-saffron-300 text-xs sm:text-sm font-semibold mb-6 animate-fade-in-up">
            <span>🌱</span>
            <span>GBPUAT Pantnagar Entrance Preparation</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading leading-tight mb-4 animate-fade-in-up">
            PANTNAGAR
            <span className="block text-saffron-400">PATHSHALA</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-emerald-100/80 font-body mb-4 animate-fade-in-up">
            The Most Comprehensive Platform for Pantnagar Entrance Exam Preparation
          </p>
          <p className="text-saffron-300 font-semibold text-base sm:text-lg mb-10 animate-fade-in-up">
            Learn • Practice • Crack Pantnagar
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up">
            <Link
              href="/resources"
              className="px-8 py-4 rounded-xl text-base font-bold bg-saffron-500 hover:bg-saffron-600 text-white shadow-xl hover:shadow-saffron-500/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              🚀 Start Free Preparation
            </Link>
            <Link
              href="/sign-up"
              className="px-8 py-4 rounded-xl text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/25 hover:bg-white/20 text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              📝 Attempt Mock Test
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in-up">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-card-dark rounded-2xl p-4 text-center border border-white/10"
              >
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-emerald-300 font-body mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,96.25,142.2,77.59,321.39,56.44Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ── SECTION 1: WHY PANTNAGAR PATHSHALA ───────────────────── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Why Choose Us?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary-900">
              Your Complete Learning Journey
            </h2>
            <p className="mt-3 text-gray-500 font-body text-lg max-w-xl mx-auto">
              A proven 4-step system to crack Pantnagar University entrance exam
            </p>
          </div>

          {/* Journey cards with arrow connector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 relative">
            {journey.map((item, i) => (
              <div key={item.step} className="relative flex flex-col items-center text-center lg:px-4">
                {/* Arrow connector (desktop) */}
                {i < journey.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[75%] w-[50%] z-10">
                    <div className="flex items-center">
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-primary-400 to-saffron-400" />
                      <div className="text-saffron-500 text-lg ml-1">›</div>
                    </div>
                  </div>
                )}
                <div className="glass-card rounded-2xl p-6 w-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-50 flex items-center justify-center text-3xl shadow-sm">
                    {item.icon}
                  </div>
                  <div className="inline-flex items-center justify-center w-7 h-7 bg-primary-700 text-white rounded-full text-xs font-bold mb-2">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-extrabold font-heading text-primary-900 mb-2">{item.step}</h3>
                  <p className="text-sm text-gray-600 font-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: FREE RESOURCES ─────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              100% Free
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary-900">
              Free Preparation Resources
            </h2>
            <p className="mt-3 text-gray-500 font-body text-lg max-w-xl mx-auto">
              Start your preparation right now — no sign-up needed
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeVideos.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                {/* Thumbnail */}
                <div className="relative h-40 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.thumb}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${v.color} opacity-60`} />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-red-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Tag */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 text-primary-800 text-xs font-bold rounded-full">
                    {v.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-primary-900 text-sm leading-snug mb-1 group-hover:text-primary-700 transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-body">{v.desc}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-primary-700 hover:bg-primary-800 transition-colors shadow-lg hover:shadow-xl"
            >
              📚 View All Free Resources →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 (moved): TESTIMONIALS ─────────────────────── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Real Students · Real Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary-900">
              What Students Say About
              <span className="text-saffron-600"> Pantnagar Pathshala</span>
            </h2>
            <p className="mt-3 text-gray-500 font-body max-w-xl mx-auto">
              Hundreds of students have benefited from our resources and mock tests
            </p>
          </div>

          {/* Featured YouTube video */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/zL4xXzZuVww"
                  title="Student Paper Response — Pantnagar Pathshala"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 font-body mt-3">
              🎬 Students share their paper experience &amp; results
            </p>
          </div>

          {/* Screenshot gallery */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {testimonials.map((filename, i) => (
              <div
                key={filename}
                className="break-inside-avoid glass-card rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Image
                  src={`/testimonials/${filename}`}
                  alt={`Student testimonial ${i + 1}`}
                  width={600}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: MOCK TESTS ─────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-saffron-400 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-primary-400 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-saffron-500/20 text-saffron-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-saffron-500/30">
              Exam-Ready Practice
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
              Mock Tests — Just Like the Real Exam
            </h2>
            <p className="mt-3 text-emerald-200/70 font-body text-lg max-w-xl mx-auto">
              Timed, full-length mock tests with instant scoring and relative ranking
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {[
              { icon: "📋", title: "Full Length Mock Tests", desc: "200 MCQs · 3 hours · Real exam pattern for PCB & PCM groups" },
              { icon: "🎯", title: "Subject Practice Tests", desc: "100 MCQs · 90 min · Focused Biology, Chemistry & Physics mocks" },
              { icon: "⚡", title: "Exam Simulation", desc: "Auto-submit, instant results, correct/wrong breakdown & ranking" },
            ].map((card) => (
              <div key={card.title} className="glass-card-dark rounded-2xl p-6 text-center border border-white/10 hover:border-saffron-400/30 hover:shadow-saffron-900/30 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-lg font-bold font-heading text-white mb-2">{card.title}</h3>
                <p className="text-sm text-emerald-300/80 font-body">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-lg font-bold bg-saffron-500 hover:bg-saffron-600 text-white shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              📝 Attempt Mock Test →
            </Link>
            <p className="mt-3 text-emerald-300/60 text-sm font-body">
              Sign up free · No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: MENTORSHIP ─────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <span className="inline-block px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Personalized Guidance
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary-900 mb-4">
                1-on-1 Mentorship <br />
                <span className="text-saffron-600">Made for You</span>
              </h2>
              <p className="text-gray-600 font-body text-lg mb-6">
                Get personal guidance tailored to your preparation level, strengths, and target course.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "📅 Preparation Planning — Custom study schedule",
                  "📚 Resource Selection — What to study, what to skip",
                  "❓ Doubt Solving — 1-on-1 doubt clearing sessions",
                  "🧭 Exam Strategy — Attempt order, time management",
                  "💪 Motivation & Accountability — Regular check-ins",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-gray-700">
                    <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-primary-100 flex items-center justify-center text-xs text-primary-700 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/mentorship"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-primary-700 hover:bg-primary-800 transition-colors shadow-lg hover:shadow-xl"
              >
                🎯 Apply for Mentorship →
              </Link>
            </div>

            {/* Right card */}
            <div className="relative">
              <div className="glass-card rounded-3xl p-8 border border-gray-100 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-primary-50 flex items-center justify-center text-4xl mb-4">
                    🎓
                  </div>
                  <h3 className="text-2xl font-extrabold font-heading text-primary-900">Join Mentorship</h3>
                  <p className="text-gray-500 font-body text-sm mt-1">Limited seats available</p>
                </div>
                <div className="space-y-3 text-sm font-body text-gray-700">
                  {[
                    ["Students Mentored", "50+"],
                    ["Session Duration", "60 min/session"],
                    ["Response Time", "Within 24 hrs"],
                    ["Availability", "Online (WhatsApp/Video)"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-bold text-primary-800">{val}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/mentorship"
                  className="block w-full mt-6 text-center px-6 py-3 rounded-xl text-sm font-bold text-white bg-saffron-500 hover:bg-saffron-600 transition-colors shadow-md"
                >
                  Apply Now →
                </Link>
              </div>
              {/* Decorative badges */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200 shadow-sm animate-pulse-glow">
                ✅ Enrolments Open
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── SECTION 6: YOUTUBE HUB ────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              YouTube Learning Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary-900">
              Learn on YouTube
            </h2>
            <p className="mt-3 text-gray-500 font-body max-w-xl mx-auto">
              Watch free lectures, PYQ discussions, and exam strategies
            </p>
          </div>

          {/* Embedded videos grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              { id: "VG2XlJpoeJs", title: "Physics Most Important Questions" },
              { id: "rjL-ZeuV6-M", title: "100 Mental Aptitude Questions" },
              { id: "mUYMT7Xunyk", title: "Preparation Strategy & Guidance" },
              { id: "zL4xXzZuVww", title: "Student Paper Response & Feedback" },
            ].map((v) => (
              <div key={v.id} className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-3 bg-gray-50 border-t border-gray-100">
                  <p className="text-sm font-semibold text-primary-900 truncate">{v.title}</p>
                </div>
              </div>
            ))}

            {/* Playlist card */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow bg-gradient-to-br from-red-600 to-red-800 flex flex-col items-center justify-center p-8 text-center text-white">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <h3 className="text-xl font-extrabold font-heading mb-2">PYQ Full Playlist</h3>
              <p className="text-red-200 text-sm font-body mb-4">Complete previous year questions discussion series</p>
              <a
                href="https://www.youtube.com/playlist?list=PLDQGHsh1YpibGfSn4EzT2X5QUR_sDSDWj"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white text-red-700 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors"
              >
                Open Playlist →
              </a>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://www.youtube.com/playlist?list=PLDQGHsh1YpibGfSn4EzT2X5QUR_sDSDWj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch More on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: ROADMAP ────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Your Path to Success
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary-900">
              Preparation Roadmap
            </h2>
            <p className="mt-3 text-gray-500 font-body max-w-xl mx-auto">
              Follow these 5 steps to crack Pantnagar entrance exam
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {roadmap.map((item, i) => (
              <div
                key={item.step}
                className="flex gap-4 sm:gap-6 animate-fade-in-up mb-2"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Step connector */}
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border-2 ${item.color}`}>
                    {item.icon}
                  </div>
                  {i < roadmap.length - 1 && (
                    <div className="w-0.5 h-10 bg-gradient-to-b from-primary-300 to-primary-100 my-1" />
                  )}
                </div>
                {/* Content */}
                <div className={`glass-card rounded-2xl p-5 mb-3 flex-1 border ${item.color.replace('bg-', 'border-').replace(' text-', ' ').replace(/-\d+/g, '-100')} hover:shadow-lg transition-shadow`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Step {item.step}</span>
                  </div>
                  <h3 className="text-lg font-extrabold font-heading text-primary-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 font-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-primary-950 via-primary-900 to-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-saffron-400 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-emerald-400 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🌱</div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading mb-4">
            Start Your Pantnagar Journey Today
          </h2>
          <p className="text-emerald-100/70 font-body text-lg mb-10 max-w-xl mx-auto">
            Join hundreds of students preparing smarter with Pantnagar Pathshala.
            Free resources, real mock tests, and expert mentorship — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/resources"
              className="px-8 py-4 rounded-xl text-base font-bold bg-white text-primary-900 hover:bg-gray-100 transition-colors shadow-xl hover:-translate-y-0.5 transform duration-200"
            >
              📚 Access Free Resources
            </Link>
            <Link
              href="/sign-up"
              className="px-8 py-4 rounded-xl text-base font-bold bg-saffron-500 hover:bg-saffron-600 text-white transition-colors shadow-xl hover:-translate-y-0.5 transform duration-200"
            >
              📝 Attempt Mock Test
            </Link>
            <Link
              href="/mentorship"
              className="px-8 py-4 rounded-xl text-base font-semibold bg-white/10 border border-white/25 hover:bg-white/20 text-white transition-colors hover:-translate-y-0.5 transform duration-200"
            >
              🎯 Join Mentorship
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
