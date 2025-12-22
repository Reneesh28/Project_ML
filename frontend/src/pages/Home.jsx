import HybridScene from "../components/HybridScene";

export default function Home() {
  return (
    <main className="pt-20 h-screen w-screen relative overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <HybridScene />
      </div>

      {/* Centered Content (NO glassmorphic panel) */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <h2 className="text-xl mb-3 text-gray-300">
            Dataset-Centric AI Platform
          </h2>

          <h1 className="text-5xl font-bold mb-6 text-white">
            ML · DL · Agentic AI
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            Explore datasets, models, and intelligent agents operating across a
            unified analytical landscape.
          </p>
        </div>
      </div>
    </main>
  );
}
