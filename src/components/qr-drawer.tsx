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
        <Drawer.Content className="bg-zinc-900 flex flex-col px-4 pt-10 rounded-t-[10px] font-mono h-[96%] fixed bottom-0 left-0 right-0 text-white">
          <Drawer.Handle className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
          <div className="container overflow-auto pb-24 h-full !px-4 lg:!px-8 mx-auto lg:max-w-[800px] flex flex-col gap-5">
            <Drawer.Title className="text-2xl">{title}</Drawer.Title>

            <div className="flex flex-col gap-4 mt-2 h-max">
              <QrForm initialValues={initialValues} onSubmit={onSubmit} />
              <div className="flex flex-col justify-between w-full mt-6 gap-4 h-full flex-1">
                <Drawer.Close asChild>
                  <Button form="qr-form" type="submit" variant="secondary" className="w-full">
                    Save
                  </Button>
                </Drawer.Close>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
