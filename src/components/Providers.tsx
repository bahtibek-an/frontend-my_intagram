"use client";
import React from "react";
import { AuthContextProvider } from "@/contexts/AuthContext";
import ThemeProvider from "@/contexts/ThemeProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import styles from "@/assets/styles/progress.css";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthContextProvider>{children}</AuthContextProvider>
      </ThemeProvider>
      <ProgressBar
        options={{ showSpinner: false }}
        shallowRouting
        style={styles}
      />
    </>
  );
};

export default Providers;
