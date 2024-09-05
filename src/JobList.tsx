import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

interface JobListing {
  company_name: string;
  role_needed: string;
  employment_mode: 'full-time' | 'part-time' | 'flexible' | 'freelance';
  work_type: 'presencial' | 'remoto' | 'hibrido';
  industry: 'technology' | 'finance' | 'marketing' | 'other';
  keywords: string[];
  job_description: string;
  applicants_contact_type: 'mail' | 'DMs';
  email_applicants_receiver: string;
  company_website?: string;
  company_email?: string;
  invoice_company_email?: string;
  marketing_preferences?: string[];
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase.from('job_listings').select('*');
      if (error) {
        console.error('Error fetching job listings:', error);
      } else {
        setJobs(data || []);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Job Listings</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <ul>
          {jobs.map((job, index) => (
            <li key={index} className="mb-4 p-4 border rounded">
              <h3 className="font-semibold">{job.role_needed} at {job.company_name}</h3>
              <p><strong>Employment Mode:</strong> {job.employment_mode}</p>
              <p><strong>Work Type:</strong> {job.work_type}</p>
              <p><strong>Industry:</strong> {job.industry}</p>
              <p><strong>Description:</strong> {job.job_description}</p>
              <p><strong>Contact Email:</strong> {job.email_applicants_receiver}</p>
              <div className="flex flex-wrap space-x-2 mt-2">
                {job.keywords.map((keyword, index) => (
                  <span key={index} className="bg-gray-200 p-2 rounded">{keyword}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Export the component as default
export default JobList;
