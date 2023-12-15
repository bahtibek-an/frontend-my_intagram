import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { IUser } from '../shared/index';

export const getOnlyOneUser = async (fieldPath: string, value: string) => {
   let userExist: IUser | undefined;
   const q = query(collection(db, 'users'), where(fieldPath, '==', value));
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
      userExist = {
         ...doc.data(),
         docId: doc.id,
      } as IUser;
   });
   return userExist;
};
