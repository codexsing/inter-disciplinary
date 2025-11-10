import { Cpu, Brain, Database, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const WorkingBehindAI = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center p-10">
      <div className="max-w-5xl w-full space-y-12">
        
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"
        >
          How Our Intelligent Cost Estimator Works
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
        >
          Our AI-powered cost estimator leverages deep learning models trained on thousands of real-world construction datasets, 
          regional price indexes, and structural parameters to deliver accurate, real-time cost predictions.
        </motion.p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          {[
            {
              icon: <Database className="w-14 h-14 text-purple-400" />,
              title: "Data Understanding",
              desc: "Model analyzes project area, floor count, city index, and material type to understand context."
            },
            {
              icon: <Brain className="w-14 h-14 text-cyan-400" />,
              title: "AI Estimation Engine",
              desc: "Neural networks map cost parameters, adjust for inflation, and calculate weighted estimates."
            },
            {
              icon: <Sparkles className="w-14 h-14 text-pink-400" />,
              title: "Instant Results",
              desc: "Produces an optimized, real-time estimate in seconds — no manual calculations needed."
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-lg shadow-black/50 flex flex-col items-center text-center hover:shadow-blue-500/30 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white/90">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="border border-gray-700/50 bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-2xl rounded-2xl p-8 w-full max-w-3xl shadow-xl text-center">
            <Cpu className="w-14 h-14 mx-auto text-emerald-400 mb-4 drop-shadow-[0_0_8px_#10B981]" />
            <h2 className="text-2xl font-semibold text-emerald-400 mb-2">
              The More Projects You Add → The Smarter It Becomes
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI continuously learns from every new estimation, improving accuracy with each project. 
              It adapts to regional market trends, inflation patterns, and evolving construction practices.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default WorkingBehindAI;
