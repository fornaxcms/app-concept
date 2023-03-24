import "../styles/globals.css";
import { useEffect } from "react";
import type { AppType } from "next/app";
import Router, { useRouter } from "next/router";
import { Inter as FontSans } from "@next/font/google";
import type { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

import { api } from "~/utils/api";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    document.body.className = fontSans.className;
  }, []);

  return (
    <SessionProvider session={session}>
      <NextNProgress color="#4957E3" />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
