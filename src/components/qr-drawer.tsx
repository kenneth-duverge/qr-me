import { Drawer } from 'vaul';

import { QrForm } from './qr-form';
import { Button } from './ui/button';
import { useGetProfile } from '@/lib/api';

const defaultValues = {
  firstName: '',
  lastName: '',
  social: '',
  email: '',
  website: '',
  phoneNumber: '',
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
  const { data } = useGetProfile(profileId);
  const initialValues = data
    ? {
        firstName: data.first_name,
        lastName: data.last_name,
        social: data.social,
        email: data.email,
        website: data.website,
        phoneNumber: data.phone_number,
      }
    : defaultValues;
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-900 flex flex-col px-4 rounded-t-[10px] font-mono h-[90%] fixed bottom-0 left-0 right-0">
          <Drawer.Handle />
          <div className="container h-full !px-4 lg:!px-8 mx-auto pt-10 lg:max-w-[800px] flex flex-col gap-8">
            <h1 className="text-3xl text-white">{title}</h1>
            <div className="flex h-max overflow-auto">
              <QrForm initialValues={initialValues} onSubmit={onSubmit} />
            </div>
            <div className="flex flex-col-reverse w-full gap-4 flex-1 items-center pb-10">
              <Drawer.Close asChild>
                <Button form="qr-form" type="submit" variant="secondary" className="w-full">
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
