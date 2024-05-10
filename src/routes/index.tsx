import { PencilIcon } from 'lucide-react';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import { Drawer } from 'vaul';

import { QrForm } from '@/components/qr-form';
import { Button } from '@/components/ui/button';

import { useGetProfile, useGetProfiles } from '@/lib/api';

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

const QrProfile = ({
  children,
  profileId,
}: React.PropsWithChildren<{ profileId: string | number }>) => {
  return (
    <div className="w-full md:w-full h-max bg-zinc-800 p-4 flex gap-4 items-center hover:bg-zinc-700 rounded-md">
      <div className="w-max border h-full">
        <QRCode value={`${Math.random()}`} className="w-[50px] h-full bg-white p-[2px]" />
      </div>
      <p className="flex-1 flex-col h-full flex justify-between">{children}</p>
      <div className="flex gap-3 items-center h-full">
        <QrDrawer>
          <Button size="icon" variant="outline" className="!border-white/20">
            <PencilIcon className="h-4 w-4" />
          </Button>
        </QrDrawer>
        <QrViewDrawer profileId={profileId}>
          <Button size="default" variant="secondary">
            View
          </Button>
        </QrViewDrawer>
      </div>
    </div>
  );
};

const QrViewDrawer = ({
  children,
  profileId,
}: React.PropsWithChildren<{ profileId: string | number }>) => {
  const { data } = useGetProfile(profileId);
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-900 font-mono flex flex-col rounded-t-[10px] h-[90%] mt-24 fixed bottom-0 left-0 right-0">
          <Drawer.Handle />
          <div className="container pt-20 lg:max-w-[800px] h-full justify-around flex flex-col gap-8">
            <div className="flex w-full items-center justify-center h-max">
              <QRCode value={`${Math.random()}`} className="bg-white p-4" />
            </div>
            <h1 className="text-2xl text-white/50">{data?.name}</h1>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const QrDrawer = ({
  children,
  title = 'Edit Profile',
}: React.PropsWithChildren<{ title?: string }>) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-900 flex flex-col px-4 rounded-t-[10px] font-mono h-[90%] fixed bottom-0 left-0 right-0">
          <Drawer.Handle />
          <div className="container h-full !px-4 lg:!px-8 mx-auto pt-10 lg:max-w-[800px] flex flex-col gap-4">
            <h1 className="text-3xl text-white">{title}</h1>
            <div className="mt-8 flex h-max">
              <QrForm />
            </div>
            <div className="flex flex-col-reverse w-full gap-4 flex-1 items-center pb-10">
              <Drawer.Close asChild>
                <Button variant="secondary" className="w-full">
                  Save
                </Button>
              </Drawer.Close>
              <Drawer.Close asChild>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </Drawer.Close>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export const Index = () => {
  const { data, isLoading } = useGetProfiles();

  if (isLoading) return null;

  if (!data) return <EmptyState />;

  console.log(data);

  return (
    <div className="flex-1 font-mono w-full flex flex-col gap-4 py-8 text-white container !px-4 lg:!px-8">
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
          {data.map((p) => (
            <QrProfile profileId={p.id} key={p.id}>
              <p className="text-balance">{p.name}</p>
              <p className="text-xs md:text-sm text-zinc-500">{p.createdDate}</p>
            </QrProfile>
          ))}
        </div>
      </div>
    </div>
  );
};
