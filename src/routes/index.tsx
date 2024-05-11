import { EmptyState } from '@/components/empty-state';
import { QrDrawer } from '@/components/qr-drawer';
import { QrProfile } from '@/components/qr-profile';
import { Button } from '@/components/ui/button';

import { createProfile, useGetProfiles } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent } from 'react';

const CreateProfileDrawer = ({ children }: React.PropsWithChildren) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProfile,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
  const saveContactProfile = (event: FormEvent) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);
    const formData = fd as FormData;
    // Make API request to save contact profile
    const first_name = formData.get('first-name') as string;
    const last_name = formData.get('last-name') as string;
    const website = formData.get('website') as string;
    const social = formData.get('social') as string;
    const email = formData.get('email') as string;
    const phone_number = formData.get('phone-number') as string;

    mutation.mutate({
      first_name,
      last_name,
      website,
      email,
      phone_number,
      social,
    });

    // Should we save details as individual columns or just one string
  };
  return (
    <QrDrawer onSubmit={saveContactProfile} title="Create Profile">
      {children}
    </QrDrawer>
  );
};

export const Index = () => {
  const { data, isLoading } = useGetProfiles();

  if (isLoading) return null;

  if (!data || data.length === 0) return <EmptyState />;

  return (
    <div className="flex-1 font-mono w-full flex flex-col gap-4 py-8 text-white container !px-4 lg:!px-8">
      <div className="justify-start flex flex-col pt-8 md:pt-0">
        <div className="flex justify-between items-center sticky top-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl lg:text-3xl text-white">Profiles</h1>
          </div>
          <CreateProfileDrawer>
            <Button className="flex lg:hidden" variant="secondary">
              New
            </Button>
          </CreateProfileDrawer>
        </div>
        <div className="flex mt-16 lg:mt-20 flex-col gap-4 max-w-[800px] w-full self-center overflow-y-scroll max-h-[600px] md:max-h-[600px]">
          {data.map((p) => (
            <QrProfile profileId={p.id} key={p.id}>
              <p className="text-balance">{p.profileName}</p>
              <p className="text-xs md:text-sm text-zinc-500">
                {new Date(p.created_date).toLocaleDateString()}
              </p>
            </QrProfile>
          ))}
        </div>
      </div>
    </div>
  );
};
