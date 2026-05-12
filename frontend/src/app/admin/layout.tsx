export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root-container">
      {/* This ensures no global Navbar or Footer is inherited */}
      {children}
    </div>
  );
}