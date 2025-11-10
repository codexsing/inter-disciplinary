import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FolderOpen,
  Eye,
  Calendar,
  MapPin,
  Building,
  Loader2,
} from "lucide-react";
import { getAllProjects } from "../services/api";
import { useNotification } from "../contexts/NotificationContext";
import { motion } from "framer-motion";

const ProjectList = () => {
  const { showNotification } = useNotification();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch {
      showNotification("Error fetching projects", "error");
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
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getMaterialTypeColor = (type) => {
    switch (type) {
      case "Standard":
        return "bg-green-500/10 text-green-400 border border-green-400/30";
      case "Premium":
        return "bg-blue-500/10 text-blue-400 border border-blue-400/30";
      case "Luxury":
        return "bg-purple-500/10 text-purple-400 border border-purple-400/30";
      default:
        return "bg-gray-700 text-gray-300 border border-gray-600";
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-300">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-3 text-gray-400">Loading projects...</span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3 text-white">
            <FolderOpen className="w-8 h-8 text-blue-400" />
            Saved Projects
          </h1>
          <p className="text-gray-400 mt-1">
            Manage and review all your building cost estimations
          </p>
        </div>

        <Link
          to="/estimate"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1"
        >
          New Estimation
        </Link>
      </div>

      {/* No Projects */}
      {projects.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/70 rounded-2xl border border-gray-700/50 backdrop-blur-sm shadow-lg">
          <FolderOpen className="w-16 h-16 mx-auto text-gray-500 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-300 mb-2">
            No projects found
          </h3>
          <p className="text-gray-500 mb-6">
            Start by creating your first building cost estimation
          </p>
          <Link
            to="/estimate"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Create First Project
          </Link>
        </div>
      ) : (
        <motion.div
          layout
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/60 border border-gray-700/60 rounded-2xl shadow-lg shadow-blue-900/20 backdrop-blur-md hover:shadow-blue-800/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-100 truncate flex-1">
                    {project.projectName}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getMaterialTypeColor(
                      project.materialType
                    )}`}
                  >
                    {project.materialType}
                  </span>
                </div>

                {/* Project Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Building className="w-4 h-4 mr-2 text-blue-400" />
                    <span>
                      {project.floorArea.toLocaleString()} sq ft ×{" "}
                      {project.numberOfFloors} floor
                      {project.numberOfFloors > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                    <span>{formatDate(project.createdAt)}</span>
                  </div>
                </div>

                {/* Features */}
                {project.additionalFeatures?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">
                      Additional Features:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.additionalFeatures.slice(0, 3).map((feature, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/30 text-xs rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.additionalFeatures.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md">
                          +{project.additionalFeatures.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Cost & Button */}
                <div className="border-t border-gray-700/60 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Estimated Cost</span>
                    <span className="text-lg font-bold text-green-400">
                      {formatCurrency(project.estimatedCost)}
                    </span>
                  </div>
                  <Link
                    to={`/projects/${project._id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ProjectList;
