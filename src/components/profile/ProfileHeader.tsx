"use client";
import React, { useEffect, useState } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import ProfileButtons from "./ProfileButtons";
import { UserData } from "@/types";
import Stats from "./Stats";
import Bio from "./Bio";
import ProfilePicModal from "../modals/profile-photo/ProfilePicModal";
const ProfileHeader = ({
  profileData,
  isPersonal,
}: {
  profileData: UserData;
  isPersonal: boolean;
}) => {
  const [picModal, setPicModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  return (
    <>
      <header className="pt-8">
        <div className="flex items-center  sm:items-start gap-6 px-4 md:gap-[101px] md:px-[68px]">
          <div className={`relative ${imageLoading && "opacity-60"}`}>
            <Avatar
              src={profileData.profileImage}
              className="cursor-pointer w-[77px] h-[77px] md:w-[150px] md:h-[150px]"
              onClick={() => isPersonal && setPicModal(true)}
            />
            {imageLoading && (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CircularProgress
                  size={40}
                  className="text-white"
                  color="inherit"
                />
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <span className="text-[28px]">{profileData.userName}</span>
              <ProfileButtons
                isPersonal={isPersonal}
                userId={profileData.userId}
              />
            </div>
            <div className="hidden sm:block">
              <Stats
                postsNumber={profileData.posts?.length || 0}
                followersNumber={profileData.followers?.length || 0}
                followingNumber={profileData.following.length}
              />
            </div>
            <div className="hidden sm:block">
              <Bio
                bio={profileData?.bio || ""}
                fullName={profileData.fullName}
              />
            </div>
          </div>
        </div>
        <div className="sm:hidden px-4">
          <Bio bio={profileData?.bio || ""} fullName={profileData.fullName} />
        </div>
        <div className="sm:hidden border-t mt-4">
          <Stats
            postsNumber={profileData.posts?.length || 0}
            followersNumber={profileData.followers?.length || 0}
            followingNumber={profileData.following.length}
          />
        </div>
      </header>
      <ProfilePicModal
        profileImage={profileData.profileImage}
        open={picModal}
        setOpen={setPicModal}
        setImageLoading={setImageLoading}
      />
    </>
  );
};

export default ProfileHeader;
