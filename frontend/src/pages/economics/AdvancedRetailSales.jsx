/**
 * @title ComingSoon
 * @notice Placeholder page for features and datasets under development
 * @dev Used for routes that are planned but not yet released
 */

import HybridScene from "@/components/HybridScene";

/**
 * @notice Renders the Coming Soon page
 * @dev Keeps the SPAE visual identity consistent with Home
 * @returns {JSX.Element} Coming Soon page
 */
export default function ComingSoon() {
  return (
    /**
     * @notice Full viewport container
     * @dev Prevents scroll bleed and maintains background integrity
     */
    <main className="pt-20 h-screen w-screen relative overflow-hidden bg-black">

      {/* ------------------------------------------------------------------ */}
      {/* 3D Background Scene (NON-INTERACTIVE)                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute inset-0 pointer-events-none">
        <HybridScene />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Foreground Content                                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">
        <div className="max-w-3xl">

          {/* -------------------------------------------------------------- */}
          {/* Title                                                          */}
          {/* -------------------------------------------------------------- */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
            Coming Soon
          </h1>

          {/* -------------------------------------------------------------- */}
          {/* Subtitle                                                       */}
          {/* -------------------------------------------------------------- */}
          <h2 className="text-xl mb-4 text-gray-300">
            This module is currently under development
          </h2>

          {/* -------------------------------------------------------------- */}
          {/* Description                                                    */}
          {/* -------------------------------------------------------------- */}
          <p className="text-gray-400 text-lg leading-relaxed">
            We are actively building advanced analytics, forecasting models,
            and intelligent insights for this section.  
            Stay tuned — powerful capabilities will be available soon.
          </p>

          {/* -------------------------------------------------------------- */}
          {/* Status Indicator                                               */}
          {/* -------------------------------------------------------------- */}
          <div className="mt-8 inline-flex items-center gap-3 text-sm text-gray-400">
            <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></span>
            Development in progress
          </div>
        </div>
      </div>
    </main>
  );
}
