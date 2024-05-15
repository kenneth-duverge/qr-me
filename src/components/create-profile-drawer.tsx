import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';

import { api } from '../../convex/_generated/api';

import { QrDrawer } from './qr-drawer';

export const CreateProfileDrawer = ({ children }: React.PropsWithChildren) => {
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
