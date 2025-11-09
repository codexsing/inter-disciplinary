import { Cpu, Brain, Database, Sparkles } from "lucide-react";

const WorkingBehindAI = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br k text-black flex items-center justify-center p-10">
      <div className="max-w-5xl w-full space-y-10">

        <h1 className="text-center text-4xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          How Our Intelligent Cost Estimator Works
        </h1>

        <p className="text-center text-gray-700 text-lg">
          We have trained a specialized AI + ML model on thousands of construction cost datasets,
          civil engineering standards, regional pricing matrices & architectural estimation rules.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

          {/* Step 1 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center hover:scale-[1.03] transition-all duration-300">
            <Database className="w-14 h-14 text-purple-400 mb-4"/>
            <h3 className="text-xl font-bold mb-2 text-purple-400">Data Understanding</h3>
            <p className="text-gray-700 text-sm">
              Model analyzes the inputs like project area, floors, city index, structural type etc.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center hover:scale-[1.03] transition-all duration-300">
            <Brain className="w-14 h-14 text-cyan-400 mb-4"/>
            <h3 className="text-xl font-bold mb-2 text-cyan-400">AI Estimation Engine</h3>
            <p className="text-gray-700 text-sm">
              Neural cost model performs cost mapping, construction inflation adjustment & feature weights.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center hover:scale-[1.03] transition-all duration-300">
            <Sparkles className="w-14 h-14 text-pink-400 mb-4"/>
            <h3 className="text-xl font-bold mb-2 text-pink-400">Instant Result</h3>
            <p className="text-gray-700 text-sm">
              AI produces a highly optimized final cost output in real-time seconds.
            </p>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <div className="border border-white/20 bg-white/5 backdrop-blur-xl rounded-2xl p-6 w-full max-w-3xl shadow-inner text-center">
            <Cpu className="w-14 h-14 mx-auto text-emerald-400 mb-4"/>
            <h2 className="text-2xl font-semibold text-emerald-400">
              The more data + projects you add → the more accurate it continuously becomes.
            </h2>
            <p className="text-gray-700 mt-3">
              This AI system keeps evolving with construction patterns, market behavior & input diversity.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkingBehindAI;
