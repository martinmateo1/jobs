// src/LandingPage.tsx
import React from 'react';
import { useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

const LandingPage: React.FC = () => {
    
  return (
    <div>
    <div className="">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-0 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-0">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <div className="mt-24 sm:mt-32 lg:mt-0">
                  <a href="#" className="inline-flex space-x-6">
                    <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                      Nuevo
                    </span>
                    <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                      <span>¡Recién lanzamos!</span>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </a>
                </div>
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Recibí más aplicaciones para tus búsquedas, sin costos ocultos
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                Extendé el alcance de tus publicaciones de trabajo más allá de LinkedIn y seguí recibiendo candidatos sin pagar de más.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Empezá Gratis
                  </a>
                  <a href="#" className="text-md font-semibold leading-6 text-gray-900">
                    Publicá tu Primer Puesto <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                  aria-hidden="true"
                />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            NotificationSetting.jsx
                          </div>
                          <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                        </div>
                      </div>
                      <div className="px-6 pb-14 pt-6">'<p></p>''<p></p>''<p></p>''<p></p>''<p></p>''<p></p>''<p></p>''<p></p>''<p></p>''<p></p>''<p></p>''<p></p>'</div>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
    

    <div className="bg-white pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Trusted by the world’s most innovative teams
            </h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
                alt="Transistor"
                src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                width={158}
                height={48}
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
                alt="Reform"
                src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                width={158}
                height={48}
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
                alt="Tuple"
                src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                width={158}
                height={48}
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
                alt="SavvyCal"
                src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                width={158}
                height={48}
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            />
            <img
                alt="Statamic"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                width={158}
                height={48}
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            />
            </div>
        </div>
    </div>
</div>
    
    
  )
}


export default LandingPage;
