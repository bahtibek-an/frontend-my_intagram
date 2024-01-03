"use client";
import Modal from "@/components/ui/Modal";
import { useAuthContext } from "@/contexts/AuthContext";
import { removeProfilePicture } from "@/firebase/updateProfilePic";
import { UserData } from "@/types";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const RemoveProfilePicModal = ({
  open,
  setOpen,
  modal,
  imageLoading,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
  modal: (arg: boolean) => void;
  imageLoading: (arg: boolean) => void;
}) => {
  const { userData, setUserData } = useAuthContext();
  const { mutate } = useMutation({
    mutationKey: ["remove-profile-photo"],
    mutationFn: () => removeProfilePicture(userData?.userId || ""),
    onSuccess: () => {
      setUserData({ ...userData, profileImage: "" } as UserData);
      imageLoading(false);
    },
    onError: () => imageLoading(false),
  });
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="md:max-w-[400px] max-w-[336px]"
    >
      <p className="max-w-[336px] mx-auto text-center text-[#000000] text-xl pt-6">
        Remove photo from Instagram and Facebook?
      </p>
      <p className="max-w-[336px] mx-auto text-center text-[#737373]">
        Deleting this profile picture will delete the picture and any related
        posts on Facebook.
      </p>
      <ul className="mt-6">
        <li className="border-t">
          <Button
            variant="text"
            className="w-[244px] text-[13px] md:w-[400px] py-3 font-semibold bg-transparent flex"
            color="error"
            onClick={() => {
              imageLoading(true);
              mutate();
              modal(false);
              setOpen(false);
            }}
          >
            Remove
          </Button>
        </li>
        <li className="border-t">
          <Button
            variant="text"
            className="w-[244px] text-[13px] py-3 md:w-[400px] bg-transparent"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </li>
      </ul>
    </Modal>
  );
};

export default RemoveProfilePicModal;
