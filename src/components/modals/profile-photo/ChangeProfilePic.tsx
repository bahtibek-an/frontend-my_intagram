"use client";
import React, { ChangeEvent } from "react";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { setProfileImageAndUpdateFirestore } from "@/firebase/updateProfilePic";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserData } from "@/types";
const ChangeProfilePic = ({
  imageLoading,
  modal,
}: {
  imageLoading: (arg: boolean) => void;
  modal: (arg: boolean) => void;
}) => {
  const { userData, setUserData } = useAuthContext();
  const { mutate } = useMutation({
    mutationKey: ["profilePic"],
    mutationFn: ({ userId, file }: { userId: string; file: File }) =>
      setProfileImageAndUpdateFirestore(userId, file),
    onSuccess: (data: string) => {
      setUserData({ ...userData, profileImage: data } as UserData);
      imageLoading(false);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.item(0) || null;
    if (
      file?.type.startsWith("image/") &&
      !file.type.startsWith("image/svg+xml") &&
      userData
    ) {
      mutate({ userId: userData.userId, file: file });
      imageLoading(true);
      modal(false);
    }
  };
  return (
    <Button
      variant="text"
      className="w-[244px] text-[13px] md:w-[400px] py-0 text-blue font-semibold bg-transparent flex"
      color="inherit"
    >
      <label htmlFor="profilePic" className="w-full py-3 cursor-pointer ">
        Upload Photo
      </label>
      <input
        type="file"
        name="profilePic"
        id="profilePic"
        accept="image/*"
        onChange={handleChange}
        hidden
      />
    </Button>
  );
};

export default ChangeProfilePic;
