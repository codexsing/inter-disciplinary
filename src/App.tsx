import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EstimationForm from "./pages/EstimationForm";
import ProjectList from "./pages/ProjectList";
import ProjectDetail from "./pages/ProjectDetail";
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationContainer from "./components/NotificationContainer";
import WorkingBehindAI from "./pages/Working";
import LoginPage from "./pages/Login";

const App = () => {
  return (
    <NotificationProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white transition-colors duration-500">
          <NotificationContainer />

          <Routes>
            {/* 🔹 Public Route (No Navbar) */}
            <Route path="/" element={<LoginPage />} />

            {/* 🔹 Protected / Main Layout */}
            <Route
              path="/*"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />

                  {/* Page Content */}
                  <main className="flex-1 container mx-auto px-4 py-10">
                    <Routes>
                      <Route path="/home" element={<Home />} />
                      <Route path="/estimate" element={<EstimationForm />} />
                      <Route path="/projects" element={<ProjectList />} />
                      <Route path="/working" element={<WorkingBehindAI />} />
                      <Route path="/projects/:id" element={<ProjectDetail />} />
                    </Routes>
                  </main>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </NotificationProvider>
  );
};

export default App;
