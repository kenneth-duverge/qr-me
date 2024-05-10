import { Drawer } from 'vaul';
import QRCode from 'react-qr-code';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { QrForm } from '@/components/qr-form';

const EmptyState = () => (
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

const QrProfile = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="w-full md:w-full h-max bg-zinc-800 p-4 flex gap-4 items-center hover:bg-zinc-700 rounded-md">
      <div className="w-max border h-full">
        <QRCode value={`${Math.random()}`} className="w-[50px] h-full bg-white p-[2px]" />
      </div>
      <p className="flex-1 flex-col gap-4 justify-between items-start">{children}</p>
      <div className="flex gap-2 items-center">
        <QrDrawer>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </QrDrawer>
        <QrViewDrawer>
          <Button size="sm" variant="secondary">
            View
          </Button>
        </QrViewDrawer>
      </div>
    </div>
  );
};

const QrViewDrawer = ({ children }: React.PropsWithChildren) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-900 flex flex-col rounded-t-[10px] h-[90%] mt-24 fixed bottom-0 left-0 right-0">
          <Drawer.Handle />
          <div className="container mx-auto pt-20 lg:max-w-[800px] flex flex-col gap-8">
            <div className="flex h-full w-full items-center justify-center">
              <QRCode value={`${Math.random()}`} className="bg-white p-4" />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const QrDrawer = ({
  children,
  title = 'Edit QR Profile',
}: React.PropsWithChildren<{ title?: string }>) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-900 flex flex-col rounded-t-[10px] h-[90%] mt-24 fixed bottom-0 left-0 right-0">
          <Drawer.Handle />
          <div className="container mx-auto pt-20 lg:max-w-[800px] flex flex-col gap-8">
            <h1 className="text-3xl text-white">{title}</h1>
            <div className="mt-8">
              <QrForm />
            </div>
            <div className="flex flex-col gap-4">
              <Drawer.Close asChild>
                <Button variant="secondary">Save</Button>
              </Drawer.Close>
              <Drawer.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Drawer.Close>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const data = [];

export const Index = () => {
  if (data.length === 1) return <EmptyState />;

  return (
    <div className="flex-1 font-mono w-full flex flex-col gap-4 py-8 text-white container">
      <div className="justify-start flex flex-col pt-8 md:pt-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl lg:text-3xl text-white">Profiles</h1>
          <QrDrawer title="Create Profile">
            <Button className="flex lg:hidden" variant="secondary">
              New
            </Button>
          </QrDrawer>
        </div>
        <div className="flex mt-16 lg:mt-20 flex-col gap-4 max-w-[800px] w-full self-center">
          <QrProfile>
            <p>Personal</p>
            <p className="text-sm text-zinc-500">March 12, 2024</p>
          </QrProfile>
          <QrProfile>
            <p>Business</p>
            <p className="text-sm text-zinc-500">March 12, 2024</p>
          </QrProfile>
          <QrProfile>
            <p>Comic con</p>
            <p className="text-sm text-zinc-500">March 12, 2024</p>
          </QrProfile>
          <QrProfile>
            <p>Work</p>
            <p className="text-sm text-zinc-500">March 15, 2024</p>
          </QrProfile>
        </div>
      </div>
    </div>
  );
};
