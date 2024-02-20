import React, { useEffect, useState } from 'react';
import { auth, postCollection, storage, ref, usersCollection } from '../../../../firebase/firebase-config';
import { collection, doc, getDocs, setDoc, addDoc, getFirestore, getDoc } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import Loading from '../../../../components/loading/loading';
import { VscChromeClose } from 'react-icons/vsc';
import { useParams } from 'react-router-dom';

interface Post {
  id: string;
  downloadURL: string;
  caption: string;
  liked: boolean;
  likeCount: number;
  commentCount: number;
}

interface Comment {
  id: string;
  text: string;
  username: string;
  postId: string;
  timestamp: number;
  postedAgo: string;
}

const PostTabs: React.FC = () => {
  const { userUId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState<string>('');
  const [username, setUsername] = useState<string>();
  const [showEmojis, setShowEmojis] = useState(false);
  const [showEmojiModal, setShowEmojiModal] = useState<boolean>(false);
  const [commentsNumber, setCommentsNumber] = useState<number>()
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid)
        const usernameRef = doc(usersCollection, user?.uid);
        const usernameDoc = await getDoc(usernameRef);
        if (usernameDoc.exists()) {
          const data = usernameDoc.data();
          setUsername(data.username);
        }
      }
    })

    return () => unsubscribe()
  }, [userUId])

  useEffect(() => {
    const fetchData = async () => {
      if (userUId) {
        const postsRef = collection(postCollection, userUId, 'posts');
        const postsSnapshot = await getDocs(postsRef);

        const fetchedPosts: Post[] = await Promise.all(
          postsSnapshot.docs.map(async (doc) => {
            const data = doc.data();

            const imageRef = ref(storage, data.downloadURL);
            const imageUrl = await getDownloadURL(imageRef);

            const liked = data.liked && data.liked[userId] === true;

            return {
              id: doc.id,
              downloadURL: imageUrl,
              caption: data.caption || '',
              liked: liked,
              likeCount: data.liked ? Object.values(data.liked).filter(value => value).length : 0,
              commentCount: commentsNumber || 0,
            };
          })
        );

        setPosts(fetchedPosts);
        setLoading(false);
      }
    };

    fetchData();
  }, [userUId, commentsNumber, userId]);

  const handleModalOpen = async (post: Post) => {
    setSelectedPost(post);
    setModal(true);
    await fetchComments(post.id);
  };

  const fetchComments = async (postId: string) => {
    const firestore = getFirestore();
    const commentsRef = collection(firestore, 'posts', postId, 'comments');
    const commentsSnapshot = await getDocs(commentsRef);
    const fetchedComments: Comment[] = commentsSnapshot.docs.map((doc) => {
      const commentData = doc.data();
      return {
        id: doc.id,
        text: commentData.text,
        username: commentData.username,
        postId: commentData.postId,
        timestamp: commentData.timestamp,
        postedAgo: calculatePostedAgo(commentData.timestamp),
      };
    });

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentCount: fetchedComments.length
        };
      }
      return post;
    });
    setCommentsNumber(fetchComments.length)
    setComments(fetchedComments);
    setPosts(updatedPosts);
  };

  const calculatePostedAgo = (timestamp: number): string => {
    const currentTimestamp = Date.now();
    const differenceInSeconds = Math.floor((currentTimestamp - timestamp) / 1000);
    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} second${differenceInSeconds !== 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  const handleLikeToggle = async (postId: string) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newLiked = !post.liked;
        const likeCount = newLiked ? post.likeCount + 1 : post.likeCount - 1;
        post.liked = newLiked;
        post.likeCount = likeCount;

        const likedRef = doc(postCollection, userUId, "posts", postId);
        setDoc(likedRef, {
          liked: {
            [userId!]: newLiked
          }
        }, { merge: true });
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  const handleCommentSubmit = async (postId: string) => {
    const firestore = getFirestore();
    await addDoc(collection(firestore, 'posts', postId, 'comments'), {
      text: commentText,
      userId: userUId,
      postId: postId,
      username: username,
      timestamp: Date.now(),
    });
    setCommentText('');
    await fetchComments(postId);
  };

  const handleEmojiClick = (emoji: string) => {
    setCommentText(commentText + emoji);
  };

  const handleEmojiToggle = () => {
    setShowEmojis(!showEmojis);
    setShowEmojiModal(!showEmojiModal);
  };


  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {modal && (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[80%] md:w-auto mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className='px-3 pt-3 rounded-full flex justify-end' onClick={() => setModal(false)}>
                  <button>
                    <VscChromeClose className='w-6 h-6 p-1 rounded-full text-white bg-gray-400 hover:bg-gray-500' />
                  </button>
                </div>
                {selectedPost && (
                  <div className='flex pb-8'>
                    <div className="relative p-2 md:p-6  flex-auto flex justify-center items-start">
                      <div className='gap-3'>
                        <div>
                          <img src={selectedPost.downloadURL} alt="Selected Post" className="w-96 h-96 object-cover" />
                          <p className="text-center p-3">{selectedPost.caption}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex p-2 md:p-6 border-l border-solid gap-4 border-blue Gray-200 rounded-b">
                      <div className="p-4">
                        <h3 className="text-xl mb-2 text-center border-b font-semibold ">Comments</h3>
                        <div className="mb-4">
                          {comments.map(comment => (
                            <div key={comment.id} className="flex items-center mb-2">
                                <p className="font-semibold">{comment.username}</p>
                                <p className="ml-2">{comment.text}</p>
                                <p className="ml-2 text-gray-500">{comment.postedAgo}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex border-t pt-2">
                          <label className="sr-only">Your message</label>
                          <div className="flex  items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-100 border">
                            <button
                              type="button"
                              className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-20"
                              onClick={handleEmojiToggle}
                            >
                              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                              </svg>
                              <span className="sr-only">Add emoji</span>
                            </button>
                            <input id="chat"
                              className="block mx-4 p-2.5 w-80 text-sm text-gray-800 bg-white rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Your comments..."
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button type="submit"
                              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-gray-200"
                              onClick={() => handleCommentSubmit(selectedPost.id)}
                            >
                              <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                              </svg>
                              <span className="sr-only">Send message</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-center mt-2 space-x-2">
                          {showEmojis && (
                            <div className="relative emojis-container grid grid-cols-6 gap-2 bg-gray-100 border rounded-sm p-2">
                              {emojis.map((emoji, index) => (
                                <span
                                  key={index}
                                  onClick={() => handleEmojiClick(emoji)}
                                  className="emoji cursor-pointer p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                                >
                                  {emoji}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      <div className="flex flex-wrap gap-1 mt-4">
        {posts.map((post) => (
          <div key={post.id} className="relative w-56 overflow-hidden rounded-md shadow-lg">
            <div className="group" onClick={() => handleModalOpen(post)}>
              <img
                src={post.downloadURL}
                alt="Post"
                className="object-cover h-56 w-56 group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-20 duration-300 gap-2">
                <div className='flex'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={post.liked ? 'red' : '#EEEEEE'}
                    viewBox="-0.5 0.5 42 42"
                    className="w-10 h-10 text-white mr-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeToggle(post.id);
                    }}
                  >
                    <path d="M20.938,10.725C14.51,0.796,1.5,6.205,1.5,17.021c0,8.122,17.836,20.827,19.438,22.479 C22.551,37.848,39.5,25.143,39.5,17.021C39.5,6.287,27.378,0.796,20.938,10.725z" />
                  </svg>
                  <p className='text-white m-auto'>{post.likeCount}</p>
                </div>
                <div className='flex'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#EEEEEE"
                    viewBox="0 -8 72 72"
                    className="w-12 h-12 text-white cursor-pointer"
                  >
                    <path d="M48.89,41.84A23.16,23.16,0,0,0,58.25,35a14.53,14.53,0,0,0,0-18.75,23.25,23.25,0,0,0-9.36-6.8A33,33,0,0,0,36,7a33,33,0,0,0-12.89,2.5,23.25,23.25,0,0,0-9.36,6.8,14.78,14.78,0,0,0-3.43,9.38,14.4,14.4,0,0,0,2.59,8.17A21.34,21.34,0,0,0,20,40.29c-.25.59-.5,1.12-.75,1.61a10.14,10.14,0,0,1-.91,1.4c-.36.45-.63.81-.82,1.06S17,45,16.6,45.44s-.72.76-.84.91c0,0,0,0-.15.16s-.15.2-.16.18-.06.05-.15.19l-.13.2-.09.18a.81.81,0,0,0-.07.22,1.64,1.64,0,0,0,0,.23A.61.61,0,0,0,15,48a1.23,1.23,0,0,0,.42.77,1.16,1.16,0,0,0,.75.29h.1a29.74,29.74,0,0,0,3.14-.59,30.71,30.71,0,0,0,10.14-4.66,37.55,37.55,0,0,0,6.42.58A32.77,32.77,0,0,0,48.89,41.84Z" />
                  </svg>
                  <p className='text-white m-auto'>{post.commentCount}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostTabs;

const emojis = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃",
  "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😛", "😜", "😝", "🤑",

];
