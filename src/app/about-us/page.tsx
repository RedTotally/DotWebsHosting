import type { Metadata } from "next";
import AboutUs from "./layout";

export const metadata: Metadata = {
  title: "About Us | DotWebsHosting",
  description:
    "",
};


export default function AboutUsPage(){
    return(
        <>
        <AboutUs></AboutUs>
        </>
    )
}