import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { IPost } from 'shared';
import { v4 as uuid } from 'uuid';
export const addComment = (
   textComment: string,
   userId: string,
   post: IPost
) => {
   if (textComment.trim().length === 0) {
      return;
   }
   const newUserComments = [
      ...post._userComments,
      {
         _id: uuid(),
         _content: textComment,
         _userId: userId,
      },
   ];
   if (post.docId) {
      updateDoc(doc(db, 'posts', post.docId), {
         _userComments: newUserComments,
      });
   }
};
