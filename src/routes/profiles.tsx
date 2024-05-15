import { useQuery } from 'convex/react';

import { EmptyState } from '@/components/empty-state';
import { QrProfile } from '@/components/qr-profile';
import { Button } from '@/components/ui/button';
import { CreateProfileDrawer } from '@/components/create-profile-drawer';

import { api } from '../../convex/_generated/api';

export const Profiles = () => {
  const data = useQuery(api.profiles.getProfiles);

  const isLoading = !data;

  if (isLoading) return null;

  if (!data || data.length === 0) return <EmptyState />;

  return (
    <div className="flex-1 font-mono w-full flex flex-col gap-4 py-8 text-white container !px-4 lg:!px-8">
      <div className="justify-start flex flex-col">
        <div className="flex justify-between items-center sticky top-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl lg:text-3xl text-white">Profiles</h1>
          </div>
          <CreateProfileDrawer>
            <Button className="flex lg:hidden" variant="secondary">
              New
            </Button>
          </CreateProfileDrawer>
        </div>
        <div className="flex mt-16 flex-col gap-4 max-w-[800px] w-full self-center overflow-y-scroll max-h-[600px] md:max-h-[600px]">
          {data.map((p) => (
            <QrProfile profileId={p._id} key={p._id}>
              <p className="text-balance">{p.name}</p>
              <p className="text-xs md:text-sm text-zinc-500">
                {new Date(p._creationTime).toLocaleDateString()}
              </p>
            </QrProfile>
          ))}
        </div>
      </div>
    </div>
  );
};
