import ScreenLoader from 'components/ScreenLoader';
import { setIsLogin, setUser } from 'features/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from 'hooks';
import { createContext, useEffect, useState } from 'react';
import { getOnlyOneUser } from 'services';
import { auth } from '../lib/firebase';

export const AuthListenerContext = createContext(null);

const AuthListenerProvider: React.FC = ({ children }) => {
   const [loading, setLoading] = useState<boolean>(true);
   const dispatch = useAppDispatch();

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         if (user) {
            dispatch(setIsLogin(true));
            setLoading(false);
            const userExist = await getOnlyOneUser('userId', user.uid);
            if (userExist) {
               dispatch(setUser(userExist));
            } else {
               dispatch(setUser(null));
               dispatch(setIsLogin(false));
            }
         } else {
            dispatch(setUser(null));
            setLoading(false);
            dispatch(setIsLogin(false));
         }
      });

      return () => {
         unsubscribe();
      };
   }, [dispatch]);

   return (
      <AuthListenerContext.Provider value={null}>
         {loading ? <ScreenLoader /> : children}
      </AuthListenerContext.Provider>
   );
};

export default AuthListenerProvider;
