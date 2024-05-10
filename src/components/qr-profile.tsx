import QRCode from 'react-qr-code';
import { PencilIcon } from 'lucide-react';

import { QrDrawer } from './qr-drawer';
import { Button } from './ui/button';
import { QrViewDrawer } from './qr-view-drawer';

import { updateProfile } from '@/lib/api';

const EditProfileDrawer = ({
  children,
  profileId,
}: React.PropsWithChildren<{ profileId: string | number }>) => {
  const saveContactProfile = (event: React.FormEvent) => {
    const fd = new FormData(event.target as HTMLFormElement);
    const formData = fd as FormData;
    // Make API request to save contact profile
    const first_name = formData.get('first-name') as string;
    const last_name = formData.get('last-name') as string;
    const website = formData.get('website') as string;
    const social = formData.get('social') as string;
    const email = formData.get('email') as string;
    const phone_number = formData.get('phone-number') as string;

    updateProfile({
      id: Number(profileId),
      email,
      first_name,
      last_name,
      website,
      social,
      phone_number,
    });
  };
  return (
    <QrDrawer profileId={profileId} onSubmit={saveContactProfile} title="Create Profile">
      {children}
    </QrDrawer>
  );
};

export const QrProfile = ({
  children,
  profileId,
}: React.PropsWithChildren<{ profileId: string | number }>) => {
  return (
    <div className="w-full md:w-full h-max bg-zinc-800 p-4 flex gap-4 items-center hover:bg-zinc-700 rounded-md">
      <div className="w-max border h-full">
        <QRCode value={`${Math.random()}`} className="w-[50px] h-full bg-white p-[2px]" />
      </div>
      <p className="flex-1 flex-col h-full flex justify-between">{children}</p>
      <div className="flex gap-3 items-center h-full">
        {/* Handle this */}
        <EditProfileDrawer profileId={profileId}>
          <Button size="icon" variant="outline" className="!border-white/20">
            <PencilIcon className="h-4 w-4" />
          </Button>
        </EditProfileDrawer>
        <QrViewDrawer profileId={profileId}>
          <Button size="default" variant="secondary">
            View
          </Button>
        </QrViewDrawer>
      </div>
    </div>
  );
};
