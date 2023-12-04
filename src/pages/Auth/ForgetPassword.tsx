import { ROUTES } from 'constant';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'lib/firebase';
import React, { FormEvent, useState } from 'react';
import { AiOutlineUnlock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
   const [email, setEmail] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);

   const handelSendEmail = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         if (email) {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
            setLoading(false);
            toast(
               `We sent an email to ${email} with a link to get back into your account.`,
               {
                  type: 'success',
                  position: 'top-center',
                  hideProgressBar: true,
                  theme: 'colored',
               }
            );
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="min-h-screen  py-9 flex justify-center items-center animate-fadeIn">
         <div className=" container-app flex justify-center items-center">
            <div className="w-full max-w-[350px]  flex gap-y-3 flex-col">
               <div className=" bg-white border border-solid border-border-color rounded px-4 sm:px-10 py-6 ">
                  <AiOutlineUnlock className="w-24 h-24 mx-auto mb-2 text-[#262626]" />
                  <h5 className="font-semibold text-[#262626] mb-4 text-center">
                     Trouble Logging In?
                  </h5>
                  <p className="max-w-[270px] text-center mx-auto mb-4 font-medium text-text-color-gray">
                     Enter your email and we'll send you a link to get back into
                     your account.
                  </p>
                  <form onSubmit={handelSendEmail}>
                     <input
                        className="input-field-auth mb-4"
                        placeholder="Your email"
                        type="email"
                        onChange={(e) => {
                           setEmail(e.target.value);
                        }}
                        required
                     />
                     <button className="button-auth " type="submit">
                        {loading ? (
                           <svg
                              className="animate-spin h-5 w-5 text-white"
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

                  <Link
                     to={ROUTES.signUp}
                     className="font-semibold text-[#262626]  text-center block"
                  >
                     Create New Account
                  </Link>
               </div>
               <div className=" bg-white border border-solid border-border-color rounded px-10 py-6 ">
                  <div className="flex gap-x-[6px] justify-center">
                     <Link
                        to={ROUTES.login}
                        className="text-blue-color hover:underline font-medium "
                     >
                        Back to login
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ForgetPassword;
