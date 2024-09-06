import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from './components/ui/NavigationMenu';
import { Button } from "./components/ui/Button";

const Menu: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="top-0 left-0 z-50 w-full bg-background shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Hamburger menu button for mobile */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Main Navigation using NavigationMenu from shadcn */}
        <NavigationMenu
          className={`absolute left-0 top-16 z-40 w-full flex-col bg-background md:flex md:flex-row md:static md:w-auto md:space-x-4 ${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex`}
        >
          <NavigationMenuList className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/create-job" className="text-sm font-medium hover:underline hover:underline-offset-4">
                  Create Job
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/job-listings" className="text-sm font-medium hover:underline hover:underline-offset-4">
                  Job Listings
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/contact" className="text-sm font-medium hover:underline hover:underline-offset-4">
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Get Started button */}
        <Button className="hidden md:block">Get Started</Button>
      </div>
    </header>
  );
};

export default Menu;
