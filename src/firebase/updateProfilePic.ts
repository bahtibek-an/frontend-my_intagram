import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config";

async function updateProfilePicture(
  userId: string,
  newImageUrl: string,
): Promise<void> {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { profileImage: newImageUrl });
}
async function uploadProfileImage(userId: string, file: File): Promise<string> {
  try {
    const profilePicRef = ref(storage, `profileImages/${file.name}_${userId}`);
    await uploadBytes(profilePicRef, file);
    return getDownloadURL(profilePicRef);
  } catch (error) {
    throw new Error(`Error uploading profile image: ${error}`);
  }
}

export async function setProfileImageAndUpdateFirestore(
  userId: string,
  file: File,
): Promise<string> {
  try {
    const newImageUrl = await uploadProfileImage(userId, file);
    if (newImageUrl) {
      await updateProfilePicture(userId, newImageUrl);
      return newImageUrl;
    } else {
      throw new Error("Failed to upload profile image.");
    }
  } catch (error) {
    throw new Error(`Error setting profile image: ${error}`);
  }
}
export async function removeProfilePicture(userId: string) {
  updateProfilePicture(userId, "");
}
