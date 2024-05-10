import { Link } from 'react-router-dom';

import { Button } from './ui/button';
import { QrDrawer } from './qr-drawer';

export const EmptyState = () => (
  <div className="w-full text-white font-mono md:w-[80%] h-[80%] lg:border-2 lg:mx-auto mt-10 border-zinc-500 border-dashed rounded-md  flex p-8 items-center justify-center">
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-lg md:text-2xl text-center font-mono">
        You have no QR contact profiles.
      </h1>
      <div>
        <QrDrawer title="Create Profile">
          <Button className="flex md:hidden" variant="secondary">
            Generate one
          </Button>
        </QrDrawer>
        <Link to="/generate" className="hidden md:flex">
          <Button variant="secondary">Generate one</Button>
        </Link>
      </div>
    </div>
  </div>
);
