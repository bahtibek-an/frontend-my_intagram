import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { IUser } from 'shared';

export const getAllUserFollowing = async (
   userFollowing: string[],
   userId: string
) => {
   const q = query(
      collection(db, 'users'),
      where('userId', 'in', userFollowing)
   );
   const querySnapshot = await getDocs(q);
   const data = querySnapshot.docs.map((doc) => {
      return {
         ...(doc.data() as IUser),
         docId: doc.id,
      };
   });
   return data.filter((item) => item.userId !== userId);
};
