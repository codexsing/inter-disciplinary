import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Save, Loader2 } from 'lucide-react';
import { saveProject } from '../services/api';
import { useNotification } from '../contexts/NotificationContext';
import axios from 'axios';

interface FormData {
  projectName: string;
  location: string;
  floorArea: string;
  numberOfFloors: string;
  materialType: string;
  additionalFeatures: string[];
}

const EstimationForm = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    location: '',
    floorArea: '',
    numberOfFloors: '',
    materialType: 'Standard',
    additionalFeatures: []
  });

  const [costData, setCostData] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const materialTypes = ['Standard', 'Premium', 'Luxury'];
  const additionalFeatureOptions = ['Parking', 'Elevator', 'Garden', 'Solar Panels'];

  const debounceRef = useRef<any>(null);

  const handleCostCalculation = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const { floorArea, numberOfFloors, materialType, projectName, location } = formData;
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
- Return ONLY a single numeric estimated price value as output.
- No units, no currency symbols, no words, no description, no formatting.
- Just return one integer number only.
If any explanation starts, ignore and return only integer.`

        const { data } = await axios.post(
          'https://pcte-synopsis-server.onrender.com/api/getcontent',
          { prompt }
        );

        const text = data?.data?.trim() || "";
        const nums = text.match(/\d+/g);
        const finalVal = nums ? parseInt(nums[nums.length - 1]) : null;

        setCostData(finalVal);

      } catch (err) {
        showNotification('Error calculating cost', 'error');
      } finally {
        setIsCalculating(false);
      }
    }, 600);
  };

  useEffect(() => {
    handleCostCalculation();
  }, [formData.floorArea, formData.numberOfFloors, formData.materialType, formData.projectName, formData.location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFeatureChange = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      additionalFeatures: prev.additionalFeatures.includes(feature)
        ? prev.additionalFeatures.filter(f => f !== feature)
        : [...prev.additionalFeatures, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!costData) return showNotification("Wait for cost calculation", "error");

    setIsSaving(true);
    try {
      const projectData = {
        ...formData,
        floorArea: parseInt(formData.floorArea),
        numberOfFloors: parseInt(formData.numberOfFloors),
        estimatedCost: costData
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

  const formatCurrency = (amount: number | null) => {
    if (!amount) return "";
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };
return (
  <div className="max-w-4xl mx-auto mt-10">
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-6">
        <h1 className="text-3xl font-semibold text-white flex items-center gap-3 tracking-wide">
          <Calculator className="w-8 h-8"/> Building Cost Estimator
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">

        {/* Basic Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">Project Name</label>
            <input name="projectName" required onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Location</label>
            <input name="location" required onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">Floor Area (sq m)</label>
            <input type="number" name="floorArea" onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Number of Floors</label>
            <input type="number" name="numberOfFloors" onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">Material Type</label>
          <select name="materialType" onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
            {materialTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        {/* Cost Preview */}
        <div className="bg-gray-100 border border-gray-200 p-8 rounded-xl text-center shadow-inner">
          {isCalculating ? (
            <Loader2 className="w-10 h-10 animate-spin mx-auto" />
          ) : costData ? (
            <h2 className="text-4xl font-bold text-blue-800">{formatCurrency(costData)}</h2>
          ) : (
            <p className="text-gray-500 text-sm tracking-wide">Fill fields to auto calculate cost...</p>
          )}
        </div>


        {/* Save Button */}
        <button
          type="submit"
          disabled={!costData || isSaving}
          className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200 text-white py-4 rounded-xl font-bold flex items-center justify-center text-lg"
        >
          {isSaving ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : <Save className="w-6 h-6 mr-2" />} 
          Save Project
        </button>

      </form>
    </div>
  </div>
);

};

export default EstimationForm;
