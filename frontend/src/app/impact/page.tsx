export default function ImpactPage() {
  const stats = [
    { label: "Students Enrolled", value: "45,000+", icon: "📚" },
    { label: "Clean Water Access", value: "120k People", icon: "💧" },
    { label: "Health Consultations", value: "85,000", icon: "🏥" },
    { label: "Communities Reached", value: "12 States", icon: "🌍" },
  ];

  return (
    <main className="pt-24 pb-20">
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-[#1F305E] mb-4">Measurable Change</h1>
          <p className="text-slate-500 max-w-xl mx-auto">We don’t just deliver aid; we track every life touched to ensure our interventions create lasting generational shifts.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{s.icon}</div>
              <div className="text-3xl font-black text-[#1F305E]">{s.value}</div>
              <div className="text-sm font-semibold text-[#60A0D2] uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Success Story Spotlight */}
        <div className="bg-slate-900 rounded-[3rem] overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-slate-800 h-64 md:h-auto relative">
             {/* Placeholder for a moving impact image */}
             <div className="absolute inset-0 flex items-center justify-center text-slate-500 italic">Impact Image: A student in a new AGE classroom</div>
          </div>
          <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
            <span className="text-[#60A0D2] font-bold uppercase tracking-widest text-sm mb-4">Success Story</span>
            <h2 className="text-3xl font-bold text-white mb-6">From Bare Soil to Bumper Harvests</h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              Before AGE provided us with drought-resistant seeds and irrigation training, my family struggled to have one meal a day. Now, we are selling surplus at the local market.
            </p>
            <div className="text-white">
              <div className="font-bold">Mary Akol</div>
              <div className="text-sm text-slate-400">Mother of five, Lakes State</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}