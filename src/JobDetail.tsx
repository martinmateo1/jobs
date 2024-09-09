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
                    {job.company_name} 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 ml-0 mr-1 text-blue-500">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                  </a>{' '}
                  está contratando a 
                </p>
                <h1 className="text-4xl mt-1 font-bold text-gray-900">{job.role_needed}</h1>
              </div>
            </div>
            <div className="flex items-center">
                <svg fill="currentColor" className="text-indigo-700" width="16" viewBox="0 0 31 36" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.4631 0.511113C24.9987 0.307175 25.7352 0.674315 25.7352 1.14523L25.7352 6.93759C25.7352 7.12704 25.6071 7.28875 25.3918 7.37101L6.01231 14.776C5.47681 14.9806 4.73934 14.6134 4.73934 14.1422L4.73934 8.32387C4.73934 8.13416 4.86782 7.97229 5.08359 7.89013L24.4631 0.511113Z" fill="#9E3DEE"/>
                    <path d="M24.463 10.638C24.9986 10.4341 25.7351 10.8012 25.7352 11.2721L25.7355 17.064C25.7355 17.2533 25.6075 17.415 25.3923 17.4973L6.01249 24.9108C5.47702 25.1156 4.73926 24.7484 4.73926 24.2771L4.73926 18.4502C4.73926 18.2605 4.86774 18.0986 5.08352 18.0164L24.463 10.638Z" fill="#9E3DEE"/>
                    <path d="M13.3767 25.0041C13.9125 24.8013 14.6475 25.1684 14.6475 25.6387L14.6475 31.447C14.6475 31.6368 14.5188 31.7988 14.3028 31.8809L6.01108 35.0329C5.47543 35.2365 4.73932 34.8693 4.73932 34.3986L4.73932 28.5771C4.73932 28.387 4.86837 28.2248 5.08494 28.1428L13.3767 25.0041Z" fill="#9E3DEE"/>
                    <path d="M32.5312 34.0015V12.1775H38.0752V34.0015H32.5312ZM35.3032 9.62546C34.3058 9.62546 33.4552 9.3028 32.7512 8.65746C32.0765 8.01213 31.7392 7.16146 31.7392 6.10546C31.7392 5.04946 32.0765 4.1988 32.7512 3.55346C33.4552 2.90813 34.3058 2.58546 35.3032 2.58546C36.3298 2.58546 37.1805 2.90813 37.8552 3.55346C38.5298 4.1988 38.8672 5.04946 38.8672 6.10546C38.8672 7.16146 38.5298 8.01213 37.8552 8.65746C37.1805 9.3028 36.3298 9.62546 35.3032 9.62546ZM44.2187 34.0015V12.1775H49.6747V15.0375H50.4667C50.8187 14.2748 51.4787 13.5561 52.4467 12.8815C53.4147 12.1775 54.8813 11.8255 56.8467 11.8255C58.548 11.8255 60.0293 12.2215 61.2907 13.0135C62.5813 13.7761 63.5787 14.8468 64.2827 16.2255C64.9867 17.5748 65.3387 19.1588 65.3387 20.9775V34.0015H59.7947V21.4175C59.7947 19.7748 59.384 18.5428 58.5627 17.7215C57.7707 16.9001 56.6267 16.4895 55.1307 16.4895C53.4293 16.4895 52.1093 17.0615 51.1707 18.2055C50.232 19.3201 49.7627 20.8895 49.7627 22.9135V34.0015H44.2187ZM81.276 34.6175C79.1053 34.6175 77.184 34.1628 75.512 33.2535C73.8693 32.3148 72.5786 31.0095 71.64 29.3375C70.7306 27.6361 70.276 25.6415 70.276 23.3535V22.8255C70.276 20.5375 70.7306 18.5575 71.64 16.8855C72.5493 15.1841 73.8253 13.8788 75.468 12.9695C77.1106 12.0308 79.0173 11.5615 81.188 11.5615C83.3293 11.5615 85.192 12.0455 86.776 13.0135C88.36 13.9521 89.592 15.2721 90.472 16.9735C91.352 18.6455 91.792 20.5961 91.792 22.8255V24.7175H75.908C75.9666 26.2135 76.524 27.4308 77.58 28.3695C78.636 29.3081 79.9266 29.7775 81.452 29.7775C83.0066 29.7775 84.1506 29.4401 84.884 28.7655C85.6173 28.0908 86.1746 27.3428 86.556 26.5215L91.088 28.8975C90.6773 29.6601 90.076 30.4961 89.284 31.4055C88.5213 32.2855 87.4946 33.0481 86.204 33.6935C84.9133 34.3095 83.2706 34.6175 81.276 34.6175ZM75.952 20.5815H86.16C86.0426 19.3201 85.5293 18.3081 84.62 17.5455C83.74 16.7828 82.5813 16.4015 81.144 16.4015C79.648 16.4015 78.46 16.7828 77.58 17.5455C76.7 18.3081 76.1573 19.3201 75.952 20.5815ZM92.6785 42.8015V38.0495H95.5825C96.4038 38.0495 96.8145 37.6095 96.8145 36.7295V12.1775H102.358V37.8735C102.358 39.3695 101.918 40.5575 101.038 41.4375C100.158 42.3468 98.9852 42.8015 97.5185 42.8015H92.6785ZM99.5865 9.62546C98.5892 9.62546 97.7385 9.3028 97.0345 8.65746C96.3598 8.01213 96.0225 7.16146 96.0225 6.10546C96.0225 5.04946 96.3598 4.1988 97.0345 3.55346C97.7385 2.90813 98.5892 2.58546 99.5865 2.58546C100.613 2.58546 101.464 2.90813 102.138 3.55346C102.813 4.1988 103.15 5.04946 103.15 6.10546C103.15 7.16146 102.813 8.01213 102.138 8.65746C101.464 9.3028 100.613 9.62546 99.5865 9.62546ZM118.884 34.6175C116.713 34.6175 114.763 34.1775 113.032 33.2975C111.301 32.4175 109.937 31.1415 108.94 29.4695C107.943 27.7975 107.444 25.7881 107.444 23.4415V22.7375C107.444 20.3908 107.943 18.3815 108.94 16.7095C109.937 15.0375 111.301 13.7615 113.032 12.8815C114.763 12.0015 116.713 11.5615 118.884 11.5615C121.055 11.5615 123.005 12.0015 124.736 12.8815C126.467 13.7615 127.831 15.0375 128.828 16.7095C129.825 18.3815 130.324 20.3908 130.324 22.7375V23.4415C130.324 25.7881 129.825 27.7975 128.828 29.4695C127.831 31.1415 126.467 32.4175 124.736 33.2975C123.005 34.1775 121.055 34.6175 118.884 34.6175ZM118.884 29.6895C120.585 29.6895 121.993 29.1468 123.108 28.0615C124.223 26.9468 124.78 25.3628 124.78 23.3095V22.8695C124.78 20.8161 124.223 19.2468 123.108 18.1615C122.023 17.0468 120.615 16.4895 118.884 16.4895C117.183 16.4895 115.775 17.0468 114.66 18.1615C113.545 19.2468 112.988 20.8161 112.988 22.8695V23.3095C112.988 25.3628 113.545 26.9468 114.66 28.0615C115.775 29.1468 117.183 29.6895 118.884 29.6895ZM148.553 34.6175C146.588 34.6175 145.077 34.2801 144.021 33.6055C142.965 32.9308 142.188 32.1828 141.689 31.3615H140.897V34.0015H135.441V3.20146H140.985V14.6855H141.777C142.1 14.1575 142.525 13.6588 143.053 13.1895C143.611 12.7201 144.329 12.3388 145.209 12.0455C146.119 11.7228 147.233 11.5615 148.553 11.5615C150.313 11.5615 151.941 12.0015 153.437 12.8815C154.933 13.7321 156.136 14.9935 157.045 16.6655C157.955 18.3375 158.409 20.3615 158.409 22.7375V23.4415C158.409 25.8175 157.955 27.8415 157.045 29.5135C156.136 31.1855 154.933 32.4615 153.437 33.3415C151.941 34.1921 150.313 34.6175 148.553 34.6175ZM146.881 29.7775C148.583 29.7775 150.005 29.2348 151.149 28.1495C152.293 27.0348 152.865 25.4215 152.865 23.3095V22.8695C152.865 20.7575 152.293 19.1588 151.149 18.0735C150.035 16.9588 148.612 16.4015 146.881 16.4015C145.18 16.4015 143.757 16.9588 142.613 18.0735C141.469 19.1588 140.897 20.7575 140.897 22.8695V23.3095C140.897 25.4215 141.469 27.0348 142.613 28.1495C143.757 29.2348 145.18 29.7775 146.881 29.7775Z" fill="#9E3DEE"/>
                </svg>
                <a href="/"><p className="hover:underline text-gray-500 text-sm ml-1">Powered by Finejob</p></a>
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
