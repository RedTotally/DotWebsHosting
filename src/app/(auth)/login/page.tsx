import type { Metadata } from "next";
import Login from "./layout";

export const metadata: Metadata = {
  title: "Login | DotWebsHosting",
  description:
    "",
};


export default function LoginPage(){
    return(
        <>
        <Login></Login>
        </>
    )
}