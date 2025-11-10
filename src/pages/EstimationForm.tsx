import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, Save, Loader2 } from "lucide-react";
import { saveProject } from "../services/api";
import { useNotification } from "../contexts/NotificationContext";
import axios from "axios";
import { motion } from "framer-motion";

const EstimationForm = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    projectName: "",
    location: "",
    floorArea: "",
    numberOfFloors: "",
    materialType: "Standard",
    additionalFeatures: [],
  });

  const [costData, setCostData] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const debounceRef = useRef<any>(null);

  const materialTypes = ["Standard", "Premium", "Luxury"];

  const handleCostCalculation = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const { floorArea, numberOfFloors, materialType, projectName, location } =
        formData;
      if (!floorArea || !numberOfFloors || !materialType) return;

      setIsCalculating(true);
      try {
        const prompt = `You are an expert construction cost estimator.
Estimate the price of a building strictly based on the following parameters:

Project Name: ${projectName || "Building Estimate"}
Location: ${location || "India"}
Area (in sq m): ${floorArea}
Number of Floors: ${numberOfFloors}
Material Type: ${materialType}

Rules:
- Return ONLY a single numeric estimated price value.`;

        const { data } = await axios.post(
          "https://pcte-synopsis-server.onrender.com/api/getcontent",
          { prompt }
        );

        const text = data?.data?.trim() || "";
        const nums = text.match(/\d+/g);
        const finalVal = nums ? parseInt(nums[nums.length - 1]) : null;
        setCostData(finalVal);
      } catch {
        showNotification("Error calculating cost", "error");
      } finally {
        setIsCalculating(false);
      }
    }, 600);
  };

  useEffect(() => {
    handleCostCalculation();
  }, [
    formData.floorArea,
    formData.numberOfFloors,
    formData.materialType,
    formData.projectName,
    formData.location,
  ]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!costData) return showNotification("Wait for cost calculation", "error");

    setIsSaving(true);
    try {
      const projectData = {
        ...formData,
        floorArea: parseInt(formData.floorArea),
        numberOfFloors: parseInt(formData.numberOfFloors),
        estimatedCost: costData,
      };

      const savedProject = await saveProject(projectData);
      showNotification("Project saved successfully!", "success");
      navigate(`/projects/${savedProject._id}`);
    } catch {
      showNotification("Error saving project", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-6 border-b border-blue-500/20">
          <h1 className="text-3xl font-semibold text-white flex items-center gap-3 tracking-wide">
            <Calculator className="w-8 h-8 text-blue-300" /> Building Cost Estimator
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8 text-gray-200">
          {/* Basic Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-400">Project Name</label>
              <input
                name="projectName"
                required
                onChange={handleInputChange}
                className="w-full bg-gray-800/60 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-400">Location</label>
              <input
                name="location"
                required
                onChange={handleInputChange}
                className="w-full bg-gray-800/60 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-400">
                Floor Area (sq m)
              </label>
              <input
                type="number"
                name="floorArea"
                onChange={handleInputChange}
                className="w-full bg-gray-800/60 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-400">
                Number of Floors
              </label>
              <input
                type="number"
                name="numberOfFloors"
                onChange={handleInputChange}
                className="w-full bg-gray-800/60 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-400">Material Type</label>
            <select
              name="materialType"
              onChange={handleInputChange}
              className="w-full bg-gray-800/60 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
              {materialTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Cost Preview */}
          <div className="bg-gray-800/40 border border-gray-700 p-8 rounded-xl text-center shadow-inner">
            {isCalculating ? (
              <Loader2 className="w-10 h-10 animate-spin text-blue-400 mx-auto" />
            ) : costData ? (
              <motion.h2
                key={costData}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-bold text-blue-400 drop-shadow-md"
              >
                {formatCurrency(costData)}
              </motion.h2>
            ) : (
              <p className="text-gray-500 text-sm">Fill details to auto-calculate cost...</p>
            )}
          </div>

          {/* Save Button */}
          <motion.button
            type="submit"
            disabled={!costData || isSaving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 transition-all text-white py-4 rounded-xl font-semibold flex items-center justify-center text-lg shadow-lg"
          >
            {isSaving ? (
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
            ) : (
              <Save className="w-6 h-6 mr-2" />
            )}
            Save Project
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default EstimationForm;
