"use client";
import React, { useState } from "react";
import SideBarLink from "./SideBarLink";
import Create from "@/assets/icons/NewPosts.svg";
import Activity from "@/assets/icons/Activity.svg";
import Settings from "@/assets/icons/Options.svg";
import Saved from "@/assets/icons/Save.svg";
import Appearance from "@/assets/icons/moon.svg";
import FloatingMenu from "../ui/FloatingMenu";
import signOut from "@/firebase/auth/signOut";
import SwitchAppearance from "./SwitchAppearance";

const SideBarMoreMenu = ({
  isMenu,
  setIsMenu,
}: {
  isMenu: boolean;
  setIsMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isToggleAppearanceMenu, setIsToggleAppearanceMenu] = useState(false);
  return (
    <>
      <FloatingMenu
        className="bottom-8 left-14 lg:left-4 lg:bottom-20"
        open={isMenu}
        setOpen={setIsMenu}
      >
        <div className="flex flex-col gap-1 bg-slate-100 dark:bg-[#353535]">
          <ul className="bg-white dark:bg-black p-2">
            <li>
              <SideBarLink href="#" className="w-full">
                <Settings className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
                <span>Settings</span>
              </SideBarLink>
            </li>
            <li>
              <SideBarLink href="#" className="w-full">
                <Activity className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
                <span>Your activity</span>
              </SideBarLink>
            </li>
            <li>
              <SideBarLink href="#" className="w-full">
                <Saved className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
                <span>Saved</span>
              </SideBarLink>
            </li>
            <li>
              <SideBarLink
                href="#"
                className="w-full"
                onClick={() => {
                  setIsToggleAppearanceMenu(true);
                  setIsMenu(false);
                }}
              >
                <Appearance className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
                <span>Switch appearance</span>
              </SideBarLink>
            </li>
            <li>
              <SideBarLink href="#" className="w-full">
                <Create className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
                <span>Create</span>
              </SideBarLink>
            </li>
          </ul>
          <ul className="bg-white dark:bg-black p-2 flex flex-col gap-1">
            <li>
              <SideBarLink href="#" className="w-full">
                <span>Report a problem</span>
              </SideBarLink>
            </li>
            <span className="relative h-[2px] w-full bg-white dark:bg-[#353535]"></span>
            <li onClick={signOut}>
              <SideBarLink href="#" className="w-full">
                <span>Log out</span>
              </SideBarLink>
            </li>
          </ul>
        </div>
      </FloatingMenu>
      <SwitchAppearance
        isOpen={isToggleAppearanceMenu}
        setIsOpen={setIsToggleAppearanceMenu}
        back={() => setIsMenu(true)}
      />
    </>
  );
};

export default SideBarMoreMenu;
