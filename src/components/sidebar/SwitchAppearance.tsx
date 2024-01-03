import React from "react";
import FloatingMenu from "../ui/FloatingMenu";
import Appearance from "@/assets/icons/moon.svg";
import Back from "@/assets/icons/Arrow.svg";
import { useTheme } from "next-themes";
import Switch from "@mui/material/Switch";

const SwitchAppearance = ({
  isOpen,
  setIsOpen,
  back,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  back: () => void;
}) => {
  const { theme, setTheme } = useTheme();
  return (
    <FloatingMenu
      className="bottom-8 left-14 lg:left-4 lg:bottom-20 bg-white dark:bg-black  px-4 py-2"
      open={isOpen}
      setOpen={setIsOpen}
    >
      <div className="flex items-center gap-1">
        <Back
          className="-rotate-90 scale-75 cursor-pointer "
          onClick={() => {
            setIsOpen(false);
            back();
          }}
        />
        <div className="flex w-full items-center justify-between">
          <span>Switch appearance</span>
          <Appearance />
        </div>
      </div>
      <label
        htmlFor="switch"
        className="mt-1 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-[#3C3C3C] pl-1 py-2 rounded-md"
      >
        <span>Dark Mode</span>
        <Switch
          id="switch"
          checked={theme == "dark"}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
      </label>
    </FloatingMenu>
  );
};

export default SwitchAppearance;
