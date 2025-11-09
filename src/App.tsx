import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EstimationForm from './pages/EstimationForm';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationContainer from './components/NotificationContainer';
import WorkingBehindAI from './pages/Working';
import LoginPage from './pages/Login';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          {/* Login Page (no navbar) */}
          <Route path="/" element={<LoginPage />} />

          {/* Protected / Normal UI routes with navbar */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/estimate" element={<EstimationForm />} />
                    <Route path="/projects" element={<ProjectList />} />
                    <Route path="/working" element={<WorkingBehindAI />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                  </Routes>
                </main>
                <NotificationContainer />
              </div>
            }
          />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
