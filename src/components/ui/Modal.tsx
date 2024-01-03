import React from "react";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { CircularProgress } from "@mui/material";

const Modal = ({
  children,
  open,
  setOpen,
  className,
  loading = false,
  ...props
}: {
  children: React.ReactNode;
  open: boolean;
  loading?: boolean;
  setOpen: (arg: boolean) => void;
} & React.HTMLProps<HTMLDivElement>) => {
  return open ? (
    <div
      className={
        "fixed left-0 top-0 h-screen w-screen bg-[rgb(0,0,0,.65)] flex justify-center items-center z-40"
      }
    >
      <ClickAwayListener
        onClickAway={() => {
          !loading && setOpen(false);
        }}
      >
        <div
          className={`bg-white dark:bg-[#262626] dark:text-white rounded-lg overflow-hidden animate-modal-pop z-30 relative ${
            className ? className : ""
          }`}
          {...props}
        >
          {children}
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full bg-[rgb(255,255,255,0.6)] flex items-center justify-center">
              <div className="text-white">
                <CircularProgress color="inherit" />
              </div>
            </div>
          )}
        </div>
      </ClickAwayListener>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
