import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Layers,
  Settings,
  Loader2,
} from "lucide-react";
import { getProjectById } from "../services/api";
import { useNotification } from "../contexts/NotificationContext";
import { motion } from "framer-motion";

const ProjectDetail = () => {
  const { id } = useParams();
  const { showNotification } = useNotification();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchProject(id);
  }, [id]);

  const fetchProject = async (projectId) => {
    try {
      const data = await getProjectById(projectId);
      setProject(data);
    } catch {
      showNotification("Error fetching project details", "error");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getMaterialTypeColor = (type) => {
    switch (type) {
      case "Standard":
        return "bg-green-500/10 text-green-400 border-green-500/40";
      case "Premium":
        return "bg-blue-500/10 text-blue-400 border-blue-500/40";
      case "Luxury":
        return "bg-purple-500/10 text-purple-400 border-purple-500/40";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  };

  const featureIcons = {
    Parking: "🚗",
    Elevator: "🏢",
    Garden: "🌱",
    "Solar Panels": "☀️",
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-gray-300">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-3 text-gray-400">Loading project details...</span>
      </div>
    );

  if (!project)
    return (
      <div className="text-center py-16 text-gray-400">
        <Building2 className="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Project not found</h3>
        <Link to="/projects" className="text-blue-400 hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto text-gray-100 p-4 md:p-8">
      {/* Back Button */}
      <Link
        to="/projects"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </Link>

      {/* Project Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 rounded-2xl border border-blue-500/30 p-6 shadow-lg shadow-blue-900/20 backdrop-blur-md"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.projectName}</h1>
            <p className="text-gray-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" /> {project.location}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${getMaterialTypeColor(
              project.materialType
            )}`}
          >
            {project.materialType}
          </span>
        </div>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/70 border border-gray-700/60 rounded-2xl p-6 shadow-lg backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2" /> Project Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center mb-2">
                  <Layers className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-400">Floor Area</span>
                </div>
                <span className="text-2xl font-bold text-gray-100">
                  {project.floorArea.toLocaleString()} sq ft
                </span>
              </div>

              <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center mb-2">
                  <Building2 className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-400">Number of Floors</span>
                </div>
                <span className="text-2xl font-bold text-gray-100">
                  {project.numberOfFloors}
                </span>
              </div>
            </div>

            <div className="mt-4 bg-gray-800/60 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-400">Created On</span>
              </div>
              <span className="text-gray-300">{formatDate(project.createdAt)}</span>
            </div>
          </motion.div>

          {/* Additional Features */}
          {project.additionalFeatures?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/70 border border-gray-700/60 rounded-2xl p-6 shadow-lg backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" /> Additional Features
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {project.additionalFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl text-gray-200"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-lg">
                        {featureIcons[feature]} {feature}
                      </span>
                    </div>
                    <span className="text-blue-400 font-semibold">
                      {formatCurrency(150000)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-gray-900/70 border border-gray-700/60 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" /> Cost Breakdown
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 mb-1">Base Construction Cost</p>
                <span className="text-lg font-bold text-gray-100">
                  {formatCurrency(project.costBreakdown?.baseCost)}
                </span>
              </div>

              {project.costBreakdown?.additionalFeaturesCost > 0 && (
                <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Additional Features</p>
                  <span className="text-lg font-bold text-gray-100">
                    {formatCurrency(project.costBreakdown?.additionalFeaturesCost)}
                  </span>
                </div>
              )}

              <div className="bg-gradient-to-r from-green-800/40 to-emerald-800/40 p-4 rounded-xl border border-green-500/40 text-center">
                <p className="text-sm text-green-400 mb-1 font-medium">
                  Total Estimated Cost
                </p>
                <span className="text-3xl font-bold text-green-400">
                  {formatCurrency(project.estimatedCost)}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700/50">
              <Link
                to="/estimate"
                className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-center font-semibold py-3 rounded-xl transition-all"
              >
                Create New Estimate
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
