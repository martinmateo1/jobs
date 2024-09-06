import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import { Skeleton } from "./components/ui/Skeleton";

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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Job Listings</h2>
      {loading ? (
       <div className="flex flex-col space-y-3">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <Card key={index} className="shadow-md rounded-md">
              <CardHeader>
                <CardTitle>{job.role_needed} at {job.company_name}</CardTitle>
                <CardDescription>Industry: {job.industry}</CardDescription>
              </CardHeader>
              <CardContent>
                <p><strong>Employment Mode:</strong> {job.employment_mode}</p>
                <p><strong>Work Type:</strong> {job.work_type}</p>
                <p><strong>Description:</strong> {job.job_description}</p>
                <p><strong>Contact Email:</strong> {job.email_applicants_receiver}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.keywords.map((keyword, index) => (
                    <Badge key={index} className="bg-gray-200 text-sm">{keyword}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Export the component as default
export default JobList;
