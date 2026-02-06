import * as profileRepository from '../repository/profile.repository';

export async function listAllProfiles() {
  console.log({ message: 'Fetching all profiles' });
  return profileRepository.findAll();
}

export async function getProfileById(id: string) {
  return profileRepository.findById(id);
}
