import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  Home,
  Calculator,
  FolderOpen,
  Workflow,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="backdrop-blur-md bg-gradient-to-r from-[#0f172a]/80 via-[#1e293b]/80 to-[#0f172a]/80 border-b border-slate-700/50 shadow-[0_0_20px_rgba(30,58,138,0.3)] fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center h-16 text-slate-100">
          {/* Brand Logo */}
          <Link
            to="/home"
            className="flex items-center space-x-2 text-xl font-semibold hover:opacity-90 transition-all hover:scale-[1.03]"
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Building2 className="w-7 h-7 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-md">
              BuildCost Pro
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 ">
            {[
              { to: "/home", icon: <Home />, label: "Home" },
              { to: "/estimate", icon: <Calculator />, label: "New Estimate" },
              { to: "/projects", icon: <FolderOpen />, label: "Projects" },
              { to: "/working", icon: <Workflow />, label: "Working" },
            ].map((link, index) => (
              <motion.div
                key={link.to}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <Link
                  to={link.to}
                  className={`flex items-center justify-center gap-2 space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive(link.to)
                      ? "bg-indigo-500/30 shadow-inner border border-indigo-400/30 text-indigo-300"
                      : "hover:bg-slate-700/40 text-slate-300 hover:text-indigo-300"
                  }`}
                >
                  <span className="w-4 h-4 mb-4">{link.icon}</span>
                  <span className="">{link.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-1 bg-gradient-to-r from-indigo-600 to-blue-500 hover:brightness-110 transition-all px-4 py-2 rounded-md font-medium shadow-[0_0_10px_rgba(99,102,241,0.6)]"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
