import Profile from "@/components/profile/Profile";
import { fetchUserDataByUserName } from "@/firebase/fetchUserData";
import { UserData } from "@/types";
import React from "react";
import { Metadata } from "next";
import NotFound from "@/app/(dashboard)/not-found/page";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const data = (await fetchUserDataByUserName(params.username)) as UserData;
  return {
    title: data
      ? `${data?.fullName} (@${data?.userName}) • Instagram photos and videos`
      : "Instagram",
  };
}
const Page = async ({ params }: { params: { username: string } }) => {
  const data = (await fetchUserDataByUserName(params?.username)) as UserData;
  if (!data) return <NotFound />;
  return <Profile profileData={data} />;
};

export default Page;
