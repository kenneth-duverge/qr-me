import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import React from 'react';

import { EmptyState } from '@/components/empty-state';
import { QrDrawer } from '@/components/qr-drawer';
import { QrProfile } from '@/components/qr-profile';
import { Button } from '@/components/ui/button';

import { api } from '../../convex/_generated/api';

const CreateProfileDrawer = ({ children }: React.PropsWithChildren) => {
  const { user } = useUser();
  const mutate = useMutation(api.profiles.createProfile);

  const saveContactProfile = (event: React.FormEvent) => {
    event.preventDefault();

    // Probably don't need to be defensive here because this will be behind a protected route
    if (!user?.id) return;

    const fd = new FormData(event.target as HTMLFormElement);
    const formData = fd as FormData;
    // Make API request to save contact profile
    const profileName = formData.get('profile-name') as string;
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const website = formData.get('website') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phone-number') as string;
    // const social = formData.get('social') as string;

    mutate({
      name: profileName,
      website,
      social: [],
      firstName,
      lastName,
      email,
      phoneNumber,
    });
  };
  return (
    <QrDrawer onSubmit={saveContactProfile} title="Create Profile">
      {children}
    </QrDrawer>
  );
};

export const Profiles = () => {
  const data = useQuery(api.profiles.getProfiles);

  const isLoading = !data;

  if (isLoading) return null;

  if (!data || data.length === 0) return <EmptyState />;

  return (
    <div className="flex-1 font-mono w-full flex flex-col gap-4 py-8 text-white container !px-4 lg:!px-8">
      <div className="justify-start flex flex-col pt-8 md:pt-0">
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
        <div className="flex mt-16 lg:mt-20 flex-col gap-4 max-w-[800px] w-full self-center overflow-y-scroll max-h-[600px] md:max-h-[600px]">
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
