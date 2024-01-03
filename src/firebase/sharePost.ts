import {
  doc,
  updateDoc,
  addDoc,
  collection,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config";

const uploadPostToStorage = async (
  userId: string,
  file: File,
): Promise<string> => {
  try {
    const fileRef = ref(storage, `posts/${file.name}_${userId}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  } catch (error) {
    throw new Error(`Error uploading post: ${error}`);
  }
};

const createPostInFirestore = async ({
  userId,
  caption,
  images,
  videos,
}: {
  userId: string;
  caption: string;
  images: string[];
  videos: string[];
}): Promise<void> => {
  const postId = await addDoc(collection(db, "posts"), {
    images: images,
    videos: videos,
    userId: userId,
    caption: caption,
    createdAt: new Date(),
  });

  const postRef = doc(db, "posts", postId.id);
  await updateDoc(postRef, { postId: postId.id });
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { posts: arrayUnion(postId.id) });
};

const imageExtensions = [".png", ".jpg", ".jpeg"];
const isImage = (file: File) =>
  imageExtensions.some((extension) => file.name.endsWith(extension));

const videoExtensions = [".mp4", ".mov", ".avi", ".mkv"];

const isVideo = (file: File) =>
  videoExtensions.some((extension) => file.name.endsWith(extension));

export const sharePost = async ({
  files,
  caption,
  userId,
}: {
  files: File[];
  caption: string;
  userId: string;
}): Promise<void> => {
  try {
    let imageLinks: string[] = [];
    let videoLinks: string[] = [];
    await Promise.all(
      files.map(async (file) => {
        const link = await uploadPostToStorage(userId, file);
        if (link) {
          if (isVideo(file)) {
            videoLinks.push(link);
          } else if (isImage(file)) {
            console.log("here");
            imageLinks.push(link);
          } else {
            console.log("aw!");
          }
        } else {
          throw new Error("Failed to upload post.");
        }
      }),
    );

    await createPostInFirestore({
      userId: userId,
      caption: caption,
      videos: videoLinks,
      images: imageLinks,
    });
  } catch (error) {
    throw new Error(`Error setting post: ${error}`);
  }
};
