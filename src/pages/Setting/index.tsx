import Avatar from 'components/Avatar';
import { authSelector } from 'features/auth';
import { updateUser } from 'features/auth/authAction';
import { sendPasswordResetEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'hooks';
import { auth, db } from 'lib/firebase';
import React, { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getOnlyOneUser, uploadImg } from 'services';
import { IUser } from 'shared';
import * as Yup from 'yup';

const tabs = [
   {
      key: 'edit-profile',
      content: 'Edit profile',
   },
   {
      key: 'change-password',
      content: 'Change password',
   },
];

const Setting = () => {
   const [activeTab, setActiveTab] = useState<string>(tabs[0].key);
   const { user } = useAppSelector(authSelector);
   const inputImgRef = useRef<HTMLInputElement>(null);
   const dispatch = useAppDispatch();
   const [loadingUpdateImg, setLoadingUpdateImg] = useState<boolean>(false);
   const [loadingForm, setLoadingForm] = useState<boolean>(false);
   const [formSuccess, setFormSuccess] = useState<{
      editProfile: string;
      editPassword: string;
   }>({
      editPassword: '',
      editProfile: '',
   });
   const [formError, setFormError] = useState<{
      editProfile: string;
      editPassword: string;
   }>({
      editPassword: '',
      editProfile: '',
   });

   const formEditProfile = useFormik({
      initialValues: {
         name: user?.fullName || '',
         username: user?.username || '',
         bio: user?.description || '',
      },
      onSubmit: async ({ name, username, bio }, actions) => {
         try {
            setLoadingForm(true);
            const unique = await getOnlyOneUser('username', username);
            if (unique && unique?.userId !== user?.userId) {
               setLoadingForm(false);
               throw new Error('This username already use by other user');
            }

            if (user) {
               await updateDoc(doc(db, 'users', user.docId as string), {
                  fullName: name,
                  description: bio,
                  username,
               });

               dispatch(
                  updateUser({
                     ...user,
                     fullName: name,
                     description: bio,
                     username,
                  })
               );
               setFormSuccess({
                  ...formSuccess,
                  editProfile: 'Change profile successfully',
               });

               setFormError({
                  ...formError,
                  editProfile: '',
               });
               setLoadingForm(false);
            }
         } catch (error: any) {
            setFormSuccess({
               ...formSuccess,
               editProfile: '',
            });
            setFormError({
               ...formError,
               editProfile: error.message,
            });
         }
      },
      validationSchema: Yup.object().shape({
         name: Yup.string()
            .required('You must enter this field!')
            .min(2, 'Too short!'),
         username: Yup.string()
            .min(6, 'Too short!')
            .required('You must enter this field!'),
      }),
   });

   const formEditPassword = useFormik({
      initialValues: {
         email: '',
      },
      onSubmit: async ({ email }) => {
         setLoadingForm(true);
         try {
            await sendPasswordResetEmail(auth, email);
            setFormSuccess({
               ...formSuccess,
               editPassword: 'We sent a email to reset password.',
            });

            setFormError({
               ...formError,
               editPassword: '',
            });
            setLoadingForm(false);
         } catch (error: any) {
            setFormSuccess({
               ...formSuccess,
               editPassword: '',
            });
            setFormError({
               ...formError,
               editPassword: 'Something went wrong. Try again!',
            });
            setLoadingForm(false);
         }
      },
      validationSchema: Yup.object().shape({
         email: Yup.string()
            .email('Invalid email')
            .required('You must enter this field!'),
      }),
   });

   const handleChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      try {
         if (file && user) {
            setLoadingUpdateImg(true);
            const url = await uploadImg(file, `avatars/${file.name}`);
            console.log(url);

            await updateDoc(doc(db, 'users', user.docId as string), {
               avatar: url,
            });

            getOnlyOneUser('userId', user.userId as string).then((value) => {
               console.log(value);
               if (value) {
                  dispatch(updateUser(value as IUser));
                  setLoadingUpdateImg(false);
               }
            });
         }
      } catch (error) {
         console.log(error);
         setLoadingUpdateImg(false);
      }
   };

   useEffect(() => {
      if (user) {
         formEditProfile.setValues({
            name: user.fullName,
            bio: user.description,
            username: user.username,
         });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [user]);

   useEffect(() => {
      setFormSuccess({
         editPassword: '',
         editProfile: '',
      });

      setFormError({
         editPassword: '',
         editProfile: '',
      });
   }, [activeTab]);

   return (
         <div className="py-6 ">
            <div className="bg-white rounded overflow-hidden border-b border-border-color  ">
               <div className="flex flex-col md:flex-row ">
                  {/* tab */}
                  <div className="flex md:flex-col  md:max-w-[263px] w-full items-start">
                     {tabs.map((tab) => (
                        <button
                           className={`p-4 relative after:absolute after:transition-[background-color]  after:left-0 md:after:top-0 after:bottom-0 md:after:h-0 md:after:w-[2px] after:h-[2px] after:bg-text-color-black font-medium md:w-[unset] w-[50%] ${
                              activeTab === tab.key
                                 ? 'active md:after:h-full after:w-full '
                                 : ''
                           }`}
                           key={tab.key}
                           onClick={() => setActiveTab(tab.key)}
                        >
                           {tab.content}
                        </button>
                     ))}
                  </div>
                  {/* content */}
                  <div className="flex-1 w-full py-8  px-8 lg:px-[3.75rem] ">
                     {/* profile */}
                     {activeTab === 'edit-profile' && (
                        <div className="flex flex-col gap-y-4">
                           {formError.editProfile.length > 0 && (
                              <p className="text-center text-red-500">
                                 {formError.editProfile}
                              </p>
                           )}
                           {formSuccess.editProfile.length > 0 && (
                              <p className="text-center text-green-500">
                                 {formSuccess.editProfile}
                              </p>
                           )}
                           <div className="flex  gap-x-8 items-center">
                              <div className="w-14 lg:w-28">
                                 {loadingUpdateImg ? (
                                    <Skeleton
                                       className="w-10 h-10 flex-shrink-0 "
                                       circle
                                    />
                                 ) : (
                                    <Avatar
                                       src={user?.avatar as string}
                                       alt=""
                                       className="w-10 h-10 flex-shrink-0 "
                                    />
                                 )}
                              </div>
                              <div className="flex flex-col gap-y-1">
                                 <h3 className="text-xl ">{user?.username}</h3>
                                 <button
                                    className="font-medium text-blue-color"
                                    onClick={() => {
                                       inputImgRef.current?.click();
                                    }}
                                 >
                                    Change profile photo
                                 </button>
                                 <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={inputImgRef}
                                    onChange={handleChangeImg}
                                 />
                              </div>
                           </div>
                           <div className="flex  gap-x-8">
                              <h4 className="flex-shrink-0 w-14 font-medium lg:w-28">
                                 Name
                              </h4>
                              <div className="flex flex-col gap-y-2 w-full">
                                 <input
                                    type="text"
                                    className={`bg-[#FAFAFA] rounded border border-solid border-[#DBDBDB] text-default-font-size text-[#959595] px-2 py-2 w-full ${
                                       formEditProfile.errors.name &&
                                       formEditProfile.touched.name
                                          ? 'border-red-500'
                                          : ''
                                    }`}
                                    onChange={formEditProfile.handleChange}
                                    name="name"
                                    value={formEditProfile.values.name}
                                    onBlur={formEditProfile.handleBlur}
                                 />
                                 {formEditProfile.errors.name &&
                                 formEditProfile.touched.name ? (
                                    <p className="text-red-500">
                                       {formEditProfile.errors.name}
                                    </p>
                                 ) : null}
                                 <span className="text-xs text-text-color-gray">
                                    Help people discover your account by using
                                    the name you're known by: either your full
                                    name, nickname, or business name.
                                 </span>
                              </div>
                           </div>
                           <div className="flex  gap-x-8">
                              <h4 className="flex-shrink-0 w-14 font-medium lg:w-28">
                                 Username
                              </h4>
                              <div className="flex flex-col gap-y-2 w-full">
                                 <input
                                    type="text"
                                    className={`bg-[#FAFAFA] rounded border border-solid border-[#DBDBDB] text-default-font-size text-[#959595] px-2 py-2 w-full ${
                                       formEditProfile.errors.username &&
                                       formEditProfile.touched.username
                                          ? 'border-red-500'
                                          : ''
                                    }`}
                                    onChange={formEditProfile.handleChange}
                                    name="username"
                                    value={formEditProfile.values.username}
                                    onBlur={formEditProfile.handleBlur}
                                 />
                                 {formEditProfile.errors.username &&
                                 formEditProfile.touched.username ? (
                                    <p className="text-red-500">
                                       {formEditProfile.errors.username}
                                    </p>
                                 ) : null}
                              </div>
                           </div>
                           <div className="flex  gap-x-8">
                              <h4 className="flex-shrink-0 w-14 font-medium lg:w-28">
                                 Bio
                              </h4>
                              <div className="flex flex-col gap-y-2  w-full">
                                 <textarea
                                    className="bg-[#FAFAFA] rounded border border-solid border-[#DBDBDB] text-default-font-size text-[#959595] px-2 py-2 w-full focus:outline-none resize-none min-h-[100px] overflow-y-auto"
                                    onChange={formEditProfile.handleChange}
                                    name="bio"
                                    value={formEditProfile.values.bio}
                                 />
                              </div>
                           </div>
                           <div className="self-end">
                              <button
                                 className="bg-blue-color px-4 font-medium text-white py-2 rounded flex items-center justify-center h-9 hover:bg-blue-color/75 disabled:bg-blue-color/75 transition-[background-color] "
                                 disabled={
                                    !(
                                       formEditProfile.isValid &&
                                       formEditProfile.dirty
                                    )
                                 }
                                 onClick={() => {
                                    formEditProfile.handleSubmit();
                                 }}
                                 type="submit"
                              >
                                 {loadingForm ? 'Loading...' : ' Save change'}
                              </button>
                           </div>
                        </div>
                     )}
                     {/* password */}
                     {activeTab === 'change-password' && (
                        <div className="flex flex-col gap-y-4">
                           {formError.editPassword.length > 0 && (
                              <p className="text-center text-red-500">
                                 {formError.editPassword}
                              </p>
                           )}
                           {formSuccess.editPassword.length > 0 && (
                              <p className="text-center text-green-500">
                                 {formSuccess.editPassword}
                              </p>
                           )}
                           <div className="flex  gap-x-8">
                              <h4 className="flex-shrink-0 w-14 font-medium lg:w-28">
                                 Email
                              </h4>
                              <div className="flex flex-col gap-y-2 w-full">
                                 <input
                                    type="email"
                                    name="email"
                                    onChange={formEditPassword.handleChange}
                                    onBlur={formEditPassword.handleBlur}
                                    className="bg-[#FAFAFA] rounded border border-solid border-[#DBDBDB] text-default-font-size text-[#959595] px-2 py-2 w-full "
                                 />
                                 {formEditPassword.errors.email &&
                                 formEditPassword.touched.email ? (
                                    <p className="text-red-500">
                                       {formEditPassword.errors.email}
                                    </p>
                                 ) : null}
                              </div>
                           </div>
                           <div className="self-end">
                              <button
                                 className="bg-blue-color px-4 font-medium text-white py-2 rounded flex items-center justify-center h-9 hover:bg-blue-color/75 disabled:bg-blue-color/75 transition-[background-color] "
                                 disabled={
                                    !(
                                       formEditPassword.isValid &&
                                       formEditPassword.dirty
                                    )
                                 }
                                 onClick={() => {
                                    formEditPassword.handleSubmit();
                                 }}
                                 type="submit"
                              >
                                 {loadingForm ? 'Loading...' : 'Send request'}
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
   );
};

export default Setting;
