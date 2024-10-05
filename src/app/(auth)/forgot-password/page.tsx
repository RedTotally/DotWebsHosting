import type { Metadata } from "next";
import ForgotPassword from "./layout";

export const metadata: Metadata = {
  title: "ForgotPassword | DotWebsHosting",
  description:
    "",
};


export default function ForgotPasswordPage(){
    return(
        <>
        <ForgotPassword></ForgotPassword>
        </>
    )
}