import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { IUser } from 'shared';
import { getOnlyOneUser } from './getOnlyOneUser';

export const unfollowUser = async (userId: string, user: IUser) => {
   if (user?.docId) {
      updateDoc(doc(db, 'users', user.docId), {
         following: arrayRemove(userId),
      });

      const _oneUser = (await getOnlyOneUser('userId', userId)) as IUser;

      updateDoc(doc(db, 'users', _oneUser.docId as string), {
         followers: arrayRemove(user.docId as string),
      });
   }
};
