import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Target, Zap } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Context is everything',
    desc: 'We take the time to truly understand your business before writing a single line of code. The right solution only comes from understanding the right problem.',
  },
  {
    icon: Zap,
    title: 'Experts across every field',
    desc: 'Our team brings together specialists from technology, finance, operations, and design — so we can meet your business where it actually lives.',
  },
  {
    icon: Heart,
    title: 'Honest by default',
    desc: 'We\'ll tell you when a feature isn\'t worth building, when a simpler solution exists, or when the timing isn\'t right. That\'s what real partners do.',
  },
]

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-50 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-3">About us</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            A different kind of technology partner.
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Morphosis Technologies was founded in Madrid, Spain, with one belief: that the most powerful technology solutions come from genuinely understanding the businesses they're built for.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">Why we exist</h2>
            <div className="space-y-5 text-slate-500 leading-relaxed text-lg">
              <p>
                Morphosis is the bridge between where your company is today and where it needs to go. We don't believe in generic solutions. Every business has its own context — its own pressures, its own strengths, its own way of working — and the technology serving it should reflect that.
              </p>
              <p>
                We bring together experts across every field — AI engineers, blockchain architects, product strategists, and operations specialists — because understanding your context properly takes more than just technical skill. It takes experience across industries, across functions, and across the full arc of what makes a business work.
              </p>
              <p>
                Whether we're building a product you'll own outright, a platform you'll scale over time, or a custom solution embedded in your operations — the goal is always the same: to give you something that actually fits, built by people who genuinely understood what you needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">How we operate</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">Three principles guide every project we take on.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mb-5">
                  <v.icon className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-sky-500 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Let's work together</h2>
          <p className="text-white/80 text-lg mb-8">We're selective about the projects we take on — which means the ones we do, we do well.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-7 py-3.5 rounded-xl hover:bg-sky-50 transition-colors duration-150"
            >
              Start a conversation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/team"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-150"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
