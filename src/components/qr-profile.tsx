import { PencilIcon } from 'lucide-react';
import QRCode from 'react-qr-code';

import { QrViewDrawer } from './qr-view-drawer';
import { Button } from './ui/button';
import { EditProfileDrawer } from './edit-profile-drawer';

export const QrProfile = ({
  children,
  profileId,
}: React.PropsWithChildren<{ profileId: string | number }>) => {
  return (
    <div className="w-full md:w-full h-max bg-zinc-800 p-4 flex gap-4 items-center lg:hover:bg-zinc-700 rounded-md">
      <div className="w-max border h-full">
        <QrViewDrawer profileId={profileId}>
          <QRCode value={`${Math.random()}`} className="w-[50px] h-full bg-white p-[2px]" />
        </QrViewDrawer>
      </div>
      <div className="flex-1 flex-col h-full flex justify-between">{children}</div>
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
