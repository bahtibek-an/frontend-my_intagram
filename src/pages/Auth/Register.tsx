import ButtonLoginGoogle from 'components/ButtonLoginGoogle';
import { ROUTES } from 'constant';
import { authSelector } from 'features/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { useAppSelector } from 'hooks';
import { IMAGES } from 'images';
import { auth } from 'lib/firebase';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDocument, getOnlyOneUser } from 'services';
import * as Yup from 'yup';
import './Auth.css';

export const Register = React.memo(() => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>('');
   const navigate = useNavigate();
   const { user: currentUser } = useAppSelector(authSelector);

   const form = useFormik({
      initialValues: {
         email: '',
         fullName: '',
         username: '',
         password: '',
         confirmPassword: '',
      },
      onSubmit: async (
         { email, fullName, password, username },
         { resetForm }
      ) => {
         try {
            setIsLoading(true);
            const unique = !!(await getOnlyOneUser('username', username));
            if (unique) {
               setError('This username already use by other user');
               setIsLoading(false);
               return;
            }
            const { user } = await createUserWithEmailAndPassword(
               auth,
               email,
               password
            );
            await addDocument('users', {
               avatar: IMAGES.noAvatar,
               description: '',
               email: user.email,
               followers: [],
               following: [],
               fullName: fullName,
               userId: user.uid,
               username: username,
            });
            resetForm();
            setError('');
            setIsLoading(false);
         } catch (error: any) {
            setError(error.code);
            setIsLoading(false);
            console.log(error);
         }
      },
      validationSchema: Yup.object().shape({
         email: Yup.string()
            .email('Invalid email!')
            .required('You must enter this field!'),
         fullName: Yup.string()
            .min(2, 'Too short!')
            .required('You must enter this field!'),
         username: Yup.string()
            .min(6, 'Too short!')
            .required('You must enter this field!'),
         password: Yup.string()
            .min(8, 'Password has at least 8 letter!')
            .required('You must enter this field!'),

         confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match!')
            .required('You must enter this field!'),
      }),
   });

   useEffect(() => {
      if (currentUser) {
         navigate(ROUTES.home, {
            replace: true,
         });
      }
   }, [currentUser, navigate]);

   return (
      <div className="min-h-screen  py-9 flex justify-center items-center animate-fadeIn">
         <div className=" container-app flex justify-center items-center">
            <div className="w-full max-w-[350px]  flex gap-y-3 flex-col">
               <div className=" bg-white border border-solid border-border-color rounded px-4 sm:px-10 py-6 ">
                  <img
                     src={IMAGES.logoLarge}
                     alt=""
                     className="max-w-[11.4375rem] mx-auto mb-3"
                  />
                  <p className="max-w-[270px] text-center mx-auto mb-4 font-medium text-text-color-gray">
                     Sign up to see photos and videos of your friends.
                  </p>
                  <form className="form-auth" onSubmit={form.handleSubmit}>
                     {error.length > 0 && (
                        <p className="text-center text-red-500">{error}</p>
                     )}
                     <div className="flex flex-col gap-y-2">
                        <input
                           type="email"
                           className={`input-field-auth ${
                              form.touched && !!form.errors.email
                                 ? 'border-red-500'
                                 : ''
                           }`}
                           placeholder="Email"
                           onChange={form.handleChange}
                           onBlur={form.handleBlur}
                           name="email"
                           value={form.values.email}
                        />
                        {form.touched && !!form.errors.email && (
                           <p className="error-mess">{form.errors.email}</p>
                        )}
                     </div>
                     <div className="flex flex-col gap-y-2">
                        <input
                           type="text"
                           className={`input-field-auth ${
                              form.touched && !!form.errors.fullName
                                 ? 'border-red-500'
                                 : ''
                           }`}
                           placeholder="Full name"
                           onChange={form.handleChange}
                           onBlur={form.handleBlur}
                           name="fullName"
                           value={form.values.fullName}
                        />
                        {form.touched && !!form.errors.fullName && (
                           <p className="error-mess">{form.errors.fullName}</p>
                        )}
                     </div>
                     <div className="flex flex-col gap-y-2">
                        <input
                           className={`input-field-auth ${
                              form.touched && !!form.errors.username
                                 ? 'border-red-500'
                                 : ''
                           }`}
                           placeholder="Username"
                           type="text"
                           onChange={form.handleChange}
                           onBlur={form.handleBlur}
                           name="username"
                           value={form.values.username}
                        />
                        {form.touched && !!form.errors.username && (
                           <p className="error-mess">{form.errors.username}</p>
                        )}
                     </div>
                     <div className="flex flex-col gap-y-2">
                        <input
                           className={`input-field-auth ${
                              form.touched && !!form.errors.password
                                 ? 'border-red-500'
                                 : ''
                           }`}
                           placeholder="Password"
                           type="password"
                           onChange={form.handleChange}
                           onBlur={form.handleBlur}
                           name="password"
                           value={form.values.password}
                        />

                        {form.touched && !!form.errors.password && (
                           <p className="error-mess">{form.errors.password}</p>
                        )}
                     </div>
                     <div className="flex flex-col gap-y-2">
                        <input
                           className={`input-field-auth ${
                              form.touched && !!form.errors.confirmPassword
                                 ? 'border-red-500'
                                 : ''
                           }`}
                           placeholder="Confirm password"
                           type="password"
                           onChange={form.handleChange}
                           onBlur={form.handleBlur}
                           name="confirmPassword"
                           value={form.values.confirmPassword}
                        />
                        {form.touched && !!form.errors.confirmPassword && (
                           <p className="error-mess">
                              {form.errors.confirmPassword}
                           </p>
                        )}
                     </div>
                     <button className="button-auth " type="submit">
                        {isLoading ? (
                           <svg
                              className="animate-spin  h-5 w-5 text-white"
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
                           <span>Register</span>
                        )}
                     </button>
                  </form>
                  <div className="w-full h-[1px] bg-gray-1 my-6 relative">
                     <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white px-4  text-gray-2 font-medium">
                        Or
                     </span>
                  </div>
                  <ButtonLoginGoogle />
                  <p className="text-center text-text-color-gray">
                     By signing up, you agree to our Terms, Data Policy and
                     Cookies Policy.
                  </p>
               </div>
               <div className=" bg-white border border-solid border-border-color rounded px-10 py-6 ">
                  <div className="flex gap-x-[6px] justify-center">
                     <p>You may already have an account?</p>
                     <Link
                        to={ROUTES.login}
                        className="text-blue-color hover:underline font-medium "
                     >
                        Login
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
});
