'use client';

import Link from "next/link";

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-emerald-800 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-saffron-400 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-emerald-400 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 bg-saffron-500/20 text-saffron-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-saffron-500/30">
            Personalized Guidance
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading mb-4">
            🎯 1-on-1 Mentorship
          </h1>
          <p className="text-emerald-100/80 font-body text-lg max-w-xl mx-auto">
            Get personal expert guidance to crack Pantnagar University entrance exam with confidence.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">

        {/* What you get */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary-900 mb-3">
            What You Get in Mentorship
          </h2>
          <p className="text-gray-500 font-body max-w-lg mx-auto">
            Tailored 1-on-1 sessions designed around your needs, timeline, and target stream.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { icon: "📅", title: "Preparation Planning", desc: "Get a custom study schedule based on your exam date and current level" },
            { icon: "📚", title: "Resource Selection", desc: "Know exactly what to study and what to skip — no more information overload" },
            { icon: "❓", title: "Doubt Solving", desc: "Clear all your doubts from any topic in 1-on-1 sessions" },
            { icon: "🧭", title: "Exam Strategy", desc: "Learn the right attempt order, time management, and section-wise strategy" },
            { icon: "💪", title: "Motivation & Accountability", desc: "Regular check-ins to keep you on track and motivated throughout prep" },
            { icon: "📊", title: "Progress Tracking", desc: "Mock test reviews and detailed feedback to track your improvement" },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold font-heading text-primary-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 font-body">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl mb-16">
          <h2 className="text-2xl font-extrabold font-heading text-primary-900 mb-6 text-center">
            How to Apply
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Fill the Form", desc: "Submit your details below — it takes less than 2 minutes" },
              { step: "02", title: "Get Matched", desc: "We'll review your profile and match you with the right mentor" },
              { step: "03", title: "Start Sessions", desc: "Book your first session and begin your personalised journey" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-50 flex items-center justify-center text-2xl font-extrabold text-primary-700 font-heading mb-3 border border-primary-100">
                  {s.step}
                </div>
                <h3 className="font-bold font-heading text-primary-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500 font-body">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application form placeholder */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold font-heading text-primary-900 mb-2">
              Apply for Mentorship
            </h2>
            <p className="text-gray-500 font-body text-sm">
              Limited seats available. Fill the form and we&apos;ll reach out within 24 hours.
            </p>
          </div>

          <form className="space-y-5 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name *</label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-sm font-body transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number *</label>
              <input
                type="tel"
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-sm font-body transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Target Stream *</label>
              <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-sm font-body transition-colors bg-white cursor-pointer">
                <option value="">Select your stream</option>
                <option value="PCB">PCB — Physics, Chemistry, Biology</option>
                <option value="PCM">PCM — Physics, Chemistry, Mathematics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Exam Date / Year</label>
              <input
                type="text"
                placeholder="e.g. June 2025 or 2026"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-sm font-body transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Anything specific you need help with?</label>
              <textarea
                rows={3}
                placeholder="e.g. I struggle with Chemistry and need a study plan..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-sm font-body transition-colors resize-none"
              />
            </div>

            {/* Placeholder submit note */}
            <div className="p-4 rounded-xl bg-saffron-50 border border-saffron-200">
              <p className="text-sm text-saffron-800 font-body text-center">
                🚧 <strong>Coming Soon!</strong> Online applications launching shortly.
                For now, reach out directly on WhatsApp to apply.
              </p>
            </div>

            <a
              href="https://chat.whatsapp.com/JHbH1f9simv6jYbl9nJWHw"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3.5 rounded-xl text-base font-bold text-white bg-primary-700 hover:bg-primary-800 transition-colors shadow-md"
            >
              💬 Apply via WhatsApp
            </a>
          </form>
        </div>

        {/* Back to home */}
        <div className="text-center mt-10">
          <Link href="/" className="text-sm text-primary-700 hover:text-primary-900 font-semibold transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
