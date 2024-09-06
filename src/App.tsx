import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu'; // Import the Menu component
import JobForm from './JobForm';
import JobList from './JobList';
import { Card, CardContent } from "./components/ui/Card";
import './index.css'; // Import Tailwind CSS

const App: React.FC = () => {
  return (
    <Router>
    <div className="container mx-auto p-6">
      <Menu /> {/* Include the Menu at the top */}
      <Routes>
        <Route
          path="/create-job"
          element={
            <JobForm />
          }
        />
        <Route
          path="/job-listings"
          element={
            <JobList />
          }
        />
      </Routes>
    </div>
  </Router>
);
};

export default App;

