import SessionWrapper from "@/components/SessionWrapper";
import { Html, Head, Main, NextScript } from "next/document";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:"Colourmood",
  description:"A mood board-style website with a selection of colors that evoke a particular mood or emotion."
}

export default function Document() {
  return (
    <SessionWrapper>
    <Html lang="en">
      <Head/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    </SessionWrapper>
  );
}
