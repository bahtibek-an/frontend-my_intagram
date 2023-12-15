import Post from 'components/Post';
import { postsSelector, subscribePosts, unmountPosts } from 'features/posts';
import { deleteDoc, doc } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from 'hooks';
import { db } from 'lib/firebase';
import React, { useEffect, useRef, useState } from 'react';
import SkeletonPost from '../../components/SkeletonPost';
import Sidebar from './components/Sidebar';

let _left: number | undefined;

const Home = () => {
   const dispatch = useAppDispatch();
   const { posts: dataPosts, loading } = useAppSelector(postsSelector);
   const postsRef = useRef<HTMLDivElement | null>(null);
   const [leftSidebar, setLeftSidebar] = useState<number>(_left || 0);

   const removePost = async (postId: string, docId: string) => {
      await deleteDoc(doc(db, 'posts', docId));
   };

   useEffect(() => {
      const handleResize = () => {
         if (postsRef.current) {
            _left =
               postsRef.current.offsetLeft + postsRef.current.offsetWidth + 24;
            setLeftSidebar(
               postsRef.current.offsetLeft + postsRef.current.offsetWidth + 24
            );
         }
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   useEffect(() => {
      dispatch(subscribePosts());
   }, [dispatch]);

   useEffect(() => {
      return () => {
         dispatch(unmountPosts());
      };
   }, [dispatch]);

   return (
      <div className="mt-6">
         <main className="flex gap-x-7 justify-center">
            <div
               className="w-full max-w-[37.5rem] flex flex-col gap-y-6 lg:mr-auto"
               ref={postsRef}
            >
               {loading
                  ? [...new Array(3)].map((item, index) => (
                       <SkeletonPost key={index} />
                    ))
                  : dataPosts.map((post) => (
                       <Post
                          key={post.postId}
                          post={post}
                          onRemove={removePost}
                          type="post"
                       />
                    ))}

               {dataPosts.length === 0 && (
                  <p className="text-xl text-center text-text-color-black">
                     Following user to see post.
                  </p>
               )}
            </div>
            <div
               className={`fixed top-[calc(var(--header-height)_+_24px)] w-full max-w-[293px] hidden lg:block`}
               style={{ left: `${leftSidebar}px` }}
            >
               <Sidebar />
            </div>
         </main>
      </div>
   );
};

export default React.memo(Home);
