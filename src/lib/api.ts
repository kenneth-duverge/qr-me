import { useQuery } from '@tanstack/react-query';

const profiles = [
  {
    id: 1,
    name: 'Professional',
    createdDate: 'March 12, 2024',
  },
  {
    id: 2,
    name: 'Work',
    createdDate: 'March 8, 2024',
  },
  {
    id: 3,
    name: 'Comic con',
    createdDate: 'March 7, 2024',
  },
  {
    id: 4,
    name: 'Friends & Family',
    createdDate: 'March 5, 2024',
  },
];

export const getProfiles = async () => {
  return profiles;
};

export const getProfile = async (id: number | string) => profiles.find((p) => p.id === id);

export const createProfile = async (profile: (typeof profiles)[0]) =>
  profiles.push(profile) && profiles;

export const deleteProfile = async (id: number | string) => profiles.filter((p) => p.id !== id);

export const updateProfile = async (profile: (typeof profiles)[0]) => {
  return profiles.map((p) => {
    if (p.id === profile.id) {
      return {
        ...p,
        ...profile,
      };
    }

    return p;
  });
};

export const useGetProfiles = () => {
  return useQuery({ queryKey: ['profiles'], queryFn: getProfiles });
};

export const useGetProfile = (id: string | number) => {
  return useQuery({ queryKey: ['profiles', id], queryFn: async () => await getProfile(id) });
};
