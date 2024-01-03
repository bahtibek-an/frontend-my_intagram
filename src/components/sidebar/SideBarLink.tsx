import React, { AnchorHTMLAttributes } from "react";
import Link from "next/link";

type SideBarLinkProps = {
  children: React.ReactNode;
  isActive?: boolean;
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const SideBarLink = ({
  children,
  isActive,
  href,
  ...props
}: SideBarLinkProps) => {
  return (
    <Link
      href={href}
      className="bg-transparent border-0 p-0 cursor-pointer flex"
      {...props}
    >
      <span
        className={`group flex items-center gap-3 h-12 px-3 rounded-md text-[#000000] dark:text-white dark:hover:bg-[#3C3C3C] hover:bg-[#f2f2f2] w-full active:opacity-50 ${
          isActive && "active font-extrabold "
        }`}
      >
        {children}
      </span>
    </Link>
  );
};

export default SideBarLink;
