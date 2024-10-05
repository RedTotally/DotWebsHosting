import type { Metadata } from "next";
import Verification from "./layout";

export const metadata: Metadata = {
  title: "Verification | DotWebsHosting",
  description:
    "",
};


export default function VerificationPage(){
    return(
        <>
        <Verification></Verification>
        </>
    )
}