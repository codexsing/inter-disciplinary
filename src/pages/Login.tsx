import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Loader2, LogIn } from "lucide-react";

const LoginPage = () => {

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
    navigate("/home");
  };

  return (
    <div className="min-h-screen mb-10 ">
      
      {/* NAVBAR */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg border-b border-blue-700/50">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center h-16 text-white">

      <Link 
        to="/" 
        className="flex items-center space-x-2 text-xl font-bold hover:opacity-90 transition"
      >
        <Building2 className="w-8 h-8" />
        <span>BuildCost Pro</span>
      </Link>

      <span className="px-5 py-2 rounded-lg bg-white/20 font-semibold backdrop-blur-sm shadow-sm">
        Login
      </span>

    </div>
  </div>
</nav>


      {/* LOGIN UI */}
      <div className="flex justify-center items-center pt-28 px-4">
        <div className=" backdrop-blur-xl border border-black/20 p-10 rounded-2xl w-full max-w-md shadow-2xl">
          <h2 className="text-center text-3xl font-semibold text-black mb-8 tracking-wide">
            Sign In
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label className="text-sm text-gray-700">Username</label>
              <input
                className="w-full border border-black/20 bg-white/5 text-black p-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                name="username"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full border border-black/20 bg-white/5 text-black p-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              Login
            </button>

          </form>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
