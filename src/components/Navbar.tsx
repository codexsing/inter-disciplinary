import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Home, Calculator, FolderOpen, Workflow, LogOut } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg border-b border-blue-700/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 text-white">
          
          {/* Logo / Brand */}
          <Link to="/home" className="flex items-center space-x-2 text-xl font-bold hover:opacity-90 transition">
            <Building2 className="w-7 h-7" />
            <span>BuildCost Pro</span>
          </Link>
          
          {/* Nav Links */}
          <div className="flex space-x-8">
            <Link
              to="/home"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition ${
                isActive('/home') ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/estimate"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition ${
                isActive('/estimate') ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>New Estimate</span>
            </Link>
            
            <Link
              to="/projects"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition ${
                isActive('/projects') ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>Projects</span>
            </Link>

            <Link
              to="/working"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition ${
                isActive('/working') ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Workflow className="w-4 h-4" />
              <span>Working</span>
            </Link>
          </div>

          {/* Right Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 bg-white/15 hover:bg-white/25 transition px-3 py-2 rounded-md font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
