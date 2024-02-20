import React, { useEffect, useState } from 'react';
import { auth, storage, usernameCollection, usersCollection } from '../../../firebase/firebase-config';
import { doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import ChangeUserImg from './upload/changeUserImg';
import { ref, getDownloadURL } from 'firebase/storage'; // getDownloadURL ham import qilinadi

const Settings: React.FC = () => {
  const avatar: string = 'https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg';
  const [userId, setUserId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [changeUsername, setChangeUsername] = useState<string | number>('');
  const [changeFullname, setChangeFullname] = useState<string>('');
  const [garden, setGarden] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [oldWebsite, setOldWebsite] = useState<string>('');
  const [oldAbout, setOldAbout] = useState<string>('');
  const [oldGarden, setOldGarden] = useState<string>('');
  const [userImageCall, setUserImageCall] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId('');
      }
    });

    return () => unsubscribe();
  }, []);

 const fetchData = async () => {
      if (userId) {
        try {
          const userDocRef = doc(usersCollection, userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username);
            setFullname(userData.fullName);
            setOldAbout(userData.about);
            setOldGarden(userData.garden);
            setOldWebsite(userData.website);
          }

          const storageRef = ref(storage, `users/${userId}/userImage.png`);
          const url = await getDownloadURL(storageRef);
          setUserImageCall(url || null);

          const usernameRef = doc(usernameCollection, username)
          await updateDoc(usernameRef, { userAvater: url})
          fetchData()
        } catch (error) {
          console.error(error);
        }
      }
    };

  useEffect(() => {
    fetchData();
  });

  const handleSent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userRef = doc(usersCollection, userId);
      await setDoc(userRef, {
        username: changeUsername || username,
        fullName: changeFullname || fullname,
        website: website || oldWebsite,
        about: about || oldAbout,
        garden: garden || oldGarden,
      });
      setLoading(false);
      fetchData()
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  const usernameCheck = async (username: string) => {
    try {
      const q = query(usersCollection, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      return querySnapshot.empty;
    } catch (error) {
      console.error("Error checking username availability:", error);
      return false;
    }
  }

  const checkUsernameAvailability = async (username: string) => {
    const usernameAvailable = await usernameCheck(username);
    return usernameAvailable;
  }

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setChangeUsername(newUsername);

    if (newUsername.trim() === "") {
      setError("Please enter your username");
      return;
    }

    const isUsernameAvailable = await checkUsernameAvailability(newUsername);
    if (!isUsernameAvailable) {
      setError("This username already taken");
    } else {
      setError("");
    }
  }

  return (
    <div className='p-6'>
      <div className='bg-gray-100 rounded-sm'>
        <div className='p-6'>
          <form onSubmit={handleSent}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-3xl font-semibold text-gray-900">Profile settings</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p>
                <hr className='mt-3' />
                <div className='flex flex-wrap bg-gray-800 my-4 rounded-lg'>
                  <div className="w-full md:w-1/6 py-3 px-2">
                    <div className="w-full relative mx-6 object-center">
                      <img
                        className="w-24 h-24 rounded-full p-1 border border-white object-cover "
                        src={userImageCall || avatar}
                        alt="User Avatar"
                      />
                    </div>
                  </div>

                  <div className='items-center my-auto'>
                    <h1 className='font-bold text-2xl text-white'>{username}</h1>
                    <h1 className='text-white'>{fullname}</h1>
                  </div>
                  <ChangeUserImg />
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                      Web site
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='website.com'
                        type="text"
                        autoComplete="address-level2"
                        className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                      Change Username
                    </label>
                    <div className="mt-2">
                      <div className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset ${error && `focus-within:ring-red-600  border-red-600 border-2`}  sm:max-w-md`}>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="username"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="janesmith"
                          value={changeUsername}
                          onChange={handleUsernameChange}
                        />
                      </div>
                      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                      About
                    </label>
                    <div className="mt-2">
                      <textarea
                        placeholder='Write a few sentences about yourself.'
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full resize-none rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Where you can receive mail.</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder='John deo'
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={changeFullname}
                        onChange={(e) => setChangeFullname(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                      Ganden
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-44 pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={garden}
                        onChange={(e) => { setGarden(e.target.value) }}
                      >
                        <option>Garden</option>
                        <option value="he">he</option>
                        <option value="she">she</option>
                      </select>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md w-32 bg-gray-800 px-3 py-2 text-sm border-2 border-gray-600 hover:border-gray-400 font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
