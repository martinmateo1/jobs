import React from 'react';
import JobForm from './JobForm';
import JobList from './JobList';
import './index.css'; // Import Tailwind CSS

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Job Posting Platform</h1>
      <JobForm />
      <JobList />
    </div>
  );
};

export default App;
