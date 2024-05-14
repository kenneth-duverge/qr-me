import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
// import { Link } from 'react-router-dom';

import { QrDrawer } from './qr-drawer';
import { Button } from './ui/button';

import { api } from '../../convex/_generated/api';

export const EmptyState = () => {
  const mutate = useMutation(api.profiles.createProfile);
  const { user } = useUser();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

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
      social: [{ handle: '', platform: '' }],
      firstName,
      lastName,
      email,
      phoneNumber,
    });
  };
  return (
    <div className="w-full text-white md:mx-auto font-mono md:w-[80%] h-[80%] lg:border-2 lg:mx-auto mt-10 border-zinc-500 border-dashed rounded-md  flex p-8 items-center justify-center">
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-lg md:text-2xl text-center font-mono">
          You have no QR contact profiles.
        </h1>
        <div>
          <QrDrawer onSubmit={handleSubmit} title="Create Profile">
            <Button variant="secondary">Generate one</Button>
          </QrDrawer>
        </div>
      </div>
    </div>
  );
};
