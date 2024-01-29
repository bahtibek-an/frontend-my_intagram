import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName,
      });

      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });

      await setDoc(doc(db, 'userChats', res.user.uid), {});
      navigate('/');
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <section>
      <div className='form-box card'>
        <div className='form-value '>
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className='inputbox'>
              <ion-icon name='person'></ion-icon>
              <input type='text' required />
              <label for=''>Name</label>
            </div>
            <div className='inputbox'>
              <ion-icon name='mail'></ion-icon>
              <input type='text' required />
              <label for=''>Email</label>
            </div>
            <div className='inputbox'>
              <ion-icon name='lock-closed' onclick='togglePasswordVisibility()'></ion-icon>
              <input type='password' id='passwordInput' required />
              <label for=''>Password</label>
            </div>
            <button type='submit' disabled={loading}>
              {loading ? 'Loading...' : 'Register'}
            </button>
          </form>
          <div className='register'>
            <p>
              Do you have an account? <a href='./login'>Log in</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
