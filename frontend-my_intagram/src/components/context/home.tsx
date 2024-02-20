import React, { useCallback, useEffect, useState } from 'react';
import { auth, db, followingCollection, postCollection, storage, usersCollection } from '../../firebase/firebase-config';
import { getDoc, doc, query, where, getDocs, collection, QuerySnapshot, DocumentData, setDoc, addDoc, getFirestore } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';
import { VscChromeClose } from 'react-icons/vsc';
import Loading from '../loading/loading';

interface Post {
  id: string;
  downloadURL: string;
  caption: string;
  postUsername: string;
  postUserId: string;
  likeCount: number;
  liked: boolean;
}

interface UserData {
  username: string;
  userId: string;
  userAvater: string;
  split: string;
  fullName: string;
}

interface Comment {
  id: string;
  text: string;
  username: string;
  postId: string;
  timestamp: number;
  postedAgo: string;
}

const Home: React.FC = () => {
  const avatar = "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
  const [userId, setUserId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [followingUserId, setFollowingUserId] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>('');
  const [postUserAvatars, setPostUserAvatars] = useState<{ [userId: string]: string }>({});
  const [unfollowLoading] = useState<string>("Unfollow");
  const [searchValue] = useState<string>('');
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState<string>('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [showEmojiModal, setShowEmojiModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [followStatus, setFollowStatus] = useState<{ [username: string]: string }>({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);

        try {
          const usersRef = doc(usersCollection, user.uid);
          const followingRef = doc(followingCollection, user.uid);
          const usersDoc = await getDoc(usersRef);

          if (usersDoc.exists()) {
            const usersData = usersDoc.data();
            setUsername(usersData.username);
            setFullName(usersData.fullName);
          }

          const followingDoc = await getDoc(followingRef);
          if (followingDoc.exists()) {
            const followingData = followingDoc.data();
            if (followingData) {
              const followingUsernames = Object.keys(followingData);
              const trueUsernames = followingUsernames.filter(username => followingData[username] === true);
              const userIds = await Promise.all(trueUsernames.map(async (username) => {
                const userSnapshot = await getDocs(query(usersCollection, where('username', '==', username)));
                if (!userSnapshot.empty) {
                  return userSnapshot.docs[0].id;
                }
                return null;
              }));

              const filteredUserIds = userIds.filter(id => id !== null);
              setFollowingUserId(filteredUserIds.join(' '));
            }
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setUserId('');
      }
      setLoading(true)
    });

    return () => unsubscribe();
  }, [userId]);

  const fetchPostsAndAvatars = async () => {
    try {
      const userIds = followingUserId.split(' ');
      const allPosts: Post[] = [];
      const postUserAvatarsTemp: { [userId: string]: string } = {};
      for (const userId of userIds) {
        const postsSnapshot = await getDocs(collection(postCollection, userId, "posts"));
        const postsData: Post[] = await Promise.all(
          postsSnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const likedKeys = Object.keys(data.liked);
            const userLiked = data.liked && likedKeys.some(key => data.liked[key] === true);

            return {
              id: doc.id,
              downloadURL: data.downloadURL || '',
              caption: data.caption || '',
              postUsername: data.username || '',
              postUserId: data.userId || '',
              likeCount: data.liked ? Object.values(data.liked).filter(value => value).length : 0,
              liked: userLiked,
            };
          })
        );
        allPosts.push(...postsData);

        for (const post of postsData) {
          if (!(post.postUserId in postUserAvatarsTemp)) {
            const url = await getDownloadURL(ref(storage, `users/${post.postUserId}/userImage.png`)).catch(() => {
              return "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg";
            });
            postUserAvatarsTemp[post.postUserId] = url || '';
          }
        }
      }


      const storageRef = ref(storage, `users/${userId}/userImage.png`);
      const url = await getDownloadURL(storageRef).catch(() => {
        return "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
      });
      setUserAvatar(url || null);
      setPosts(allPosts);
      setPostUserAvatars(postUserAvatarsTemp);
    } catch (error) {
      console.error("Error fetching posts and avatars:", error);
      setLoading(true)
    }
  };

  useEffect(() => {
    if (followingUserId && loading) {
      fetchPostsAndAvatars();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followingUserId, loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRef = collection(db, 'username');
        const q = query(usersRef, where('userId', '!=', ''));
        const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);
        const usersData: UserData[] = snapshot.docs.map((doc) => doc.data() as UserData);
        setUsersData(usersData);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = usersData.filter(user =>
    user && user.username && user.username.toLowerCase().includes(searchValue.toLowerCase()) && user.userId !== userId
  );

  const handleLikeToggle = async (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newLiked = !post.liked;
        const likeCount = newLiked ? post.likeCount + 1 : post.likeCount - 1;

        post.liked = newLiked;
        post.likeCount = likeCount;

        const postRef = doc(postCollection, post.postUserId, "posts", postId);
        setDoc(postRef, { liked: { [userId!]: newLiked } }, { merge: true });
      }
      return post;
    });

    setPosts(updatedPosts);
  };

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

  const handleCommentSubmit = async (postId: string) => {
    const firestore = getFirestore();
    await addDoc(collection(firestore, 'posts', postId, 'comments'), {
      text: commentText,
      userId: userId,
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

  const handleFollowCheck = useCallback(async (usernm: string) => {
    const followRef = doc(followingCollection, userId);
    const followDoc = await getDoc(followRef);
    if (followDoc.exists()) {
      const data = followDoc.data();
      if (data && data[usernm] === true) {
        setFollowStatus((prevStatus) => ({ ...prevStatus, [usernm]: "Unfollow" }));
      } else {
        setFollowStatus((prevStatus) => ({ ...prevStatus, [usernm]: "Follow" }));
      }
    }
  }, [userId]);

  useEffect(() => {
    filteredUsers.forEach((user) => {
      handleFollowCheck(user.username);
    });
  }, [filteredUsers, handleFollowCheck]);

  if (!loading) {
    return <Loading />
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
                              <p className="font-semibold text-blue-700">{comment.username}: </p>
                              <p className="ml-2">{comment.text}</p>
                              <p className="ml-2 text-gray-500">{comment.postedAgo}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex border-t pt-2">
                          {showEmojis && (
                            <div className=" absolute emojis-container grid grid-cols-6 gap-2 bg-gray-100 -mt-52 ml-3 border rounded-sm p-2"
                            >
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
      <div className='p-6 flex justify-between'>
        <div className='ml-28 mt-10'>
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className='border-b my-4'>
                <div className='flex justify-between' >
                  <Link to={`/profile/${post.postUserId}/3`}>
                    <div className='flex'>
                      <img src={postUserAvatars[post.postUserId] || avatar} alt="" className='w-12 h-12 object-cover rounded-full' />
                      <h1 className='my-auto pl-2'>{post.postUsername}</h1>
                      <h1 className={"my-auto ml-1 text-gray-500"}>1d</h1>
                    </div>
                  </Link>
                  <div className='my-auto'>
                    <Link to={`/profile/${post.postUserId}/3`} className='border rounded-lg p-2 text-gray-700 bg-gray-50 focus:bg-gray-200 focus:border-2 hover:text-black hover:bg-gray-100 focus:text-black'>{unfollowLoading}</Link>
                  </div>
                </div>
                <div className='pt-1 pb-4'>
                  <div>
                    <img src={post.downloadURL} alt="" className={"w-[450px] h-[450px] object-cover rounded-sm"} />
                  </div>
                  <div className=' justify-between pt-2'>
                    <div className='flex justify-between'>
                      <div className='flex gap-3'>
                        <div className=''>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={post.liked ? 'red' : 'none'}
                            stroke={post.liked ? 'red' : 'black'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className='cursor-pointer'
                            onClick={(e) => { e.stopPropagation(); handleLikeToggle(post.id); }}
                          >
                            <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                          </svg>
                        </div>
                        <svg
                          fill="#000000"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className='cursor-pointer'
                          onClick={() => handleModalOpen(post)}
                        >
                          <path d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,0-1.41A8,8,0,1,1,12,20Z" />
                        </svg>
                        <svg fill="#000000"
                          width="24"
                          height="24"
                          viewBox="0 0 256 256"
                          id="Flat"
                          xmlns="http://www.w3.org/2000/svg"
                          className='cursor-pointer'
                        >
                          <path d="M226.56445,29.43555a20.01116,20.01116,0,0,0-19.57129-5.10645v-.001L20.665,76.88184a20.00052,20.00052,0,0,0-3.13184,37.32421l84.31934,39.94141L141.794,238.4668a19.8172,19.8172,0,0,0,18.01855,11.4414q.85841,0,1.72852-.07324a19.83833,19.83833,0,0,0,17.57714-14.5L231.6709,49.00684A20.0168,20.0168,0,0,0,226.56445,29.43555ZM158.916,218.5498l-33.5879-70.90722,39.2754-39.27539a12.0001,12.0001,0,0,0-16.97071-16.97071l-39.27539,39.27564L37.4502,97.084,206.63379,49.36621Z" />
                        </svg>
                      </div>
                      <div className='flex'>
                        <svg
                          fill="#000000"
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className='cursor-pointer'
                        >
                          <path d="M18,2H6A1,1,0,0,0,5,3V21a1,1,0,0,0,1.65.76L12,17.27l5.29,4.44A1,1,0,0,0,18,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,19,21V3A1,1,0,0,0,18,2ZM17,18.86,12.64,15.2a1,1,0,0,0-1.28,0L7,18.86V4H17Z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className='ml-1 font-bold m-auto'>{post.likeCount} likes</p>
                    </div>
                    <div>
                      <p className='font-bold'>{post.postUsername}: <span className='font-normal'>{post.caption}</span></p>
                    </div>
                    {showEmojis && (
                      <div className="absolute emojis-container grid grid-cols-6 gap-2 bg-gray-100 -mt-52 ml-44 border rounded-sm p-2"
                      >
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
                    <div className='flex'>
                      <div className='w-full flex border-b border-black'>
                        <input
                          type="text"
                          placeholder='Added a comment...'
                          className='text-gray-700 focus:ring-0 active:ring-0 w-full p-2'
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                        <svg
                          fill="#000000"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className='cursor-pointer m-auto'
                          onClick={handleEmojiToggle}
                        >
                          <path d="M8,11V9a1,1,0,0,1,2,0v2a1,1,0,0,1-2,0Zm7,1a1,1,0,0,0,1-1V9a1,1,0,0,0-2,0v2A1,1,0,0,0,15,12Zm.225,2.368a4,4,0,0,1-6.45,0,1,1,0,0,0-1.55,1.264,6,6,0,0,0,9.55,0,1,1,0,1,0-1.55-1.264ZM23,12A11,11,0,1,1,12,1,11.013,11.013,0,0,1,23,12Zm-2,0a9,9,0,1,0-9,9A9.01,9.01,0,0,0,21,12Z" />
                        </svg>
                        <button className="text-blue-700 hover:text-blue-600 font-bold m-auto ml-2"
                          onClick={() => handleCommentSubmit(post.id)}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-3xl font-bold'>Post not found. You are unfollowed</p>
          )}
        </div>
        <div className='border-l pl-2'>
          <div className='flex gap-4 m-auto border-b p-2'>
            <div>
              <img src={userAvatar || avatar} alt="" className=' w-16 h-16 object-cover rounded-full' />
            </div>
            <div className=''>
              <h1 className='font-semibold mt-1'>{username}</h1>
              <h1 className='text-sm text-gray-700'>{fullName}</h1>
            </div>
            <div className=''>
              <h1 className='text-blue-900 pt-4 ml-2 cursor-pointer font-semibold'>switch</h1>
            </div>
          </div>
          <div className='flex justify-between'>
            <h1 className='text-gray-900 font-semibold text-sm'>Suggested for you</h1>
            <Link to={"/search"} className='text-gray-500 font-semibold text-sm cursor-pointer hover:text-blue-700'>See All</Link>
          </div>
          <div className='flex gap-4 p-2 mt-1'>
            {!searchValue && (
              <div className="w-full">
                <ul>
                  {filteredUsers.slice(0, 8).map((user, index) => (
                    <div key={index}>
                      <Link to={`/profile/${user.userId}/3`} key={index} className='flex py-2 border-b justify-between'>
                        <div className='flex mr-10'>
                          <li>
                            <img src={user.userAvater || avatar} alt="" className='w-12 h-12 object-cover rounded-full' />
                          </li>
                          <li className="m-auto ml-4 cursor-pointer text-black" onChange={() => handleFollowCheck(user.username)}>
                            {user.username}
                            {user.fullName}
                          </li>
                        </div>
                        <p className="text-blue-800 font-semibold text-sm my-auto">
                          {followStatus[user.username]}
                        </p>
                      </Link>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;

const emojis = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃",
  "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😛", "😜", "😝", "🤑",

];

