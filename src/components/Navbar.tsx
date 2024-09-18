export default function Navbar() {
  return (
    <div className="fixed top-0 w-full z-50 flex justify-between bg-navbar-bg p-4  border-b-2 border-[#21263F] ">
      {/* Use img tag for static assets from the public directory */}
      <img src="/header/logo.svg" alt="Logo" className="h-8" />
      <img src="/header/hamburger.svg" alt="Hambugermenu" className="h-8" />
    </div>
  );
}
