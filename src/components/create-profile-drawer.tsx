import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';

import { api } from '../../convex/_generated/api';

import { QrDrawer } from './qr-drawer';

const defaultValues = {
  firstName: '',
  lastName: '',
  social: [{ handle: '', platform: '' }],
  email: '',
  website: '',
  phoneNumber: '',
  profileName: '',
};

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
    const social = formData.get('social') as string;

    mutate({
      name: profileName,
      website,
      social: [
        {
          handle: social.split('/').pop() as string,
          platform: social.includes('instagram') ? 'instagram' : 'twitter',
        },
      ],
      firstName,
      lastName,
      email,
      phoneNumber,
    });
  };

  const initialValues = {
    ...defaultValues,
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.emailAddresses?.[0]?.emailAddress ?? '',
    phoneNumber: user?.phoneNumbers?.[0]?.phoneNumber ?? '',
  };

  return (
    <QrDrawer initialValues={initialValues} onSubmit={saveContactProfile} title="Create Profile">
      {children}
    </QrDrawer>
  );
};
