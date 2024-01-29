import React, { useContext, useEffect, useState } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(collection(db, 'posts'), where('userId', '==', currentUser.uid));
        const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setPosts(data);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [currentUser.uid, db]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container p-5'>
        <div className='d-flex'>
          <div className='col-md-2 p-5'>
            <img src='https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg' alt='' width='100px' />
          </div>
          <div className='col-md-1 p-5'>
            <h3>
              <b>{currentUser.displayName}</b>
            </h3>
            <p>
              <b>{currentUser.email}</b>
            </p>
          </div>
        </div>
        <button className='btn-outline-danger btn w-25' onClick={handleLogout}>
          Logout
        </button>
        <center className=''>
          🎞 <b>Posts</b>
        </center>
        <hr className='w-100' />
        <div className='container text-center'>
          <div className='row row-cols-2 row-cols-lg-4 g-2 g-lg-3'>
            {posts.map((post) => (
              <div className='col' key={post.id}>
                <div className='p-3'>
                  <img src={post.imageUrl} alt='' width='200px' height='200px' />
                  <p className='text-center' style={{ fontSize: 20 }}>
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
