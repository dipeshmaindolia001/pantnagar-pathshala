import Link from "next/link";

const combinedPackages = [
  {
    name: "PCB Group",
    emoji: "🌿",
    stream: "Biology stream",
    desc: "Complete mock test package for Biology stream students.",
    features: ["Physics", "Chemistry", "Biology", "3 Full Mock Tests (200 MCQs each)", "3-Hour Time Limit (Real Exam Pattern)"],
    price: 50,
    group: "PCB",
    color: "border-primary-200 hover:border-primary-400",
    badge: "bg-primary-700",
    btn: "bg-primary-700 hover:bg-primary-800",
    checkColor: "text-primary-600",
    label: "Buy Now — PCB",
  },
  {
    name: "PCM Group",
    emoji: "📐",
    stream: "Mathematics stream",
    desc: "Complete mock test package for Mathematics stream students.",
    features: ["Physics", "Chemistry", "Mathematics", "3 Full Mock Tests (200 MCQs each)", "3-Hour Time Limit (Real Exam Pattern)"],
    price: 50,
    group: "PCM",
    color: "border-saffron-200 hover:border-saffron-400",
    badge: "bg-saffron-500",
    btn: "bg-saffron-500 hover:bg-saffron-600",
    checkColor: "text-saffron-500",
    label: "Buy Now — PCM",
  },
];

const singlePackages = [
  {
    name: "Biology",
    emoji: "🌿",
    desc: "Targeted subject-wise mocks for Biology stream prep.",
    features: ["5 Full Subject Mock Tests", "100 MCQs per test", "1.5-Hour Timer (90 mins)"],
    price: 50,
    group: "Biology",
    color: "border-green-200 hover:border-green-400",
    badge: "bg-green-600",
    btn: "bg-green-600 hover:bg-green-700",
    checkColor: "text-green-600",
    label: "Buy Biology Package",
  },
  {
    name: "Chemistry",
    emoji: "🧪",
    desc: "Targeted subject-wise mocks for Chemistry prep.",
    features: ["5 Full Subject Mock Tests", "100 MCQs per test", "1.5-Hour Timer (90 mins)"],
    price: 50,
    group: "Chemistry",
    color: "border-purple-200 hover:border-purple-400",
    badge: "bg-purple-600",
    btn: "bg-purple-600 hover:bg-purple-700",
    checkColor: "text-purple-600",
    label: "Buy Chemistry Package",
  },
  {
    name: "Physics",
    emoji: "⚡",
    desc: "Targeted subject-wise mocks for Physics prep.",
    features: ["5 Full Subject Mock Tests", "100 MCQs per test", "1.5-Hour Timer (90 mins)"],
    price: 50,
    group: "Physics",
    color: "border-orange-200 hover:border-orange-400",
    badge: "bg-saffron-500",
    btn: "bg-saffron-500 hover:bg-saffron-600",
    checkColor: "text-saffron-500",
    label: "Buy Physics Package",
  },
];

const steps = [
  { icon: "👤", step: 1, title: "Sign Up", desc: "Create your free account in seconds" },
  { icon: "💳", step: 2, title: "Pay via UPI", desc: "Quick ₹50 payment with any UPI app" },
  { icon: "✅", step: 3, title: "Get Approved", desc: "Admin verifies your payment within hours" },
  { icon: "🎯", step: 4, title: "Take Tests", desc: "Attempt full mock tests at your pace" },
];

export default function MockTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-emerald-800 text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-saffron-400 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-emerald-400 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 bg-saffron-500/20 text-saffron-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-saffron-500/30">
            Exam-Ready Practice
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading mb-4">
            Choose Your Mock Test Package
          </h1>
          <p className="text-emerald-100/80 font-body text-lg max-w-2xl mx-auto">
            Select the stream-based combined packages or targeted single-subject mock tests to supercharge your entrance preparation.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">

        {/* ── Combined Stream Packages ── */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary-900">
              Combined Stream Packages
            </h2>
            <p className="text-saffron-600 font-semibold text-sm mt-1">₹50 after discount</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {combinedPackages.map((pkg) => (
              <div
                key={pkg.group}
                className={`glass-card rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${pkg.color}`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-extrabold font-heading text-primary-900">{pkg.name}</h3>
                    <p className="text-xs text-gray-500 font-body mt-0.5">{pkg.stream}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-extrabold ${pkg.badge}`}>
                    ₹{pkg.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-body mb-4">{pkg.desc}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-body text-gray-700">
                      <svg className={`w-4 h-4 flex-shrink-0 ${pkg.checkColor}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/pay?group=${pkg.group}`}
                  className={`block w-full text-center px-5 py-3 rounded-xl text-sm font-bold text-white transition-colors duration-200 shadow-md ${pkg.btn}`}
                >
                  {pkg.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10 max-w-3xl mx-auto">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ── Single Subject Packages ── */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary-900">
              Targeted Single Subject Packages
            </h2>
            <p className="text-saffron-600 font-semibold text-sm mt-1">₹50 after discount</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {singlePackages.map((pkg) => (
              <div
                key={pkg.group}
                className={`glass-card rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${pkg.color}`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-extrabold font-heading text-primary-900">
                      {pkg.emoji} {pkg.name}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-extrabold ${pkg.badge}`}>
                    ₹{pkg.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-body mb-4">{pkg.desc}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-body text-gray-700">
                      <svg className={`w-4 h-4 flex-shrink-0 ${pkg.checkColor}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/pay?group=${pkg.group}`}
                  className={`block w-full text-center px-5 py-3 rounded-xl text-sm font-bold text-white transition-colors duration-200 shadow-md ${pkg.btn}`}
                >
                  {pkg.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── How It Works ── */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl mb-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary-900">How It Works</h2>
            <p className="text-gray-500 font-body mt-2">Get started in 4 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="text-center relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary-300 to-primary-100 z-0" />
                )}
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <div className="w-8 h-8 rounded-full bg-primary-700 text-white text-sm font-extrabold flex items-center justify-center mx-auto mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-bold font-heading text-primary-900 mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 font-body">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Final CTA ── */}
        <div className="rounded-3xl bg-gradient-to-r from-primary-950 via-primary-900 to-emerald-900 text-white p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-saffron-400 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-emerald-400 blur-2xl" />
          </div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mb-3">
              Ready to Ace Your Exam?
            </h2>
            <p className="text-emerald-100/70 font-body mb-6 max-w-lg mx-auto">
              Join hundreds of students preparing for the Pantnagar University entrance exam.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold bg-saffron-500 hover:bg-saffron-600 text-white shadow-xl transition-all hover:-translate-y-0.5 duration-200"
            >
              🚀 Start Preparing Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
