export default function ProfileViewer() {
  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <div className="p-4 bg-white border-b flex justify-between items-center">
        <h1 className="font-bold text-slate-900">AGE Organizational Profile</h1>
        <a href="/about" className="text-sm text-sky-600 hover:underline">Back to About</a>
      </div>
      <iframe 
        src="/AGE Profile.pdf#toolbar=0&navpanes=0&scrollbar=0" 
        className="w-full h-full border-none"
        title="AGE Profile"
      />
    </div>
  );
}