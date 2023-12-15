import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { IUser } from 'shared';
import { getOnlyOneUser } from './getOnlyOneUser';

export const followUser = async (userId: string, user: IUser) => {
   if (user?.docId) {
      updateDoc(doc(db, 'users', user.docId), {
         following: arrayUnion(userId),
      });

      const _oneUser = (await getOnlyOneUser('userId', userId)) as IUser;

      updateDoc(doc(db, 'users', _oneUser.docId as string), {
         followers: arrayUnion(user.docId as string),
      });
   }
};
