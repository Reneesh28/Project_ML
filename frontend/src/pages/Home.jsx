/**
 * @title Home
 * @notice Landing page for Sales Performance Analytics Engine (SPAE)
 * @dev Displays the 3D hybrid background with centered branding content
 */

import HybridScene from "@/components/HybridScene";

/**
 * @notice Renders the SPAE home page
 * @dev Uses a full-screen 3D background with overlayed textual content
 * @returns {JSX.Element} Home page component
 */
export default function Home() {
  return (
    /**
     * @notice Main container for the home page
     * @dev Uses fixed height and width to ensure full viewport coverage
     */
    <main className="pt-20 h-screen w-screen relative overflow-hidden bg-black">
      
      {/* ------------------------------------------------------------------ */}
      {/* 3D Background Scene (POINTER EVENTS DISABLED — CRITICAL FIX)        */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute inset-0 pointer-events-none">
        <HybridScene />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Foreground Content Layer                                            */}
      {/* @dev Kept simple and text-focused (no glassmorphic panel)           */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">
        <div className="max-w-3xl">

          {/* -------------------------------------------------------------- */}
          {/* Main Product Title                                             */}
          {/* -------------------------------------------------------------- */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
            Sales Performance Analytics Engine (SPAE)
          </h1>

          {/* -------------------------------------------------------------- */}
          {/* Tagline                                                        */}
          {/* -------------------------------------------------------------- */}
          <h2 className="text-xl mb-3 text-gray-300">
            Sales Intelligence · Forecasting · Analytics
          </h2>

          {/* -------------------------------------------------------------- */}
          {/* Product Description                                           */}
          {/* -------------------------------------------------------------- */}
          <p className="text-gray-400 text-lg leading-relaxed">
            A unified platform for analyzing sales datasets, forecasting demand,
            predicting revenue, and extracting actionable business insights
            using advanced machine learning models.
          </p>
        </div>
      </div>
    </main>
  );
}
