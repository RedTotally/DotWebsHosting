import type { Metadata } from "next";
import InternalHosting from "./layout";

export const metadata: Metadata = {
  title: "Internal Hosting | DotWebsHosting",
  description:
    "",
};


export default function InternalHostingPage(){
    return(
        <>
        <InternalHosting></InternalHosting>
        </>
    )
}