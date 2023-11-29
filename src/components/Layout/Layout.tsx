import scss from "./Layout.module.scss";
import { useSession } from "next-auth/react";
import React from "react";
import Head from "next/head";

const Layout = (props: any) => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>PayChecked</title>
        <meta name="description" content="Data Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

         {/* Google Analytics Script */}
         <script async src="https://www.googletagmanager.com/gtag/js?id=G-F2819WD253"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F2819WD253');
          `}
        </script>
      </Head>
      <main
        className={scss.layout}
        style={{ padding: session ? "0 24px 0 80px" : 0 }}
      >
        {props.children}
      </main>
    </>
  );
};

export default Layout;
