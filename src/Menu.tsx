import React from 'react';
import { Link } from 'react-router-dom'; // Correct import for Link
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from './components/ui/NavigationMenu';

const Menu: React.FC = () => {
  return (
    <NavigationMenu className="p-4 bg-gray-100 shadow-md">
      <NavigationMenuList className="flex space-x-4">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/create-job" className="text-blue-600 hover:underline">
              Create Job
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/job-listings" className="text-blue-600 hover:underline">
              Job Listings
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Menu;
