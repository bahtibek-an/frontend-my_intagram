import React from "react";
import { Metadata } from "next";
import Header from "@/components/header/Header";
export const metadata: Metadata = {
  title: "Instagram",
  description: "Instagram clone made by Anis Kehila",
  icons: "/logoIcon.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
