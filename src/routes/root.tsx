import { QrCode } from 'lucide-react';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export function Root() {
  const location = useLocation();
  return (
    <React.StrictMode>
      <div className="h-20 w-full p-4 lg:px-8 flex items-center justify-between text-white ">
        <Link to="/" className="flex items-center gap-3">
          <QrCode className="h-8 w-8" />
        </Link>
        {location.pathname === '/' && (
          <Link to="/generate">
            <Button className="bg-white text-zinc-900 hover:bg-zinc-200 hidden lg:flex">
              New
            </Button>
          </Link>
        )}
      </div>
      <Outlet />
    </React.StrictMode>
  );
}
