import Post from 'components/Post';
import SkeletonPost from 'components/SkeletonPost';
import {
   collection,
   onSnapshot,
   query,
   Unsubscribe,
   where,
} from 'firebase/firestore';
import { useView } from 'hooks';
import { db } from 'lib/firebase';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPost } from 'shared';

const Posts = () => {
   const { _postId } = useParams();
   const [post, setPost] = useState<IPost | null>(null);
   const [loading, setLoading] = useState<boolean>(false);
   const [direction, setDirection] = useState<'horizontal' | 'vertical'>(
      'horizontal'
   );
   const { width } = useView();

   useEffect(() => {
      let unsubscribe: Unsubscribe;
      if (_postId) {
         setLoading(true);
         const q = query(
            collection(db, 'posts'),
            where('postId', '==', _postId)
         );
         unsubscribe = onSnapshot(q, (querySnapshot) => {
            const posts = querySnapshot.docs.map((doc) => {
               return {
                  ...(doc.data() as IPost),
                  docId: doc.id,
               } as IPost;
            });
            setPost(posts[0]);
            setLoading(false);
         });
      }

      return () => {
         if (unsubscribe) {
            unsubscribe();
         }
      };
   }, [_postId]);

   useEffect(() => {
      if (width < 1024) {
         setDirection('vertical');
      } else {
         setDirection('horizontal');
      }
   }, [width]);

   return (
      <div className="py-6">
         {loading && !post ? (
            <SkeletonPost direction={direction} />
         ) : (
            post && <Post post={post as IPost} direction={direction} />
         )}
      </div>
   );
};

export default Posts;
