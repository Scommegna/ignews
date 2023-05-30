import { AppProps } from "next/app";

import { Header } from "../components/Header";

import { SessionProvider as NextAuthProvider } from "next-auth/react";

import "../styles/global.scss";

// Renders the actual page
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Provides session data for all components
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />;
    </NextAuthProvider>
  );
}

export default MyApp;
