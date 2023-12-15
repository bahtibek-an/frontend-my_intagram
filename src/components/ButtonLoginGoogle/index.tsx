import { setUser } from 'features/auth';
import { signInWithPopup } from 'firebase/auth';
import { useAppDispatch } from 'hooks';
import { IMAGES } from 'images';
import { auth, googleProvider } from 'lib/firebase';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { addDocument, getOnlyOneUser } from 'services';

const ButtonLoginGoogle = () => {
   const dispatch = useAppDispatch();
   const handleLoginWithGoogle = async () => {
      const { user } = await signInWithPopup(auth, googleProvider);
      const userExist = await getOnlyOneUser('userId', user.uid);
      if (!userExist) {
         const indexOfUsername = user.email?.indexOf('@');
         const username = user.email?.slice(0, indexOfUsername);

         addDocument('users', {
            avatar: user.photoURL || IMAGES.noAvatar,
            description: '',
            email: user.email,
            followers: [],
            following: [],
            fullName: user.displayName,
            userId: user.uid,
            username: username as string,
         }).then((docRef) => {
            dispatch(
               setUser({
                  avatar: IMAGES.noAvatar,
                  description: '',
                  email: user.email as string,
                  followers: [],
                  following: [],
                  fullName: user.displayName as string,
                  userId: user.uid,
                  username: username as string,
                  docId: docRef.id,
               })
            );
         });
      }
   };

   return (
      <button
         onClick={handleLoginWithGoogle}
         className="bg-gray-3 rounded-full w-full h-[34px] flex items-center justify-center font-medium text-text-color-black gap-x-6 mb-5"
      >
         <FcGoogle />
         Continue with google
      </button>
   );
};

export default ButtonLoginGoogle;
