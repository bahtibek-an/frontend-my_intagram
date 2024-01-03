import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login • Instagram",
  description: "Login to Instagram clone made by Anis Kehila",
  icons: "/logoIcon.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
