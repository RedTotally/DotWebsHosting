import Panel from "./layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel | DotWebsHosting",
  description:
    "",
};


export default function PanelPage(){
    return(
        <>
        <Panel></Panel>
        </>
    )
}