import type { Metadata } from "next";
import Profile from "./layout";

export const metadata: Metadata = {
  title: "Profile | DotWebsHosting",
  description:
    "",
};


export default function ProfilePage(){
    return(
        <>
        <Profile></Profile>
        </>
    )
}