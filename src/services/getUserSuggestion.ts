import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { IUser } from 'shared';

export const getUserSuggestion = async (
   currentUserFollowing: string[],
   userId: string,
   _limit: number,
   condition: 'in' | 'not-in'
) => {
   if (currentUserFollowing && currentUserFollowing?.length > 0) {
      const q = query(
         collection(db, 'users'),
         where('userId', 'not-in', currentUserFollowing),
         limit(_limit + 1)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => {
         return {
            ...(doc.data() as IUser),
            docId: doc.id,
         };
      });
      return data.filter((item) => item.userId !== userId);
   }
   const q = query(
      collection(db, 'users'),
      where('userId', '!=', userId),
      limit(_limit)
   );
   const querySnapshot = await getDocs(q);
   const data = querySnapshot.docs.map((doc) => {
      return {
         ...(doc.data() as IUser),
         docId: doc.id,
      };
   });
   return data;
};
