import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useHoverStore } from "../store/hoverStore";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const setActiveCluster = useHoverStore((s) => s.setActiveCluster);

  const Dropdown = ({ title, clusterId }) => (
    <div
      className="relative"
      onMouseEnter={() => {
        setOpenDropdown(title);
        setActiveCluster(clusterId);
      }}
      onMouseLeave={() => {
        setOpenDropdown(null);
        setActiveCluster(null);
      }}
    >
      {/* Dropdown trigger */}
      <button
        onClick={() =>
          setOpenDropdown(openDropdown === title ? null : title)
        }
        className="flex items-center gap-1 text-white hover:text-gray-300 transition w-full"
      >
        {title}
        <ChevronDown size={14} />
      </button>

      {/* Dropdown menu */}
      {openDropdown === title && (
        <div className="absolute top-full mt-4 w-44 rounded-xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
            >
              Option {i}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <span className="text-white font-semibold text-lg">
          AI Platform
        </span>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm items-center">
          <button className="text-white hover:text-gray-300">
            Home
          </button>

          <button className="text-white hover:text-gray-300">
            E-commerce
          </button>

          <Dropdown title="Marketing" clusterId="marketing" />
          <Dropdown title="Economic" clusterId="economic" />
          <Dropdown title="Retail Sales" clusterId="retail" />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 py-4 space-y-4 text-sm">
          <button className="block w-full text-left text-white">
            Home
          </button>

          <button className="block w-full text-left text-white">
            E-commerce
          </button>

          <Dropdown title="Marketing" clusterId="marketing" />
          <Dropdown title="Economic" clusterId="economic" />
          <Dropdown title="Retail Sales" clusterId="retail" />
        </div>
      )}
    </nav>
  );
}
