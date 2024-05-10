import QRCode from 'react-qr-code';
import { Drawer } from 'vaul';

import { useGetProfile } from '@/lib/api';

export const QrViewDrawer = ({
  children,
  profileId,
}: React.PropsWithChildren<{ profileId: string | number }>) => {
  const { data } = useGetProfile(profileId);
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-900 font-mono flex flex-col rounded-t-[10px] h-[90%] mt-24 fixed bottom-0 left-0 right-0">
          <Drawer.Handle />
          <div className="container pt-20 lg:max-w-[800px] h-full justify-around flex flex-col gap-8">
            <div className="flex w-full items-center justify-center h-max">
              <QRCode value={`${Math.random()}`} className="bg-white p-4" />
            </div>
            <h1 className="text-2xl text-white/50">{data?.profileName}</h1>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
