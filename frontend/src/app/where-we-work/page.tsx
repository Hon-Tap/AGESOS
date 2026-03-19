export default function WhereWeWork() {
  const regions = [
    { state: "Central Equatoria", project: "Education & WASH", focus: "Juba & surrounding counties" },
    { state: "Jonglei", project: "Food Security", focus: "Resilience building for flood-affected areas" },
    { state: "Lakes State", project: "Health & Nutrition", focus: "Mobile clinics for pastoralist communities" },
    { state: "Upper Nile", project: "Emergency Response", focus: "Support for displaced populations" }
  ];

  return (
    <main className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          <div>
            <h1 className="text-5xl font-black text-[#0D1630] mb-6">Reaching the Last Mile</h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
              We operate in some of South Sudan most challenging environments, ensuring that aid reaches those who are often overlooked by urban-centric interventions.
            </p>
            <div className="bg-[#0D1630] p-8 rounded-3xl text-white">
              <h3 className="text-[#60A0D2] font-bold mb-2">Our Footprint</h3>
              <p className="text-sm opacity-80">Currently active in 7 out of 10 states with over 15 field offices.</p>
            </div>
          </div>
          <div className="aspect-square bg-slate-100 rounded-[4rem] flex items-center justify-center relative overflow-hidden">
            <span className="text-slate-300 font-bold italic">Dynamic Map Visualization Placeholder</span>
            {/* You would integrate a Mapbox or Leaflet component here later */}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map(r => (
            <div key={r.state} className="p-8 bg-white border border-slate-100 rounded-3xl hover:border-[#60A0D2] transition-colors">
              <h4 className="font-black text-[#0D1630] text-xl mb-2">{r.state}</h4>
              <div className="text-[#60A0D2] font-bold text-sm mb-4">{r.project}</div>
              <p className="text-xs text-slate-500 leading-relaxed">{r.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}