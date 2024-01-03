import { ClickAwayListener } from "@mui/material";
import React from "react";
const FloatingMenu = ({
  className,
  open,
  setOpen,
  children,
  ...props
}: {
  className: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (arg: boolean) => void;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    open && (
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div
          className={`absolute drop-shadow-[0_4px_12px_rgba(0,0,0,.15)] z-10 w-[266px] rounded-xl overflow-hidden ${className}`}
          {...props}
        >
          {children}
        </div>
      </ClickAwayListener>
    )
  );
};

export default FloatingMenu;
