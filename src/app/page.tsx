import Link from "next/link";

const features = [
  { emoji: "📝", title: "200 MCQs", description: "Comprehensive question bank matching the real exam pattern" },
  { emoji: "⏱️", title: "3-Hour Timer", description: "Simulate real exam conditions with auto-submit" },
  { emoji: "📊", title: "Instant Results", description: "Get detailed scores with correct/wrong breakdown" },
  { emoji: "🏆", title: "Relative Ranking", description: "See where you stand among all test-takers" },
];

const steps = [
  { number: "1", title: "Sign Up", description: "Create your free account in seconds", icon: "👤" },
  { number: "2", title: "Pay via UPI", description: "Quick ₹50 payment with any UPI app", icon: "💳" },
  { number: "3", title: "Get Approved", description: "Admin verifies your payment within hours", icon: "✅" },
  { number: "4", title: "Take Tests", description: "Attempt 3 full mock tests at your pace", icon: "🎯" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-950 via-emerald-900 to-emerald-800 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-saffron-600 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-400 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-saffron-600/20 text-saffron-300 border border-saffron-500/30 mb-6">
              🎓 GBPUAT Entrance Preparation
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading leading-tight mb-6">
              Pantnagar Exam{" "}
              <span className="text-saffron-400">Mock Tests</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-emerald-100/80 font-body mb-10">
              Practice with exam-pattern mock tests for GBPUAT entrance.
              200 MCQs, 3-hour timed sessions, instant scoring & relative ranking
              — everything you need to crack the exam.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="px-8 py-3.5 rounded-xl text-base font-bold bg-saffron-600 hover:bg-saffron-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started Free →
              </Link>
              <Link
                href="#packages"
                className="px-8 py-3.5 rounded-xl text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white transition-all duration-200"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,96.25,142.2,77.59,321.39,56.44Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary-900">
              Why Choose Our Mock Tests?
            </h2>
            <p className="mt-3 text-gray-600 font-body text-lg max-w-xl mx-auto">
              Designed to mirror the real Pantnagar entrance exam experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4">{feature.emoji}</div>
                <h3 className="text-lg font-bold font-heading text-primary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 font-body">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Cards Section */}
      <section id="packages" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary-900">
              Choose Your Mock Test Package
            </h2>
            <p className="mt-3 text-gray-600 font-body text-lg max-w-2xl mx-auto">
              Select the stream-based combined packages or targeted single-subject mock tests to supercharge your entrance preparation.
            </p>
          </div>

          {/* Combined Packages */}
          <div className="mb-14">
            <h3 className="text-lg font-bold font-heading text-primary-900 text-center mb-6 flex items-center justify-center gap-2">
              <span className="w-8 h-[2px] bg-green-205" />
              Combined Stream Packages (₹50 after discount)
              <span className="w-8 h-[2px] bg-green-205" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* PCB Card */}
              <div className="glass-card rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full opacity-50" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-extrabold font-heading text-primary-900">
                      PCB Group
                    </h3>
                    <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-saffron-600 text-white shadow-md animate-pulse-glow">
                      ₹50
                    </span>
                  </div>
                  <p className="text-gray-600 font-body mb-6">
                    Complete mock test package for Biology stream students.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Physics", "Chemistry", "Biology"].map((subject) => (
                      <li key={subject} className="flex items-center gap-3 font-body text-gray-700">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xs font-bold">✓</span>
                        {subject}
                      </li>
                    ))}
                    <li className="flex items-center gap-3 font-body text-gray-700">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xs font-bold">✓</span>
                      3 Full Mock Tests (200 MCQs each)
                    </li>
                    <li className="flex items-center gap-3 font-body text-gray-700">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xs font-bold">✓</span>
                      3-Hour Time Limit (Real Exam Pattern)
                    </li>
                  </ul>
                  <Link
                    href="/pay?group=PCB"
                    className="block w-full text-center px-6 py-3.5 rounded-xl text-base font-bold text-white bg-primary-700 hover:bg-primary-800 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Buy Now — PCB
                  </Link>
                </div>
              </div>

              {/* PCM Card */}
              <div className="glass-card rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up relative overflow-hidden" style={{ animationDelay: "150ms" }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-100 rounded-bl-full opacity-50" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-extrabold font-heading text-primary-900">
                      PCM Group
                    </h3>
                    <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-saffron-600 text-white shadow-md animate-pulse-glow">
                      ₹50
                    </span>
                  </div>
                  <p className="text-gray-600 font-body mb-6">
                    Complete mock test package for Mathematics stream students.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Physics", "Chemistry", "Mathematics"].map((subject) => (
                      <li key={subject} className="flex items-center gap-3 font-body text-gray-700">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-saffron-100 text-saffron-700 text-xs font-bold">✓</span>
                        {subject}
                      </li>
                    ))}
                    <li className="flex items-center gap-3 font-body text-gray-700">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-saffron-100 text-saffron-700 text-xs font-bold">✓</span>
                      3 Full Mock Tests (200 MCQs each)
                    </li>
                    <li className="flex items-center gap-3 font-body text-gray-700">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-saffron-100 text-saffron-700 text-xs font-bold">✓</span>
                      3-Hour Time Limit (Real Exam Pattern)
                    </li>
                  </ul>
                  <Link
                    href="/pay?group=PCM"
                    className="block w-full text-center px-6 py-3.5 rounded-xl text-base font-bold text-white bg-saffron-600 hover:bg-saffron-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Buy Now — PCM
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Single Subject Packages */}
          <div>
            <h3 className="text-lg font-bold font-heading text-primary-900 text-center mb-6 flex items-center justify-center gap-2">
              <span className="w-8 h-[2px] bg-saffron-205" />
              Targeted Single Subject Packages (₹50 after discount)
              <span className="w-8 h-[2px] bg-saffron-205" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Biology Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-bl-full opacity-40" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-extrabold font-heading text-primary-900 flex items-center gap-1.5">
                      🌿 Biology
                    </h4>
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-saffron-600 text-white shadow-sm">
                      ₹50
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-body mb-5">
                    Targeted subject-wise mocks for Biology stream prep.
                  </p>
                  <ul className="space-y-2.5 mb-6 text-sm text-gray-700">
                    <li className="flex items-center gap-2.5 font-body">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">✓</span>
                      5 Full Subject Mock Tests
                    </li>
                    <li className="flex items-center gap-2.5 font-body">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">✓</span>
                      100 MCQs per test
                    </li>
                    <li className="flex items-center gap-2.5 font-body">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">✓</span>
                      1.5-Hour Timer (90 mins)
                    </li>
                  </ul>
                  <Link
                    href="/pay?group=Biology"
                    className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors duration-200 shadow-sm"
                  >
                    Buy Biology Package
                  </Link>
                </div>
              </div>

              {/* Chemistry Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up relative overflow-hidden" style={{ animationDelay: "100ms" }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-bl-full opacity-40" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-extrabold font-heading text-primary-900 flex items-center gap-1.5">
                      🧪 Chemistry
                    </h4>
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-saffron-600 text-white shadow-sm">
                      ₹50
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-body mb-5">
                    Targeted subject-wise mocks for Chemistry prep.
                  </p>
                  <ul className="space-y-2.5 mb-6 text-sm text-gray-700">
                    <li className="flex items-center gap-2.5 font-body">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">✓</span>
                      5 Full Subject Mock Tests
                    </li>
                    <li className="flex items-center gap-2.5 font-body">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">✓</span>
                      100 MCQs per test
                    </li>
                    <li className="flex items-center gap-2.5 font-body">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">✓</span>
                      1.5-Hour Timer (90 mins)
                    </li>
                  </ul>
                  <Link
                    href="/pay?group=Chemistry"
                    className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-purple-700 hover:bg-purple-800 transition-colors duration-200 shadow-sm"
                  >
                    Buy Chemistry Package
                  </Link>
                </div>
              </div>

              {/* Physics Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up relative overflow-hidden" style={{ animationDelay: "200ms" }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-bl-full opacity-40" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-extrabold font-heading text-primary-900 flex items-center gap-1.5">
                      ⚡ Physics
                    </h4>
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-saffron-600 text-white shadow-sm">
                      ₹50
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-body mb-5">
                    Targeted subject-wise mocks for Physics prep.
                  </p>
                  <ul className="space-y-2.5 mb-6 text-sm text-gray-700">
                    <li className="flex items-center gap-2.5 font-body">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold">✓</span>
                      5 Full Subject Mock Tests
                    </li>
                    <li className="flex items-center gap-2.5 font-body">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold">✓</span>
                      100 MCQs per test
                    </li>
                    <li className="flex items-center gap-2.5 font-body">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold">✓</span>
                      1.5-Hour Timer (90 mins)
                    </li>
                  </ul>
                  <Link
                    href="/pay?group=Physics"
                    className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200 shadow-sm"
                  >
                    Buy Physics Package
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary-900">
              How It Works
            </h2>
            <p className="mt-3 text-gray-600 font-body text-lg">
              Get started in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {/* Connecting line for desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary-300 to-primary-100" />
                )}
                <div className="relative z-10 glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <div className="w-8 h-8 rounded-full bg-primary-800 text-white flex items-center justify-center text-sm font-bold mx-auto mb-3">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold font-heading text-primary-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-body">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-emerald-800 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mb-4">
            Ready to Ace Your Exam?
          </h2>
          <p className="text-lg text-emerald-100/80 font-body mb-8">
            Join hundreds of students preparing for the Pantnagar University entrance exam.
          </p>
          <Link
            href="/sign-up"
            className="inline-block px-10 py-4 rounded-xl text-lg font-bold bg-saffron-600 hover:bg-saffron-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Preparing Now
          </Link>
        </div>
      </section>
    </div>
  );
}
