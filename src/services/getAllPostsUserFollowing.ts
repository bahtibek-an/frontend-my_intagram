import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { IPost } from 'shared';
import { getOnlyOneUser } from './getOnlyOneUser';

export const getAllPostsUserFollowing = async (userId: string) => {
   const following = (await getOnlyOneUser('userId', userId))
      ?.following as string[];
   if (following?.length > 0) {
      const q = query(
         collection(db, 'posts'),
         where('_userId', 'in', following)
      );

      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => {
         return {
            ...doc.data(),
            docId: doc.id,
         };
      }) as IPost[];
      return posts;
   }
   return [];
};
