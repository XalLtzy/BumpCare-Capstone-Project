import { fetchUserProfile, updateUserProfile } from '../models/userModel';

export async function getUserProfile() {
  return await fetchUserProfile();
}

export async function updateUserProfilePresenter(data) {
  return await updateUserProfile(data);
}
