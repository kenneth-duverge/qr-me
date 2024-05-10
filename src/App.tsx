import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Generate } from './routes/generate';
import { Root } from './routes/root';
import { Index } from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // errorElement: <ErrorElement />,
    children: [
      {
        path: '',
        element: <Index />,
      },
      {
        path: 'generate',
        element: <Generate />,
      },
    ],
  },
]);

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

export default function App() {
  return <RouterProvider router={router} />;
}
