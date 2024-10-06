import type { Metadata } from "next";
import Reset from "./layout";

export const metadata: Metadata = {
  title: "Reset Password | DotWebsHosting",
  description:
    "",
};


export default function ResetPage(){
    return(
        <>
        <Reset></Reset>
        </>
    )
}