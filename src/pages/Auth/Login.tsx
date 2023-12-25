import ButtonLoginGoogle from 'components/ButtonLoginGoogle';
import { ROUTES } from 'constant';
import { authSelector } from 'features/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAppSelector, useIsMounted } from 'hooks';
import { IMAGES } from 'images';
import { auth } from 'lib/firebase';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export const Login = () => {
   const { user } = useAppSelector(authSelector);
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>('');
   const navigate = useNavigate();
   const isMounted = useIsMounted();

   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         if (isMounted()) {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoading(false);
            setError('');
            setEmail('');
            setPassword('');
         }
      } catch (error: any) {
         if (isMounted()) {
            setError(error.code);
            setIsLoading(false);
            console.log(error);
         }
      }
   };

   useEffect(() => {
      if (user) {
         navigate('/', {
            replace: true,
         });
      }
   }, [user, navigate]);

   return (
      <div className="min-h-screen  py-9 flex justify-center items-center animate-fadeIn">
         <div className=" container-app flex justify-center items-center">
            <div className="max-w-[465px] hidden lg:block">
               <img src={IMAGES.imgLogin} alt="" />
            </div>
            <div className="w-full lg:max-w-[350px] max-w-xl flex gap-y-3 flex-col">
               <div className=" bg-white border border-solid border-border-color rounded px-4 sm:px-10 py-6 ">
                  <img
                     src={IMAGES.logoLarge}
                     alt=""
                     className="max-w-[11.4375rem] mx-auto mb-6"
                  />
                  <form className="form-auth" onSubmit={handleLogin}>
                     {error.length > 0 && (
                        <p className="text-center text-red-500">{error}</p>
                     )}
                     <input
                        type="email"
                        className="input-field-auth"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                           setEmail(e.target.value);
                        }}
                     />
                     <input
                        className="input-field-auth"
                        placeholder="Password"
                        type="Password"
                        value={password}
                        onChange={(e) => {
                           setPassword(e.target.value);
                        }}
                     />
                     <button className="button-auth " type="submit">
                        {isLoading ? (
                           <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                           >
                              <circle
                                 className="opacity-25"
                                 cx="12"
                                 cy="12"
                                 r="10"
                                 stroke="currentColor"
                                 strokeWidth="4"
                              ></circle>
                              <path
                                 className="opacity-75"
                                 fill="currentColor"
                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                           </svg>
                        ) : (
                           <span>Log in</span>
                        )}
                     </button>
                  </form>
                  <div className="w-full h-[1px] bg-gray-1 my-6 relative">
                     <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white px-4  text-gray-2 font-medium">
                        Or
                     </span>
                  </div>
                  <ButtonLoginGoogle />
                  <Link
                     to={ROUTES.forgetPassword}
                     className="text-blue-color block text-center hover:underline"
                  >
                     You forgot the password?
                  </Link>
               </div>
               <div className=" bg-white border border-solid border-border-color rounded px-10 py-6 ">
                  <div className="flex gap-x-[6px] justify-center">
                     <p>You don't an account?</p>
                     <Link
                        to={ROUTES.signUp}
                        className="text-blue-color hover:underline font-medium "
                     >
                        Sign up
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
