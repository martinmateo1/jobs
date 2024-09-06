import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { supabase } from './supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { Skeleton } from "./components/ui/Skeleton"; // Import the Skeleton component

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobDetail = async () => {
      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('id', id)
        .single(); 

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
    // Display the skeleton loaders while loading
    return (
      <div className="grid grid-cols-12 gap-12 p-6">
        <div className="col-span-7">
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-1/3 mb-4" />
          <Skeleton className="h-4 w-1/4 mb-1" />
          <Skeleton className="h-4 w-2/3 mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-6 w-1/2 mb-1" />
        </div>
        <div className="col-span-5">
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-5 w-3/4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full mt-6" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="grid grid-cols-12 gap-12 p-6">
       <div className="col-span-7">
        <p className="text-gray-500">{job.company_name} está contratando a</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-1">{job.role_needed}</h1>
        <p><strong>Employment Mode:</strong> {job.employment_mode}</p>
        <p><strong>Work Type:</strong> {job.work_type}</p>
        <p><strong>Industry:</strong> {job.industry}</p>
        <p><strong>Description:</strong> {job.job_description}</p>
        <p><strong>Contact Email:</strong> {job.email_applicants_receiver}</p>
      </div>
      <div className="col-span-5">
        <p className="text-sm text-gray-900">⏰ Esta publicación expira en 42 días</p>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Preferencias de Marketing</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              className="mt-6 w-full py-7 text-lg"
            >
              Aplicar a esta búsqueda
            </Button>
            <p className="text-sm text-gray-900 mt-3 text-center">👆 644 clickearon en este botón</p>
          </CardContent>
        </Card>
        <div className="mt-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4 mb-1">{job.company_name}</h3>
            <a 
                href={job.company_website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline">
                {job.company_website}
            </a>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
