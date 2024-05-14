import QRCode from 'react-qr-code';
import { Drawer } from 'vaul';
import VCard from 'vcard-creator';

import { useGetProfile } from '@/lib/api';

const socailPlatformUrls: Record<string, string> = {
  twitter: 'https://twitter.com',
  instagram: 'https://instagram.com',
};

export const QrViewDrawer = ({
  children,
  profileId,
}: React.PropsWithChildren<{ profileId: string | number }>) => {
  const data = useGetProfile(profileId);

  const platform = data?.social?.[0]?.platform ?? 'twitter';

  const vCard = new VCard();
  const qrCodeString = vCard
    .addName(data?.firstName, data?.lastName)
    .addEmail(data?.email ?? '')
    .addPhoneNumber(data?.phoneNumber ?? '', 'PREF;HOME')
    .addSocial(
      socailPlatformUrls[platform] ?? '',
      data?.social?.[0].platform ?? '',
      data?.social?.[0].handle ?? ''
    )
    .addURL(data?.website ?? '');

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-900 font-mono flex flex-col rounded-t-[10px] h-[96%] pt-10 fixed bottom-0 left-0 right-0">
          <Drawer.Handle className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
          <div className="container lg:max-w-[800px] md:px-24 h-full justify-evenly flex flex-col gap-8">
            <div className="flex w-full items-center justify-center h-max">
              <QRCode value={qrCodeString.toString()} className="bg-white p-4" />
            </div>
            <h1 className="text-2xl text-white/50">{data?.name}</h1>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
