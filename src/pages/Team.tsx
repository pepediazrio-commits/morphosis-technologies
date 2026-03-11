import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const team = [
  {
    name: 'John Osorno',
    role: 'Founder',
    bio: 'Visionary behind Morphosis Technologies. Brings decades of experience building and scaling technology businesses across industries.',
    initials: 'JO',
    color: 'from-sky-500 to-indigo-600',
    photo: null, // Replace with: '/team/john-osorno.jpg'
  },
  {
    name: 'John Osorno Jr.',
    role: 'CEO',
    bio: 'Leads the overall strategy and direction of Morphosis. Focused on building long-term partnerships and driving outcomes for clients.',
    initials: 'JJ',
    color: 'from-indigo-500 to-violet-600',
    photo: null,
  },
  {
    name: 'Sebastian Novoa',
    role: 'CTO',
    bio: 'Architect of our technical vision. Deep expertise in software systems, cloud infrastructure, and scalable product engineering.',
    initials: 'SN',
    color: 'from-violet-500 to-purple-600',
    photo: null,
  },
  {
    name: 'Yoshiyuki Shin',
    role: 'AI Engineer',
    bio: 'Specializes in machine learning, model development, and deploying AI systems that solve real business problems at scale.',
    initials: 'YS',
    color: 'from-cyan-500 to-sky-600',
    photo: null,
  },
  {
    name: 'J L Diaz-Rio',
    role: 'AI Engineer',
    bio: 'Brings a strong background in AI and data engineering to every project — translating complex requirements into intelligent, reliable systems.',
    initials: 'JD',
    color: 'from-sky-400 to-cyan-600',
    photo: null,
  },
  {
    name: 'Stephania Osorno',
    role: 'Marketing',
    bio: 'Shapes how Morphosis communicates its value to the world — from brand positioning to client-facing communications and growth.',
    initials: 'SO',
    color: 'from-rose-400 to-pink-600',
    photo: null,
  },
  {
    name: 'Cristina Cortés',
    role: 'Operations',
    bio: 'Keeps every project running smoothly — managing timelines, client relationships, and the systems that keep the team at its best.',
    initials: 'CC',
    color: 'from-emerald-500 to-teal-600',
    photo: null,
  },
]

const collaborators = [
  {
    name: 'Carbono Solutions',
    desc: 'Sustainability and carbon management technology.',
    initials: 'CS',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Lila Labs',
    desc: 'Creative technology and design systems.',
    initials: 'LL',
    color: 'from-purple-500 to-violet-600',
  },
  {
    name: 'Partner',
    desc: 'Highly specialized technology collaborator.',
    initials: '?',
    color: 'from-slate-400 to-slate-500',
    placeholder: true,
  },
  {
    name: 'Partner',
    desc: 'Highly specialized technology collaborator.',
    initials: '?',
    color: 'from-slate-400 to-slate-500',
    placeholder: true,
  },
]

export default function Team() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-50 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-3">The team</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            The people behind Morphosis
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            A diverse team of experts across AI, blockchain, software engineering, and business operations — united by the belief that context is everything.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                {/* Photo / Avatar */}
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                      <span className="text-white font-extrabold text-5xl opacity-80">{member.initials}</span>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
                  <p className="text-sky-600 text-xs font-semibold uppercase tracking-wide mt-0.5 mb-2">{member.role}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 mt-8">
            📸 Team photos coming soon — drop them in <code className="bg-slate-100 px-1.5 py-0.5 rounded">/public/team/</code> to replace the placeholders.
          </p>
        </div>
      </section>

      {/* Collaborators */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-3">Collaborators</p>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Highly specialized partners</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              We work with a curated network of specialized companies who bring deep expertise in their domains — expanding what's possible for our clients.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {collaborators.map((c) => (
              <div
                key={c.name + c.desc}
                className={`bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-md transition-all duration-200 ${c.placeholder ? 'opacity-40' : ''}`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4`}>
                  <span className="text-white font-extrabold text-lg">{c.initials}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{c.placeholder ? 'Coming soon' : c.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-sky-500 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Want to work with this team?</h2>
          <p className="text-white/80 text-lg mb-8">Tell us about your project and let's find out if we're the right fit.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-7 py-3.5 rounded-xl hover:bg-sky-50 transition-colors duration-150"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
