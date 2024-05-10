import { useQuery } from '@tanstack/react-query';

let profiles = [
  {
    id: 1,
    first_name: 'John',
    profileName: 'Professional',
    last_name: 'Doe',
    phone_number: '+1234567890',
    website: 'https://www.example.com/johndoe',
    social: '@johndoe',
    email: 'john@example.com',
    created_date: '2024-05-10T12:00:00Z',
    updated_date: '2024-05-10T12:00:00Z',
  },
  {
    id: 2,
    first_name: 'Alice',
    profileName: 'Business',
    last_name: 'Smith',
    phone_number: '+1987654321',
    website: 'https://www.example.com/alicesmith',
    social: '@alicesmith',
    email: 'alice@example.com',
    created_date: '2024-05-10T12:00:00Z',
    updated_date: '2024-05-10T12:00:00Z',
  },
  {
    id: 3,
    first_name: 'Bob',
    profileName: 'Work',
    last_name: 'Johnson',
    phone_number: '+1122334455',
    website: 'https://www.example.com/bobjohnson',
    social: '@bobjohnson',
    email: 'bob@example.com',
    created_date: '2024-05-10T12:00:00Z',
    updated_date: '2024-05-10T12:00:00Z',
  },
  {
    id: 4,
    first_name: 'Emily',
    profileName: 'Personal',
    last_name: 'Brown',
    phone_number: '+1567890123',
    website: 'https://www.example.com/emilybrown',
    social: '@emilybrown',
    email: 'emily@example.com',
    created_date: '2024-05-10T12:00:00Z',
    updated_date: '2024-05-10T12:00:00Z',
  },
  // {
  //   id: 5,
  //   first_name: 'Michael',
  //   profileName: 'Casual',
  //   last_name: 'Davis',
  //   phone_number: '+1876543210',
  //   website: 'https://www.example.com/michaeldavis',
  //   social: '@michaeldavis',
  //   email: 'michael@example.com',
  //   created_date: '2024-05-10T12:00:00Z',
  //   updated_date: '2024-05-10T12:00:00Z',
  // },
  // {
  //   id: 6,
  //   first_name: 'Sarah',
  //   profileName: 'Social',
  //   last_name: 'Wilson',
  //   phone_number: '+1987654321',
  //   website: 'https://www.example.com/sarahwilson',
  //   social: '@sarahwilson',
  //   email: 'sarah@example.com',
  //   created_date: '2024-05-10T12:00:00Z',
  //   updated_date: '2024-05-10T12:00:00Z',
  // },
  // {
  //   id: 7,
  //   first_name: 'David',
  //   profileName: 'Network',
  //   last_name: 'Martinez',
  //   phone_number: '+1654321890',
  //   website: 'https://www.example.com/davidmartinez',
  //   social: '@davidmartinez',
  //   email: 'david@example.com',
  //   created_date: '2024-05-10T12:00:00Z',
  //   updated_date: '2024-05-10T12:00:00Z',
  // },
  // {
  //   id: 8,
  //   first_name: 'Emma',
  //   profileName: 'Creative',
  //   last_name: 'Taylor',
  //   phone_number: '+1234567890',
  //   website: 'https://www.example.com/emmataylor',
  //   social: '@emmataylor',
  //   email: 'emma@example.com',
  //   created_date: '2024-05-10T12:00:00Z',
  //   updated_date: '2024-05-10T12:00:00Z',
  // },
];

export const getProfiles = async () => {
  return profiles;
};

export const getProfile = async (id: number | string) => profiles.find((p) => p.id === id);

export const createProfile = async (
  profile: Omit<(typeof profiles)[0], 'id' | 'created_date' | 'updated_date' | 'profileName'>
) =>
  (profiles = [
    ...profiles,
    {
      id: profiles.length + 1,
      created_date: Date.now().toLocaleString(),
      updated_date: Date.now().toLocaleString(),
      profileName: 'Random',
      ...profile,
    },
  ]);

export const deleteProfile = async (id: number | string) => profiles.filter((p) => p.id !== id);

export const updateProfile = async (
  profile: Omit<(typeof profiles)[0], 'created_date' | 'updated_date' | 'profileName'>
) => {
  const t = profiles.map((p) => {
    if (p.id === profile.id) {
      return {
        ...p,
        ...profile,
        updated_date: Date.now().toLocaleString(),
      };
    }

    return p;
  });

  profiles = t;
};

export const useGetProfiles = () => {
  return useQuery({ queryKey: ['profiles'], queryFn: getProfiles });
};

export const useGetProfile = (id?: string | number) => {
  const { data, ...rest } = useGetProfiles();

  return {
    data: data?.find((p) => p.id === id) ?? null,
    ...rest,
  };
};
