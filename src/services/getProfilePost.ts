import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { IPost } from 'shared';

export const getProfilePost = async (username: string) => {
   const q = query(
      collection(db, 'posts'),
      where('_user._username', '==', username)
   );
   const querySnapshot = await getDocs(q);
   const posts = querySnapshot.docs.map((doc) => {
      return {
         ...(doc.data() as IPost),
         docId: doc.id,
      };
   });
   return posts;
};
