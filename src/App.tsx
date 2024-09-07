import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu'; // Import the Menu component
import JobForm from './JobForm';
import JobList from './JobList';
import JobDetail from './JobDetail'; // Import the JobDetail component
import { Toaster } from 'sonner'; // Import the Toaster component from Sonner
import LandingPage from './LandingPage';
import './index.css'; // Import Tailwind CSS

const App: React.FC = () => {
  return (
    <>
      {/* Toaster for toast notifications */}
      <Toaster position="top-right"/>

      {/* Router for navigation */}
      <Router>
        {/* Include the Menu at the top */}
        <Menu />
        
        {/* Container for the main content */}
        <div className="mx-auto">
          <Routes>
            {/* Define routes for different pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/create-job" element={<JobForm />} />
            <Route path="/job-listings" element={<JobList />} />
            <Route path="/job/:id" element={<JobDetail />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
