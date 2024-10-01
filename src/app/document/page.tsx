import type { Metadata } from "next";
import Document from "./layout";

export const metadata: Metadata = {
  title: "Document | DotWebsHosting",
  description:
    "",
};


export default function DocumentPage(){
    return(
        <>
        <Document></Document>
        </>
    )
}