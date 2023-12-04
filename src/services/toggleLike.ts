import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { IPost, IUser } from 'shared';

export const toggleLike = (
   isLiked: boolean,
   post: IPost,
   currentUser: IUser
) => {
   const newUserLikes = isLiked
      ? post._userLikes.filter((user) => user._userId !== currentUser?.userId)
      : [
           ...post._userLikes,
           {
              _userId: currentUser?.userId,
              _isFollowing: false,
           },
        ];
   if (post?.docId) {
      updateDoc(doc(db, 'posts', post.docId), {
         _userLikes: newUserLikes,
      });
   }
};
