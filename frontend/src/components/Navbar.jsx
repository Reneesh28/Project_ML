/**
 * @title Navbar
 * @notice Global navigation bar for SPAE
 * @dev Pure routing-only navbar (no animation or side effects)
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

/**
 * @notice Navbar component
 * @dev Handles only navigation and dropdown UI
 * @returns {JSX.Element}
 */
export default function Navbar() {
  /* ---------------------------------------------------------------------- */
  /* State                                                                  */
  /* ---------------------------------------------------------------------- */

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  /* ---------------------------------------------------------------------- */
  /* Dropdown Component                                                     */
  /* ---------------------------------------------------------------------- */

  const MenuDropdown = ({ title, items }) => (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(title)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      {/* Trigger */}
      <span className="flex items-center gap-1 cursor-pointer text-gray-300 hover:text-white transition py-2">
        {title}
        <ChevronDown size={14} />
      </span>

      {/* Menu */}
      {openDropdown === title && (
        <div className="absolute top-full left-0 pt-3 z-[9999]">
          <div className="w-80 rounded-lg bg-neutral-900/95 backdrop-blur-xl border border-white/10 shadow-xl">
            <ul className="py-2">
              {items.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  /* ---------------------------------------------------------------------- */
  /* Layout                                                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Brand */}
        <Link to="/" className="text-white font-semibold text-lg">
          Sales Performance Analytics Engine
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10 text-sm">
          <Link to="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>

          <Link to="/ecommerce" className="text-gray-300 hover:text-white transition">
            E-commerce
          </Link>

          <MenuDropdown
            title="Marketing"
            items={[
              { label: "Predict Conversion in Digital Marketing", path: "/marketing/conversion" },
              { label: "Advertising Sales", path: "/marketing/advertising" },
            ]}
          />

          <MenuDropdown
            title="Economics"
            items={[
              { label: "Retail_Sales_Retail_Trade", path: "/economics/retail-sales" },
              { label: "Advance_Retail_Sales_Retail_Trade", path: "/economics/advanced-retail-sales" },
              { label: "HTS_Revision_32", path: "/economics/hts-revision-32" },
              { label: "IMF_IFS_ARS", path: "/economics/imf-ifs-ars" },
            ]}
          />

          <MenuDropdown
            title="Retail Sales"
            items={[
              { label: "RetailSales_Dataset", path: "/retail/retail-sales" },
              { label: "Grocery_Dataset", path: "/retail/grocery" },
              { label: "Supermarket_Sales_Dataset", path: "/retail/supermarket" },
              { label: "Rossmann_Dataset", path: "/retail/rossmann" },
              { label: "Walmart_Dataset", path: "/retail/walmart" },
              { label: "BigMart_Dataset", path: "/retail/bigmart" },
            ]}
          />
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
        <div className="md:hidden bg-black/90 border-t border-white/10 px-6 py-4 space-y-4 text-sm">
          <Link to="/" className="block text-gray-300">Home</Link>
          <Link to="/ecommerce" className="block text-gray-300">E-commerce</Link>

          <div>
            <div className="text-gray-400 mb-2 font-bold">Marketing</div>
            <Link to="/marketing/conversion" className="block pl-4 text-gray-300 py-1">
              Predict Conversion in Digital Marketing
            </Link>
            <Link to="/marketing/advertising" className="block pl-4 text-gray-300 py-1">
              Advertising Sales
            </Link>
          </div>

          <div>
            <div className="text-gray-400 mb-2 font-bold">Economics</div>
            <Link to="/economics/retail-sales" className="block pl-4 text-gray-300 py-1">
              Retail_Sales_Retail_Trade
            </Link>
            <Link to="/economics/advanced-retail-sales" className="block pl-4 text-gray-300 py-1">
              Advance_Retail_Sales_Retail_Trade
            </Link>
            <Link to="/economics/hts-revision-32" className="block pl-4 text-gray-300 py-1">
              HTS_Revision_32
            </Link>
            <Link to="/economics/imf-ifs-ars" className="block pl-4 text-gray-300 py-1">
              IMF_IFS_ARS
            </Link>
          </div>

          <div>
            <div className="text-gray-400 mb-2 font-bold">Retail Sales</div>
            <Link to="/retail/retail-sales" className="block pl-4 text-gray-300 py-1">
              RetailSales_Dataset
            </Link>
            <Link to="/retail/grocery" className="block pl-4 text-gray-300 py-1">
              Grocery_Dataset
            </Link>
            <Link to="/retail/supermarket" className="block pl-4 text-gray-300 py-1">
              Supermarket_Sales_Dataset
            </Link>
            <Link to="/retail/rossmann" className="block pl-4 text-gray-300 py-1">
              Rossmann_Dataset
            </Link>
            <Link to="/retail/walmart" className="block pl-4 text-gray-300 py-1">
              Walmart_Dataset
            </Link>
            <Link to="/retail/bigmart" className="block pl-4 text-gray-300 py-1">
              BigMart_Dataset
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
