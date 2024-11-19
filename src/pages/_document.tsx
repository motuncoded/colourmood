import SessionWrapper from "@/components/SessionWrapper";
import { Html, Head, Main, NextScript } from "next/document";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colourmood",
  description:
    "A mood board-style website with a selection of colors that evoke a particular mood or emotion.",
};

export default function Document() {
  return (
    <SessionWrapper>
      <Html lang="en">
        <Head>
          <link rel="icon" href="/" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </SessionWrapper>
  );
}
