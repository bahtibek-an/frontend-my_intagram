import React from "react";
import Modal from "../../ui/Modal";
import { Avatar, Button } from "@mui/material";
import ChangeProfilePic from "./ChangeProfilePic";
import RemoveProfilePic from "./RemoveProfilePic";

const ProfilePicModal = ({
  open,
  setOpen,
  profileImage,
  setImageLoading,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
  profileImage: string;
  setImageLoading: (arg: boolean) => void;
}) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="flex flex-col items-center pt-2"
    >
      <Avatar
        src={profileImage}
        sx={{ width: 56, height: 56 }}
        className="cursor-pointer"
      />
      <span className="text-center pt-4 flex text-xl">Profile photo </span>
      <ul className="flex flex-col mt-2">
        <li className="border-t">
          <ChangeProfilePic modal={setOpen} imageLoading={setImageLoading} />
        </li>
        <li className="border-t">
          <RemoveProfilePic modal={setOpen} imageLoading={setImageLoading} />
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

export default ProfilePicModal;
