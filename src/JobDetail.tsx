import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import { supabase } from './supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the job ID from the URL parameters
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobDetail = async () => {
      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('id', id)
        .single(); // Fetch a single job listing by its ID

      if (error) {
        console.error('Error fetching job detail:', error);
      } else {
        setJob(data);
      }
      setLoading(false);
    };

    fetchJobDetail();
  }, [id]);

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>{job.role_needed} at {job.company_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Employment Mode:</strong> {job.employment_mode}</p>
        <p><strong>Work Type:</strong> {job.work_type}</p>
        <p><strong>Industry:</strong> {job.industry}</p>
        <p><strong>Description:</strong> {job.job_description}</p>
        <p><strong>Contact Email:</strong> {job.email_applicants_receiver}</p>
        {/* Additional job details go here */}
      </CardContent>
    </Card>
  );
};

export default JobDetail;
