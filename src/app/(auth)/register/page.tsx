import type { Metadata } from "next";
import Register from "./layout";

export const metadata: Metadata = {
  title: "Register | DotWebsHosting",
  description:
    "",
};


export default function RegisterPage(){
    return(
        <>
        <Register></Register>
        </>
    )
}