import React from "react";
import { Link } from "react-router-dom";
import { Calculator, Building2, TrendingUp, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const features = [
    {
      icon: Calculator,
      title: "Smart Cost Estimation",
      description:
        "Get accurate building cost estimates powered by an advanced AI-backed calculation engine.",
    },
    {
      icon: Building2,
      title: "Material Flexibility",
      description:
        "Choose between Standard, Premium, or Luxury categories for precise cost differentiation.",
    },
    {
      icon: TrendingUp,
      title: "Real-time Updates",
      description:
        "Watch your cost estimation update live as you change parameters or material choices.",
    },
    {
      icon: Shield,
      title: "Save & Track Projects",
      description:
        "Securely save and revisit your project estimations anytime, anywhere.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 text-gray-200">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="mb-8">
          <motion.div
            initial={{ rotate: -15, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Building2 className="w-16 h-16 mx-auto text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] mb-4" />
          </motion.div>

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text mb-4">
            BuildCost Pro
          </h1>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Estimate your building costs with confidence. Our intelligent tool
            helps you plan, calculate, and manage projects seamlessly — all in
            one platform.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            to="/estimate"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all"
          >
            Start New Estimation
          </Link>
          <Link
            to="/projects"
            className="bg-gray-900/50 border border-blue-500/30 hover:bg-gray-800/70 text-blue-300 px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-blue-400/10 transform hover:-translate-y-1 transition-all"
          >
            View Saved Projects
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/10 backdrop-blur-lg transition-all duration-200"
          >
            <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-inner">
              <feature.icon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Cost Structure Section */}
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 rounded-2xl p-10 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-10">
          Cost Structure Overview
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Standard",
              color: "green",
              cost: "₹1,200/sq ft",
              desc: "Affordable and efficient materials.",
            },
            {
              title: "Premium",
              color: "blue",
              cost: "₹1,800/sq ft",
              desc: "High-quality materials and craftsmanship.",
            },
            {
              title: "Luxury",
              color: "purple",
              cost: "₹2,500/sq ft",
              desc: "Top-tier materials with modern finishes.",
            },
          ].map((tier, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl bg-gray-800/70 border border-${tier.color}-500/40 shadow-md hover:shadow-${tier.color}-400/20 transition-all`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-${tier.color}-900/30`}
              >
                <span
                  className={`text-${tier.color}-400 font-bold text-2xl drop-shadow-sm`}
                >
                  ₹
                </span>
              </div>
              <h3 className="font-semibold text-gray-100">{tier.title}</h3>
              <p
                className={`text-2xl font-bold text-${tier.color}-400 mb-2 drop-shadow`}
              >
                {tier.cost}
              </p>
              <p className="text-gray-400 text-sm">{tier.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
