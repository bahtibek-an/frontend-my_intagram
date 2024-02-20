import React, { useEffect, useState } from 'react';
import { auth, followerCollection, followingCollection, postCollection, storage, usersCollection } from '../../../firebase/firebase-config';
import { getDoc, doc, getDocs, collection } from 'firebase/firestore';
import { Tab } from './others/tab';
import { Link } from 'react-router-dom';
import { ref, getDownloadURL } from 'firebase/storage';

const UserProfile: React.FC = () => {
  const avatar = "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg";
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [postNumber, setPostNumber] = useState<number | null>(null);
  const [bio, setBio] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [garden, setGarden] = useState<string>('');
  const [followers, setFollowers] = useState<number>(0);
  const [followings, setFollowings] = useState<number>(0);
  const [userImage, setUserimage] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const userDocRef = doc(usersCollection, userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUsername(userData.username);
          setFullName(userData.fullName);
          setGarden(userData.garden);
          setBio(userData.about);
          setWebsite(userData.website);
        }

        const postsQuerySnapshot = await getDocs(collection(postCollection, userId, 'posts'));
        setPostNumber(postsQuerySnapshot.size);

        const followersDocSnapshot = await getDoc(doc(followerCollection, userId));
        const followersData = followersDocSnapshot.data();
        let followersCount = 0;
        if (followersData) {
          Object.keys(followersData).forEach(key => {
            if (followersData[key] === true) {
              followersCount++;
            }
          });
        }
        setFollowers(followersCount);

        const followingsDocSnapshot = await getDoc(doc(followingCollection, userId));
        const followingsData = followingsDocSnapshot.data();
        let followingsCount = 0;
        if (followingsData) {
          Object.keys(followingsData).forEach(key => {
            if (followingsData[key] === true) {
              followingsCount++;
            }
          });
        }
        setFollowings(followingsCount);

        const storageRef = ref(storage, `users/${userId}/userImage.png`);
        const url = await getDownloadURL(storageRef);
        setUserimage(url || null);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <div className='p-6'>
      <div className="bg-gray-100 px-32">
        <div className="flex md:flex-row-reverse ">
          <div className="w-full md:w-3/4 p-4 pl-6">
            <div className="text-left pl-4 pt-3">
              <span className="text-gray-700 font-bold text-2xl mr-2">{username}</span>
              <span className="text-base font-semibold text-gray-700 mr-2">
                <Link to={`/${username}/settings`}>
                  <button
                    className="bg-transparent hover:bg-gray-900 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded"
                  >
                    Edit Profile
                  </button>
                </Link>
              </span>
            </div>
            <div className="text-left pl-4 pt-3">
              <span className="text-base font-semibold text-gray-700 mr-2">
                <b>{postNumber || 0}</b> posts
              </span>
              <span className="text-base font-semibold text-gray-700 mr-2">
                <b>{followers || 0}</b> followers
              </span>
              <span className="text-base font-semibold text-gray-700">
                <b>{followings || 0}</b> following
              </span>
            </div>

            <div className="flex text-left pl-4 pt-3">
              <span className="text-lg text-black">{fullName}</span>
              <span className="text-gray-600 text-lg ml-2">{garden}</span>
            </div>

            <div className="text-left pl-4 pt-0">
              <p className="text-base font-medium text-gray-700 mr-2 hover:text-blue-600">{website}</p>
              <p className="text-base font-medium text-gray-600 mr-2 mt-2">{bio}</p>
            </div>
          </div>
          <div className="flex p-4">
            <div className="relative text-center mt-4">
              <button
                className="flex"
                aria-label="User menu"
                aria-haspopup="true"
              >
                <img
                  className="rounded-full object-cover w-44 h-44"
                  src={userImage || avatar}
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
        <hr className='py-4' />
        <Tab username={username || ""} />
      </div>
    </div>
  );
}

export default UserProfile;
