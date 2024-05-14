export const getFormDataFields = (formData: FormData) => {
  const firstName = formData.get('first-name') as string;
  const lastName = formData.get('last-name') as string;
  const website = formData.get('website') as string;
  const social = formData.get('social') as string;
  const email = formData.get('email') as string;
  const phoneNumber = formData.get('phone-number') as string;
  const profileName = formData.get('profile-name') as string;

  return {
    firstName,
    lastName,
    website,
    social,
    email,
    phoneNumber,
    profileName,
  };
};
