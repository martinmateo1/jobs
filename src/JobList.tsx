import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Badge } from "./components/ui/Badge";

interface JobListing {
  id: number; // Assuming each job has an ID
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
    <div className="px-6 py-24 sm:py-24 lg:px-8">
      <div className="max-w-4xl">
        <p className="text-base font-semibold text-indigo-600">Get the help you need</p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Búsquedas activas</h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
        </p>
      </div>
      {loading ? (
        <div className=" mt-6">
          {/* Skeleton loaders to mimic card appearance */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="relative flex justify-between px-4 py-5 bg-white ring-1 ring-gray-900/5 sm:rounded-lg animate-pulse">
              <div className="flex min-w-0">
                <div className="min-w-0 flex-auto">
                  <div className="h-12 bg-gray-200 rounded w-1 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-gray-200 p-1 h-3 w-3"></div>
                    <div className="h-2 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-200" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <ul role="list" className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-6">
            {jobs.map((job) => (
              <li key={job.id}>
                <Link to={`/job/${job.id}`} className="block relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-lg font-semibold leading-6 text-gray-900">
                        {job.role_needed} at {job.company_name}
                      </p>
                      <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        <span className="relative truncate hover:underline">
                          {job.industry} - {job.employment_mode} - {job.work_type}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-4">
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {job.keywords.map((keyword, index) => (
                          <Badge key={index} className="bg-gray-200 text-sm">{keyword}</Badge>
                        ))}
                      </p>
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">Búsqueda activa</p>
                      </div>
                    </div>
                    <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobList;
