import { useState } from 'react';
import QRCode from 'react-qr-code';
import VCard from 'vcard-creator';

import { QrForm } from '@/components/qr-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Generate = () => {
  const [vCard, setVCard] = useState('');
  const [fd, setFd] = useState<FormData | null>(null);

  const saveContactProfile = () => {
    const formData = fd as FormData;
    // Make API request to save contact profile
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const website = formData.get('website') as string;
    const social = formData.get('social') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone-number') as string;

    console.log({
      firstName,
      lastName,
      website,
      social,
      email,
      phone,
    });

    // Should we save details as individual columns or just one string
  };

  return (
    <div className="flex h-full pt-16 md:pt-0 flex-1 w-full flex-col-reverse lg:flex-row justify-evenly items-center gap-6 bg-zinc-900">
      <form
        className="w-full md:w-[500px] h-max pb-20 md:pb-0 px-4 shadow-sm gap-8 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);

          const firstName = formData.get('first-name') as string;
          const lastName = formData.get('last-name') as string;
          const website = formData.get('website') as string;
          const social = formData.get('social') as string;
          const email = formData.get('email') as string;
          const phone = formData.get('phone-number') as string;

          setFd(formData);

          const vCard = new VCard();
          vCard
            .addName(firstName, lastName)
            .addEmail(email)
            .addPhoneNumber(phone, 'PREF;WORK')
            .addSocial(social, 'Instagram', 'kenduve')
            .addURL(website);

          setVCard(vCard.toString());
        }}
      >
        <QrForm />
        <Button type="submit" variant="secondary">
          Generate
        </Button>
      </form>
      <div className="w-full md:w-[300px] flex flex-col-reverse gap-8 items-center justify-between px-4">
        <div className="flex flex-col gap-2 mt-8 w-full">
          <h2 className="text-base text-white">Save your profile</h2>
          <form onSubmit={saveContactProfile} className="flex gap-2 w-full">
            <Input disabled={vCard === ''} type="text" name="profile-name" />
            <Button disabled={vCard === ''} type="submit" variant="secondary">
              Save
            </Button>
          </form>
        </div>
        <QRCode size={256} className="w-[250px]" value={vCard} viewBox={`0 0 256 256`} />
      </div>
    </div>
  );
};
