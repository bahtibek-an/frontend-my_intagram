import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up • Instagram",
  description: "Sign up to Instagram clone made by Anis Kehila",
  icons: "/logoIcon.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
