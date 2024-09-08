import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { supabase } from './supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { Skeleton } from "./components/ui/Skeleton"; // Import the Skeleton component
import { CheckIcon,HandThumbUpIcon, PaperClipIcon, UserIcon, } from '@heroicons/react/20/solid'

  const attachments = [
    { name: 'resume_front_end_developer.pdf', href: '#' },
    { name: 'coverletter_front_end_developer.pdf', href: '#' },
  ]
  
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
    <main className="py-10">
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
                <p className="text-sm font-medium text-gray-500">
                  <a href="#" className="text-gray-900">
                    {job.company_name}
                  </a>{' '}
                  está contratando a
                </p>
                <h1 className="text-4xl font-bold text-gray-900">{job.role_needed}</h1>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">
                      Información sobre la búsqueda
                    </h2>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Modalidad de empleo</dt>
                        <dd className="mt-1 text-sm text-gray-900">{job.employment_mode}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Tipo de trabajo</dt>
                        <dd className="mt-1 text-sm text-gray-900">{job.work_type}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Industria</dt>
                        <dd className="mt-1 text-sm text-gray-900">{job.industry}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                        <dd className="mt-1 text-sm text-gray-900">+1 555-555-5555</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Descripción de la búsqueda</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                        {job.job_description}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                            {attachments.map((attachment) => (
                              <li
                                key={attachment.name}
                                className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                              >
                                <div className="flex w-0 flex-1 items-center">
                                  <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                  <span className="ml-2 w-0 flex-1 truncate">{attachment.name}</span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a href={attachment.href} className="font-medium text-blue-600 hover:text-blue-500">
                                    Download
                                  </a>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                    >
                      Read full application
                    </a>
                  </div>
                </div>
              </section>

              
            </div>

            <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                  Acciones
                </h2>

                {/* Activity Feed */}
                <div className="mt-6 flow-root">
                  
                </div>
                <div className="mt-6 flex flex-col justify-stretch">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Aplicar a esta búsqueda
                  </button>
                  
                </div>  
                <p className="text-sm text-gray-500 mt-3 text-center">👆 644 clickearon en este botón</p>
              </div>
              <div className="mt-4 bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Compartir en redes sociales:
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        
                    </div>
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
              <div className="flex items-center space-x-5 mt-4 bg-white py-4 sm:px-4 shadow sm:rounded-lg ">
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
                <h1 className="text-lg font-medium text-gray-900">{job.company_name}</h1>
                    <p className="text-sm font-medium text-gray-500">
                    <a href="#" className="text-gray-500">
                        {job.company_website}
                    </a>{' '}
                    </p>
                </div>              
            </div>
            <p className="text-sm text-gray-500 mt-4">👉 Por favor, menciona que encontraste el trabajo en Finework, esto nos ayuda a que más empresas publiquen aquí, ¡muchas gracias! Al postularte para trabajos, NUNCA deberías tener que pagar para postularte. </p>
    </section>
</div>
</main>
  );
};

export default JobDetail;
