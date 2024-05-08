import './App.css';
import QRCode from 'react-qr-code';
import VCard from 'vcard-creator';

const myVCard = new VCard();

// Some variables
const lastname = 'Duverge';
const firstname = 'Kenneth';
const additional = '';
const prefix = '';
const suffix = '';

myVCard
  // Add personal data
  .addName(lastname, firstname, additional, prefix, suffix)
  // Add work data
  .addCompany('Vimeo')
  .addJobtitle('Web Developer')
  .addRole('Software Engineer')
  .addEmail('kenneth.duverge@icloud.com')
  .addPhoneNumber(9175871799, 'PREF;WORK')
  .addSocial('https://twitter.com/kenduve', 'Instagram', 'kenduve')
  .addURL('https://kennethduverge.com');

function App() {
  return (
    <div className="flex h-screen w-full justify-center items-center gap-8">
      <form className="w-[400px] h-[400px] border p-4"></form>
      <div className="w-[400px] h-[400px] border p-4">
        <QRCode
          size={256}
          className="h-auto w-[200px] self-start"
          value={myVCard.toString()}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
}

export default App;
