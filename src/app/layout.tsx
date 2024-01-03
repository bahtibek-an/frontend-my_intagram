import "@/assets/styles/globals.css";
import "@splidejs/splide/dist/css/splide.min.css";
import Providers from "@/components/Providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram",
  description: "Instagram clone made by Anis Kehila",
  icons: "/logoIcon.png",
};

export default function RootLayout({
  children,
  modale,
}: {
  children: React.ReactNode;
  modale: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="font-instaSans bg-white text-black"
        suppressHydrationWarning={true}
      >
        <Providers>
          {children}
          {modale}
        </Providers>
      </body>
    </html>
  );
}
