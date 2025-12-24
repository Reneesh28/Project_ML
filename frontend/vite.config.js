import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

/**
 * @title Vite Configuration
 * @notice Defines build configuration for SPAE frontend
 * @dev Adds @ alias resolution for src directory
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  /**
   * @notice Path alias configuration
   * @dev Maps "@" to the src directory (NO relative imports allowed)
   */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
