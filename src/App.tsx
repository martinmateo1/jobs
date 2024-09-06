import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu'; // Import the Menu component
import JobForm from './JobForm';
import JobList from './JobList';
import { Card, CardContent } from "./components/ui/Card";
import './index.css'; // Import Tailwind CSS
import JobDetail from './JobDetail'; // Adjust the path as needed

const App: React.FC = () => {
  return (
    <Router>
      <Menu /> {/* Include the Menu at the top */}
    <div className="container mx-auto p-6">
      <Routes>
        <Route path="/create-job" element={<JobForm />
        }/>
        <Route path="/job-listings" element={<JobList />
        }/>
         <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
    </div>
  </Router>
  
);
};

export default App;

