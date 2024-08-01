import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { roboto_flex } from "@/styles/fonts";

import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${roboto_flex.className} max-w-[1480px] w-[calc(100% - 2rem)] m-auto`}
    >
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
