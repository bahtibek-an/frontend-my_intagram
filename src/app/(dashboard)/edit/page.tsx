"use client";
import ProfilePicModal from "@/components/modals/profile-photo/ProfilePicModal";
import { useAuthContext } from "@/contexts/AuthContext";
import { updateProfileInfo } from "@/firebase/updateProfileInfo";
import { UserData } from "@/types";
import { Avatar } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";

const Edit = () => {
  const { userData, setUserData } = useAuthContext();
  const [isPicModal, setIsPicModal] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [name, setName] = useState<string>(userData?.fullName || "");
  const [bio, setBio] = useState<string>(userData?.bio || "");
  const isDisabled: boolean =
    name == userData?.fullName && bio == userData?.bio;
  const { mutate, isLoading } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async () =>
      userData?.userId && updateProfileInfo(userData.userId, name, bio),
    onSuccess: () =>
      setUserData({ ...(userData as UserData), fullName: name, bio: bio }),
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };
  return (
    <main className="max-w-4xl w-full mx-auto flex flex-col gap-6 p-4 mt-2 lg:border lg:mt-8 rounded-sm ">
      <div className="flex gap-3 items-center">
        <Avatar
          src={userData?.profileImage}
          className="cursor-pointer"
          onClick={() => setIsPicModal(true)}
        />
        <div className="flex flex-col">
          <span>{userData?.userName}</span>
          <span
            className="cursor-pointer text-blue hover:text-sky-700 active:opacity-60 font-medium "
            onClick={() => setIsPicModal(true)}
          >
            Change profile photo
          </span>
        </div>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-7">
          <label className="sm:w-20 sm:text-end font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border p-1 focus:outline-2 max-w-sm w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-7">
          <label className="sm:w-20 sm:text-end font-medium" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="border p-1 focus:outline-2 max-w-sm w-full disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-slate-400 "
            disabled
            value={userData?.userName}
            title="You can change your username every 14 days."
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-7">
          <label className="sm:w-20 sm:text-end font-medium" htmlFor="bio">
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            className="border p-1 focus:outline-2 max-w-sm w-full"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue text-white px-3 py-1 rounded-md w-fit mx-28 hover:bg-sky-600 active:opacity-60 disabled:opacity-60"
          disabled={isDisabled || isLoading}
        >
          Submit
        </button>
      </form>
      <ProfilePicModal
        open={isPicModal}
        setOpen={setIsPicModal}
        profileImage={userData?.profileImage || ""}
        setImageLoading={setIsImageLoading}
      />
    </main>
  );
};

export default Edit;
