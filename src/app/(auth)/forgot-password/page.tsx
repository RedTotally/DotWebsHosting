import type { Metadata } from "next";
import ForgotPassword from "./layout";

export const metadata: Metadata = {
  title: "Forgot Password | DotWebsHosting",
  description:
    "DotWebsHosting is one of the services of GoDotWebs, which holds the main functionality of providing a hosting service to host various websites. Users are expected to get a free domain, hosting service, and an extraordinary experience by registering for our service.",
};


export default function ForgotPasswordPage(){
    return(
        <>
        <ForgotPassword></ForgotPassword>
        </>
    )
}