import { Drawer } from 'vaul';
import { useUser } from '@clerk/clerk-react';
import { useRef } from 'react';
import { useMutation } from 'convex/react';

import { useGetProfile } from '@/lib/api';
import { QrForm } from './qr-form';
import { Button } from './ui/button';

import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

const defaultValues = {
  firstName: '',
  lastName: '',
  social: [{ handle: '', platform: '' }],
  email: '',
  website: '',
  phoneNumber: '',
  profileName: '',
};

export const QrDrawer = ({
  children,
  onSubmit,
  title = 'Edit Profile',
  profileId,
}: React.PropsWithChildren<{
  title?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  profileId?: string | number;
}>) => {
  const { user } = useUser();
  const data = useGetProfile(profileId);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const mutate = useMutation(api.profiles.deleteProfile);

  const initialValues = data
    ? {
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        social: data.social ?? [{ handle: '', platform: '' }],
        email: data.email ?? '',
        website: data.website ?? '',
        phoneNumber: data.phoneNumber,
        profileName: data.name,
      }
    : {
        ...defaultValues,
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.emailAddresses?.[0]?.emailAddress ?? '',
        phoneNumber: user?.phoneNumbers?.[0]?.phoneNumber ?? '',
      };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    onSubmit(event);
    closeButtonRef.current?.click();
  };
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-900 flex flex-col px-4 pt-10 rounded-t-[10px] font-mono h-[96%] fixed bottom-0 left-0 right-0 text-white">
          <Drawer.Handle className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
          <div className="container relative overflow-auto pb-24 h-full !px-4 lg:!px-8 mx-auto lg:max-w-[800px] flex flex-col gap-5">
            <div className="flex justify-between">
              <Drawer.Title className="text-2xl">{title}</Drawer.Title>
              {title === 'Edit Profile' && (
                <Drawer.Close asChild>
                  <Button
                    onClick={() => mutate({ id: profileId as Id<'profiles'> })}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </Drawer.Close>
              )}
            </div>

            <div className="flex relative flex-col gap-4 mt-2 h-max">
              <QrForm initialValues={initialValues} onSubmit={handleSubmit} />
              <div className="flex flex-col justify-between w-full mt-6 gap-4 h-full flex-1">
                <Drawer.Close className="hidden" ref={closeButtonRef} />
                <Button form="qr-form" type="submit" variant="secondary" className="w-full">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
