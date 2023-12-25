import { signInWithPopup } from 'firebase/auth';
import { IMAGES } from 'images';
import { auth, googleProvider } from 'lib/firebase';
import { addDocument } from './addDocument';
import { getOnlyOneUser } from './getOnlyOneUser';
export const loginWithGoogle = async () => {
   const { user } = await signInWithPopup(auth, googleProvider);
   const userExist = await getOnlyOneUser('userId', user.uid);
   if (!userExist) {
      const indexOfUsername = user.email?.indexOf('@');
      const username = user.email?.slice(0, indexOfUsername);

      const ref = await addDocument('users', {
         avatar: IMAGES.noAvatar,
         description: '',
         email: user.email,
         followers: [],
         following: [],
         fullName: user.displayName,
         userId: user.uid,
         username: username as string,
      });
      return {
         avatar: IMAGES.noAvatar,
         description: '',
         email: user.email,
         followers: [],
         following: [],
         fullName: user.displayName,
         userId: user.uid,
         username: username as string,
         docId: ref.id,
      };
   }
   return null;
};
