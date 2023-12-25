import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'lib/firebase';

export const uploadImg = async (file: File, path: string) => {
   const imgPostsRef = ref(storage, `${path}/${file?.name}`);
   const snapshot = await uploadBytes(imgPostsRef, file);
   const url = await getDownloadURL(snapshot.ref);
   return url;
};
