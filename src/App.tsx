import './App.css';
import QRCode from 'react-qr-code';
import VCard from 'vcard-creator';
import { QrCode } from 'lucide-react';

import { QrForm } from '@/components/qr-form';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// const myVCard = new VCard();

// Some variables
// const lastname = 'Duverge';
// const firstname = 'Kenneth';
// const additional = '';
// const prefix = '';
// const suffix = '';

// myVCard
//   // Add personal data
//   .addName(lastname, firstname, additional, prefix, suffix)
//   // Add work data
//   .addCompany('Vimeo')
//   .addJobtitle('Web Developer')
//   .addRole('Software Engineer')
//   .addEmail('kenneth.duverge@icloud.com')
//   .addPhoneNumber(9175871799, 'PREF;WORK')
//   .addSocial('https://twitter.com/kenduve', 'Instagram', 'kenduve')
//   .addURL('https://kennethduverge.com');

function App() {
  const [vCard, setVCard] = useState('');

  return (
    <div className="flex h-full pt-16 md:pt-0 md:h-screen w-full flex-col-reverse lg:flex-row justify-center items-center gap-6 bg-zinc-900">
      <div className="h-20 w-full fixed top-0 left-0 py-4 px-8 flex items-center text-white gap-3">
        <QrCode className='h-8 w-8' />
        <h1 className='text-lg font-mono tracking-wide'>business qr</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);

          const firstName = formData.get('first-name') as string;
          const lastName = formData.get('last-name') as string;
          const website = formData.get('website') as string;
          const social = formData.get('social') as string;
          const email = formData.get('email') as string;
          const phone = formData.get('phone-number') as string;

          const vCard = new VCard();
          vCard
            .addName(firstName, lastName)
            .addEmail(email)
            .addPhoneNumber(phone, 'PREF;WORK')
            .addSocial(social, 'Instagram', 'kenduve')
            .addURL(website);

          setVCard(vCard.toString());
        }}
        className="w-full md:w-[500px] h-full md:h-[400px] pb-20 md:pb-0 px-4 shadow-sm gap-8 flex flex-col"
      >
        <QrForm />
        <Button type="submit" className="bg-white text-zinc-800 hover:bg-stone-200">
          Generate
        </Button>
      </form>
      <div className="w-full md:w-[400px] md:h-[400px] flex items-center justify-center">
        <QRCode size={256} className="w-[200px]" value={vCard} viewBox={`0 0 256 256`} />
      </div>
    </div>
  );
}

export default App;
