// src/Menu.tsx
'use client'

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from './components/ui/NavigationMenu';
import { Button } from "./components/ui/Button";

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: '¿Por qué Finejob?', href: '/' },
  { name: 'Beneficios', href: '/' },
  { name: 'Testimonios', href: '/' },
  { name: 'Pricing', href: '/' },
  { name: 'Job Listings', href: '/job-listings' },
];

const Menu: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get the current location

  // Define paths where you want to hide the menu
  const hideMenuPaths = ['/login', '/create-job']; // Add paths where the menu should be hidden
  const isJobDetailPage = location.pathname.startsWith('/job/'); // Check if the path starts with '/job/'
  // Check if the current path is in the list of paths where the menu should be hidden
  if (hideMenuPaths.includes(location.pathname) || isJobDetailPage) {
    return null; // Do not render the menu on these paths
  }


  return (
    <header className="top-0 left-0 z-50 w-full bg-white shadow-sm">
      <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Finework</span>
            <svg fill="currentColor" className="text-indigo-700" width="31" height="36" viewBox="0 0 31 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.4631 0.511113C24.9987 0.307175 25.7352 0.674315 25.7352 1.14523L25.7352 6.93759C25.7352 7.12704 25.6071 7.28875 25.3918 7.37101L6.01231 14.776C5.47681 14.9806 4.73934 14.6134 4.73934 14.1422L4.73934 8.32387C4.73934 8.13416 4.86782 7.97229 5.08359 7.89013L24.4631 0.511113Z" fill="#9E3DEE"/>
                <path d="M24.463 10.638C24.9986 10.4341 25.7351 10.8012 25.7352 11.2721L25.7355 17.064C25.7355 17.2533 25.6075 17.415 25.3923 17.4973L6.01249 24.9108C5.47702 25.1156 4.73926 24.7484 4.73926 24.2771L4.73926 18.4502C4.73926 18.2605 4.86774 18.0986 5.08352 18.0164L24.463 10.638Z" fill="#9E3DEE"/>
                <path d="M13.3767 25.0041C13.9125 24.8013 14.6475 25.1684 14.6475 25.6387L14.6475 31.447C14.6475 31.6368 14.5188 31.7988 14.3028 31.8809L6.01108 35.0329C5.47543 35.2365 4.73932 34.8693 4.73932 34.3986L4.73932 28.5771C4.73932 28.387 4.86837 28.2248 5.08494 28.1428L13.3767 25.0041Z" fill="#9E3DEE"/>
            </svg>
          </Link>
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
            <Link key={item.name} to={item.href} className="text-sm font-medium leading-6 text-gray-900 hover:underline hover:underline-offset-4">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Get Started Button for Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/create-job" className="text-sm font-semibold leading-6 text-gray-900">
            Publicá tu búsqueda <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <svg fill="currentColor" className="text-indigo-500" width="31" height="36" viewBox="0 0 31 36" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.4631 0.511113C24.9987 0.307175 25.7352 0.674315 25.7352 1.14523L25.7352 6.93759C25.7352 7.12704 25.6071 7.28875 25.3918 7.37101L6.01231 14.776C5.47681 14.9806 4.73934 14.6134 4.73934 14.1422L4.73934 8.32387C4.73934 8.13416 4.86782 7.97229 5.08359 7.89013L24.4631 0.511113Z" />
                <path d="M24.463 10.638C24.9986 10.4341 25.7351 10.8012 25.7352 11.2721L25.7355 17.064C25.7355 17.2533 25.6075 17.415 25.3923 17.4973L6.01249 24.9108C5.47702 25.1156 4.73926 24.7484 4.73926 24.2771L4.73926 18.4502C4.73926 18.2605 4.86774 18.0986 5.08352 18.0164L24.463 10.638Z" />
                <path d="M13.3767 25.0041C13.9125 24.8013 14.6475 25.1684 14.6475 25.6387L14.6475 31.447C14.6475 31.6368 14.5188 31.7988 14.3028 31.8809L6.01108 35.0329C5.47543 35.2365 4.73932 34.8693 4.73932 34.3986L4.73932 28.5771C4.73932 28.387 4.86837 28.2248 5.08494 28.1428L13.3767 25.0041Z" />
            </svg>
            </Link>
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
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  to="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Menu;
