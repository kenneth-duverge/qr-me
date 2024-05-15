import { useGetProfile } from '@/lib/api';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { QrDrawer } from './qr-drawer';

export const EditProfileDrawer = ({
  children,
  profileId,
}: React.PropsWithChildren<{ profileId: string | number }>) => {
  const data = useGetProfile(profileId);
  const mutate = useMutation(api.profiles.updateProfile);

  const saveContactProfile = (event: React.FormEvent) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);
    const formData = fd as FormData;
    // Make API request to save contact profile
    const firstName = formData.get('first-name') as string;
    const profileName = formData.get('profile-name') as string;
    const lastName = formData.get('last-name') as string;
    const website = formData.get('website') as string;
    const social = formData.get('social') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phone-number') as string;

    mutate({
      id: profileId as Id<'profiles'>,
      name: profileName,
      email,
      firstName,
      lastName,
      website,
      phoneNumber,
      social: [
        {
          handle: social.split('/').pop() as string,
          platform: social.includes('twitter') ? 'twitter' : 'instagram',
        },
      ],
    });
  };

  const initialValues = {
    firstName: data?.firstName ?? '',
    lastName: data?.lastName ?? '',
    social: data?.social ?? [{ handle: '', platform: '' }],
    email: data?.email ?? '',
    website: data?.website ?? '',
    phoneNumber: data?.phoneNumber ?? '',
    profileName: data?.name ?? '',
  };

  return (
    <QrDrawer initialValues={initialValues} profileId={profileId} onSubmit={saveContactProfile}>
      {children}
    </QrDrawer>
  );
};
