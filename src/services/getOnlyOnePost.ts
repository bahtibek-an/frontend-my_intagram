import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { IPost } from './../shared/index';
export const getOnlyOnePost = async (postId: string) => {
   const q = query(collection(db, 'posts'), where('postId', '==', postId));
   const querySnapshot = await getDocs(q);
   const data = querySnapshot.docs.map((doc) => {
      return {
         ...(doc.data() as IPost),
         docId: doc.id,
      } as IPost;
   });
   return data[0];
};
