// src/Menu.tsx
'use client'

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: '¿Por qué Finejob?', href: '#por-que-finejob' },
  { name: 'Beneficios', href: '#beneficios' },
  { name: 'Testimonios', href: '#testimonios' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Job Listings', href: '/job-listings' },
];

const Menu: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const hideMenuPaths = ['/login', '/create-job'];
  const isJobDetailPage = location.pathname.startsWith('/job/');

  if (hideMenuPaths.includes(location.pathname) || isJobDetailPage) {
    return null;
  }

  return (
    <header className="top-0 left-0 z-50 w-full bg-white shadow-sm">
      <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Finework</span>
            <svg fill="currentColor" className="text-indigo-700" width="31" height="36" viewBox="0 0 31 36" xmlns="http://www.w3.org/2000/svg">
              {/* Your SVG paths */}
            </svg>
          </a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Main Navigation for Desktop */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium leading-6 text-gray-900 hover:underline hover:underline-offset-4 scroll-smooth"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Get Started Button for Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/create-job" className="text-sm font-semibold leading-6 text-gray-900">
            Publicá tu búsqueda <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <svg fill="currentColor" className="text-indigo-500" width="31" height="36" viewBox="0 0 31 36" xmlns="http://www.w3.org/2000/svg">
                {/* Your SVG paths */}
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 scroll-smooth"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Menu;
