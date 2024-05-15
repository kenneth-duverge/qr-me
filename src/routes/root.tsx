import { QrCode } from 'lucide-react';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { Authenticated, Unauthenticated } from 'convex/react';

import { Button } from '@/components/ui/button';

export function Root() {
  const location = useLocation();
  return (
    <React.StrictMode>
      <div className="w-full p-4 lg:px-8 flex items-center justify-between text-white ">
        <Link to="/" className="flex items-center gap-3">
          <QrCode className="h-8 w-8" />
        </Link>
        <div className="flex items-center gap-4">
          <div className='h-9'>
            {location.pathname === '/' && (
              <Authenticated>
                <Link to="/profiles">
                  <Button variant="secondary">Profiles</Button>
                </Link>
              </Authenticated>
            )}
          </div>
          <Unauthenticated>
            <SignInButton />
          </Unauthenticated>
          <Authenticated>
            <UserButton />
          </Authenticated>
        </div>
      </div>
      <Outlet />
    </React.StrictMode>
  );
}
