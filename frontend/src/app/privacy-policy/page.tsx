// Use this template for both Privacy and Terms
export default function LegalPage() {
  return (
    <main className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-black text-[#0D1630] mb-8 text-center">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-loose">
          <p className="mb-6">At the Agency for Generational Education (AGE), we are committed to protecting the privacy of our donors, partners, and the communities we serve.</p>
          <h2 className="text-xl font-bold text-[#0D1630] mt-10 mb-4">1. Data Collection</h2>
          <p className="mb-6">We collect personal information only when voluntarily submitted by you through our donation forms or newsletter sign-up.</p>
          <h2 className="text-xl font-bold text-[#0D1630] mt-10 mb-4">2. Use of Information</h2>
          <p className="mb-6">Your data is used strictly for processing donations, providing impact updates, and improving our service delivery in the field.</p>
        </div>
      </div>
    </main>
  );
}