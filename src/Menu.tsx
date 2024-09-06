import React from 'react';
import { Link } from 'react-router-dom'; // Correct import for Link
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from './components/ui/NavigationMenu';
import { Button } from "./components/ui/Button"

const Menu: React.FC = () => {
  return (
    <header className="top-0 left-0 z-50 w-full bg-background shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo and title */}
        
        {/* Main Navigation using NavigationMenu from shadcn */}
        <NavigationMenu className="hidden md:flex space-x-4">
          <NavigationMenuList className="flex space-x-4">
            {/* Your existing navigation items */}
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

            {/* New additional navigation items */}
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