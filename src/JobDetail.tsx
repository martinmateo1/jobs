import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { supabase } from './supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { Skeleton } from "./components/ui/Skeleton"; // Import the Skeleton component
import { CheckIcon,HandThumbUpIcon, PaperClipIcon, UserIcon, } from '@heroicons/react/20/solid'
import {
    BriefcaseIcon,
    CalendarIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CurrencyDollarIcon,
    LinkIcon,
    MapPinIcon,
    PencilIcon,
  } from '@heroicons/react/20/solid'

  
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
    <main className="py-10 pt-24">
          {/* Page header */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                    className="h-16 w-16 rounded-full"
                  />
                  <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 flex">
                  <a href="#" className="text-gray-900 flex items-center">
                    {job.company_name} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 ml-0 mr-1 text-blue-500">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                  </a>{' '}
                  está contratando a 
                </p>
                <h1 className="text-4xl mt-1 font-bold text-gray-900">{job.role_needed}</h1>
              </div>
            </div>
            <div>
                <p className="text-sm text-gray-500">
                    <a href="/" className="text-gray-500 hover:underline hover:text-gray-700">
                        Powered by Finework
                    </a>
                </p>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <div className="max-w-3xl  lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500 capitalize">
                            <BriefcaseIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                            {job.work_type}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 capitalize">
                            <MapPinIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                            {job.employment_mode}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 capitalize">
                            <CurrencyDollarIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                            {job.industry}
                        </div>
                    </div>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 mt-8">
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Descripción de la búsqueda</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                        {job.job_description}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              
            </div>

            <section className="lg:col-span-1 lg:col-start-3 sticky top-4 self-start">
            <div className="flex items-center space-x-5 bg-white py-4 sm:px-4 shadow sm:rounded-lg ">
                <div className="flex-shrink-0">
                    <div className="relative">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                        className="h-12 w-12 rounded-full"
                    />
                    <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
                    </div>
                </div>
                <div>
                <h1 className="text-lg font-medium text-gray-900 flex items-center">{job.company_name} 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 ml-1 text-blue-500">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>

                </h1>
                <p className="text-sm font-medium text-gray-500">
                    <a href="#" className="text-gray-500">
                        {job.company_website}
                    </a>{' '}
                    </p>
                </div>              
            </div>

              <div className="bg-white px-5 py-6 shadow sm:rounded-lg sm:px-6 mt-6">
                <p id="timeline-title" className="text-sm text-gray-500 mt-0 text-center">
                  ¿Te interesa esta publicación?
                </p>

                {/* Activity Feed */}
                <div className="mt-4 flex flex-col justify-stretch">
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Aplicar a esta búsqueda
                  </button>
                  
                </div>  
                <p className="text-sm text-red-900 mt-4 text-center">👆 644 clickearon en este botón</p>
              </div>
              <div className="mt-6 bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Compartir en redes sociales:
                </label>
                <div className="mt-3 flex rounded-md shadow-sm">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value="www.finejob.com/3312"
                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    <button
                    type="button"
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    > 
                    Copiar enlace
                    </button>
                </div>
            </div>
              
            <p className="text-sm text-gray-500 mt-6">👉 Por favor, menciona que encontraste el trabajo en Finework, esto nos ayuda a que más empresas publiquen aquí, ¡muchas gracias! Al postularte para trabajos, NUNCA deberías tener que pagar para postularte. </p>
    </section>
</div>
</main>
  );
};

export default JobDetail;
