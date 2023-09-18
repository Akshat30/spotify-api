import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import CurrentSongHeader from "@/components/CurrentSongHeader";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const showHeader = router.pathname === "/" ? false : true;

  return (
    <SessionProvider session={session}>
      <Header/>
      {showHeader && <CurrentSongHeader/>}
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}
