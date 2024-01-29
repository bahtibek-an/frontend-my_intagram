import React, { useState, useEffect, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import Posts from '../components/Posts';
import { db } from '../firebase';
import Comments from '../components/Comments';
import PostModal from '../components/PostModal';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [users, setUsers] = useState([]);
  const storage = getStorage();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        const updatedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(updatedUsers);
      },
      (error) => {
        console.log(error);
      }
    );

    const unsubscribePosts = onSnapshot(
      collection(db, 'posts'),
      (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(posts);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribeUsers();
      unsubscribePosts();
    };
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageFile && description) {
      try {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            const newPostData = {
              imageUrl: downloadURL,
              description: description,
              comment: null,
              userId: currentUser.uid,
              userName: currentUser.displayName,
              like: 0,
              timestamp: serverTimestamp(),
            };

            // Add the new post to the Firestore collection
            const newPostRef = await addDoc(collection(db, 'posts'), newPostData);

            // Get the newly added post's data with ID
            const newPostWithId = {
              id: newPostRef.id,
              ...newPostData,
            };

            setPosts((prevPosts) => [newPostWithId, ...prevPosts]);

            setImageFile(null);
            setDescription('');
          }
        );
      } catch (error) {
        console.error('error', error);
      }
    }
  };

  return (
    <div className='body'>
      <Navbar handleShowModal={handleShowModal} />
      <PostModal
        show={showModal}
        onHide={handleHideModal}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        description={description}
        setDescription={setDescription}
      />

      <div className='d-flex'>
        <div className='p-5 col-md-8 d-flex flex-column align-items-center justify-content-center'>
          {posts.map((post) => (
            <Posts key={post.id} post={post} setPost={setPost} />
          ))}
        </div>

        <div className='p-5 col-md-4 mobile-none'>
          <div className='d-flex'>
            <img
              src='https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg'
              alt=''
              width='60px'
              className='float'
            />
            <h6 className='m-5 mt-0 mb-0 d-flex justify-content-center align-items-center'>
              {currentUser.displayName}
            </h6>
          </div>
          <br />
          All Users
          <br />
          <hr />
          {users.map(({ displayName }, idx) => (
            <div className='d-flex mb-1' key={idx}>
              <img
                src='https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg'
                alt=''
                width='60px'
                className='float'
              />
              <h6 className='m-5 mt-0 mb-0 d-flex justify-content-center align-items-center'>{displayName}</h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
