"use client ";
import { Button } from "@mui/material";
import React, { useState } from "react";
import RemoveProfilePicModal from "./RemoveProfilePicModal";

const RemoveProfilePic = ({
  modal,
  imageLoading,
}: {
  modal: (arg: boolean) => void;
  imageLoading: (arg: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="text"
        className="w-[244px] text-[13px] py-3 md:w-[400px] bg-transparent font-semibold"
        color="error"
        onClick={() => {
          setOpen(true);
        }}
      >
        Remove Current Photo
      </Button>
      <RemoveProfilePicModal
        open={open}
        setOpen={setOpen}
        imageLoading={imageLoading}
        modal={modal}
      />
    </>
  );
};

export default RemoveProfilePic;
