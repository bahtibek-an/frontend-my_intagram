import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile • Instagram",
  description: "Instagram clone made by Anis Kehila",
  icons: "/logoIcon.png",
};

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
