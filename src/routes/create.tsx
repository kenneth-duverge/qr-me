import { useState } from 'react';
import QRCode from 'react-qr-code';
import VCard from 'vcard-creator';

import { QrForm } from '@/components/qr-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { getFormDataFields } from '@/lib/form';

export const Create = () => {
  const [vCard, setVCard] = useState('');
  const mutate = useMutation(api.profiles.createProfile);
  const [fd, setFd] = useState<FormData | null>(null);

  const saveContactProfile = () => {
    const formData = getFormDataFields(fd as FormData);
    // Make API request to save contact profile
    mutate({
      firstName: formData.firstName,
      name: formData.profileName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      lastName: formData.lastName,
      website: formData.website,
    });
  };

  return (
    <div className="flex-1 font-mono w-full flex flex-col gap-4 py-8 text-white container !px-4 lg:!px-8">
      <div className="justify-start flex flex-col pt-8 md:pt-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl lg:text-3xl text-white">Create Profile</h1>
        </div>
        <div className="flex w-full flex-col-reverse mt-16 lg:mt-20 self-center lg:flex-row justify-evenly items-center gap-6">
          <div className="w-full md:w-[500px] h-max pb-20 md:pb-0 px-4 shadow-sm gap-8 flex flex-col justify-center items-center">
            <QrForm
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
            />
            <Button type="submit" variant="secondary" className="w-full">
              Generate
            </Button>
          </div>
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
      </div>
    </div>
  );
};
